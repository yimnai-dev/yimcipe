export const profileImageIsValid = (file: Express.Multer.File): ImageValidResponse => {
    const validPaths = ['image/jpg', 'image/jpeg', 'image/png'] as const
    const maxFileSize = 200000;//Max file size is in bytes
    const isValid = validPaths.some((path: string) => path === file.mimetype)
    if(!isValid){
        return {
            valid: false,
            reason: 'INVALID FILE TYPE'
        }
    }
    if(file.size > maxFileSize){
        return {
            valid: false,
            reason: 'SIZE EXCEEDS MAXIMUM ALLOWED SIZE'
        }
    }
    return {
        valid: true,
        reason: 'PROFILE IMAGE UPLOAD SUCCESSFUL'
    }
}

type ImageValidResponse = {
    valid: boolean;
    reason: 'INVALID FILE TYPE' | 'SIZE EXCEEDS MAXIMUM ALLOWED SIZE' | 'PROFILE IMAGE UPLOAD SUCCESSFUL'
}