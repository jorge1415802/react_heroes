import { heroApi } from "../api/hero.api"
import type { Summary } from "../types/get-heroes-summary.interface";

export const getSummaryAction = async() : Promise<Summary> => {
    const { data } = await heroApi.get<Summary>('/summary');
    return data;
}