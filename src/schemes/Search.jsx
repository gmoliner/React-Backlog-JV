import { z } from "zod"

const SearchScheme = z.array(z.object({
    id: z.number(),
    genres: z.optional(z.array(z.object({
        id: z.number(),
        name: z.string()
    }))),
    name: z.string(),
    platforms: z.optional(z.array(z.object({
        id: z.number(),
        abbreviation: z.string()
    }))),
}))

export default SearchScheme