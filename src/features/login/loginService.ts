import { createServerFn } from '@tanstack/react-start';
import { setCookie } from '@tanstack/react-start/server';
import { getApiBaseUrl, ApiError } from '@/utils/api';
import type { SendOtpRequest, SendOtpResponse, VerifyOtpRequest, VerifyOtpResponse, User } from './types/types';
import type { BaseApiResponse } from '@/types/baseApi.types';

export const sendOtp = createServerFn({ method: 'POST' })
  .inputValidator((data: SendOtpRequest) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<SendOtpResponse>> => {
    const apiBaseUrl = getApiBaseUrl();
    const url = `${apiBaseUrl}/v1/auth/send-otp`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `Failed to send OTP: ${response.statusText}`,
        response.status,
        errorData,
      );
    }

    return response.json();
  });

export const verifyOtp = createServerFn({ method: 'POST' })
  .inputValidator((data: VerifyOtpRequest) => data)
  .handler(async ({ data }): Promise<User> => {
    const apiBaseUrl = getApiBaseUrl();
    const url = `${apiBaseUrl}/v1/auth/verify-otp`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `Failed to verify OTP: ${response.statusText}`,
        response.status,
        errorData,
      );
    }

    const result: BaseApiResponse<VerifyOtpResponse> = await response.json();
    const { access_token, refresh_token, user } = result.data;

    setCookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    setCookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    return user;
  });
