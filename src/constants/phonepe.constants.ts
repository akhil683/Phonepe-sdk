export const API_ENDPOINTS = {
  PRODUCTION: {
    BASE_URL: "https://api.phonepe.com",
    AUTH: "/apis/hermes/v1/oauth/token",
    CREATE_ORDER: "/apis/pg-sandbox/pg/v1/order/create",
    ORDER_STATUS: "/apis/pg-sandbox/pg/v1/order/status",
    REFUND: "/apis/pg-sandbox/pg/v1/refund",
    SUBSCRIPTION: "/apis/pg-sandbox/pg/v1/subscription/create",
    SUBSCRIPTION_STATUS: "/apis/pg-sandbox/pg/v1/subscription/status",
    SUBSCRIPTION_CANCEL: "/apis/pg-sandbox/pg/v1/subscription/cancel",
    MANDATE_CREATE: "/apis/pg-sandbox/pg/v1/mandate/create",
    MANDATE_STATUS: "/apis/pg-sandbox/pg/v1/mandate/status",
    MANDATE_EXECUTE: "/apis/pg-sandbox/pg/v1/mandate/execute",
    MANDATE_REVOKE: "/apis/pg-sandbox/pg/v1/mandate/revoke",
    SETTLEMENT: "/apis/pg-sandbox/pg/v1/settlement",
    VPA_VALIDATE: "/apis/pg-sandbox/pg/v1/vpa/validate",
    ACCOUNT_VALIDATE: "/apis/pg-sandbox/pg/v1/account/validate",
  },
  SANDBOX: {
    BASE_URL: "https://api-preprod.phonepe.com",
    AUTH: "/apis/hermes/v1/oauth/token",
    CREATE_ORDER: "/apis/pg-sandbox/pg/v1/order/create",
    ORDER_STATUS: "/apis/pg-sandbox/pg/v1/order/status",
    REFUND: "/apis/pg-sandbox/pg/v1/refund",
    SUBSCRIPTION: "/apis/pg-sandbox/pg/v1/subscription/create",
    SUBSCRIPTION_STATUS: "/apis/pg-sandbox/pg/v1/subscription/status",
    SUBSCRIPTION_CANCEL: "/apis/pg-sandbox/pg/v1/subscription/cancel",
    MANDATE_CREATE: "/apis/pg-sandbox/pg/v1/mandate/create",
    MANDATE_STATUS: "/apis/pg-sandbox/pg/v1/mandate/status",
    MANDATE_EXECUTE: "/apis/pg-sandbox/pg/v1/mandate/execute",
    MANDATE_REVOKE: "/apis/pg-sandbox/pg/v1/mandate/revoke",
    SETTLEMENT: "/apis/pg-sandbox/pg/v1/settlement",
    VPA_VALIDATE: "/apis/pg-sandbox/pg/v1/vpa/validate",
    ACCOUNT_VALIDATE: "/apis/pg-sandbox/pg/v1/account/validate",
  },
} as const;

export const DEFAULT_CONFIG = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
  TOKEN_REFRESH_BUFFER: 60000, // 1 minute
  AUTO_REFRESH_TOKEN: true,
  DEBUG: false,
} as const;

/**
 * Validation rules
 */
export const VALIDATION_RULES = {
  PHONE: {
    PATTERN: /^[6-9]\d{9}$/,
    LENGTH: 10,
    ERROR_MESSAGE: "Phone number must be a valid 10-digit Indian mobile number",
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MAX_LENGTH: 254,
    ERROR_MESSAGE: "Invalid email address",
  },
  AMOUNT: {
    MIN: 1,
    MAX: 100000000, // 1 Crore
    ERROR_MESSAGE: "Amount must be between ₹1 and ₹1,00,00,000",
  },
  UPI_ID: {
    PATTERN: /^[\w.-]+@[\w.-]+$/,
    MAX_LENGTH: 255,
    ERROR_MESSAGE: "Invalid UPI ID format",
  },
  IFSC_CODE: {
    PATTERN: /^[A-Z]{4}0[A-Z0-9]{6}$/,
    LENGTH: 11,
    ERROR_MESSAGE: "Invalid IFSC code format",
  },
  ACCOUNT_NUMBER: {
    PATTERN: /^\d{9,18}$/,
    MIN_LENGTH: 9,
    MAX_LENGTH: 18,
    ERROR_MESSAGE: "Account number must be between 9 and 18 digits",
  },
  MERCHANT_ORDER_ID: {
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z0-9_-]+$/,
    ERROR_MESSAGE:
      "Merchant order ID must be alphanumeric with hyphens/underscores",
  },
  USER_ID: {
    MAX_LENGTH: 100,
    MIN_LENGTH: 1,
    ERROR_MESSAGE: "User ID must be between 1 and 100 characters",
  },
} as const;

