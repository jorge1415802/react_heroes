import { queryOptions } from "@tanstack/react-query";
import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interface";
import type { Options } from "../types/searchOptions.interface";

const baseUrl = import.meta.env.VITE_API_URL;

export const searchCharacterAction = async (queryParam: Options): Promise<Hero[]> => {

    const { name, category, team, universe, strength } = queryParam;

    if (!name && !category && !team && !universe && !status && !strength) return [];

    const { data } = await heroApi<Hero[]>('/search', {
        params: {
            name,
            category,
            team,
            universe,
            status,
            strength
        }
    })

    const heroes = data.map(hero => {
        return {
            ...hero,
            image: `${baseUrl}/images/${hero.image}`

        }
    })

    return heroes
}
