/**
 * Mandate Type Definitions
 *
 * This file contains all mandate-related type definitions
 * for recurring payment authorization and mandate management.
 */

import { PhonePeError } from "../errors/PhonePeErrors";

//Mandate types
export type MandateType = "FIXED" | "VARIABLE" | "MAXIMUM";

//Mandate status types
export type MandateStatus =
  | "ACTIVE"
  | "PENDING"
  | "REVOKED"
  | "EXPIRED"
  | "PAUSED"
  | "REJECTED";

//Mandate recurrence patterns
export type MandateRecurrence =
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | "QUARTERLY"
  | "HALF_YEARLY"
  | "YEARLY"
  | "AS_PRESENTED";

/**
 * Mandate creation parameters
 *
 * @example
 * ```typescript
 * const mandate: MandateCreateParams = {
 *   userId: 'user123',
 *   phone: '9876543210',
 *   type: 'VARIABLE',
 *   maxAmount: 1000.00,
 *   recurrence: 'MONTHLY',
 *   startDate: '2024-02-01',
 *   endDate: '2025-02-01',
 *   customerName: 'John Doe',
 *   description: 'Monthly subscription payment'
 * };
 * ```
 */
export interface MandateCreateParams {
  //User identifier
  userId: string;

  //Customer phone number
  phone: string;

  /**
   * Mandate type
   * - FIXED: Fixed amount each time
   * - VARIABLE: Variable amount up to max
   * - MAXIMUM: Maximum amount that can be charged
   */
  type: MandateType;

  /**
   * Maximum amount per transaction
   * @required for VARIABLE and MAXIMUM types
   */
  maxAmount: number;

  /**
   * Fixed amount per transaction
   * @required for FIXED type
   */
  fixedAmount?: number;

  //Recurrence pattern
  recurrence: MandateRecurrence;

  //Mandate start date (ISO format)
  startDate: string;

  //Mandate end date (ISO format)
  endDate: string;

  //Custom mandate ID (Auto-generated if not provided)
  mandateId?: string;

  //Customer email
  email?: string;

  //Customer name
  customerName: string;

  //Mandate description/purpose
  description: string;

  //Bank account number (if applicable)
  accountNumber?: string;

  //Bank IFSC code (if applicable)
  ifscCode?: string;

  //UPI ID (if applicable)
  upiId?: string;

  //Callback URL for mandate events
  callbackUrl?: string;

  //Additional metadata
  metadata?: Record<string, any>;

  //Merchant category code
  mcc?: string;

  //Block funds option
  blockFunds?: boolean;
}

/**
 * Mandate creation response
 */
export interface MandateCreateResponse {
  //Whether the request was successful
  success: boolean;

  //Mandate ID
  mandateId: string;

  //Mandate status
  status: MandateStatus;

  //Customer approval URL
  approvalUrl?: string;

  //SDK payload for customer approval
  sdkPayload?: string;

  //UPI mandate link (for UPI mandates)
  upiMandateLink?: string;

  //Mandate reference number
  referenceNumber?: string;

  //Error details if request failed
  error?: PhonePeError;

  //Response timestamp
  timestamp: string;
}

/**
 * Mandate status response
 */
export interface MandateStatusResponse {
  //Whether the request was successful
  success: boolean;

  //Mandate ID
  mandateId: string;

  //Current status
  status: MandateStatus;

  //User ID
  userId: string;

  //Mandate type
  type: MandateType;

  //Maximum amount
  maxAmount?: number;

  //Fixed amount
  fixedAmount?: number;

  //Recurrence pattern
  recurrence: MandateRecurrence;

  //Start date
  startDate: string;

  //End date
  endDate: string;

  //Creation date
  createdAt: string;

  //Last updated date
  updatedAt?: string;

  //Customer details
  customer?: {
    name: string;
    phone: string;
    email?: string;
  };

  //Bank/UPI details
  paymentDetails?: {
    accountNumber?: string;
    ifscCode?: string;
    upiId?: string;
    bankName?: string;
  };

  //Total amount charged so far
  totalAmountCharged?: number;

  //Number of successful transactions
  successfulTransactions?: number;

  //Number of failed transactions
  failedTransactions?: number;

  //Recent transactions
  recentTransactions?: Array<{
    transactionId: string;
    amount: number;
    status: string;
    timestamp: string;
  }>;

  //Additional metadata
  metadata?: Record<string, any>;

  //Error details if request failed
  error?: PhonePeError;

  //Response timestamp
  timestamp: string;
}

/**
 * Mandate revocation response
 */
export interface MandateRevokeResponse {
  //Whether the revocation was successful
  success: boolean;

  //Mandate ID
  mandateId: string;

  //Revocation status
  status: "REVOKED" | "PENDING_REVOCATION";

  //Revocation date
  revocationDate: string;

  //Error details if request failed
  error?: PhonePeError;

  //Response timestamp
  timestamp: string;
}

/**
 * Mandate execution parameters
 * Used to execute a payment against an active mandate
 *
 * @example
 * ```typescript
 * const execution: MandateExecuteParams = {
 *   mandateId: 'mandate-123',
 *   amount: 100.00,
 *   description: 'Monthly subscription charge'
 * };
 * ```
 */
export interface MandateExecuteParams {
  //Mandate ID to execute
  mandateId: string;

  /**
   * Amount to charge
   * @required
   * @validation Must be <= maxAmount for the mandate
   */
  amount: number;

  //Transaction description
  description?: string;

  //Custom transaction ID (Auto-generated if not provided)
  transactionId?: string;

  //Additional metadata
  metadata?: Record<string, any>;

  //Callback URL for this specific transaction
  callbackUrl?: string;
}

/**
 * Mandate execution response
 */
export interface MandateExecuteResponse {
  //Whether the execution was successful
  success: boolean;

  //Transaction ID
  transactionId: string;

  //Mandate ID
  mandateId: string;

  //Payment status
  paymentStatus: "SUCCESS" | "PENDING" | "FAILURE";

  //Amount charged
  amount: number;

  //PhonePe transaction ID
  phonepeTransactionId?: string;

  //Execution timestamp
  executedAt?: string;

  //Error details if execution failed
  error?: PhonePeError;

  //Response timestamp
  timestamp: string;
}

/**
 * Mandate pause parameters
 */
export interface MandatePauseParams {
  //Mandate ID to pause
  mandateId: string;

  //Reason for pausing
  reason?: string;

  /**
   * Resume date (ISO format)
   * @optional If not provided, remains paused indefinitely
   */
  resumeDate?: string;
}

/**
 * Mandate update parameters
 */
export interface MandateUpdateParams {
  //Mandate ID to update
  mandateId: string;

  //New maximum amount
  maxAmount?: number;

  //New end date
  endDate?: string;

  //Updated metadata
  metadata?: Record<string, any>;
}
