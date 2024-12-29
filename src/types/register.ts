import { ResponseType } from "@/types/responses.ts";

export type GetTeamsWithPlayersType = ResponseType<TeamsWithPlayersDataType[]>;
export type RegisterPlayerType = ResponseType<TeamsWithPlayersDataType>;
export type RegisterTeamType = ResponseType<RegisterTeamDataType>;

export type TeamsWithPlayersDataType = {
  fk_team: number | null;
  name: string | null;
  pk_player: number;
  username: string;
  riot_username: string;
  discord: string;
  twitch: string | null;
  rank: string;
}

export type RegisterTeamDataType = {
  pk_team: number;
  name: string;
  capacity: number;
  player_count: number;
}
