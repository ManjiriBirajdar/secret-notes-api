import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SecretNotesService } from './secret-notes.service';
import { SecretNotesController } from './secret-notes.controller';
import { SecretNote, SecretNoteSchema } from './schemas/secret-note.schema';
import { EncryptionModule } from 'src/encryption/encryption.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SecretNote.name, schema: SecretNoteSchema }]), // Import SecretNote schema
    EncryptionModule, // Import the EncryptionModule
  ],
  providers: [SecretNotesService],
  controllers: [SecretNotesController], 
})
export class SecretNotesModule {}
