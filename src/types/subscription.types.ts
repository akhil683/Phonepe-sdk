/**
 * Subscription Type Definitions
 *
 * This file contains all subscription-related type definitions
 * for recurring payments and subscription management.
 */

import { PhonePeError } from "../errors/PhonePeErrors";

//Subscription frequency types
export type SubscriptionFrequency =
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | "QUARTERLY"
  | "YEARLY"
  | "CUSTOM";

//Subscription status types
export type SubscriptionStatus =
  | "ACTIVE"
  | "PAUSED"
  | "CANCELLED"
  | "EXPIRED"
  | "PENDING";

//Subscription creation parameters
export interface SubscriptionCreateParams {
  userId: string;
  phone: string;
  amount: number;
  frequency: SubscriptionFrequency;
  startDate: string;
  endDate?: string;
  subscriptionId?: string;
  description?: string;
  email?: string;
  customerName?: string;
  maxCycles?: number;
  trialPeriodDays?: number;
  callbackUrl?: string;
  metadata?: Record<string, any>;
  autoRetry?: boolean;
  retryAttempts?: number;
  sendNotifications?: boolean;
}

//Subscription creation response
export interface SubscriptionCreateResponse {
  success: boolean;
  subscriptionId: string;
  mandateId?: string;
  status: SubscriptionStatus;
  nextBillingDate?: string;
  approvalUrl?: string;
  sdkPayload?: string;
  error?: PhonePeError;
  timestamp: string;
}

//Subscription status response
export interface SubscriptionStatusResponse {
  success: boolean;
  subscriptionId: string;
  status: SubscriptionStatus;
  userId: string;
  amount: number;
  frequency: SubscriptionFrequency;
  startDate: string;
  endDate?: string;
  nextBillingDate?: string;
  lastBillingDate?: string;
  cyclesCompleted: number;
  maxCycles?: number;
  failedAttempts?: number;
  totalAmountPaid?: number;
  recentTransactions?: Array<{
    transactionId: string;
    amount: number;
    status: string;
    timestamp: string;
  }>;
  metadata?: Record<string, any>;
  error?: PhonePeError;
  timestamp: string;
}

//Subscription cancellation response
export interface SubscriptionCancelResponse {
  success: boolean;
  subscriptionId: string;
  status: "CANCELLED" | "PENDING_CANCELLATION";
  cancellationDate: string;
  refundAmount?: number;
  error?: PhonePeError;
  timestamp: string;
}

//Subscription pause parameters
export interface SubscriptionPauseParams {
  subscriptionId: string;
  reason?: string;
  resumeDate?: string;
}

//Subscription update parameters
export interface SubscriptionUpdateParams {
  subscriptionId: string;
  amount?: number;
  frequency?: SubscriptionFrequency;
  endDate?: string;
  metadata?: Record<string, any>;
}
