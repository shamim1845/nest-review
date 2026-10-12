import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Student extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ trim: true })
  email?: string;
}
export const StudentSchema = SchemaFactory.createForClass(Student);
