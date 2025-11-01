/**
 * Logger Utility
 *
 * Provides structured logging with different log levels.
 * Supports custom logger functions for integration with existing logging systems.
 */
import { PhonePeInternalConfig } from "../types/config.types";

//Log Levels
export enum LogLevel {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

//Logger class for structured logging
export class Logger {
  constructor(private config: PhonePeInternalConfig) {}

  /**
   * Log debug message
   * Only logs if debug mode is enabled
   *
   * @param message - Log message
   * @param data - Optional data object
   */
  debug(message: string, data?: any): void {
    if (this.config.debug) {
      this.log(LogLevel.DEBUG, message, data);
    }
  }

  /**
   * Log info message
   *
   * @param message - Log message
   * @param data - Optional data object
   */
  info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data);
  }

  /**
   * Log warning message
   *
   * @param message - Log message
   * @param data - Optional data object
   */
  warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, message, data);
  }

  /**
   * Log error message
   *
   * @param message - Log message
   * @param data - Optional data object (usually error object)
   */
  error(message: string, data?: any): void {
    this.log(LogLevel.ERROR, message, data);
  }

  /**
   * Internal log method
   * Uses custom logger if provided, otherwise uses console
   *
   * @param level - Log level
   * @param message - Log message
   * @param data - Optional data object
   */
  private log(level: LogLevel, message: string, data?: any): void {
    //Use custom logger if provided
    if (this.config.logger) {
      this.config.logger(level, message, data);
      return;
    }
    //Default console logging with structured format
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [PhonePe SDK] [${level.toUpperCase()}]`;
    if (data) {
      //If data is an error object, log it properly
      if (data instanceof Error) {
        console.log(`${prefix} ${message}`);
        console.error(data);
      } else {
        console.log(`${prefix} ${message}`, data);
      }
    } else {
      console.log(`${prefix} ${message}`);
    }
  }

  /**
   * Log HTTP request
   *
   * @param method - HTTP method
   * @param url - Request URL
   * @param data - Request data
   */
  logRequest(method: string, url: string, data?: any): void {
    this.debug(`HTTP ${method} ${url}`, data);
  }

  /**
   * Log HTTP response
   *
   * @param method - HTTP method
   * @param url - Request URL
   * @param status - Response status code
   * @param data - Request data
   */
  logResponse(method: string, url: string, status: number, data?: any): void {
    this.debug(`HTTP ${method} ${url} - ${status}`, data);
  }
}
