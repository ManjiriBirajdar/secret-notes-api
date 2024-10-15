import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CryptoDto } from 'src/encryption/dto/crypto.dto';

export type SecretNoteDocument = HydratedDocument<SecretNote>;

@Schema()
export class SecretNote {
  @Prop({ required: true })
  note: CryptoDto;

  @Prop({ default: Date.now() })
  creationDate: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const SecretNoteSchema = SchemaFactory.createForClass(SecretNote);