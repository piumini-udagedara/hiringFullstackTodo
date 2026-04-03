/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from "../configs/appConfig";
import { getApiError } from "./_apiUtils";

const TIMEOUT = 30000;

class HttpService {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "Accept-Language": "en",
      "Content-Type": "application/json",
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ data: T }> {
    const url = `${this.baseURL}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
        signal: controller.signal,
        credentials: "include",
        referrerPolicy: "strict-origin-when-cross-origin",
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error: any = {
          response: {
            status: response.status,
            data: await this.parseResponse(response),
          },
        };
        throw {
          msg: getApiError(error),
          status: response.status,
        };
      }

      const data = await this.parseResponse<T>(response);
      return { data };
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error.name === "AbortError") {
        throw {
          msg: "Request timeout",
          status: 408,
        };
      }

      if (error.msg) {
        throw error;
      }

      throw {
        msg: getApiError(error),
        status: error.status || 500,
      };
    }
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    return (await response.text()) as T;
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<{ data: T }> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<{ data: T }> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<{ data: T }> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<{ data: T }> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<{ data: T }> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

const http = new HttpService(BASE_URL);

export { http };
