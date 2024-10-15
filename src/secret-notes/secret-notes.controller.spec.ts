import { Test, TestingModule } from '@nestjs/testing';
import { SecretNotesController } from './secret-notes.controller';
import { SecretNotesService } from './secret-notes.service';
import { EncryptionService } from '../encryption/encryption.service';
import { getModelToken } from '@nestjs/mongoose';
import { SecretNote } from './schemas/secret-note.schema';
import { CreateSecretNoteDto } from 'src/secret-notes/dto/create-secret-note.dto';
import { UpdateSecretNoteDto } from 'src/secret-notes/dto/update-secret-note.dto';

describe('SecretNotesController', () => {
  let controller: SecretNotesController;
  let secretNotesService: SecretNotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecretNotesController],
      providers: [
        SecretNotesService,
        EncryptionService,
        {
          provide: getModelToken(SecretNote.name),
          useValue: {}, // Mock the model
        },
      ],
    }).compile();

    controller = module.get<SecretNotesController>(SecretNotesController);
    secretNotesService = module.get<SecretNotesService>(SecretNotesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a secret note', async () => {
      const createDto: CreateSecretNoteDto = {
        id: '1',
        note: 'Test note',
        creationDate: new Date(),
        updatedAt: null
      };
      const result = { status: 'Accepted', message: 'Secret Note created successfully with Id 1' };
      jest.spyOn(secretNotesService, 'create').mockResolvedValue(result);

      expect(await controller.create(createDto)).toBe(result);
    });
  });

  // describe('getAll', () => {
  //   it('should return all secret notes', async () => {
  //     const result = [{ id: '1', note: 'Encrypted note', creationDate: new Date(), updatedAt: null }];
  //     jest.spyOn(secretNotesService, 'getAll').mockResolvedValue(result);

  //     expect(await controller.getAll()).toBe(result);
  //   });
  // });

  // describe('getEncryptedNoteById', () => {
  //   it('should return an encrypted note by id', async () => {
  //     const id = '1';
  //     const result = { id, encryptedNote: { note: 'Encrypted note', creationDate: new Date(), updatedAt: null } };
  //     jest.spyOn(secretNotesService, 'getEncryptedNoteById').mockResolvedValue(result);

  //     expect(await controller.getEncryptedNoteById(id)).toBe(result);
  //   });
  // });

  // describe('getDecryptedNoteById', () => {
  //   it('should return a decrypted note by id', async () => {
  //     const id = '1';
  //     const result = { id, secretNote: { note: 'Decrypted note', creationDate: new Date(), updatedAt: null } };
  //     jest.spyOn(secretNotesService, 'getDecryptedNoteById').mockResolvedValue(result);

  //     expect(await controller.getDecryptedNoteById(id)).toBe(result);
  //   });
  // });

  // describe('update', () => {
  //   it('should update a secret note', async () => {
  //     const id = '1';
  //     const updateDto: UpdateSecretNoteDto = {
  //       id: '1',
  //       note: 'Updated note',  // New note content
  //       updatedAt: new Date()  // Current timestamp for the update
  //     };
  //     // Create a mock result that reflects the structure of a SecretNote
  //     const result: SecretNote = {
  //       note: 'Updated note',
  //       creationDate: new Date(),  // This should be the original creation date
  //       updatedAt: new Date()  // Updated timestamp
  //     };
  //     jest.spyOn(secretNotesService, 'update').mockResolvedValue(result);

  //     expect(await controller.update(id, updateDto)).toBe(result);
  //   });
  // });

  describe('delete', () => {
    it('should delete a secret note', async () => {
      const id = '1';
      const result = "Note with id : " + id + " has been deleted successfully!";
      jest.spyOn(secretNotesService, 'delete').mockResolvedValue(result);

      expect(await controller.delete(id)).toBe(result);
    });
  });
});
