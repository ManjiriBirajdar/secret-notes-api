import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly key = crypto.randomBytes(32);
  private readonly iv = crypto.randomBytes(16); // Initialization vector

  /**
   * Encrypts the note field in SecretNote
   * @param note The note to encrypt
   * @returns Encrypted string
   */
  encrypt(note: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(note, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return `${this.iv.toString('base64')}:${encrypted}`; ;
  }

  /**
    * Decrypts the encrypted note
    * @param encryptedData The encrypted note with IV
    * @returns Decrypted string (original note)
    */
  decrypt(encryptedData: string): string {
    const [ivHex, encryptedNote] = encryptedData.split(':');
    const iv = Buffer.from(ivHex, 'base64');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    let decrypted = decipher.update(encryptedNote, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}