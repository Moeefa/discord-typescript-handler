import Discord, {
  ApplicationCommandOptionData,
  ApplicationCommandType,
  ChatInputCommandInteraction,
  CommandInteraction,
  LocalizationMap,
  MessageContextMenuCommandInteraction,
  PermissionResolvable,
  UserContextMenuCommandInteraction,
} from "discord.js";

export default class Command<T extends ApplicationCommandType> {
  type!: T;
  description!: string;
  name?: string;
  nameLocalizations?: LocalizationMap;
  descriptionLocalizations?: LocalizationMap;
  category?: string;
  options?: ApplicationCommandOptionData[];
  defaultMemberPermissions?: PermissionResolvable | null;
  dmPermission?: boolean;
  refers?: string;
  execute?: (interaction: InteractionType<T>) => any;

  constructor(options: CommandOptions<T>) {
    Object.assign(this, options);
  }
}

interface CommandOptions<T extends ApplicationCommandType> {
  type: T;
  description: string;
  name?: string;
  nameLocalizations?: LocalizationMap;
  descriptionLocalizations?: LocalizationMap;
  category?: string;
  options?: T extends ApplicationCommandType.ChatInput
    ? ApplicationCommandOptionData[]
    : never;
  defaultMemberPermissions?: PermissionResolvable | null;
  dmPermission?: boolean;
  refers?: string;
  execute?: T extends ApplicationCommandType
    ? (interaction: InteractionType<T>) => any
    : never;
}

type InteractionType<T extends ApplicationCommandType> =
  T extends ApplicationCommandType.ChatInput
    ? ChatInputCommandInteraction
    : T extends ApplicationCommandType.Message
    ? MessageContextMenuCommandInteraction
    : T extends ApplicationCommandType.User
    ? UserContextMenuCommandInteraction
    : CommandInteraction;
