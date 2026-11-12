import { describe, expect, test } from 'vitest';
import { getHeroInformation } from './get-hero-information';

describe('GetHeroInformationAction', () => { 
    test('should fetch hero data and return with complete image url', async() => { 
        const slug = 'clark-kent'
        const hero = await getHeroInformation(slug);
        expect(hero).toBeTruthy();
        expect(hero.image).toBeDefined();
        expect(hero.image).toContain('images')
        expect(hero.image).toContain('http')
     });

     test('should throw an error if hero not found', async() => { 
        const slug = 'testing';
        try {
            await getHeroInformation(slug);     
        } catch (error : any) {
            console.log(error.response)
            expect(error.response.data).toBeDefined();
            expect(error.response.data.message).toContain('Hero not found');
            expect(error.response.data.statusCode).toEqual(404);
        }
       
    });


 })