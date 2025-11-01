/**
 * PhonePe Validator Utility
 *
 * This file contains validation functions for all input types
 * used in the PhonePe SDK. Each validator provides detailed
 * error messages and supports custom validation options.
 */

import { VALIDATION_RULES, ERROR_CODES } from "../constants/phonepe.constants";
import { PhonePeValidationError } from "../errors/PhonePeErrors";
import { ValidationOptions, ValidationResult } from "../types/validation.types";

/**
 * PhonePe Validator Class
 * Provides static methods for validating various input types
 */

export class PhonePeValidation {
  /**
   * Validate phone number
   *
   * @param phone - Phone number to validate
   * @param options - Validation options
   * @returns Validation result
   *
   * @example
   * ```typescript
   * const result = PhonePeValidator.validatePhone('9876543210');
   * if (!result.valid) {
   *   console.error(result.error);
   * }
   * ```
   */
  static validatePhone(
    phone: string,
    options: ValidationOptions = {},
  ): ValidationResult {
    // Check if empty and if empty if allowed
    if (!phone || phone.trim() === "") {
      if (options.allowEmpty) {
        return { valid: true, value: "" };
      }
      return {
        valid: false,
        error: options.messages?.required || "Phone number is required",
        field: "phone",
      };
    }
    // Remove any whitespace
    const cleanPhone = phone.trim().replace(/\s+/, "");

    //Check length
    if (cleanPhone.length !== VALIDATION_RULES.PHONE.LENGTH) {
      return {
        valid: false,
        error:
          options.messages?.invalid || VALIDATION_RULES.PHONE.ERROR_MESSAGE,
        field: "phone",
      };
    }

    //check pattern (must start with 6-9 and be all digits)
    if (!VALIDATION_RULES.PHONE.PATTERN.test(cleanPhone)) {
      return {
        valid: false,
        error:
          options.messages?.invalid || VALIDATION_RULES.PHONE.ERROR_MESSAGE,
        field: "phone",
      };
    }

    return { valid: true, value: cleanPhone };
  }

  /**
   * Validate email address
   *
   * @param email - Email to validate
   * @param options - Validation options
   * @returns Validation result
   */
  static validateEmail(
    email: string,
    options: ValidationOptions = {},
  ): ValidationResult {
    if (!email || email.trim() === "") {
      if (options.allowEmpty) {
        return { valid: true, value: "" };
      }
      return {
        valid: false,
        error: options.messages?.required || "Email is required",
        field: "email",
      };
    }

    const cleanEmail = email.trim().toLowerCase();

    //check length
    if (cleanEmail.length > VALIDATION_RULES.EMAIL.MAX_LENGTH) {
      return {
        valid: false,
        error: options.messages?.tooLong || "Email is too long",
        field: "email",
      };
    }

    //check pattern
    if (!VALIDATION_RULES.EMAIL.PATTERN.test(cleanEmail)) {
      return {
        valid: false,
        error:
          options.messages?.invalid || VALIDATION_RULES.EMAIL.ERROR_MESSAGE,
      };
    }

    return { valid: true, value: cleanEmail };
  }

  /**
   * Validate amount
   *
   * @param amount - Amount to validate (in INR)
   * @param options - Validation options
   * @returns Validation result
   */
  static validateAmount(
    amount: number,
    options: ValidationOptions = {},
  ): ValidationResult {
    if (amount === undefined || amount === null) {
      return {
        valid: false,
        error: options.messages?.required || "Amount is required",
        field: "amount",
      };
    }

    // Check if it's a valid number
    if (typeof amount !== "number" || isNaN(amount)) {
      return {
        valid: false,
        error: options.messages?.invalid || "Amount must be a valid number",
        field: "amount",
      };
    }

    // Check minimum
    if (amount < VALIDATION_RULES.AMOUNT.MIN) {
      return {
        valid: false,
        error:
          options.messages?.invalid || VALIDATION_RULES.AMOUNT.ERROR_MESSAGE,
        field: "amount",
      };
    }

    // Check maximum
    if (amount > VALIDATION_RULES.AMOUNT.MAX) {
      return {
        valid: false,
        error:
          options.messages?.invalid || VALIDATION_RULES.AMOUNT.ERROR_MESSAGE,
        field: "amount",
      };
    }

    // Round to 2 decimal places
    const roundedAmount = Math.round(amount * 100) / 100;

    return { valid: true, value: roundedAmount };
  }

