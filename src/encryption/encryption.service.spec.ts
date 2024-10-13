import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionService } from './encryption.service';

describe('EncryptionService', () => {
  let service: EncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptionService],
    }).compile();

    service = module.get<EncryptionService>(EncryptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('encrypt', () => {
  //   it('should encrypt the given text', async () => {
  //     const text = 'test text';
  //     const encryptedText = service.encrypt(text);
  //     expect(encryptedText).not.toEqual(text);
  //     expect(typeof encryptedText).toBe('string');
  //   });

  //   it('should produce different encrypted text for the same input', async () => {
  //     const text = 'test text';
  //     const encryptedText1 = service.encrypt(text);
  //     const encryptedText2 =  service.encrypt(text);
  //     expect(encryptedText1).not.toEqual(encryptedText2);
  //   });
  // });

  // describe('decrypt', () => {
  //   it('should decrypt the encrypted text back to the original text', async () => {
  //     const originalText = 'test text';
  //     const encryptedText =  service.encrypt(originalText);
  //     const decryptedText =  service.decrypt(encryptedText);
  //     expect(decryptedText).toEqual(originalText);
  //   });

  //   it('should throw an error for invalid encrypted text', async () => {
  //     const invalidEncryptedText = 'invalid encrypted text';
  //     expect(service.decrypt(invalidEncryptedText)).rejects.toThrow();
  //   });
  // });
});
