import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSecretNoteDto } from './dto/create-secret-note.dto';
import { SecretNote } from './schemas/secret-note.schema';
import { UpdateSecretNoteDto } from './dto/update-secret-note.dto';
import { EncryptionService } from 'src/encryption/encryption.service';

@Injectable()
export class SecretNotesService {
  constructor(
    @InjectModel(SecretNote.name) private readonly secretNoteModel: Model<SecretNote>, // Inject SecretNote model
    private readonly encryptionService: EncryptionService // Inject EncryptionService
  ) { }

  async create(createSecretNoteDto: CreateSecretNoteDto): Promise<SecretNote> {
    // Encrypt the note before saving it
    const encryptedNote = this.encryptionService.encrypt(createSecretNoteDto.note);

    // Create a new SecretNote document with the encrypted note
    const createdSecretNote = await this.secretNoteModel.create({
      ...createSecretNoteDto,
      note: encryptedNote, // Store the encrypted note
    });

    return createdSecretNote;
  }

  async getAll(): Promise<{ id: string; creationDate: Date }[]> {
    const notes = await this.secretNoteModel.find().exec();
    return notes.map(note => ({
      id: note.id,
      creationDate: note.creationDate,
    }));
  }

  // Method to retrieve a single note by ID and return the encrypted note
  async getEncryptedNoteById(id: string): Promise<{ id: string; note: string; creationDate: Date }> {
    const note = await this.secretNoteModel.findById(id).exec();

    // If the note is not found, throw a NotFoundException
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    return {
      id: note.id,
      note: note.note, // Return the encrypted note
      creationDate: note.creationDate, // Return the raw Date object
    };
  }

  // Method to retrieve a single note by ID and return the decrypted note
  async getDecryptedNoteById(id: string): Promise<{ id: string; note: string; creationDate: Date }> {
    const note = await this.secretNoteModel.findById(id).exec();

    // If the note is not found, throw a NotFoundException
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    return {
      id: note.id,
      note: this.encryptionService.decrypt(note.note), // Decrypt the note before returning
      creationDate: note.creationDate, // Return the raw Date object
    };
  }

  async update(id: string, updateSecretNoteDto: UpdateSecretNoteDto): Promise<SecretNote> {
    const updatedSecretNote = await this.secretNoteModel.findByIdAndUpdate(
      id,
      updateSecretNoteDto,
      { new: true } // This option returns the modified document
    ).exec();
    return updatedSecretNote;
  }

  async delete(id: string) {
    const deletedSecretNote = await this.secretNoteModel
      .findByIdAndDelete({ _id: id })
      .exec();
    return deletedSecretNote;
  }
}
