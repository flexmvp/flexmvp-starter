// "use client";
import { Auth } from "aws-amplify";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type CognitoUserType = ReturnType<typeof Auth.currentAuthenticatedUser>;

interface AuthState {
  cognitoUser?: CognitoUserType;
  //   themes: ThemesType;
  //   setTheme: (x: ThemeType) => void;
  refreshUser: () => Promise<void>;
  refreshSuccessful?: boolean;
  refreshFailed?: boolean;
  refreshing: boolean;
  logout: () => void;
  setUser: (user: CognitoUserType) => void;
}

export const useAuthState = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        cognitoUser: undefined,
        refreshing: false,
        refreshUser: async () => {
          try {
            set((/* state */) => ({ refreshing: true }));
            const cognitoUser = await Auth.currentAuthenticatedUser();
            set((/* state */) => ({ refreshing: false }));
            const nextState = {
              cognitoUser: partialCognitoUser(cognitoUser),
              refreshFailed: false,
              refreshSuccessful: true,
            };
            return set((/* state */) => {
              return nextState;
            });
          } catch (error) {
            console.error("refreshUser.error", error);
            // set((/* state */) => ({ refreshing: false }));
            if (
              (error instanceof Error &&
                error.message.includes("The user is not authenticated")) ||
              (typeof error === "string" &&
                error.includes("The user is not authenticated"))
            )
              return set((/* state */) => {
                return {
                  cognitoUser: undefined,
                  refreshFailed: true,
                  refreshSuccessful: false,
                };
              });
          }
        },
        logout: () => {
          Auth.signOut();
          set((/* state */) => {
            return {
              cognitoUser: undefined,
              refreshFailed: false,
              refreshSucceeded: false,
              refreshing: false,
            };
          });
        },
        setUser: (user: CognitoUserType) => {
          set((/* state */) => {
            return {
              cognitoUser: partialCognitoUser(user),
            };
          });
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({ cognitoUser: state.cognitoUser }),
      }
    )
  )
);

async function partialCognitoUser(user: CognitoUserType) {
  return {
    attributes: (await user).attributes,
    username: (await user).username,
  };
}
