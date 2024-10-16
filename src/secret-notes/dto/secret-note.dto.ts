import { IsString, IsNotEmpty } from 'class-validator';
import { CryptoDto } from '../../encryption/dto/crypto.dto';

export class SecretNoteDto {
  
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  note: CryptoDto;

  @IsNotEmpty()
  creationDate?: Date;

  @IsNotEmpty()
  updatedAt: Date;
}