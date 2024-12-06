import { CalendarEvent, Contact, GetContactsOptions, GmailMessage } from './../../types/index';
import { PaginatedResponse } from '../../types';
import { Request, Response } from 'express';
import { extractEmail, shouldIgnoreEmail } from '../helper/contactHelper.service';
import { deduplicateContacts } from '../util/contactUtil.service';
import { ServiceFailureError } from '../util/errorHandlers/errors.service';

export const getContacts = async (req: Request, res: Response) => {
  try {
    const { limit = 10, offset = 0, ignoreDomains = [], blockDomains = [] } = req.query;
    console.log('ignore domains here..', ignoreDomains)
    
    const testData = req.app.locals.testData
    const gmailData = testData?.gmail
    const calData = testData?.gcal
    const limitNum = parseInt(limit as string, 10);
    const offsetNum = parseInt(offset as string, 10);
    const ignoreDomainsList = Array.isArray(ignoreDomains)
      ? ignoreDomains
      : typeof ignoreDomains === 'string'
        ? ignoreDomains.split(',')
        : [];

    const blockDomainsList = Array.isArray(blockDomains)
      ? blockDomains
      : typeof blockDomains === 'string'
        ? blockDomains.split(',')
        : [];

    const contacts: PaginatedResponse<Contact> = await getContactsHelper({
      limit: limitNum,
      offset: offsetNum,
      gmailData,
      calData,
      ignoreDomains: ignoreDomainsList,
      blockDomains: blockDomainsList,
    });

    res.json(contacts);
  } catch (error) {
    console.log(error);
    throw new ServiceFailureError('Something went wrong at our end');
  }
};

export const getContactsHelper = async ({
  limit = 20,
  offset = 0,
  gmailData,
  calData,
  ignoreDomains,
  blockDomains,
}: GetContactsOptions): Promise<PaginatedResponse<Contact>> => {
  try {
    const gmailMessages: GmailMessage[] = gmailData
    const calendarEvents: CalendarEvent[] = calData;

    const contactsFromGmail = extractContactsFromGmail(gmailMessages, ignoreDomains, blockDomains);
    const contactsFromCalendar = extractContactsFromCalendar(
      calendarEvents,
      ignoreDomains,
      blockDomains
    );

    const allContacts = deduplicateContacts([...contactsFromGmail, ...contactsFromCalendar]);

    const paginatedContacts = allContacts.slice(offset, offset + limit);

    return {
      data: paginatedContacts,
      total: allContacts.length,
      limit,
      offset,
    };
  } catch (error) {
    console.log(error);
    throw new ServiceFailureError('Failed to fetch contacts');
  }
};

const extractContactsFromGmail = (
  messages: GmailMessage[] = [],
  ignoreDomains: string[] = [],
  blockDomains: string[] = []
): Contact[] => {
  try {
    return messages.flatMap((message) => {
      const headers = message?.payload?.headers;
      const fromHeader = headers.find((h) => h?.name?.toLowerCase() === 'from');
      if (!fromHeader) return [];

      const email = extractEmail(fromHeader?.value);
      if (shouldIgnoreEmail(email, ignoreDomains, blockDomains)) return [];

      const domain = email.split('@')[1];
      return [{ email, firstName: '', lastName: '', domain }];
    });
  } catch (error) {
    throw new ServiceFailureError('failed in extracting contacts from Gmail');
  }
};

const extractContactsFromCalendar = (
  events: CalendarEvent[] = [],
  ignoreDomains: string[] = [],
  blockDomains: string[]
): Contact[] => {
  try {
    return events.flatMap((event) => {
      const attendees = event?.attendees || [];
      return attendees
        ?.map((attendee) => {
          const email = attendee?.email || '';
          if (shouldIgnoreEmail(email, ignoreDomains, blockDomains)) return null;
          const domain = email.split('@')[1];
          return { email, firstName: '', lastName: '', domain };
        })
        .filter((contact): contact is Contact => contact !== null);
    });
  } catch (error) {
    throw new ServiceFailureError('failed in extracting contacts from calendar');
  }
};
