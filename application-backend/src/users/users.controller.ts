import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('me/events')
    @UseGuards(JwtAuthGuard)
    async getMyEvents(@Request() req: any) {
        return this.userService.getMyEvents(req.user.sub);
    }
}
