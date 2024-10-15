import { IsNotEmpty, IsString } from 'class-validator';
import { CryptoDto } from 'src/encryption/dto/crypto.dto';

export class UpdateSecretNoteDto {
  
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  note: CryptoDto;

  @IsNotEmpty()
  updatedAt: Date;
}