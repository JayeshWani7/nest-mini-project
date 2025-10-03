import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsNumber, Min, Max, MaxLength, IsIn } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  firstName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  lastName: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(15)
  phone?: string;

  @Field()
  @IsNumber()
  @Min(1)
  @Max(150)
  age: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsIn(['male', 'female', 'other'])
  gender?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string;
}