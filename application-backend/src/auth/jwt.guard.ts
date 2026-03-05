import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
        throw new UnauthorizedException();
    }
    
    try {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_PASS,
        });
        request['user'] = payload;
        return true;
    } catch (error) {
        throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers['authorization'];
    if (!authHeader) { 
      return undefined;
    }

    const token = authHeader.replace(/^Bearer\s+/i, '').replace(/['"]+/g, '').trim();

    if (!token) {
         return undefined;
    }

    return token;
  }
}
