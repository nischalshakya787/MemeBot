import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import axios from "axios";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log("Bot is online");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === "!meme") {
    try {
      const response = await axios.get("http://localhost:3000/get-meme");

      const meme = response.data.meme;

      message.channel.send({
        embeds: [
          {
            title: meme.title,
            image: { url: meme.url },
          },
        ],
      });
    } catch (error) {
      console.log(error);
      message.channel.send("Couldnt send meme right now");
    }
  }
});

client.login(process.env.BOT_TOKEN);
