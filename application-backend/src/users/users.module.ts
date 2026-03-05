import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [AuthModule],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {}
