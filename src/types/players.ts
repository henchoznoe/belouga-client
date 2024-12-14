import { ResponseType } from "@/types/responses.ts";

export type GetPlayersType = ResponseType<PlayersDataType[]>;
export type GetPlayerType = ResponseType<PlayersDataType>;
export type AddPlayersType = ResponseType<PlayersDataType>;
export type EditPlayersType = ResponseType<PlayersDataType>;
export type DeletePlayersType = ResponseType<PlayersDataType>;

export type PlayersDataType = {
  pk_player: number;
  username: string;
  riot_username: string;
  discord: string;
  twitch: string | null;
  rank: string;
  fk_team: number | null;
  team_name: string | null;
}
