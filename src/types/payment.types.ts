/**
 * Payment Type Definitions
 *
 * This file contains all payment-related type definitions
 * including payment initialization, status, refunds, and methods.
 */

import { PhonePeError } from "../errors/PhonePeErrors";

//Payment method types supported by PhonePe
export type PaymentMethod =
  | "UPI"
  | "CARD"
  | "NET_BANKING"
  | "WALLET"
  | "EMI"
  | "PAY_LATER";

//Payment mode types
export type PaymentMode = "PAY_PAGE" | "INTENT" | "QR" | "IFRAME";

//Payment instrument types
export interface PaymentInstrument {
  type: PaymentMethod;
  vpa?: string;
  cardNumber?: string;
  cardType?: "CREDIT" | "DEBIT";
  bankCode?: string;
}

//Payment initialization parameters
export interface PaymentInitParams {
  phone: string;
  amount: number;
  userId: string;
  merchantOrderId?: string;
  expireAfter?: number;
  redirectUrl?: string;
  callbackUrl?: string;
  email?: string;
  customerName?: string;
  description?: string;
  metadata?: Record<string, any>;
  enabledMethods?: PaymentMethod[];
  paymentMode?: PaymentMode;
  deviceContext?: {
    ip?: string;
    userAgent?: string;
    deviceId?: string;
  };
}

export interface PaymentOrderResponse {
  success: boolean;
  sdkPayload: string;
  transactionId: string;
  token?: string;
  paymentUrl?: string;
  qrData?: string;
  intentUri?: string;
  error?: PhonePeError;
  timestamp: string;
}

//Payment status types
export type PaymentStatus =
  | "SUCCESS"
  | "FAILURE"
  | "PENDING"
  | "EXPIRED"
  | "CANCELLED"
  | "INITIATED";

//Payment status response
export interface PaymentStatusResponse {
  success: boolean;
  paymentStatus: PaymentStatus;
  transactionId: string;
  merchantOrderId?: string;
  amount?: number;
  phonepeTransactionId?: string;
  paymentMethod?: PaymentMethod;
  paymentInstrument?: PaymentInstrument;
  paymentTimestamp?: string;
  metadata?: Record<string, any>;
  failureReason?: string;
  failureCode?: string;
  error?: PhonePeError;
  timestamp: string;
}

//Payment refund parameters
export interface PaymentRefundParams {
  transactionId: string;
  amount: number;
  reason?: string;
  refundId?: string;
  metadata?: Record<string, any>;
}

//Refund status types
export type RefundStatus = "SUCCESS" | "FAILURE" | "PENDING" | "INITIATED";

//Payment refund response
export interface PaymentRefundResponse {
  success: boolean;
  refundId: string;
  transactionId: string;
  refundStatus: RefundStatus;
  amount?: number;
  phonepeRefundId?: string;
  refundTimestamp?: string;
  error?: PhonePeError;
  timestamp: string;
}

// Bulk payment parameters
export interface BulkPaymentParams {
  payments: PaymentInitParams[];
  batchId?: string;
}

//Bulk payment response
export interface BulkPaymentResponse {
  success: boolean;
  batchId: string;
  totalPayments: number;
  payments: PaymentOrderResponse[];
  error?: PhonePeError;
  timestamp: string;
}
