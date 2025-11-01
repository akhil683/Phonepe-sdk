/**
 * Authentication Manager
 *
 * Handles OAuth token management, automatic refresh, and token caching.
 * Ensures that API calls always have a valid access token.
 */

import axios, { AxiosInstance } from "axios";
import {
  PhonePeAuthError,
  createErrorFromResponse,
} from "../errors/PhonePeErrors";
import { CONTENT_TYPES } from "../constants/phonepe.constants";

//Token cache structure
interface TokenCache {
  token: string | null;
  expiry: number; //Timestamp when token expiresd
}

export class AuthManager {}
