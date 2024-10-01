import { ApplicationCommandData, ApplicationCommandType } from "discord.js";

import client from "..";
import config from "../config";
import fs from "fs";
import path from "path";

export const GetCommands = async () => {
  let commands: ApplicationCommandData[] = [];
  for (const folder of fs.readdirSync("./commands")) {
    for (const file of fs.readdirSync(`./commands/${folder}`)) {
      const command = (await import(`../commands/${folder}/${file}`))?.default;

      command.category ??= folder;
      command.defaultMemberPermissions ??= null;
      command.name ??= path.parse(file).name;
      command.type === ApplicationCommandType.ChatInput
        ? (command.name = command.name.toLowerCase())
        : void 0;

      client.commands.set(command.name, command);
      command.category === config.developerFolder
        ? client.guilds.cache.get(config.owner.guild)?.commands.create(command)
        : commands.push(Object.assign({}, command));
      console.log(
        `Loaded command: \x1b[93m${command.name}\x1b[0m ${
          command.type !== 1
            ? `type ${Object.keys(ApplicationCommandType).find(
                (value: any) => ApplicationCommandType[value] === command.type
              )}`
            : ""
        }`
      );
    }
  }

  return commands;
};
