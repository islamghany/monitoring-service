import {
  IsAlphanumeric,
  IsEmail,
  Max,
  IsNumber,
  MinLength,
  IsNotEmpty,
  MaxLength,
  IsJWT,
} from "class-validator";

import { Transform } from "class-transformer";

export class IDParamDto {
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsNumber()
  id: number;
}

export class UserLoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class ToeknDto {
  @IsJWT()
  token: string;
}
export class UserRegisterDTO {
  @MinLength(4, {
    message: "name is too short",
  })
  @MaxLength(50, {
    message: "name is too long",
  })
  name: string;

  @IsEmail()
  email: string;

  @MinLength(4, {
    message: "password is too short",
  })
  @MaxLength(50, {
    message: "password is too long",
  })
  password: string;

  @MinLength(4, {
    message: "username is too short",
  })
  @MaxLength(50, {
    message: "username is too long",
  })
  @IsAlphanumeric(undefined, { message: "invlid username" })
  username: string;
}
