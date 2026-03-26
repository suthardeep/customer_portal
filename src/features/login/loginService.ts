import { createServerFn } from '@tanstack/react-start';
import { setCookie } from '@tanstack/react-start/server';
import { apiRequest } from '@/utils/apiRequest';
import type { SendOtpRequest, SendOtpResponse, VerifyOtpRequest, VerifyOtpResponse, User, ValidateReferralRequest, ValidateReferralResponse } from './types/types';
import type { BaseApiResponse } from '@/types/baseApi.types';

export const sendOtp = createServerFn({ method: 'POST' })
  .inputValidator((data: SendOtpRequest) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<SendOtpResponse>> => {
    return apiRequest<BaseApiResponse<SendOtpResponse>>('/v1/auth/send-otp', {
      method: 'POST',
      body: data,
    });
  });

export const verifyOtp = createServerFn({ method: 'POST' })
  .inputValidator((data: VerifyOtpRequest) => data)
  .handler(async ({ data }): Promise<User> => {
    const result = await apiRequest<BaseApiResponse<VerifyOtpResponse>>('/v1/auth/verify-otp', {
      method: 'POST',
      body: data,
    });

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

export const validateReferral = createServerFn({ method: 'POST' })
  .inputValidator((data: ValidateReferralRequest) => data)
  .handler(async ({ data }): Promise<ValidateReferralResponse> => {
    return apiRequest<ValidateReferralResponse>('/v1/auth/referral/validate', {
      method: 'POST',
      body: data,
    });
  });
