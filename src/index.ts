import { config } from 'dotenv';
import JampbotClient from './lib/client/JampbotClient';
import './lib/extensions';

config();

const client = new JampbotClient();
void client.start();
