import { ResponseType } from "@/types/responses.ts";

export type GetPlayersType = ResponseType<PlayersDataType[]>;
export type GetAdminType = ResponseType<PlayersDataType>;
export type AddPlayersType = ResponseType<PlayersDataType>;
export type EditPlayersType = ResponseType<PlayersDataType>;

export type PlayersDataType = {
  pk_player: number;
  username: string;
  discord: string;
  twitch: string | null;
  pk_team: number | null;
  team_name: string | null;
}
