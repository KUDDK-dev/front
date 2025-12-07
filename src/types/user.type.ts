import z from "zod";
import { Skills } from "./skills.enum";

export const UserSchema = z.object({
    avatar: z.url().nullish(),
    username: z.string(),
    tags: z.string().array(),
    skills: z.enum(Skills).array(),
    guid: z.guid(),
    status: z.string()
});

export type User = z.infer<typeof UserSchema>;