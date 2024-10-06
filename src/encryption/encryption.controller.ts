// encryption.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { EncryptionService } from './encryption.service';

@Controller('encryption')
export class EncryptionController {
  constructor(private readonly encryptionService: EncryptionService) {}

  @Post('encrypt')
  encrypt(@Body('note') note: string): string {
    return this.encryptionService.encrypt(note);
  }

  @Post('decrypt')
  decrypt(@Body('note') encryptedNote: string): string {
    return this.encryptionService.decrypt(encryptedNote);
  }
}
