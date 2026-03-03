import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { YupValidationPipe } from '../common/validation.pipe';
import { AuthService } from './auth.service';
import { RegisterSchema } from './dto/register.dto';
import type { RegisterDto } from './dto/register.dto';
import type { LoginDto } from './dto/login.dto';
import { LoginSchema } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {} 
  
    @Post('register')
    @UsePipes(new YupValidationPipe(RegisterSchema))
        async register(@Body() body: RegisterDto) {
            return {
            receivedData: body,
            };
    }

    @Post('login')
    @UsePipes(new YupValidationPipe(LoginSchema))
    async login(@Body() body: LoginDto) {
        return this.authService.login(body);
    }
}
