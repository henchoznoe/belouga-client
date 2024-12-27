import { ResponseType } from "@/types/responses.ts";

export type GetAdminTypesType = ResponseType<AdminTypesDataType[]>;

export type AdminTypesDataType = {
  pk_admin_type: number; // 2 = Super Admin, 1 = Admin
  label: string;
}
