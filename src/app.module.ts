import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SecretNotesModule } from './secret-notes/secret-notes.module';
import { EncryptionModule } from './encryption/encryption.module';
import { SecretNotesController } from './secret-notes/secret-notes.controller';
import { EncryptionController } from './encryption/encryption.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/secretnote'),
    SecretNotesModule,
    EncryptionModule,
  ],
  controllers:[SecretNotesController, EncryptionController],
})
export class AppModule {}
