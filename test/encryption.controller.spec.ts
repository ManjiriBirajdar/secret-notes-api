import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionController } from 'src/encryption/encryption.controller';
import { EncryptionService } from 'src/encryption/encryption.service';

describe('EncryptionController', () => {
  let controller: EncryptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EncryptionController],
      providers: [EncryptionService],
    }).compile();

    controller = module.get<EncryptionController>(EncryptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
