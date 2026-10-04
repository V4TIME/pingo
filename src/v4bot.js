import { Client, GatewayIntentBits, Collection } from 'discord.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create client with necessary intents
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ] 
});

// Store command collection
client.commands = new Collection();

// When client is ready
client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}!`);
  
  // Set status
  client.user.setActivity('Say "hi" to me!', { type: 1 });
});

// Handle messages - respond to "hi" or "hello"
client.on('messageCreate', async (message) => {
  // Ignore bots
  if (message.author.bot) return;
  
  // Check for hi/hello messages
  const msgContent = message.content.toLowerCase().trim();
  if (msgContent === 'hi' || msgContent === 'hello' || msgContent === 'hey') {
    await message.reply('hi');
  }
});

// Handle slash commands
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  
  console.log(`Received command: ${interaction.commandName}`);
  
  if (interaction.commandName === 'hi') {
    await interaction.reply('hi');
  }
});

// Error handling
client.on('error', error => {
  console.error('Discord.js Client Error:', error);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nShutting down gracefully...');
  client.destroy();
  process.exit(0);
});

// Login with Bot 1 token
const token = process.env.BOT_TOKEN_1;
if (!token) {
  console.error('❌ BOT_TOKEN_1 environment variable not set!');
  process.exit(1);
}

client.login(token).catch(err => {
  console.error('Failed to login:', err);
  process.exit(1);
});