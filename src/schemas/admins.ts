import { z } from "zod";

export const addAdminSchema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9._-]{1,32}$/, 'Le nom d\'utilisateur doit contenir entre 1 et 32 caractères'),
  password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/, 'Le mot de passe doit contenir entre 8 et 20 caractères, au moins une lettre minuscule, une lettre majuscule et un chiffre'),
  fk_admin_type: z.string().min(1, 'Veuillez sélectionner un type d\'administrateur'),
});

export type AddAdminFormData = z.infer<typeof addAdminSchema>;

export const editAdminSchema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9._\s-]{1,32}$/, 'Le nom d\'utilisateur doit contenir entre 1 et 32 caractères'),
  pk_admin_type: z.string().min(1, 'Veuillez sélectionner un type d\'administrateur'),
});

export type EditAdminFormData = z.infer<typeof editAdminSchema>;
