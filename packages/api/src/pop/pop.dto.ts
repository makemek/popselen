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
  @Max(800, { message: "Sheesh, are you a human? Sus :P" })
  count: number;

  @IsString()
  @IsNotEmpty()
  recaptcha: string;
}
