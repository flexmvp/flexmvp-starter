export type KnownErrorType = { message: string; Action?: React.ComponentType };
export const knownErrors: {
  [name: string]: KnownErrorType;
} = {
  UserNotConfirmedException: {
    message: "Email address is not confirmed, please check your inbox",
  },
  UsernameExistsException: {
    message:
      "An account with the given email already exists, please sign in instead",
  },
  // InvalidParameterException: {
  //   message: "Email address is not valid",
  // },
  InvalidPasswordException: {
    message: "Password is not valid",
  },
};

export function isKnownError(error: unknown): error is Error | string {
  // string type
  if (typeof error === "string") {
    return !!knownErrors[error];
  }
  // Error type
  else if (error instanceof Error) {
    if (!!error?.name) {
      return !!knownErrors[error.name];
    }
    // Error type
    else if (!!error?.message) {
      return !!knownErrors[error.message];
    }
  }
  return false;
}

export function getKnownErrorCode(error: string | Error): string {
  // string type
  if (typeof error === "string") {
    return error;
  }
  // Error type
  if (error instanceof Error) {
    return error.name;
  }
  throw new Error("Unknown error type");
}

export function getKnownError(
  errorName: string,
  defaultMessage:
    | string
    | undefined = "An error occurred. Please try again later."
): KnownErrorType {
  if (knownErrors[errorName]) {
    return knownErrors[errorName];
  }
  return {
    message: errorName || defaultMessage,
  };
}

export function getKnownErrorMessage(code: string) {
  const knownError = getKnownError(code);
  return knownError.message;
}

export function getKnownErrorAction(code: string) {
  const knownError = getKnownError(code);
  return knownError.Action || (() => {});
}

export function codeOrMessage(
  error: unknown,
  defaultMessage: string = "An error occurred. Please try again later."
): string {
  // Known error type
  if (isKnownError(error)) {
    return getKnownErrorCode(error);
  }
  // Unknown javascript error type
  else if (error instanceof Error) {
    return error.message;
  }
  // Unknown javascript error type
  else if (typeof error === "string") {
    return error;
  }
  // default message
  return defaultMessage;
}
