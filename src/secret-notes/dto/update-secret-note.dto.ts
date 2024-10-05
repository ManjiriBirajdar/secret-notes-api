import { PartialType } from '@nestjs/mapped-types';
import { CreateSecretNoteDto } from './create-secret-note.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSecretNoteDto {
  
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  note?: string;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  updatedAt?: Date;

}