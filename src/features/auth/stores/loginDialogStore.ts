import { create } from 'zustand';

interface LoginDialogOptions {
  onSuccess?: () => void;
}

type LoginStep = 'phone' | 'otp';

interface LoginDialogState {
  // State
  isOpen: boolean;
  currentStep: LoginStep;
  phone: string;
  fullName: string;
  referralCode: string;
  onSuccessCallback: (() => void) | null;

  // Actions
  open: (options?: LoginDialogOptions) => void;
  close: () => void;
  setStep: (step: LoginStep) => void;
  setPhone: (phone: string) => void;
  setFullName: (fullName: string) => void;
  setReferralCode: (code: string) => void;
  executeOnSuccess: () => void;
  reset: () => void;
}

export const useLoginDialogStore = create<LoginDialogState>((set, get) => ({
  // Initial state
  isOpen: false,
  currentStep: 'phone',
  phone: '',
  fullName: '',
  referralCode: '',
  onSuccessCallback: null,

  // Actions
  open: (options) => {
    set({
      isOpen: true,
      currentStep: 'phone',
      onSuccessCallback: options?.onSuccess || null,
    });
  },

  close: () => {
    const { reset } = get();
    reset();
  },

  setStep: (step) => {
    set({ currentStep: step });
  },

  setPhone: (phone) => {
    set({ phone });
  },

  setFullName: (fullName) => {
    set({ fullName });
  },

  setReferralCode: (code) => {
    set({ referralCode: code });
  },

  executeOnSuccess: () => {
    const { onSuccessCallback, close } = get();
    if (onSuccessCallback) {
      onSuccessCallback();
    }
    close();
  },

  reset: () => {
    set({
      isOpen: false,
      currentStep: 'phone',
      phone: '',
      fullName: '',
      referralCode: '',
      onSuccessCallback: null,
    });
  },
}));
