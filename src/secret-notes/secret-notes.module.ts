import { Module } from '@nestjs/common';
import { SecretNotesService } from './secret-notes.service';
import { SecretNotesController } from './secret-notes.controller';

@Module({
  controllers: [SecretNotesController],
  providers: [SecretNotesService]
})
export class SecretNotesModule {}
