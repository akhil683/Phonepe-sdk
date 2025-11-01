/**
 * Authentication Manager
 *
 * Handles OAuth token management, automatic refresh, and token caching.
 * Ensures that API calls always have a valid access token.
 */

import axios, { AxiosInstance } from "axios";
import {
  PhonePeAuthError,
  PhonePeError,
  createErrorFromResponse,
} from "../errors/PhonePeErrors";
import { CONTENT_TYPES } from "../constants/phonepe.constants";
import { PhonePeInternalConfig } from "../types/config.types";
import { Logger } from "../utils/logger";

//Token cache structure
interface TokenCache {
  token: string | null;
  expiry: number; //Timestamp when token expiresd
}

//Auth Manager class handles all Authentication operations
export class AuthManager {
  //In-memory token cache
  private tokenCache: TokenCache = {
    token: null,
    expiry: 0,
  };

  //HTTP client for auth requests
  private httpClient: AxiosInstance;

  /**
   * Create new AuthManager instance
   *
   * @param config - PhonePe configuration
   * @param logger - Logger instance
   */

  constructor(
    private config: PhonePeInternalConfig,
    private logger: Logger,
  ) {
    //Create dedicated HTTP client for auth requests
    this.httpClient = axios.create({
      timeout: config.timeout,
      headers: {
        "Content-Type": CONTENT_TYPES.FORM_URLENCODED,
        Accept: CONTENT_TYPES.JSON,
      },
    });
    this.logger.info("AuthManager initialized");
  }

  /**
   * Get valid access token
   * Returns cached token if valid, otherwise fetches new token
   *
   * @returns Valid access token
   * @throws PhonePeAuthError if authentication fails
   */
  async getAccessToken(): Promise<string> {
    //check if we have a cached token that's still valid
    if (this.tokenCache.token && Date.now() < this.tokenCache.expiry) {
      this.logger.debug("Using cached access token", {
        expiresIn: Math.floor((this.tokenCache.expiry - Date.now()) / 1000),
      });
      return this.tokenCache.token;
    }

    //Token expired or doesn't exist, fetch new one
    this.logger.info("Access token required or not found, fetching new token");
    return await this.refreshAccessToken();
  }

  /**
   * Fetch new access token from PhonePe OAuth endpoint
   *
   * @returns New access token
   * @throws PhonePeAuthError if authentication fails
   */
  private async refreshAccessToken(): Promise<string> {
    try {
      this.logger.info("Requesting new access token from PhonePe");

      //Build form data for OAuth request
      const formData = new URLSearchParams({
        clientId: this.config.clientId,
        client_version: this.config.clientVersion,
        client_secret: this.config.clientSecret,
        grant_type: "client_credentials",
      });

      //Make OAuth token request
      const response = await this.httpClient.post(
        this.config.authUrl,
        formData.toString(),
        {
          headers: {
            "Content-Type": CONTENT_TYPES.FORM_URLENCODED,
          },
        },
      );

      //Extract token and expiry from response
      const { access_token, expires_in } = response.data;

      if (!access_token) {
        throw new PhonePeAuthError(
          "No access token received from PhonePe",
          response.data,
        );
      }

      //Calculate token expiry time with Buffer
      //Buffer ensures we refresh token before it actually expires
      const expiryTime =
        Date.now() + expires_in * 1000 - this.config.tokenRefreshBuffer;

      //Cache the new token
      this.tokenCache = {
        token: access_token,
        expiry: expiryTime,
      };

      this.logger.info("Access token fetched successfully", {
        expiresIn: expires_in,
        expiresAt: new Date(expiryTime).toISOString(),
      });

      return access_token;
    } catch (error) {
      this.logger.error("Failed to fetch access token", error);

      //Convert to PhonePeAuthError if it's not already
      if (error instanceof PhonePeAuthError) {
        throw error;
      }
      throw createErrorFromResponse(
        error,
        "Failed to authenticate with PhonePe",
      );
    }
  }

  /**
   * Force refresh of access token
   * Useful for testing or when token needs to be refreshed immediately
   *
   * @returns New access token
   */
  async forceRefresh(): Promise<string> {
    this.logger.info("Forcing token refresh");
    this.clearCache();
    return await this.refreshAccessToken();
  }

  /**
   * Clear cached token
   * Useful for testing or manual token management
   */
  clearCache(): void {
    this.logger.debug("Clearing token cache");
    this.tokenCache = {
      token: null,
      expiry: 0,
    };
  }

  /**
   * Check if current token is valid
   *
   * @returns True if token exists and hasn't expired
   */
  hasValidToken(): boolean {
    return !!(this.tokenCache.token && Date.now() < this.tokenCache.expiry);
  }

  /**
   * Get time until token expiry in seconds
   *
   * @returns Seconds until expiry, or 0 if no valid token
   */
  getTimeUntilExpiry(): number {
    if (!this.hasValidToken()) {
      return 0;
    }
    return Math.floor((this.tokenCache.expiry - Date.now()) / 1000);
  }
}
