import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getMyEvents(userId: number) {
        return this.prisma.event.findMany({
            where: {
                OR: [
                    { organizerId: userId },
                    { participants: { some: { id: userId } } },
                ],
            },
            include: {
                organizer: { select: { id: true, name: true } },
                _count: { select: { participants: true } },
            },
            orderBy: { date: 'asc' },
        });
    }
}
