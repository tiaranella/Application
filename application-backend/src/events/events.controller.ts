import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, Request } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { YupValidationPipe } from 'src/common/validation.pipe';
import * as createEventDto from './dto/create-event.dto';
import * as updateEventDto from './dto/update-event.dto';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Get()
    async findAll() {
        return this.eventsService.findAllPublic();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.eventsService.findOne(+id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new YupValidationPipe(createEventDto.CreateEventSchema))
    async create(@Request() req: any, @Body() createEventDto: createEventDto.CreateEventDto) {
        return this.eventsService.create(req.user.sub, createEventDto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async update(
        @Request() req: any, 
        @Param('id') id: string, 
        @Body(new YupValidationPipe(updateEventDto.UpdateEventSchema)) updateEventDto: updateEventDto.UpdateEventDto
    ) {
        return this.eventsService.update(+id, req.user.sub, updateEventDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async remove(@Request() req: any, @Param('id') id: string) {
        return this.eventsService.remove(+id, req.user.sub);
    }

    @Post(':id/join')
    @UseGuards(JwtAuthGuard)
     async joinEvent(@Request() req: any, @Param('id') id: string) {
        return this.eventsService.joinEvent(+id, req.user.sub);
    }

    @Post(':id/leave')
    @UseGuards(JwtAuthGuard)
    async leaveEvent(@Request() req: any, @Param('id') id: string) {
        return this.eventsService.leaveEvent(+id, req.user.sub);
    }
}
