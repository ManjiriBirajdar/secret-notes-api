import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SecretNotesModule } from './secret-notes/secret-notes.module';
import { EncryptionModule } from './encryption/encryption.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/secretnote'),
    SecretNotesModule,
    EncryptionModule,
  ],
})
export class AppModule {}
