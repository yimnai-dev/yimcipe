export interface UProfile {
  profileId: string;
  userId: string;
  photo: any;
  fullName: string;
  occupation: string;
  status: 'VERIFIED' | 'UNVERIFIED';
}
