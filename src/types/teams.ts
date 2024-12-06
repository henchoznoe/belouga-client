import { ResponseType } from "@/types/responses.ts";

export type GetTeamsType = ResponseType<TeamsDataType[]>;
export type GetAdminType = ResponseType<TeamsDataType>;
export type AddTeamsType = ResponseType<TeamsDataType>;
export type EditTeamsType = ResponseType<TeamsDataType>;

export type TeamsDataType = {
  pk_team: number;
  name: string;
}
