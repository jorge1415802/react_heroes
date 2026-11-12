import { useQuery } from "@tanstack/react-query"
import { getHeoresByPageAction } from "../actions/get-heroes-by-page.action"

export const usePaginationHero = (page : number, limit : number, category : string) => {
  return useQuery({
      queryKey: ['heroes', { page, limit, category }],
      queryFn : () => getHeoresByPageAction(+page, +limit,category),
      staleTime: 1000 * 60 * 5
    })
}
