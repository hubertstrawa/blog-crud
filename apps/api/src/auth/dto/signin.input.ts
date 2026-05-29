import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class SignInInput {
  @Field()
  email: string;

  @Field()
  @IsString()
  @MinLength(1) // to block request (google login has empty string as password)
  password: string;
}
