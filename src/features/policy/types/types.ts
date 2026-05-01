export enum PolicyTypeEnum {
  PRIVACY_POLICY = "PRIVACY_POLICY",
  TERMS_AND_CONDITIONS = "TERMS_AND_CONDITIONS",
}

export interface Policy {
  id: string;
  type: PolicyTypeEnum;
  platform: string;
  title: string;
  content: string;
  version: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PolicyResponse {
  statusCode: number;
  message: string;
  data: Policy;
}
