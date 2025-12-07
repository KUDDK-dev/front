import { Tag } from "./tag.type";

export type HakatonEvent = {
    title: string,
    description: string,
    tags: Tag[],
    members: number[],
    date: string
}