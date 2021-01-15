import { config } from 'dotenv';
import JampbotClient from './lib/structures/JampbotClient';
import './lib/extensions';

config();

const client = new JampbotClient();
void client.start();
