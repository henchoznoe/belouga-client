import { ResponseType } from "@/types/responses.ts";

export type GetBracketType = ResponseType<BracketDataType>;

export type BracketDataType = {
  pk_bracket: number;
  image: string;
}
