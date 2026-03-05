import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
    constructor(private prisma: PrismaService) {}

    async create(userId: number, dto: CreateEventDto) {
        return this.prisma.event.create({
            data: {
                ...dto,
                organizerId: userId,
            },
        });
    }

    async findAllPublic() {
        return this.prisma.event.findMany({
            where: { isPublic: true },
            include: {
                organizer: { select: { id: true, name: true } },
                _count: { select: {participants: true } },
            },
            orderBy: { date: 'asc' },
        });
    }

    async findOne(id: number) {
        const event = await this.prisma.event.findUnique({
            where: { id },
            include: {
                organizer: { select: { id: true, name: true } },
                participants: { select: { id: true, name: true } },
            },
        });

        if (!event) throw new NotFoundException();

        return event;
    }

    async update(id: number, userId: number, dto: UpdateEventDto) {
        const event = await this.findOne(id);

        if (event.organizerId !== userId) {
            throw new ForbiddenException();
        }

        return this.prisma.event.update({
            where: { id },
            data: dto,
        });
    }

    async remove(id: number, userId: number) {
        const event = await this.findOne(id);
    
        if (event.organizerId !== userId) {
            throw new ForbiddenException();
        }

        return this.prisma.event.delete({ where: { id } });
    }
}
