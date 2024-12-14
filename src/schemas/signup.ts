import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9._\s-]{1,32}$/, 'Le nom d\'utilisateur doit contenir entre 1 et 32 caractères'),
  discord: z.string().regex(/^[a-zA-Z0-9._\s-]{1,32}$/, 'Le discord doit contenir entre 1 et 32 caractères'),
  twitch: z.string().optional(),
  pk_team: z.string().optional()
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
