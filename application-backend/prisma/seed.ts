import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const passwordAdmin = await bcrypt.hash('admin123', 10);
    const passwordUser = await bcrypt.hash('user123', 10);

    const user1 = await prisma.user.upsert({
        where: { email: 'admin@events.com' },
        update: {},
        create: {
            email: 'admin@events.com',
            name: 'Event Admin',
            password: passwordAdmin,
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: 'john@gmail.com' },
        update: {},
        create: {
            email: 'john@gmail.com',
            name: 'John Doe',
            password: passwordUser,
        },
    });

    const eventsData = [{
        title: 'Summer Tech Conference',
        description: 'The biggest tech meetup of the year.',
        date: new Date('2026-06-15T10:00:00Z'),
        location: 'Silicon Valley',
        capacity: 500,
        isPublic: true,
        organizerId: user1.id,
    },

    {
        title: 'Local Hackathon',
        description: 'Build a fullstack app in 48 hours.',
        date: new Date('2026-08-20T09:00:00Z'),
        location: 'New York City',
        capacity: 100,
        isPublic: true,
        organizerId: user1.id,
    },

    {
        title: 'Web Dev Workshop',
        description: 'Learn React and NestJS basics.',
        date: new Date('2026-09-05T14:00:00Z'),
        location: 'Online',
        capacity: null,
        isPublic: true,
        organizerId: user1.id,
    },
    ];

    for (const event of eventsData) {
        const existingEvent = await prisma.event.findFirst({ where: { title: event.title } });
        if (!existingEvent) {
            await prisma.event.create({ data: event });
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