  /**
   * Validate UPI ID
   *
   * @param upiId - UPI ID to validate
   * @param options - Validation options
   * @returns Validation result
   */
  static validateUpiId(
    upiId: string,
    options: ValidationOptions = {},
  ): ValidationResult {
    if (!upiId || upiId.trim() === "") {
      if (options.allowEmpty) {
        return { valid: true, value: "" };
      }
      return {
        valid: false,
        error: options.messages?.required || "UPI ID is required",
        field: "upiId",
      };
    }

    const cleanUpiId = upiId.trim().toLowerCase();

    // Check length
    if (cleanUpiId.length > VALIDATION_RULES.UPI_ID.MAX_LENGTH) {
      return {
        valid: false,
        error: options.messages?.tooLong || "UPI ID is too long",
        field: "upiId",
      };
    }

    // Check pattern
    if (!VALIDATION_RULES.UPI_ID.PATTERN.test(cleanUpiId)) {
      return {
        valid: false,
        error:
          options.messages?.invalid || VALIDATION_RULES.UPI_ID.ERROR_MESSAGE,
        field: "upiId",
      };
    }

    return { valid: true, value: cleanUpiId };
  }

  /**
   * Validate IFSC code
   *
   * @param ifscCode - IFSC code to validate
   * @param options - Validation options
   * @returns Validation result
   */
  static validateIfscCode(
    ifscCode: string,
    options: ValidationOptions = {},
  ): ValidationResult {
    if (!ifscCode || ifscCode.trim() === "") {
      if (options.allowEmpty) {
        return { valid: true, value: "" };
      }
      return {
        valid: false,
        error: options.messages?.required || "IFSC code is required",
        field: "ifscCode",
      };
    }

    const cleanIfsc = ifscCode.trim().toUpperCase();

    // Check length
    if (cleanIfsc.length !== VALIDATION_RULES.IFSC_CODE.LENGTH) {
      return {
        valid: false,
        error:
          options.messages?.invalid || VALIDATION_RULES.IFSC_CODE.ERROR_MESSAGE,
        field: "ifscCode",
      };
    }

    // Check pattern
    if (!VALIDATION_RULES.IFSC_CODE.PATTERN.test(cleanIfsc)) {
      return {
        valid: false,
        error:
          options.messages?.invalid || VALIDATION_RULES.IFSC_CODE.ERROR_MESSAGE,
        field: "ifscCode",
      };
    }

    return { valid: true, value: cleanIfsc };
  }

  /**
   * Validate bank account number
   *
   * @param accountNumber - Account number to validate
   * @param options - Validation options
   * @returns Validation result
   */
  static validateAccountNumber(
    accountNumber: string,
    options: ValidationOptions = {},
  ): ValidationResult {
    if (!accountNumber || accountNumber.trim() === "") {
      if (options.allowEmpty) {
        return { valid: true, value: "" };
      }
      return {
        valid: false,
        error: options.messages?.required || "Account number is required",
        field: "accountNumber",
      };
    }

    const cleanAccount = accountNumber.trim();

    // Check pattern (only digits)
    if (!VALIDATION_RULES.ACCOUNT_NUMBER.PATTERN.test(cleanAccount)) {
      return {
        valid: false,
        error:
          options.messages?.invalid ||
          VALIDATION_RULES.ACCOUNT_NUMBER.ERROR_MESSAGE,
        field: "accountNumber",
      };
    }

    // Check length
    if (
      cleanAccount.length < VALIDATION_RULES.ACCOUNT_NUMBER.MIN_LENGTH ||
      cleanAccount.length > VALIDATION_RULES.ACCOUNT_NUMBER.MAX_LENGTH
    ) {
      return {
        valid: false,
        error:
          options.messages?.invalid ||
          VALIDATION_RULES.ACCOUNT_NUMBER.ERROR_MESSAGE,
        field: "accountNumber",
      };
    }

    return { valid: true, value: cleanAccount };
  }

