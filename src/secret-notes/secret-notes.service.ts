import { Injectable } from '@nestjs/common';
import { CreateSecretNoteDto } from './dto/create-secret-note.dto';
import { UpdateSecretNoteDto } from './dto/update-secret-note.dto';

@Injectable()
export class SecretNotesService {
  create(createSecretNoteDto: CreateSecretNoteDto) {
    return 'This action adds a new secretNote';
  }

  findAll() {
    return `This action returns all secretNotes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} secretNote`;
  }

  update(id: number, updateSecretNoteDto: UpdateSecretNoteDto) {
    return `This action updates a #${id} secretNote`;
  }

  remove(id: number) {
    return `This action removes a #${id} secretNote`;
  }
}
