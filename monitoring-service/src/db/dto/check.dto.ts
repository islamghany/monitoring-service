import {
  IsAlphanumeric,
  IsEmail,
  Max,
  IsNumber,
  MinLength,
  IsNotEmpty,
  MaxLength,
  IsJWT,
  isNotEmpty,
  IsUrl,
  isEnum,
  IsEnum,
  IsString,
  IsOptional,
  isNumber,
  isNumberString,
  IsPort,
  IsInt,
  IsObject,
  ValidateNested,
  IsArray,
  IsBoolean,
  IsPositive,
} from "class-validator";

import { Type } from "class-transformer";
import { ProtocolTypes } from "../../types/enums";

export class ListCheckParamsDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  tag: string;
}

class AuthDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(40)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(40)
  password: string;
}

class HttpHeadersDto {
  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  value: string;
}
class AssertDTO {
  @IsInt()
  code: number;
}
export class CreateCheckDto {
  @IsNotEmpty()
  name: string;

  @IsUrl()
  url: string;

  @IsEnum(ProtocolTypes, { message: "Invalid protocol" })
  protocol: ProtocolTypes;

  @IsOptional()
  @IsString()
  path: string;

  @IsOptional()
  @IsNumber()
  port: number;

  @IsOptional()
  @IsUrl()
  webhook: string;

  @IsOptional()
  @IsPositive()
  @IsInt()
  timeout: number;

  @IsOptional()
  @IsPositive()
  @IsInt()
  @Max(518400) // 1 year
  interval: number;

  @IsOptional()
  @IsPositive()
  @IsInt()
  threshold: number;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => AuthDTO)
  authentication: AuthDTO;

  @IsOptional()
  @IsArray()
  httpHeaders: Record<string, string>[];

  @IsOptional()
  @IsObject()
  @Type(() => AssertDTO)
  asserts: AssertDTO;

  @IsOptional()
  @IsArray()
  tags: string[];

  @IsOptional()
  @IsBoolean()
  ignoreSSL: boolean;
}
