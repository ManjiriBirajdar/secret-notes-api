import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSecretNoteDto {
  
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  note: string;

  @IsNotEmpty()
  creationDate: Date;

  updatedAt: Date;
}