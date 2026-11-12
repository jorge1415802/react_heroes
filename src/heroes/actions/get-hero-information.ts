import { heroApi } from "../api/hero.api"
import type { Hero } from "../types/hero.interface";

const baseUrl = import.meta.env.VITE_API_URL;

export const getHeroInformation = async(slug : string) : Promise<Hero> => {
  const { data } = await heroApi.get<Hero>(`/${slug}`);
  return {
    ...data,
    image : `${baseUrl}/images/${data.image}`
  }
}
