/**
 * Settlement Type Definitions
 *
 * This file contains all settlement-related type definitions
 * for payment settlements and transaction reporting.
 */

import { PhonePeError } from "../errors/PhonePeErrors";

//Settlement status types
export type SettlementStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED";

//Settlement details response
export interface SettlementDetailsResponse {
  success: boolean;
  startDate: string;
  endDate: string;
  totalAmount: number;
  totalTransactions: number;
  successfulTransactions: number;
  failedTransactions: number;
  totalFees: number;
  totalTax: number;
  netSettlementAmount: number;
  byPaymentMethod?: Array<{
    method: string;
    amount: number;
    count: number;
    fees: number;
  }>;
  byDate?: Array<{
    date: string;
    amount: number;
    count: number;
    fees: number;
  }>;
  settlements?: Array<{
    settlementId: string;
    date: string;
    amount: number;
    status: SettlementStatus;
    utr?: string;
    bankAccount?: string;
  }>;
  error?: PhonePeError;
  timestamp: string;
}

//Settlement transaction response
export interface SettlementTransactionResponse {
  success: boolean;
  settlementId: string;
  status: SettlementStatus;
  settlementDate: string;
  amount: number;
  fees: number;
  tax: number;
  netAmount: number;
  bankAccount?: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
  };
  utr?: string;
  transactions?: Array<{
    transactionId: string;
    merchantOrderId: string;
    amount: number;
    fees: number;
    tax: number;
    netAmount: number;
    paymentMethod: string;
    transactionDate: string;
    status: string;
  }>;
  reportUrl?: string;
  error?: PhonePeError;
  timestamp: string;
}

//Settlement query parameters
export interface SettlementQueryParams {
  startDate: string;
  endDate: string;
  page?: number;
  pageSize?: number;
  status?: SettlementStatus;
  paymentMethod?: string;
}
