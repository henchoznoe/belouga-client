import { ResponseType } from "@/types/responses.ts";

export type GetMatchesType = ResponseType<MatchesDataType[]>;
export type GetMatchType = ResponseType<MatchesDataType>;
export type AddMatchesType = ResponseType<MatchesDataType>;
export type EditMatchesType = ResponseType<MatchesDataType>;
export type DeleteMatchesType = ResponseType<MatchesDataType>;

export type MatchesDataType = {
  pk_match: number;
  fk_team_one: number | null;
  team_one_name: string | null;
  score_team_one: number | null;
  fk_team_two: number | null;
  team_two_name: string | null;
  score_team_two: number | null;
  fk_round: number;
  round_label: string;
  match_date: string;
  winner_team: number | null;
}
