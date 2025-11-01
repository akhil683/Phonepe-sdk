/**
 * Validation Type Definitions
 *
 * This file contains validation-related type definitions
 * for input validation and VPA verification.
 */

//Validation options
export interface ValidationOptions {
  strict?: boolean;
  allowEmpty?: boolean;
  messages?: {
    required?: string;
    invalid?: string;
    tooShort?: string;
    tooLong?: string;
  };
}

//Validation result
export interface ValidationResult {
  valid: boolean;
  error?: string;
  field?: string;
  value?: any;
}

//VPA (Virtual Payment Address) validation response
export interface VPAValidationResponse {
  success: boolean;
  vpa: string;
  isValid: boolean;
  accountHolderName?: string;
  bankName?: string;
  error?: string;
  timestamp: string;
}

//Bank account validation parameters
export interface BankAccountValidationParams {
  accountNumber: string;
  ifscCode: string;
  accountHolderName?: string;
}

//Bank account validation response
export interface BankAccountValidationResponse {
  success: boolean;
  isValid: boolean;
  accountHolderName?: string;
  bankName?: string;
  branchName?: string;
  nameMatch?: boolean;
  error?: string;
  timestamp: string;
}
