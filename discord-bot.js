// discord-bot.js
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ] 
});

client.commands = new Collection();

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}!`);
  client.user.setActivity('Say "hi" to me!', { type: 1 });
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  
  const msgContent = message.content.toLowerCase().trim();
  if (msgContent === 'hi' || msgContent === 'hello' || msgContent === 'hey') {
    await message.reply('hi');
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  
  console.log(`Received command: ${interaction.commandName}`);
  
  if (interaction.commandName === 'hi') {
    await interaction.reply('hi');
  }
});

client.on('error', error => {
  console.error('Discord.js Client Error:', error);
});

process.on('SIGINT', () => {
  console.log('\nShutting down gracefully...');
  client.destroy();
  process.exit(0);
});

const token = process.env.BOT_TOKEN_1;
if (!token) {
  console.error('❌ BOT_TOKEN_1 environment variable not set!');
  process.exit(1);
}

client.login(token).catch(err => {
  console.error('Failed to login:', err);
  process.exit(1);
});