interface RecoveryPhoneNumber {
  id: string;
  isPasskeyRegistered: boolean;
  turnkeyWalletAddress: string;
  turnKeySubOrgId: string;
  email: string;
}

interface UserProfileResponse {
  data: RecoveryPhoneNumber;
}

interface UserProfileRequest {}
