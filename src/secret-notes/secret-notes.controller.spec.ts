import { Test, TestingModule } from '@nestjs/testing';
import { SecretNotesController } from './secret-notes.controller';
import { SecretNotesService } from './secret-notes.service';

describe('SecretNotesController', () => {
  let controller: SecretNotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecretNotesController],
      providers: [SecretNotesService],
    }).compile();

    controller = module.get<SecretNotesController>(SecretNotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
