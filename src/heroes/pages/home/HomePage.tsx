import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';
import { useHomePage } from '@/heroes/hooks/useHomePage';
import { use } from 'react';
import { FavoritesHeroContext } from '@/heroes/context/FavoritesHeroContext';


export const HomePage = () => {

  const { HeroesResponse, summary, activeTab, setSearchParams } =  useHomePage()

  const { favoritesCount, favorites } = use(FavoritesHeroContext)
  
  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="Universo de SuperHéroes"
          description="Descubre, explora y administra super héroes y villanos"
        />

        <CustomBreadcrumbs currentPage="Super Héroes" />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={activeTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" 
            onClick={() => setSearchParams((prev) => {
              prev.set('tab','all');
              prev.set('category','all');
              prev.set('page','1');
              return prev
            })}
            >
              All Characters {summary?.totalHeroes}
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="flex items-center gap-2"
              onClick={() => setSearchParams((prev) => {
              prev.set('tab','favorites');
              prev.set('category','favorites');
              return prev
            })}
            >
              Favorites ({favoritesCount})
            </TabsTrigger>
            <TabsTrigger value="heroes" 
            onClick={() => setSearchParams((prev) => {
              prev.set('tab','heroes');
              prev.set('category','hero');
              prev.set('page','1');
              return prev
            })}
            >
              Heroes {summary?.heroCount}
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() => setSearchParams((prev) => {
              prev.set('tab','villains');
              prev.set('category','villain');
              prev.set('page','1');
              return prev
            })}
            >
              Villains {summary?.villainCount}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Mostrar todos los personajes */}
            <HeroGrid  heroes={ HeroesResponse?.heroes || [] } />
          </TabsContent>
          <TabsContent value="favorites">
            {/* Mostrar todos los personajes favoritos */}
            <h1>Favoritos!!!</h1>
            <HeroGrid heroes={favorites}/>
          </TabsContent>
          <TabsContent value="heroes">
            {/* Mostrar todos los héroes */}
            <h1>Héroes</h1>
            <HeroGrid heroes={ HeroesResponse?.heroes || [] }/>
          </TabsContent>
          <TabsContent value="villains">
            {/* Mostrar todos los Villanos */}
            <h1>Villanos</h1>
            <HeroGrid heroes={ HeroesResponse?.heroes || [] }/>
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <CustomPagination totalPages={HeroesResponse?.pages || 1} />
      </>
    </>
  );
};
