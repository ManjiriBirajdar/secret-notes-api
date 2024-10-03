import { Test, TestingModule } from '@nestjs/testing';
import { SecretNotesService } from './secret-notes.service';

describe('SecretNotesService', () => {
  let service: SecretNotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecretNotesService],
    }).compile();

    service = module.get<SecretNotesService>(SecretNotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
