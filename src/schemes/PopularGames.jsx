import { z } from "zod"

const PopularGamesScheme = z.array(z.object({
    id: z.number(),
    cover: z.object({
        id: z.number(),
        image_id: z.string()
    }),
    screenshots: z.array(z.object({
        id: z.number(),
        image_id: z.string()
    })),    
    name: z.string(),
    slug: z.string(),
    total_rating: z.number(),
    total_rating_count: z.number(),
    first_release_date: z.number()
}))

export default PopularGamesScheme