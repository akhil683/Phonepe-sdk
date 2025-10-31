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
