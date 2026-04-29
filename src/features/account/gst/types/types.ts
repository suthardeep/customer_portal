export interface GstProfile {
  id: string;
  customerId: string;
  businessName: string;
  gstin: string;
  billingAddress: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateGstRequest = Pick<GstProfile, "businessName" | "gstin" | "billingAddress" | "isDefault">;
export type UpdateGstRequest = CreateGstRequest & { id: string };

// Keep for checkout compatibility
export type SaveGstFormData = CreateGstRequest;
export type SaveGstResponse = GstProfile;
