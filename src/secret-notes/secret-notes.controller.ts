import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SecretNotesService } from './secret-notes.service';
import { CreateSecretNoteDto } from './dto/create-secret-note.dto';
import { UpdateSecretNoteDto } from './dto/update-secret-note.dto';
import { SecretNote } from './schemas/secret-note.schema';

@Controller('secret-notes')
export class SecretNotesController {
  constructor(private readonly secretNotesService: SecretNotesService) {}

  @Post()
  public async create(@Body() createSecretNoteDto: CreateSecretNoteDto): Promise<{status: string, message : string }>{
    return this.secretNotesService.create(createSecretNoteDto);
  }

  @Get()
  public async getAll() {
    return this.secretNotesService.getAll();
  }

  @Get('encrypted/:id')
  public async getEncryptedNoteById(@Param('id') id: string): Promise<{ id: string; encryptedNote : SecretNote}> {
    return this.secretNotesService.getEncryptedNoteById(id);
  }

  @Get('decrypted/:id')
  public async getDecryptedNoteById(@Param('id') id: string): Promise<CreateSecretNoteDto> {
    return this.secretNotesService.getDecryptedNoteById(id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body('note') note: string): Promise<SecretNote>{
    return this.secretNotesService.update(id, note);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return this.secretNotesService.delete(id);
  }
}
