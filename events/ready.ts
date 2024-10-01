import Event from "../structures/Event";
import { GetCommands } from "../utils/getCommands";

export default new Event("ready", async (client) => {
  console.log(
    `Connected as ${client.user.username}#${client.user.discriminator}.`
  );

  client.application.commands
    .set(await GetCommands())
    .then((commands) =>
      console.log(`\x1b[93mRegistered ${commands.size} commands.\x1b[0m`)
    );
});
