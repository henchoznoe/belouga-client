export type ResponseType<T> = {
  success: boolean;
  message: string;
  data: T;
}
