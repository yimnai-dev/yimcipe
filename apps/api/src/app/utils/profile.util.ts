export interface UProfile {
    profileId: string;
    userId: string
    photo: Express.Multer.File;
    fullName: string;
    occupation: string;
    status: 'VERIFIED' | 'UNVERIFIED',
}
