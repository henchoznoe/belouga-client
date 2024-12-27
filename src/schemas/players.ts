import { z } from "zod";

export const addPlayerSchema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9._-]{1,32}$/, 'Le nom d\'utilisateur doit contenir entre 1 et 32 caractères'),
  riot_username: z.string().regex(/^[a-zA-Z0-9._-]{1,32}$/, 'Le riot id doit contenir entre 1 et 32 caractères'),
  discord: z.string().regex(/^[a-zA-Z0-9._-]{1,32}$/, 'Le discord doit contenir entre 1 et 32 caractères'),
  rank: z.string().regex(/^[a-zA-Z0-9._ -]{1,32}$/, 'Le rang doit contenir entre 1 et 32 caractères'),
  twitch: z.string().optional(),
  fk_team: z.string().optional(),
});

export type AddPlayerFormData = z.infer<typeof addPlayerSchema>;

export const editPlayerSchema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9._\s-]{1,32}$/, 'Le nom d\'utilisateur doit contenir entre 1 et 32 caractères'),
  riot_username: z.string().regex(/^[a-zA-Z0-9._-]{1,32}$/, 'Le riot id doit contenir entre 1 et 32 caractères'),
  discord: z.string().regex(/^[a-zA-Z0-9._\s-]{1,32}$/, 'Le discord doit contenir entre 1 et 32 caractères'),
  rank: z.string().regex(/^[a-zA-Z0-9._ -]{1,32}$/, 'Le rang doit contenir entre 1 et 32 caractères'),
  twitch: z.string().optional(),
  fk_team: z.string().optional()
});

export type EditPlayerFormData = z.infer<typeof editPlayerSchema>;
