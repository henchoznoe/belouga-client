import { ResponseType } from "@/types/responses.ts";

export type GetAdminTypesType = ResponseType<AdminTypesDataType[]>;

export type AdminTypesDataType = {
  pk_admin_type: number;
  label: string;
}
