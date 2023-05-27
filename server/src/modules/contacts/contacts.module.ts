import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { ContactsRepository } from './repositories/contacts.repository';
import { ContactsPrismaRepository } from './repositories/prisma/contacts.prisma.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ContactsController],
  providers: [
    ContactsService,
    PrismaService,
    { provide: ContactsRepository, useClass: ContactsPrismaRepository },
  ],
})
export class ContactsModule {}
