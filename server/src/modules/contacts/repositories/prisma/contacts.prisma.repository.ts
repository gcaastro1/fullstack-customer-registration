import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ContactsRepository } from '../contacts.repository';
import { Contact } from '../../entities/contact.entity';
import { CreateContactDto } from '../../dto/create-contact.dto';
import { UpdateContactDto } from '../../dto/update-contact.dto';

export class ContactsPrismaRepository implements ContactsRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateContactDto): Promise<Contact> {
    const contact = new Contact();
    const date = Date.now();

    Object.assign(contact, {
      ...data,
      createdAt: new Date(date),
    });

    const newContact = await this.prisma.contact.create({
      data: { ...contact },
    });

    return plainToInstance(Contact, newContact);
  }

  async findAll(): Promise<Contact[]> {
    const contacts: Contact[] = await this.prisma.contact.findMany();

    return plainToInstance(Contact, contacts);
  }

  async findOne(id: string): Promise<Contact> {
    const contact: Contact = await this.prisma.contact.findUnique({
      where: { id },
    });

    return plainToInstance(Contact, contact);
  }

  async update(id: string, data: UpdateContactDto): Promise<Contact> {
    const contact: Contact = await this.prisma.contact.update({
      where: { id },
      data: { ...data },
    });

    return plainToInstance(Contact, contact);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.contact.delete({
      where: { id },
    });
  }
}
