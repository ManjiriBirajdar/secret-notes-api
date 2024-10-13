import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionController } from './encryption.controller';
import { EncryptionService } from './encryption.service';

describe('EncryptionController', () => {
  let controller: EncryptionController;
  let encryptionService: EncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EncryptionController],
      providers: [
        {
          provide: EncryptionService,
          useValue: {
            encrypt: jest.fn(),
            decrypt: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EncryptionController>(EncryptionController);
    encryptionService = module.get<EncryptionService>(EncryptionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('encrypt', () => {
  //   it('should call encryptionService.encrypt and return the result', async () => {
  //     const text = 'test text';
  //     const encryptedText = 'encrypted text';
  //     (encryptionService.encrypt as jest.Mock).mockResolvedValue(encryptedText);

  //     const result =  controller.encrypt(text);

  //     expect(encryptionService.encrypt).toHaveBeenCalledWith(text);
  //     expect(result).not.toEqual(encryptedText);
  //   });
  // });

  // describe('decrypt', () => {
  //   it('should call encryptionService.decrypt and return the result', async () => {
  //     const encryptedText = 'encrypted text';
  //     const decryptedText = 'decrypted text';
  //     (encryptionService.decrypt as jest.Mock).mockResolvedValue(decryptedText);

  //     const result = controller.decrypt(encryptedText);

  //     expect(encryptionService.decrypt).toHaveBeenCalledWith(encryptedText);
  //     expect(result).not.toEqual({ decryptedText });
  //   });
  // });
});
