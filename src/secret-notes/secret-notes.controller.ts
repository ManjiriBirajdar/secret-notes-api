import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SecretNotesService } from './secret-notes.service';
import { CreateSecretNoteDto } from './dto/create-secret-note.dto';
import { UpdateSecretNoteDto } from './dto/update-secret-note.dto';
import { SecretNote } from './schemas/secret-note.schema';

@Controller('secret-notes')
export class SecretNotesController {
  constructor(private readonly secretNotesService: SecretNotesService) {}

  @Post()
  create(@Body() createSecretNoteDto: CreateSecretNoteDto) {
    return this.secretNotesService.create(createSecretNoteDto);
  }

  @Get()
  findAll() {
    return this.secretNotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SecretNote> {
    return this.secretNotesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSecretNoteDto: UpdateSecretNoteDto) {
    return this.secretNotesService.update(id, updateSecretNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.secretNotesService.delete(id);
  }
}
