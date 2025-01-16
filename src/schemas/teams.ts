import { z } from "zod";

export const addTeamSchema = z.object({
  name: z.string().regex(/^.{1,32}$/, 'Le nom de l\'équipe doit contenir entre 1 et 32 caractères'),
  capacity: z.number().int().min(1, 'La taille de l\'équipe doit être supérieure à 0'),
});

export type AddTeamFormData = z.infer<typeof addTeamSchema>;


export const editTeamSchema = z.object({
  name: z.string().regex(/^.{1,32}$/, 'Le nom de l\'équipe doit contenir entre 1 et 32 caractères'),
  capacity: z.number().int().min(1, 'La taille de l\'équipe doit être supérieure à 0'),
});

export type EditTeamFormData = z.infer<typeof editTeamSchema>;
