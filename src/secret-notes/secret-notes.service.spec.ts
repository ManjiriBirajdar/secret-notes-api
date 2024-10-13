import { Test, TestingModule } from '@nestjs/testing';
import { SecretNotesService } from './secret-notes.service';
import { EncryptionService } from '../encryption/encryption.service';
import { getModelToken } from '@nestjs/mongoose';
import { SecretNote } from './schemas/secret-note.schema';

describe('SecretNotesService', () => {
  let service: SecretNotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecretNotesService,
        EncryptionService,
        {
          provide: getModelToken(SecretNote.name),
          useValue: {}, // Mock the model
        },
      ],
    }).compile();

    service = module.get<SecretNotesService>(SecretNotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
