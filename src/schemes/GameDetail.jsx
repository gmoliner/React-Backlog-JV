import { z } from "zod"

const GameDetailScheme = z.array(z.object({
    id: z.number(),
    name: z.string(),
    summary: z.optional(z.string()),
    cover: z.optional(z.object({
        id: z.number(),
        image_id: z.string()
    })),
    genres: z.optional(z.array(z.object({
        id: z.number(),
        name: z.string()
    }))),
    platforms: z.optional(z.array(z.object({
        id: z.number(),
        abbreviation: z.string()
    }))),
    release_dates: z.optional(z.array(z.object({
        id: z.number(),
        date: z.number(),
        platform: z.object({
            id: z.number(),
            abbreviation: z.string()
        }),
        region: z.number()
    }))),
    screenshots: z.optional(z.array(z.object({
        id: z.number(),
        image_id: z.string()
    }))),
    total_rating: z.optional(z.number()),
    total_rating_count: z.optional(z.number())
}))

export default GameDetailScheme