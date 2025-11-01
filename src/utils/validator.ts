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
}
