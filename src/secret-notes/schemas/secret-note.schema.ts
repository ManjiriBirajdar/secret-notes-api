import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SecretNoteDocument = HydratedDocument<SecretNote>;

@Schema()
export class SecretNote {
  @Prop({ required: true })
  note: string;

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  creationDate: Date;
}

export const SecretNoteSchema = SchemaFactory.createForClass(SecretNote);