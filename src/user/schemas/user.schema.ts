import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
import { Address } from "./address.schema";

@Schema({timestamps: true})
export class User extends Document {
    @Prop({required: true})
    name: string;

    @Prop({required: true, unique:true, })
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({type: Address})
    address: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);