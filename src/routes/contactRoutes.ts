import express from 'express';
import { getContacts } from '../services/contactService/contact.service';

const router = express.Router();

router.get('/', getContacts);

export default router;
