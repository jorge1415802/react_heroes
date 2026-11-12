import { use } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { FavoritesHeroContext, FavoritesHeroProvider } from "./FavoritesHeroContext";
import type { Hero } from "../types/hero.interface";


const mockHero = {
    id: '1',
    name : 'Batman',

} as Hero

const TestComponent = () => {
    
    const { favorites, favoritesCount, isFavorite, toggleFavorite } = use(FavoritesHeroContext);

    return (
        <div>
            <div data-testid='favorites-count' >{favoritesCount}</div>
            <div data-testid='favorites-list' >
                {
                    favorites.map(hero => (
                        <div key={hero.id} data-testid={`hero-${hero.id}`} >{hero.name}</div>
                    ))
                }
            </div>
            <button data-testid='toggle-favorite' onClick={() => toggleFavorite(mockHero)}>Toggle Favorite</button>
            <div data-testid='is-favorite' >{isFavorite(mockHero).toString()}</div>
        </div>
    )
    
}

const renderContextTestComponent = () => {
    return render(
        <FavoritesHeroProvider>
            <TestComponent/>
        </FavoritesHeroProvider>
    )
}


describe('FavoritesHeroContest', () => { 
    
    beforeEach(() => {
        localStorage.clear()
    })
    
    test('should initialize with default values', () => { 
        renderContextTestComponent();

        expect(screen.getByTestId('favorites-count').textContent).toBe("0");
        expect(screen.getByTestId('favorites-list').children.length).toBe(0);
     });

     test('should add hero to favorites when toggle is call with a new hero', () => { 
        renderContextTestComponent()
        const button = screen.getByTestId('toggle-favorite');
        fireEvent.click(button);
        expect(screen.getByTestId('is-favorite').textContent).toBeTruthy();
        expect(screen.getByTestId('hero-1').textContent).toBeDefined();
        expect(screen.getByTestId('hero-1').textContent).toContain('Batman');
        expect(localStorage.getItem('favorites')).toStrictEqual('[{"id":"1","name":"Batman"}]');
      })

      test('should remove hero from favorites when toggle is called ', () => { 
        renderContextTestComponent()
        const button = screen.getByTestId('toggle-favorite');
        fireEvent.click(button);
        fireEvent.click(button);
        screen.debug();
        expect(screen.getByTestId('is-favorite').textContent).toBe("false")
        expect(screen.getByTestId('favorites-count').textContent).toEqual("0")
        expect(screen.queryByTestId('hero-1')).toBeNull();
        expect(localStorage.getItem('favorites')).toStrictEqual('[]');
      })
 })