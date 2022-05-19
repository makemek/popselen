import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
} from "class-validator";

export class PopDto {
  @IsNumber()
  @IsPositive()
  @Max(100, { message: "Sheesh, are you a human?" })
  count: number;

  @IsString()
  @IsNotEmpty()
  recaptcha: string;
}
