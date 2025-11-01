/**
 * Configuration Type Definitions
 *
 * This file contains all configuration-related type definitions
 * for the PhonePe SDK.
 */

/**
 * PhonePe environment types
 * - sandbox: For testing and development
 * - production: For live transactions
 */
export type PhonePeEnvironment = "sandbox" | "production";

/**
 * Main configuration interface for PhonePe SDK
 *
 * @example
 * ```typescript
 * const config: PhonePeConfig = {
 *   clientId: 'your-client-id',
 *   clientVersion: 'v1',
 *   clientSecret: 'your-secret',
 *   merchantId: 'your-merchant-id',
 *   environment: 'sandbox'
 * };
 * ```
 */
export interface PhonePeConfig {
  //Client ID provided by PhonePe
  clientId: string;

  //API version to use (e.g., 'v1', 'v2')
  clientVersion: string;

  //Client secret for authentication (keep this secret and never expose in frontend)
  clientSecret: string;

  //Merchant ID provided by PhonePe
  merchantId: string;

  //Environment to use (default: sandbox)
  environment?: PhonePeEnvironment;

  //Salt key for checksum validation (if required by PhonePe)
  saltKey?: string;

  //Salt index for checksum validation
  saltIndex?: number;

  //Custom authentication URL
  authUrl?: string;

  //Custom order creation endpoint
  createOrderUrl?: string;

  // Custom order status check endpoint (Auto-configured based on env)
  statusUrl?: string;

  //Custom refund endpoint
  refundUrl?: string;

  //Custom subscription creation endpoint (Auto-configured based on env)
  subscriptionUrl?: string;

  //Custom mandate creation endpoint (Auto-configured based on env)
  mandateUrl?: string;

  //Custom settlement details endpoint (Auto-configured based on env)
  settlementUrl?: string;

  //Custom validation endpoint (Auto-configured based on env)
  validationUrl?: string;

  //Request timeout in milliseconds (default: 30000)
  timeout?: number;

  //Number of retry attempts for failed requests (default: 3)
  retryAttempts?: number;

  //Delay between retry attempts in milliseconds (default: 1000)
  retryDelay?: number;

  //Enable debug logging (default: false)
  debug?: boolean;

  //Custom logger function
  logger?: (
    level: "info" | "warn" | "error" | "debug",
    message: string,
    data?: any,
  ) => void;

  //Custom headers to include in all requests
  customHeaders?: Record<string, string>;

  // Enable automatic token refresh (default: true)
  autoRefreshToken?: boolean;

  //Token refresh buffer time in milliseconds (default: 60000ms, 1min)
  //Token will be refreshed this much time before expiry
  tokenRefreshBuffer?: number;
}

/**
 * Internal configuration interface with all required fields
 * Used internally after config validation and default value assignment
 */
export interface PhonePeInternalConfig
  extends Required<
    Omit<PhonePeConfig, "saltKey" | "saltIndex" | "logger" | "customHeaders">
  > {
  saltKey?: string;
  saltIndex?: number;
  logger?: (
    level: "info" | "warn" | "error" | "debug",
    message: string,
    data?: any,
  ) => void;
  customHeaders?: Record<string, string>;
}