/**
 * Payment method codes
 */
export const PAYMENT_METHODS = {
  UPI: "UPI",
  CARD: "CARD",
  NET_BANKING: "NET_BANKING",
  WALLET: "WALLET",
  EMI: "EMI",
  PAY_LATER: "PAY_LATER",
} as const;

/**
 * Payment status codes
 */
export const PAYMENT_STATUS = {
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  PENDING: "PENDING",
  EXPIRED: "EXPIRED",
  CANCELLED: "CANCELLED",
  INITIATED: "INITIATED",
} as const;

/**
 * Refund status codes
 */
export const REFUND_STATUS = {
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  PENDING: "PENDING",
  INITIATED: "INITIATED",
} as const;

/**
 * Subscription status codes
 */
export const SUBSCRIPTION_STATUS = {
  ACTIVE: "ACTIVE",
  PAUSED: "PAUSED",
  CANCELLED: "CANCELLED",
  EXPIRED: "EXPIRED",
  PENDING: "PENDING",
} as const;

/**
 * Mandate status codes
 */
export const MANDATE_STATUS = {
  ACTIVE: "ACTIVE",
  PENDING: "PENDING",
  REVOKED: "REVOKED",
  EXPIRED: "EXPIRED",
  PAUSED: "PAUSED",
  REJECTED: "REJECTED",
} as const;

/**
 * HTTP status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

/**
 * Error codes
 */
export const ERROR_CODES = {
  // Validation errors
  INVALID_PHONE: "INVALID_PHONE",
  INVALID_EMAIL: "INVALID_EMAIL",
  INVALID_AMOUNT: "INVALID_AMOUNT",
  INVALID_UPI_ID: "INVALID_UPI_ID",
  INVALID_IFSC: "INVALID_IFSC",
  INVALID_ACCOUNT_NUMBER: "INVALID_ACCOUNT_NUMBER",
  REQUIRED_FIELD_MISSING: "REQUIRED_FIELD_MISSING",

  // Authentication errors
  AUTH_FAILED: "AUTH_FAILED",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",

  // Payment errors
  PAYMENT_FAILED: "PAYMENT_FAILED",
  INSUFFICIENT_FUNDS: "INSUFFICIENT_FUNDS",
  TRANSACTION_DECLINED: "TRANSACTION_DECLINED",
  DUPLICATE_ORDER: "DUPLICATE_ORDER",

  // Network errors
  NETWORK_ERROR: "NETWORK_ERROR",
  TIMEOUT: "TIMEOUT",
  CONNECTION_REFUSED: "CONNECTION_REFUSED",

  // API errors
  API_ERROR: "API_ERROR",
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
  INVALID_REQUEST: "INVALID_REQUEST",
  RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",

  // Configuration errors
  CONFIG_ERROR: "CONFIG_ERROR",
  MISSING_CONFIG: "MISSING_CONFIG",

  // Generic errors
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

/**
 * HTTP headers
 */
export const HEADERS = {
  CONTENT_TYPE: "Content-Type",
  AUTHORIZATION: "Authorization",
  ACCEPT: "Accept",
  USER_AGENT: "User-Agent",
  X_REQUEST_ID: "X-Request-ID",
  X_CLIENT_VERSION: "X-Client-Version",
} as const;

/**
 * Content types
 */
export const CONTENT_TYPES = {
  JSON: "application/json",
  FORM_URLENCODED: "application/x-www-form-urlencoded",
  MULTIPART: "multipart/form-data",
} as const;

/**
 * SDK information
 */
export const SDK_INFO = {
  NAME: "@yourorg/phonepe-sdk",
  VERSION: "1.0.0",
  USER_AGENT: "PhonePeSDK/1.0.0 (Node.js)",
} as const;

/**
 * Time constants (in milliseconds)
 */
export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
} as const;

/**
 * Amount conversion constants
 */
export const AMOUNT = {
  PAISE_PER_RUPEE: 100,
  MIN_AMOUNT_PAISE: 100, // ₹1
  MAX_AMOUNT_PAISE: 10000000000, // ₹1 Crore
} as const;

/**
 * Pagination defaults
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 50,
  MAX_PAGE_SIZE: 100,
} as const;

/**
 * All constants grouped together
 */
export const PHONEPE_CONSTANTS = {
  API_ENDPOINTS,
  DEFAULT_CONFIG,
  VALIDATION_RULES,
  PAYMENT_METHODS,
  PAYMENT_STATUS,
  REFUND_STATUS,
  SUBSCRIPTION_STATUS,
  MANDATE_STATUS,
  HTTP_STATUS,
  ERROR_CODES,
  HEADERS,
  CONTENT_TYPES,
  SDK_INFO,
  TIME,
  AMOUNT,
  PAGINATION,
} as const;
