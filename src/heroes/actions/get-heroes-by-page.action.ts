import { heroApi } from "../api/hero.api"
import type { HeroesResponse } from "../types/get-heroes.response";

const baseUrl = import.meta.env.VITE_API_URL;

export const getHeoresByPageAction = async(page : number, limit : number = 6,category : string) : Promise<HeroesResponse> => {
  if(isNaN(page)) page = 1;
  if(isNaN(limit)) page = 6;
      
  
  const { data } = await heroApi.get<HeroesResponse>(`/`,{
      params: {
        limit,
        offset: (page - 1) * limit,
        category
      }
    });

    
    const heroes = data.heroes.map(hero => ({
      ...hero,
      image : `${baseUrl}/images/${hero.image}`  
    })   )
    
    return {
        ...data,
        heroes
    }
}