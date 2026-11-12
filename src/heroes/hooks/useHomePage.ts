import { useSearchParams } from "react-router"
import { useHeroSummary } from "./useHeroSummary"
import { usePaginationHero } from "./usePaginationHero"

export const useHomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const activeTab = searchParams.get('tab') ||  'all'
  const page = searchParams.get('page') ||  '1'
  const limit = searchParams.get('limit') ||  '6'
  const category = searchParams.get('category') || 'all'

  const { data : HeroesResponse } =  usePaginationHero(Number(page) , Number(limit),category);  
  const { data : summary } = useHeroSummary();

  return {
    searchParams,
    setSearchParams,
    activeTab,
    useHeroSummary,
    usePaginationHero,
    HeroesResponse,
    summary
  }
  
}
