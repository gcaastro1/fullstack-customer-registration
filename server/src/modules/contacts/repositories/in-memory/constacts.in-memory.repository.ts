import { contacts } from 'src/database/db';
import { ContactsRepository } from '../contacts.repository';
import { Contact } from '../../entities/contact.entity';
import { UpdateContactDto } from '../../dto/update-contact.dto';
import { CreateContactDto } from '../../dto/create-contact.dto';

export class ContactsInMemoryRepository implements ContactsRepository {
  create(data: CreateContactDto): Contact | Promise<Contact> {
    const newContact = new Contact();
    const date = Date.now();

    Object.assign(newContact, {
      ...data,
      createdAt: new Date(date),
    });
    contacts.push(newContact);
    return newContact;
  }

  findAll(): Contact[] | Promise<Contact[]> {
    return contacts;
  }

  findOne(id: string): Contact | Promise<Contact> {
    const contact = contacts.find((contact) => contact.id === id);
    return contact;
  }

  update(id: string, data: UpdateContactDto): Contact | Promise<Contact> {
    const contactIndex = contacts.findIndex((contact) => contact.id === id);
    contacts[contactIndex] = { ...contacts[contactIndex], ...data };
    return contacts[contactIndex];
  }

  delete(id: string): void | Promise<void> {
    const contactIndex = contacts.findIndex((contact) => contact.id === id);
    contacts.splice(contactIndex, 1);
  }
}
