import { randomUUID } from 'crypto';

export class Customer {
  readonly id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;

  constructor() {
    this.id = randomUUID();
  }
}
