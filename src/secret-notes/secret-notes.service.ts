import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSecretNoteDto } from './dto/create-secret-note.dto';
import { SecretNote } from './schemas/secret-note.schema';
import { UpdateSecretNoteDto } from './dto/update-secret-note.dto';

@Injectable()
export class SecretNotesService {
  constructor(@InjectModel(SecretNote.name) private readonly secretNoteModel: Model<SecretNote>) {}

  async create(createSecretNoteDto: CreateSecretNoteDto): Promise<SecretNote> {
    const createdSecretNote = await this.secretNoteModel.create(createSecretNoteDto);
    return createdSecretNote;

     
//   // private readonly iv = crypto.randomBytes(16);  // 16 bytes for the The initialization vector (IV)
//   // private readonly encryptionKey = crypto.randomBytes(32); // 256-bit key (32 bytes)

//   async create(@Body() createSecretNoteDto: CreateSecretNoteDto) {
    
//     // const { note, id } = createSecretNoteDto;

//     // // Encrypt the note
//     // const encryptedNote = this.encryptionService.encrypt(note);

//     // // Create a new secret note object
//     // const createdNote = new this.secretNoteModel({
//     //   _id: id ?? undefined, // If id is provided, use it; otherwise let MongoDB auto-generate
//     //   encryptedNote,
//     //   createdAt: new Date(),
//     // });

//     // return await createdNote.save(); // Save to MongoDB
//     return `This action returns all secretNotes`;
//   }
  }

  async findAll(): Promise<SecretNote[]> {
    return this.secretNoteModel.find().exec();
  }

  async findOne(id: string): Promise<SecretNote> {
    return this.secretNoteModel.findOne({ _id: id }).exec();
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
