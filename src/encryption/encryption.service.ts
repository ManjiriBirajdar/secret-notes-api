import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { CryptoDto } from './dto/crypto.dto';

/**
 * Encryption Service
 * . Which algorithm to use? AES-256
 * . Which encryption mode to use? 
 * CBC 
 *  - older mode
 *  - no built-in authentication
 * 
 * GCM (CTR + authentication)
 *  - Faster
 *  - built-in authentication
 *  - free implementation
 *  - many use it e.g. OpenSSL, Crypto++
 */

@Injectable()
export class EncryptionService {

  private readonly algorithm = 'aes-256-gcm';
  private readonly password = "strongpassword";
  private readonly key = randomBytes(32).toString('base64');

   // Encrypt function
   async encrypt(textToEncrypt: string): Promise<CryptoDto> {
    try {
      const iv = randomBytes(12).toString('base64');
      const cipher = createCipheriv(this.algorithm, Buffer.from(this.key, 'base64'), Buffer.from(iv, 'base64'));  
      let ciphertext = cipher.update(textToEncrypt, 'utf8', 'base64');
      ciphertext += cipher.final('base64');      
      const tag = cipher.getAuthTag().toString("base64");      
      const encryptedNote : CryptoDto = { 
        note : ciphertext, 
        tag : tag,
        iv: iv
      };

      return encryptedNote;

    } catch (error) {
      throw new Error(`Encryption failed: ${error.message}`);
    }
  }

  // Decrypt function
  async decrypt(encryptedNote: CryptoDto): Promise<string> {
    try {
        const decipher = createDecipheriv(this.algorithm, Buffer.from(this.key, 'base64'), Buffer.from(encryptedNote.iv, 'base64'));     
        decipher.setAuthTag(Buffer.from(encryptedNote.tag.toString(), 'base64'));
        let decryptedText = decipher.update(encryptedNote.note, 'base64', 'utf8');
        decryptedText += decipher.final('utf8');
        
        return decryptedText;
    } catch (error) {
      throw new Error(`Decryption failed: ${error.message}`);
    }
  }
}