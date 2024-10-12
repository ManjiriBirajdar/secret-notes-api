import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSecretNoteDto {
  
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  note?: string;

  @IsNotEmpty()
  updatedAt: Date;
}