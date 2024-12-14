import { ResponseType } from "@/types/responses.ts";

export type GetTeamsType = ResponseType<TeamsDataType[]>;
export type GetTeamType = ResponseType<TeamsDataType>;
export type AddTeamsType = ResponseType<TeamsDataType>;
export type EditTeamsType = ResponseType<TeamsDataType>;
export type DeleteTeamsType = ResponseType<TeamsDataType>;

export type TeamsDataType = {
  pk_team: number;
  name: string;
  capacity: number;
  player_count: number;
}
