import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SecretNotesModule } from './secret-notes/secret-notes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/secretnote'),
    SecretNotesModule,
  ],
})
export class AppModule {}
