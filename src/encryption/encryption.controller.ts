// encryption.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { EncryptionService } from './encryption.service';
import { CryptoDto } from './dto/crypto.dto';

@Controller('encryption')
export class EncryptionController {
  constructor(private readonly encryptionService: EncryptionService) {}

  @Post('encrypt')
  encrypt(@Body('note') note: string) : Promise<CryptoDto> {
    return this.encryptionService.encrypt(note);
  }

  @Post('decrypt')
  decrypt(@Body('note') encryptedNote: CryptoDto): Promise<string> {
    return this.encryptionService.decrypt(encryptedNote);
  }
}
