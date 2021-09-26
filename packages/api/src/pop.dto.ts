import { IsNumber, IsPositive, Max } from 'class-validator';

export class PopDto {
  @IsNumber()
  @IsPositive()
  @Max(800, { message: 'Sheesh, are you a human? Sus :P' })
  count: number;
}
