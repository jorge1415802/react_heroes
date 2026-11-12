import type { Hero } from "./hero.interface";

export interface Summary {
    totalHeroes:   number;
    strongestHero: Hero;
    smartestHero:  Hero;
    heroCount:     number;
    villainCount:  number;
}

