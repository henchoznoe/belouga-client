import { z } from "zod";

export const registerTeamSchema = z.object({
  name: z.string().regex(/^.{1,32}$/, 'Le nom de l\'équipe doit contenir entre 1 et 32 caractères')
});

export type RegisterTeamFormData = z.infer<typeof registerTeamSchema>;

export const registerPlayerSchema = z.object({
  username: z.string().regex(/^.{1,32}$/, 'Le nom d\'utilisateur doit contenir entre 1 et 32 caractères'),
  riot_username: z.string().regex(/^.{1,32}$/, 'Le Riot ID doit contenir entre 1 et 32 caractères'),
  discord: z.string().regex(/^.{1,32}$/, 'Le discord doit contenir entre 1 et 32 caractères'),
  rank: z.string().regex(/^.{1,32}$/, 'Le rang doit contenir entre 1 et 32 caractères'),
  twitch: z.string().optional(),
  fk_team: z.string().optional()
});

export type RegisterPlayerFormData = z.infer<typeof registerPlayerSchema>;

export const registerPlayerSchemaT = z.object({
  username: z.string().regex(/^.{1,32}$/, 'Le nom d\'utilisateur doit contenir entre 1 et 32 caractères'),
  discord: z.string().regex(/^.{1,32}$/, 'Le discord doit contenir entre 1 et 32 caractères'),
  twitch: z.string().optional(),
});

export type RegisterPlayerFormDataT = z.infer<typeof registerPlayerSchemaT>;
