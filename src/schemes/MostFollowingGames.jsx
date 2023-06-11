import { z } from "zod"

const UpcomingGamesScheme = z.array(z.object({
    id: z.number(),
    cover: z.object({
        id: z.number(),
        image_id: z.string()
    }),  
    follows: z.number(),
    name: z.string(),
    slug: z.string(),
    first_release_date: z.number()
}))

export default UpcomingGamesScheme