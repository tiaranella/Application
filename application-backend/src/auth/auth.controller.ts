import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { YupValidationPipe } from '../common/validation.pipe';
import { RegisterSchema } from './dto/register.dto';
import type { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  
  @Post('register')
  @UsePipes(new YupValidationPipe(RegisterSchema))
  async register(@Body() body: RegisterDto) {
    return {
      receivedData: body,
    };
  }
}
