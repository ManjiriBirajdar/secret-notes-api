import { Module } from '@nestjs/common';
import { EncryptionService } from './encryption.service';
import { EncryptionController } from './encryption.controller';

@Module({
  controllers: [EncryptionController],
  providers: [EncryptionService],
  exports: [EncryptionService], // Make sure to export the service
})
export class EncryptionModule {}
