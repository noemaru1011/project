export interface LoginResponse {
  token: string;
  role: string;
  passwordUpdateRequired: boolean;
}
