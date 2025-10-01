import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

export type UserDocument = User & Document;

@ObjectType()
@Schema({ 
  timestamps: true,
  collection: 'users',
})
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ 
    required: true, 
    trim: true,
    maxlength: 100,
  })
  firstName: string;

  @Field()
  @Prop({ 
    required: true, 
    trim: true,
    maxlength: 100,
  })
  lastName: string;

  @Field()
  @Prop({ 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true,
    match: /^\S+@\S+\.\S+$/,
  })
  email: string;

  @Field({ nullable: true })
  @Prop({ 
    required: false,
    maxlength: 15,
  })
  phone?: string;

  @Field()
  @Prop({ 
    required: true,
    min: 1,
    max: 150,
  })
  age: number;

  @Field({ nullable: true })
  @Prop({ 
    required: false,
    enum: ['male', 'female', 'other'],
    lowercase: true,
  })
  gender?: string;

  @Field({ nullable: true })
  @Prop({ 
    required: false,
    maxlength: 500,
  })
  bio?: string;

  @Field()
  @Prop({ 
    default: true,
  })
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Create indexes for better query performance (email unique index is already created via @Prop decorator)
UserSchema.index({ firstName: 1, lastName: 1 });
UserSchema.index({ isActive: 1 });
UserSchema.index({ createdAt: -1 });