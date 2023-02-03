import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ProfileDto {
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: 'Yimnai Nerus Zaumu',
    })
    fullName: string

    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: 'Student'
    })
    occupation: string

    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: 'uuid V4'
    })
    userId: string

}

export default ProfileDto