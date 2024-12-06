import { Contact } from './../../types/index';


export const deduplicateContacts = (contacts: Contact[]): Contact[] => {
  const seen = new Map<string, Contact>();
  contacts.forEach((contact) => {
    if (!seen.has(contact.email)) {
      seen.set(contact.email, contact);
    }
  });
  return Array.from(seen.values());
};