import { IsString, IsNotEmpty } from 'class-validator';
import { isDate } from 'validator';

export class CreateSecretNoteDto {
  
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  note: string;

  @IsNotEmpty()
  creationDate: Date;
}