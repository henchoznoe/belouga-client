import { ResponseType } from "@/types/responses.ts";

export type GetRoundsType = ResponseType<RoundsDataType[]>;

export type RoundsDataType = {
  pk_round: number;
  label: string;
}
