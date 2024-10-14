import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

/**
 * Encryption Service
 * 
 * 1. Add Key to environment file and use it here
 * 2. IV should be generated inside the function
 * 3. Which algorithm to use? AES-256
 * 4. Which encryption mode to use? 
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

   // Encrypt function
   async encrypt(textToEncrypt: string): Promise<string> {
    try {
      // Generate a random initialization vector (IV)
      const iv = randomBytes(12); // 12 bytes for GCM

      // Generate a key using the password and salt
      const key = (await promisify(scrypt)(this.password, 'salt', 32)) as Buffer;

      // Create the cipher using the algorithm, key, and IV
      const cipher = createCipheriv(this.algorithm, key, iv);

      // Encrypt the text
      const encryptedText = Buffer.concat([
        cipher.update(textToEncrypt, 'utf8'),
        cipher.final(),
      ]);

      // Get the authentication tag
      const authTag = cipher.getAuthTag();

      // Return the encrypted data in base64 format, including the IV and authTag
      return Buffer.concat([iv, encryptedText, authTag]).toString('base64');
    } catch (error) {
      throw new Error(`Encryption failed: ${error.message}`);
    }
  }

  // Decrypt function
  async decrypt(cipherText: string): Promise<string> {
    try {
      // Decode the base64 input to get the IV, encrypted data, and auth tag
      const data = Buffer.from(cipherText, 'base64');
      
      // The first 12 bytes are the IV (for AES-GCM)
      const iv = data.subarray(0, 12);
      
      // The last 16 bytes are the auth tag (for AES-GCM)
      const authTag = data.subarray(data.length - 16);
      
      // The rest of the bytes (from byte 12 to byte (length - 16)) are the encrypted text
      const encryptedText = data.subarray(12, data.length - 16);

      // Generate the key using the password and scrypt
      const key = (await promisify(scrypt)(this.password, 'salt', 32)) as Buffer;

      // Create the decipher
      const decipher = createDecipheriv(this.algorithm, key, iv);
      
      // Set the authentication tag
      decipher.setAuthTag(authTag);

      // Decrypt the text
      const decryptedText = Buffer.concat([
        decipher.update(encryptedText),
        decipher.final(),
      ]);

      // Return the decrypted text as UTF-8 string
      return decryptedText.toString('utf8');
    } catch (error) {
      throw new Error(`Decryption failed: ${error.message}`);
    }
  }
}