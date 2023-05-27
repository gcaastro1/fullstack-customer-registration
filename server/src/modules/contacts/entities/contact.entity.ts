import { randomUUID } from 'crypto';

export class Contact {
  readonly id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  customerId: string;

  constructor() {
    this.id = randomUUID();
  }
}
