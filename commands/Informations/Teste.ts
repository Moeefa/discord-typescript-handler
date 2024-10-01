import { ApplicationCommandType } from "discord.js";
import Command from "../../structures/Command";
import client from "../..";

export default new Command({
  type: ApplicationCommandType.ChatInput,
  description: "Test the bot's ping.",
  async execute(interaction) {
    interaction.reply(`My ping is: ${client.ws.ping}ms!`);
  },
});
