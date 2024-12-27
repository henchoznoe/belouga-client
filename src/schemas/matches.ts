import { z } from "zod";

export const addMatchSchema = z.object({
  fk_round: z.string().min(1, 'Veuillez sélectionner un round'),
  fk_team_one: z.string().optional(),
  fk_team_two: z.string().optional(),
  team_one_score: z.string().optional(),
  team_two_score: z.string().optional(),
  match_date: z.string().optional(),
  winner_team: z.string().optional(),
});

export type AddMatchFormData = z.infer<typeof addMatchSchema>;

export const editMatchSchema = z.object({
  fk_round: z.string().min(1, 'Veuillez sélectionner un round'),
  fk_team_one: z.string().optional(),
  fk_team_two: z.string().optional(),
  team_one_score: z.string().optional(),
  team_two_score: z.string().optional(),
  match_date: z.string().optional(),
  winner_team: z.string().optional(),
});

export type EditMatchFormData = z.infer<typeof editMatchSchema>;
