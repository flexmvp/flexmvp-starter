import { Auth } from "aws-amplify";
import config from "@flexmvp/config";
import { useRedirectClient } from "@flexmvp/hooks/useOnRouteComplete";

// Used to work around the following issue where the user is not signed in after
// confirming their email address in a different browser tab:
// https://github.com/aws-amplify/amplify-js/issues/10225#issuecomment-1536255545

export const AUTO_SIGN_IN_INTERVAL = 5000; // 5 seconds

export function useAutoSignInInterval({
  interval = AUTO_SIGN_IN_INTERVAL,
  maxMinutes = 5,
  redirectUrl = "",
  onSuccess = (data: any) => {},
} = {}) {
  const redirect = useRedirectClient();
  return function autoSignInInterval(email: string, password: string): void {
    let attempts = 0;
    const maxAttempts = (maxMinutes * 1000 * 60) / interval; // 5 minutes
    const intervalId = setInterval(() => {
      console.log(`🔁 autoSignIn retry [${attempts}/${maxAttempts}]`);
      if (attempts > maxAttempts) {
        clearInterval(intervalId);
        return;
      }
      attempts += 1;
      Auth.signIn(email, password)
        .then((data) => {
          clearInterval(intervalId);
          if (onSuccess) onSuccess(data);

          // Redirect handled by AutoSignInListener
          // if (redirectUrl) redirect(redirectUrl);

          // TODO: handle AutoSignIn on Verify page when
          // verification is done on another tab
        })
        .catch((e) => {
          // FAILURE
          if (
            e instanceof Error &&
            e.message.includes("User is not confirmed.")
          ) {
            // Fail quietly
            // User is not confirmed, that's ok, we'll try again
          } else {
            // Unknow failure, stop trying
            // e.g. invalid credentials, too many attempts, etc.
            clearInterval(intervalId);
          }
        });
    }, interval);
  };
}
