import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateContactDto) {
    const contact = new Contact();
    const date = Date.now();

    Object.assign(contact, {
      ...data,
      createdAt: new Date(date),
    });

    const newContact = await this.prisma.contact.create({
      data: { ...contact },
    });

    return newContact;
  }

  async findAll() {
    const contacts: Contact[] = await this.prisma.contact.findMany();

    return contacts;
  }

  async findOne(id: string) {
    const contact: Contact = await this.prisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      throw new NotFoundException('contact not found');
    }

    return contact;
  }

  async update(id: string, data: UpdateContactDto) {
    const findContact = await this.prisma.contact.findUnique({
      where: { id },
    });

    if (!findContact) {
      throw new NotFoundException('contact not found');
    }

    const contact: Contact = await this.prisma.contact.update({
      where: { id },
      data: { ...data },
    });

    return contact;
  }

  async remove(id: string) {
    const findContact = await this.prisma.contact.findUnique({
      where: { id },
    });

    if (!findContact) {
      throw new NotFoundException('contact not found');
    }

    await this.prisma.contact.delete({
      where: { id },
    });

    return;
  }
}
