import { Auth, Hub } from "aws-amplify";
import { useEffect } from "react";
import { AUTO_SIGN_IN_INTERVAL } from "@flexmvp/hooks/useAutoSignInInterval";
import { useRedirectClient } from "@flexmvp/hooks/useOnRouteComplete";

export function useAutoSignInListener(
  redirectUrl: string,
  { onSuccess = (data: any) => {} } = {}
) {
  const redirect = useRedirectClient();
  useEffect(() => {
    const hubListenerCancelToken = Hub.listen("auth", (data) => {
      const event = data.payload.event;
      if (event === "autoSignIn" && redirectUrl) {
        // redirect to homepage
        redirect(redirectUrl);
        if (onSuccess) onSuccess(data);
        hubListenerCancelToken();
      } else if (event === "autoSignIn_failure") {
        // Test if the user was authenticated on another tab
        // if so, redirect to homepage
        const timeout = 333;
        const maxAttempts = AUTO_SIGN_IN_INTERVAL / timeout;
        let attempts = 0;
        const interval = setInterval(async () => {
          try {
            const user = await Auth.currentUserInfo();

            if (user) {
              clearInterval(interval);
              redirect(redirectUrl);
              hubListenerCancelToken();
            }
            if (++attempts >= maxAttempts) {
              clearInterval(interval);
              hubListenerCancelToken();
            }
          } catch (e) {
            // console.log("🔒 Auth.error", e);
            // Fail quietly
            hubListenerCancelToken();
          }
        }, timeout);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty array ensures that effect is only run on mount and unmount
}
