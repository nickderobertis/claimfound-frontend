export var ERROR_RESPONSE_TYPES: any = {
  default: {
    description: "Default error message",
    message: "An error has occurred",
  },
  unauthorizedBeta: {
    description: "Unauthorized beta user",
    message: "You are not authorized for beta",
  },
  incorrectLogin: {
    description: "Incorrect email and/or password",
    message: "Incorrect email and/or password",
    logLevel: "info",
  },
  invalidOauthFBToken: {
    description: "Incorrect Social Login",
    message: "Authentication with Facebook could not happen",
    logLevel: "info",
  },
  invalidOauthGoogleToken: {
    description: "Incorrect Social Login",
    message: "Authentication with Google could not happen",
    logLevel: "info",
  },
  userNotVerified: {
    description: "User needs to check email to verify",
    message:
      "Please check your email for a verification message from ClaimFound.",
    logLevel: "info",
  },
  userExists: {
    description: "Cannot create user: email already exists",
    message:
      "That email address is already taken. Did you log in using another method?",
    logLevel: "info",
  },
  incorrectFileUploadType: {
    description: "file type currently not allowed",
    message:
      "Please upload an image or document. It should match one of the following extensions: PDF, JPEG, PNG, BMP, GIF, IEF, PIPEG, TIFF, SVG, XML",
    logLevel: "info",
  },
  maxFileSizeLimit: {
    description: "The uploaded file is too big",
    message:
      "Please upload an image or document that is smaller than 50mb. Your upload was too large.",
    logLevel: "info",
  },
  invalidToken: {
    description: "User token is invalid or expired.",
    message: "Sorry, your session has timed out. Please log out and in again.",
    logLevel: "info",
  },
  incorrectPassword: {
    description: "Bad password",
    message: "Incorrect Password",
    logLevel: "info",
  },
  userDoesNotExist: {
    description: "User no exist",
    message: "We were unable to find your email address in our systems",
    logLevel: "info",
  },
  invalidNonce: {
    description: "bad nonce",
    message:
      "We couldn't verify your email address, perhaps it's been too long. Please log in again to get another verification email.",
    logLevel: "info",
  },
  confirmFormDeletion: {
    description: "Form automatically being deleted. Need confirmation",
    message:
      "We want to confirm that your previous forms are about to be deleted",
    logLevel: "info",
  },
  emailFormat: {
    description: "badly formatted email",
    message: "Please type a valid email address",
    logLevel: "info",
  },
  claimsAlreadySubmitted: {
    description: "claim already submitted",
    message:
      "You have already submitted this claim. Please wait to hear back from state treasury",
    logLevel: "info",
  },
  userInfoForm: {
    description: "userInfoForm",
    message: "User Info Form Message",
    logLevel: "info",
  },
  nameSearchInputException: {
    description: "user passed bad details for name search",
    message:
      "Please check to make sure you've included a valid first and last name",
  },
  invalidReferralToken: {
    description: "Referral token not valid",
    message:
      "Some problem occured with current referral link. You can still go ahead and create an account",
  },
  referralEmailAlreadySent: {
    description: "Referral email already sent",
    message:
      "Sorry, it looks like you've already sent an email to this address. Please email it directly",
  },
  invalidEmail: {
    description: "Email format invalid",
    message: "Please check the email address to make sure it is valid.",
  },
  rateLimit: {
    description: "rate limit exceeded",
    message:
      "Sorry, we're currently experiencing high volume. Please try again later.",
    logLevel: "info",
  },
  gatewayTimeout: {
    description: "backend gateway timeout",
    message:
      "Sorry, we're currently experiencing high volume. Please try again later.",
  },
  multipleDocumentsForRequirement: {
    description: "multiple document uploaded for same requirement",
    message:
      "You already have a document of this type. Please upload only one of each document requirement.",
    logLevel: "info",
  },
  formTimeout: {
    description: "form timeout",
    message: "Oops, it looks like the form timed out, please refresh the page.",
  },
  maxPdfFileSizeLimit: {
    description: "The uploaded pdf file is larger than 5 mb",
    message:
      "Please upload a pdf file that is smaller than 5mb. Your upload was too large.",
    logLevel: "info",
  },
  duplicateUserDetails: {
    description: "duplicateUserDetails",
    message: "Duplicate User Details Message",
    logLevel: "info",
  },
  userFeesExceedClaimAmount: {
    description: "Called when a user's fee exceeds 20% of total claim value",
    message: "Your pending fees exceed 20% of your total claim values. Please contact a ClaimFound representative to resolve this issue.",
  }
};
