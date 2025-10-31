import { stat } from "fs";

export class PhonePeError extends Error {
  //Error code (e.g. 'VALIDATION_ERROR', '401', '500')
  public code: string;

  // Additional error details
  public details?: any;

  // HTTP status code (if applicable)
  public statusCode?: number;

  //Timestamp when error occurred
  public timestamp: string;

  // Whether the error is retryable
  public retryable: boolean;

  constructor(
    message: string,
    code: string = "PHONEPE_ERROR",
    details?: any,
    statusCode?: number,
    retryable: boolean = false,
  ) {
    super(message);
    this.name = "PhonePeError";
    this.code = code;
    this.details = details;
    this.statusCode = statusCode;
    this.retryable = retryable;
    this.timestamp = new Date().toISOString();

    //Maintians proper stack trace for where error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  //Convert error to JSON object
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      details: this.details,
      statusCode: this.statusCode,
      retryable: this.retryable,
      timestamp: this.timestamp,
      stack: this.stack,
    };
  }
  //Get user-friendly error message
  getUserMessage(): string {
    // Return a sanitized message safe to show to end users
    switch (this.code) {
      case "VALIDATION_ERROR":
        return "Invalid input provided. Please check your details and try again.";
      case "NETWORK_ERROR":
        return "Network error. Please check your connection and try again.";
      case "AUTH_ERROR":
        return "Authentication failed. Please contact support.";
      case "PAYMENT_FAILED":
        return "Payment failed. Please try again or use a different payment method.";
      case "TIMEOUT":
        return "Request timed out. Please try again.";
      default:
        return "An error occurred. Please try again later.";
    }
  }
}

/**
 * Validation Error
 * Thrown when input validation fails
 */
export class PhonePeValidationError extends PhonePeError {
  //Field that failed validation
  public field?: string;
  //Validation constriants that failed
  public constraints?: Record<string, string>;

  constructor(
    message: string,
    field?: string,
    constraints?: Record<string, string>,
    details?: any,
  ) {
    super(message, "VALIDATION_ERROR", details, 400, false);
    this.name = "PhonePeValidationError";
    this.field = field;
    this.constraints = constraints;
  }
}

/**
 * Network Error
 * Thrown when network request fails
 */
export class PhonePeNetworkError extends PhonePeError {
  //Original error from network library
  public originalError?: Error;

  constructor(message: string, originalError?: Error, details?: any) {
    super(message, "NETWORK_ERROR", details, undefined, true);
    this.name = "PhonePeNetworkError";
    this.originalError = originalError;
  }
}

/**
 * Authentication Error
 * Thrown when Authentication fails
 */
export class PhonePeAuthError extends PhonePeError {
  constructor(message: string, details?: any) {
    super(message, "AUTH_ERROR", details, 401, false);
    this.name = "PhonePeAuthError";
  }
}

/**
 * API Error
 * Thrown when PhonePe API returns an error
 */
export class PhonePeAPIError extends PhonePeError {
  //API response data
  public responseData?: any;

  //API error code from PhonePe
  public apiErrorCode?: string;

  constructor(
    message: string,
    statusCode: number,
    apiErrorCode?: string,
    responseData?: any,
    retryable: boolean = false,
  ) {
    super(message, "API_ERROR", responseData, statusCode, retryable);
    this.name = "PhonePeAPIError";
    this.apiErrorCode = apiErrorCode;
    this.responseData = responseData;
  }
}

/**
 * Timeout Error
 * Thrown when request times out
 */
export class PhonePeTimeoutError extends PhonePeError {
  //Timeout duration in milliseconds (ms)
  public timeout: number;
  constructor(message: string, timeout: number, details?: any) {
    super(message, "TIMEOUT", details, undefined, true);
    this.name = "PhonePeTimeoutError";
    this.timeout = timeout;
  }
}

/**
 * Configuration Error
 * Thrown when SDK configuration is invalid
 */
export class PhonePeConfigError extends PhonePeError {
  //Missing or invalid configuration fields
  public configFields?: string[];

  constructor(message: string, configFields?: string[], details?: any) {
    super(message, "CONFIG_ERROR", details, undefined, false);
    this.name = "PhonePeConfigError";
    this.configFields = configFields;
  }
}

/**
 * Payment Error
 * Thrown when payment processing fails
 */
export class PhonePePaymentError extends PhonePeError {
  //Transaction ID (if available)
  public transactionId?: string;

  //Payment failure reason
  public failureReason?: string;

  constructor(
    message: string,
    transactionId?: string,
    failureReason?: string,
    details?: any,
    statusCode?: number,
  ) {
    super(message, "PAYMENT_ERROR", details, statusCode, false);
    this.transactionId = transactionId;
    this.failureReason = failureReason;
  }
}

/**
 * Rate Limit Error
 * Thrown when API rate limit is exceeded
 */
export class PhonePeRateLimitError extends PhonePeError {
  //Time when rate limit will reset (timestamp)
  public resetAt?: number;

  //Retry after seconds
  public retryAfter?: number;

  constructor(
    message: string,
    retryAfter?: number,
    resetAt?: number,
    details?: any,
  ) {
    super(message, "RATE_LIMIT", details, 429, true);
    this.name = "PhonePeRateLimitError";
    this.retryAfter = retryAfter;
    this.resetAt = resetAt;
  }
}

//Helper function to create appropriate error from API response
export function createErrorFromResponse(
  error: any,
  defaultMessage: string = "An error occurred",
): PhonePeError {
  //Handle Axios Errors
  if (error.isAxiosError) {
    const statusCode = error.response?.status;
    const responseData = error.response?.data;
    const apiErrorCode = responseData?.code || responseData?.error_code;
    const errorMessage =
      responseData?.message || error.message || defaultMessage;

    //Rate Limit Error
    if (statusCode === 429) {
      const retryAfter = parseInt(error.response?.header["retry-after"] || "0");
      return new PhonePeRateLimitError(
        errorMessage,
        retryAfter,
        undefined,
        responseData,
      );
    }
    //Authentication error
    if (statusCode === 401 || statusCode === 403) {
      return new PhonePeAuthError(errorMessage, responseData);
    }
    //Validation error
    if (statusCode === 400) {
      return new PhonePeValidationError(
        errorMessage,
        undefined,
        undefined,
        responseData,
      );
    }

    //Network error (no response)
    if (!error.response) {
      return new PhonePeNetworkError(
        error.message || "Network error occured",
        error,
        { code: error.code },
      );
    }

    //Timeout error
    if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
      return new PhonePeTimeoutError(
        errorMessage,
        error.config?.timeout || 0,
        responseData,
      );
    }

    //Server errors (5xx) are retryable
    const retryable = statusCode >= 500 && statusCode < 600;

    return new PhonePeAPIError(
      errorMessage,
      statusCode,
      apiErrorCode,
      responseData,
      retryable,
    );
  }

  //Handle validation errors
  if (error instanceof PhonePeValidationError) {
    return error;
  }

  // Handle other PhonePe errors
  if (error instanceof PhonePeError) {
    return error;
  }

  // Generic error
  return new PhonePeError(
    error.message || defaultMessage,
    "UNKNOWN_ERROR",
    error,
    undefined,
    false,
  );
}
