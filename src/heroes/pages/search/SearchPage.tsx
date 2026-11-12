import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { SearchControls } from './ui/SearchControls';
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';
import { useQuery } from '@tanstack/react-query';
import { searchCharacterAction } from '@/heroes/actions/search-character.action';
import { useSearchParams } from 'react-router';
import { HeroGrid } from '@/heroes/components/HeroGrid';

export const SearchPage = () => {

  
  const [searchParam,_] = useSearchParams();

  const name = searchParam.get('name') || '';

  const {data : characterFounded} =  useQuery({
    queryKey: ['search',{ name }],
    queryFn : () => searchCharacterAction({name}),
    staleTime : 1000 * 60 * 5
  })

  return (
    <>
      <CustomJumbotron
        title="Búsqueda de SuperHéroes"
        description="Descubre, explora y administra super héroes y villanos"
      />

      <CustomBreadcrumbs
        currentPage="Buscador de héroes"
        // breadcrumbs={[
        //   { label: 'Home1', to: '/' },
        //   { label: 'Home2', to: '/' },
        //   { label: 'Home3', to: '/' },
        // ]}
      />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filter and search */}
      <SearchControls />

      {/* Search Result */}
      {
        characterFounded && <HeroGrid heroes={characterFounded} />
      }
    </>
  );
};

export default SearchPage;
