import { z } from "zod";

export const addPlayerSchema = z.object({
  username: z.string().regex(/^[\p{L}\p{N}\p{Pd}\p{Pc}\p{Zs}'"?!.,;:@&()/+-]{1,32}$/u, 'Le nom d\'utilisateur doit contenir entre 1 et 32 caractères'),
  discord: z.string().regex(/^[\p{L}\p{N}\p{Pd}\p{Pc}\p{Zs}'"?!.,;:@&()/+-]{1,32}$/u, 'Le mot de passe doit contenir entre 8 et 20 caractères, au moins une lettre minuscule, une lettre majuscule et un chiffre'),
  twitch: z.string().optional(),
  pk_team: z.string().optional()
});

export type AddPlayerFormData = z.infer<typeof addPlayerSchema>;

/*export const editAdminSchema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9._-]{1,32}$/, 'Le nom d\'utilisateur doit contenir entre 1 et 32 caractères'),
  pk_admin_type: z.string().min(1, 'Veuillez sélectionner un type d\'administrateur'),
});

export type EditAdminFormData = z.infer<typeof editAdminSchema>;*/
