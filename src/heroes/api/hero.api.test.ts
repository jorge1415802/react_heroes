import { describe, expect, test } from "vitest"
import { heroApi } from "./hero.api"

const  BASE_URL = import.meta.env.VITE_API_URL;

 
describe('HeroApi', () => { 
    test('should be configure endpoint to test server', () => { 
        expect(heroApi).toBeDefined();
        expect(heroApi.defaults.baseURL).toContain(`${BASE_URL}/api/heroes`);
        expect(BASE_URL).toContain('3000')
     })
 })