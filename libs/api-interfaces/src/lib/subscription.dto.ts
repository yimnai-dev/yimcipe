import { ApiParam, ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class SubscriptionDto {

    subscriberId!: string
}

export default SubscriptionDto
