// Script to register slash commands
import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.BOT_TOKEN_1;
const clientId = process.env.CLIENT_ID || '1556182600622673921';

const commands = [
  {
    name: 'hi',
    description: 'Says hi back!',
  },
];

const rest = new REST({ version: '10' }).setToken(token);

async function deployCommands() {
  try {
    console.log('Started refreshing application commands...');
    
    // Register commands globally
    const data = await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands }
    );
    
    console.log(`✅ Successfully reloaded ${data.length} application commands!`);
  } catch (error) {
    console.error('❌ Error deploying commands:', error);
  }
}

deployCommands();
