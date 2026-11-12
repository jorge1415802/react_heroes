import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";

interface FavoritesHeroContextType {
  favorites: Hero[];
  favoritesCount: number;
  toggleFavorite: (hero: Hero) => void;
  isFavorite: (hero: Hero) => boolean;
}

export const FavoritesHeroContext = createContext<FavoritesHeroContextType>({
  favorites: [],
  favoritesCount: 0,
  toggleFavorite: () => {},
  isFavorite: () => false,
});

const getFavoritesFromStorage = (): Hero[] => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : []
  }

export const FavoritesHeroProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromStorage());

    

  const toggleFavorite = (hero: Hero) => {
    const exists = favorites.find(h => h.id === hero.id);
    if (exists) {
      setFavorites(favorites.filter(h => h.id !== hero.id));
    } else {
      setFavorites([...favorites, hero]);
    }
  };

  const isFavorite = (hero: Hero) => {
    return favorites.some(h => h.id === hero.id);
  };

  useEffect(() => {
    localStorage.setItem('favorites',JSON.stringify(favorites))
  }, [favorites])
  

  return (
    <FavoritesHeroContext.Provider
      value={{
        favorites,
        favoritesCount: favorites.length,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesHeroContext.Provider>
  );


};