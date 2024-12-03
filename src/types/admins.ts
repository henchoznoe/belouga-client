import { ResponseType } from "@/types/responses.ts";

export type GetAdminsType = ResponseType<AdminsDataType[]>;
export type GetAdminType = ResponseType<AdminsDataType>;
export type AddAdminsType = ResponseType<AdminsDataType>;
export type EditAdminsType = ResponseType<AdminsDataType>;

export type AdminsDataType = {
  pk_admin: number;
  username: string;
  pk_admin_type: number;
  label: string;
}
