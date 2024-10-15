import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SecretNote } from './schemas/secret-note.schema';
import { EncryptionService } from '../encryption/encryption.service';
import { CryptoDto } from 'src/encryption/dto/crypto.dto';
import { SecretNoteDto } from './dto/secret-note.dto';

@Injectable()
export class SecretNotesService {
  constructor(
    @InjectModel(SecretNote.name) private readonly secretNoteModel: Model<SecretNote>, // Inject SecretNote model
    private readonly encryptionService: EncryptionService // Dependency Injecttion : EncryptionService
  ) { }

  /**
   * create an encrypted note
   */
  async create(note: string): Promise<{ status: string, message : string }> {
    try {
      // Encrypt the note before saving it
      const encryptedNote = await this.encryptionService.encrypt(note);

      // Create a new SecretNote document with the encrypted note
      const createdSecretNote = await this.secretNoteModel.create({
        note: encryptedNote, // Store the encrypted note
        creationDate: new Date(),
        updatedAt: null
      });
   
      return { status: 'Accepted', message: "Secret Note created successfully with Id "+createdSecretNote.id};
    } catch (error) {
      console.log(error);
      throw new Error('Error: creation of secret note failed!')
    }
  }

  /**
   * Get all the encrypted notes
   */
  async getAll(): Promise<SecretNote[]> {
    try {
      const notes = await this.secretNoteModel.find().exec();
      return notes;   
    } catch (error) {
      console.log(error);
      throw new Error('Error: getting all secret notes failed!')
    }
  }

  /**
   * Retrieves a single encrypted note by ID
   */
  async getEncryptedNoteById(id: string): Promise<{ id: string; encryptedNote: SecretNote }> {
    try {
      const note = await this.secretNoteModel.findById(id).lean().exec();
      if (!note) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
      // Construct the secretNote object
      const encryptedNote: SecretNote = {
        note: note.note,
        creationDate: note.creationDate,
        updatedAt: note.updatedAt
      };

      // Return the note ID and the secretNote object
      return {
        id: id,                         // Return the note ID
        encryptedNote                    // Return the decrypted note data with creationDate and updatedAt
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new HttpException(
        'Failed to retrieve encrypted note',
        HttpStatus.NOT_FOUND,
        { cause: error }
      );
    }
  }

  /**
   *  Get a single decrypted note by ID
   */
  async getDecryptedNoteById(id: string): Promise<SecretNoteDto> {

    try {
      const note = await this.secretNoteModel.findById(id).lean().exec();
      
      const encryptedNote : CryptoDto = { 
        note : note.note.note,
        iv: note.note.iv,
        tag: note.note.tag,
      };

      // Decrypt the note before returning
      const decryptedNote = await this.encryptionService.decrypt(encryptedNote);

      // Construct the secretNote object
      const secretNote: SecretNoteDto = {
        note: {
          note: decryptedNote,
          iv: note.note.iv,
          tag: note.note.tag
        }, 
        creationDate: note.creationDate,
        updatedAt: note.updatedAt,
        id: id
      };
      return secretNote;
    } catch (error) {
      console.log(error);
      throw new Error('Error: get Decrypted Note By Id failed!')
    }
  }

   /**
   * Update a single note by ID
   */
  async update(id: string, note: string): Promise<SecretNote> {
    try {
      const encryptedNote = await this.encryptionService.encrypt(note);

      const secretNote: SecretNoteDto = {
        id: id,
        note: encryptedNote,
        updatedAt: new Date()
      }

      const updatedSecretNote = await this.secretNoteModel.findByIdAndUpdate(
        id,
        secretNote,
        { new: true } // This option returns the modified document
      ).exec();
      return updatedSecretNote;
    } catch (error) {
      console.log(error);
      throw new Error('Error: updating (patching) secret note failed!')
    }
  }

  /**
   * Delete a single note by ID
   */
  async delete(id: string) : Promise<string>{
    try {
      const deletedSecretNote = await this.secretNoteModel
        .findByIdAndDelete({ _id: id })
        .exec();
      return "Note with id : " + id + " has been deleted successfully!";
    } catch (error) {
      console.log(error);
      throw new Error('Error: deleteting secret note failed!')
    }
  }
}
