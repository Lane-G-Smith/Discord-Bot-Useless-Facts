// import bot token from .env file
const TOKEN = require('dotenv').config();
const SECRET_KEY = require('dotenv').config();

// import discord.js module
const {Client,GatewayIntentBits, Util} = require('discord.js');

// import openai module, key, new config
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

// configure permissions(intents)
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessageTyping,
	]
});

// log successful login
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// respond to messages with API call if message include keyword
client.on("messageCreate", async function (message) {

    // ignore messages from bots
      if (message.author.bot) return;

// "fact" triggers useless fact API
  else if (message.content.toLowerCase().includes("fact")) {
    let response = await fetch( "https://uselessfacts.jsph.pl/random.json?language=en");
    let data = await response.json();
    message.reply( `Here's a fun fact. ${data.text} ............... Y o u r ' e  W e l c o m e`)
  }
});

// bot login using token from .env file
client.login(process.env.TOKEN);
