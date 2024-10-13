import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSecretNoteDto } from './dto/create-secret-note.dto';
import { SecretNote } from './schemas/secret-note.schema';
import { UpdateSecretNoteDto } from './dto/update-secret-note.dto';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable()
export class SecretNotesService {
  constructor(
    @InjectModel(SecretNote.name) private readonly secretNoteModel: Model<SecretNote>, // Inject SecretNote model
    private readonly encryptionService: EncryptionService // Dependency Injecttion : EncryptionService
  ) { }

  async create(createSecretNoteDto: CreateSecretNoteDto): Promise<{ status: string, message : string }> {

    try {
      // Encrypt the note before saving it
      const encryptedNote = this.encryptionService.encrypt(createSecretNoteDto.note);

      // Create a new SecretNote document with the encrypted note
      const createdSecretNote = await this.secretNoteModel.create({
        ...createSecretNoteDto,
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
   * @param {string} id - The ID of the note to retrieve
   * @returns {Promise<SecretNote>} The encrypted note
   * @throws {NotFoundException} If the note is not found
   * @throws {HttpException} If there's an error retrieving the note
   */
  async getEncryptedNoteById(id: string): Promise<{ id: string; encryptedNote: SecretNote }> {
    try {
      const note = await this.secretNoteModel.findById(id).lean().exec();
      if (!note) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
      // Construct the secretNote object
      const encryptedNote: SecretNote = {
        note: note.note,           // Decrypted note content
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

  // Method to retrieve a single note by ID and return the decrypted note
  async getDecryptedNoteById(id: string): Promise<{ id: string; secretNote: SecretNote }> {

    try {
      const note = await this.secretNoteModel.findById(id).exec();

      // If the note is not found, throw a NotFoundException
      if (!note) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }

      // Decrypt the note before returning
      const decryptedNote = this.encryptionService.decrypt(note.note);

      // Construct the secretNote object
      const secretNote: SecretNote = {
        note: decryptedNote,           // Decrypted note content
        creationDate: note.creationDate,
        updatedAt: note.updatedAt
      };

      // Return the note ID and the secretNote object
      return {
        id: note.id,                  // Return the note ID
        secretNote                    // Return the decrypted note data with creationDate and updatedAt
      };
    } catch (error) {
      console.log(error);
      throw new Error('Error: get Decrypted Note By Id failed!')
    }
  }

  // Method to update a single note
  async update(id: string, updateSecretNoteDto: UpdateSecretNoteDto): Promise<SecretNote> {
    try {
      const note: string = updateSecretNoteDto.note;

      // Validate note presence and content
      if (!note.trim()) {
        throw new Error("Note cannot be empty."); // You can replace this with a more appropriate error handling approach
      }

      // Encrypt the note again and Overwrite the note with the encrypted value
      const encryptedNote = this.encryptionService.encrypt(note);
      updateSecretNoteDto.note = encryptedNote; 

      // Update the updatedAt field to the current date
      updateSecretNoteDto.updatedAt = new Date();

      const updatedSecretNote = await this.secretNoteModel.findByIdAndUpdate(
        id,
        updateSecretNoteDto,
        { new: true } // This option returns the modified document
      ).exec();
      return updatedSecretNote;
    } catch (error) {
      console.log(error);
      throw new Error('Error: updating (patching) secret note failed!')
    }
  }

   // Method to delete a single note
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
