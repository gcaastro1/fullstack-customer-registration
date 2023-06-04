import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { ContactsRepository } from './repositories/contacts.repository';

@Injectable()
export class ContactsService {
  constructor(private contactsRepository: ContactsRepository) {}
  async create(data: CreateContactDto) {
    const contact = this.contactsRepository.create(data);
    return contact;
  }

  async findAll() {
    const contacts = await this.contactsRepository.findAll();

    return contacts;
  }

  async findOne(id: string) {
    const contact: Contact = await this.contactsRepository.findOne(id);

    if (!contact) {
      throw new NotFoundException('contact not found');
    }

    return contact;
  }

  async update(id: string, data: UpdateContactDto) {
    const contact: Contact = await this.contactsRepository.update(id, data);

    return contact;
  }

  async remove(id: string) {
    await this.contactsRepository.delete(id);

    return;
  }
}
