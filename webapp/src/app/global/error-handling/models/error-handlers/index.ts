import { FeesExceeded } from './fees-exceeded';
import { DefaultErrorHandler } from "./default";

import { PrivateBetaErrorHandler } from "./private-beta";

import { UnknownErrorHandler } from "./unknown";

import { IncorrectLogin } from "./incorrect-login";

import { EmailFormat } from "./email-format";

import { InvalidTokenErrorHandler } from "./invalid-token";

import { UserExistsErrorHandler } from "./user-exists";

import { UserInfoFormErrorHandler } from "./user-info-form";

import { DuplicateUserDetailsErrorHandler } from "./duplicate-user-details";

import { FormTimeoutErrorHandler } from "./form-timeout";

import { IncorrectFileTypeHandler } from "./incorrect-file-type";

import { FormDeleteModal } from "./form-delete-confirmation";

import { UnsupportedLocation } from "./unsupported-location";

export let ERROR_HANDLERS = [
  DefaultErrorHandler,
  PrivateBetaErrorHandler,
  IncorrectFileTypeHandler,
  UnknownErrorHandler,
  IncorrectLogin,
  FormDeleteModal,
  EmailFormat,
  InvalidTokenErrorHandler,
  UserExistsErrorHandler,
  UserInfoFormErrorHandler,
  DuplicateUserDetailsErrorHandler,
  FormTimeoutErrorHandler,
  UnsupportedLocation,
  FeesExceeded
];
