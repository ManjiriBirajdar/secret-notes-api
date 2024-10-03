import { PartialType } from '@nestjs/mapped-types';
import { CreateSecretNoteDto } from './create-secret-note.dto';

export class UpdateSecretNoteDto extends PartialType(CreateSecretNoteDto) {}
