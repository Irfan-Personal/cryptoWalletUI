export interface AccessRefreshTokenResponse {
  data: AccessRefreshToken;
}
export interface AccessRefreshToken {
  accessToken: string;
  refreshToken: string;
}

export const ACCESS_REFRESH_TOKEN_API = 'auth/login';