  /**
   * Validate merchant order ID
   *
   * @param orderId - Order ID to validate
   * @param options - Validation options
   * @returns Validation result
   */
  static validateMerchantOrderId(
    orderId: string,
    options: ValidationOptions = {},
  ): ValidationResult {
    if (!orderId || orderId.trim() === "") {
      if (options.allowEmpty) {
        return { valid: true, value: "" };
      }
      return {
        valid: false,
        error: options.messages?.required || "Merchant order ID is required",
        field: "merchantOrderId",
      };
    }

    const cleanOrderId = orderId.trim();

    // Check length
    if (cleanOrderId.length > VALIDATION_RULES.MERCHANT_ORDER_ID.MAX_LENGTH) {
      return {
        valid: false,
        error: options.messages?.tooLong || "Merchant order ID is too long",
        field: "merchantOrderId",
      };
    }

    // Check pattern (alphanumeric with hyphens and underscores)
    if (!VALIDATION_RULES.MERCHANT_ORDER_ID.PATTERN.test(cleanOrderId)) {
      return {
        valid: false,
        error:
          options.messages?.invalid ||
          VALIDATION_RULES.MERCHANT_ORDER_ID.ERROR_MESSAGE,
        field: "merchantOrderId",
      };
    }

    return { valid: true, value: cleanOrderId };
  }

  /**
   * Validate user ID
   *
   * @param userId - User ID to validate
   * @param options - Validation options
   * @returns Validation result
   */
  static validateUserId(
    userId: string,
    options: ValidationOptions = {},
  ): ValidationResult {
    if (!userId || userId.trim() === "") {
      if (options.allowEmpty) {
        return { valid: true, value: "" };
      }
      return {
        valid: false,
        error: options.messages?.required || "User ID is required",
        field: "userId",
      };
    }

    const cleanUserId = userId.trim();

    // Check length
    if (
      cleanUserId.length < VALIDATION_RULES.USER_ID.MIN_LENGTH ||
      cleanUserId.length > VALIDATION_RULES.USER_ID.MAX_LENGTH
    ) {
      return {
        valid: false,
        error:
          options.messages?.invalid || VALIDATION_RULES.USER_ID.ERROR_MESSAGE,
        field: "userId",
      };
    }

    return { valid: true, value: cleanUserId };
  }

  /**
   * Validate ISO date string
   *
   * @param date - Date string to validate
   * @param fieldName - Name of the field being validated
   * @param options - Validation options
   * @returns Validation result
   */
  static validateDate(
    date: string,
    fieldName: string = "date",
    options: ValidationOptions = {},
  ): ValidationResult {
    if (!date || date.trim() === "") {
      if (options.allowEmpty) {
        return { valid: true, value: "" };
      }
      return {
        valid: false,
        error: options.messages?.required || `${fieldName} is required`,
        field: fieldName,
      };
    }

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return {
        valid: false,
        error: options.messages?.invalid || `Invalid ${fieldName} format`,
        field: fieldName,
      };
    }

    return { valid: true, value: date };
  }

  /**
   * Validate required field
   *
   * @param value - Value to check
   * @param fieldName - Name of the field
   * @param options - Validation options
   * @returns Validation result
   */
  static validateRequired(
    value: any,
    fieldName: string,
    options: ValidationOptions = {},
  ): ValidationResult {
    if (value === undefined || value === null || value === "") {
      return {
        valid: false,
        error: options.messages?.required || `${fieldName} is required`,
        field: fieldName,
      };
    }

    return { valid: true, value };
  }

  /**
   * Throw validation error if validation fails
   * Helper method to simplify validation in code
   *
   * @param result - Validation result
   * @throws PhonePeValidationError if validation fails
   */
  static throwIfInvalid(result: ValidationResult): void {
    if (!result.valid) {
      throw new PhonePeValidationError(
        result.error || "Validation failed",
        result.field,
      );
    }
  }

  /**
   * Validate multiple fields at once
   *
   * @param validations - Array of validation results
   * @returns Combined validation result
   * @throws PhonePeValidationError with all errors if any validation fails
   */
  static validateAll(validations: ValidationResult[]): ValidationResult {
    const errors: string[] = [];
    const fields: string[] = [];

    for (const validation of validations) {
      if (!validation.valid) {
        if (validation.error) errors.push(validation.error);
        if (validation.field) fields.push(validation.field);
      }
    }

    if (errors.length > 0) {
      return {
        valid: false,
        error: errors.join("; "),
        field: fields.join(", "),
      };
    }

    return { valid: true };
  }
}
