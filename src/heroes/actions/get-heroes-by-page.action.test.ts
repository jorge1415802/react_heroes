import { beforeEach, describe, expect, test } from "vitest";
import AxiosMockAdapter from 'axios-mock-adapter'
import {  getHeoresByPageAction } from "./get-heroes-by-page.action";
import { heroApi } from "../api/hero.api";

const heroesApiMock = new AxiosMockAdapter(heroApi)

describe('GetHeroesByPageAction', () => {
    
    beforeEach(() => {
        heroesApiMock.reset();
    })
    
    test('should return default heroes', async () => {
        heroesApiMock.onGet('/').reply(200, {
            total: 10,
            pages: 2,
            heroes: [
                {
                    image: '1.jgp'
                },
                {
                    image: '2.jpg'
                }
            ]
        });
        const resp = await getHeoresByPageAction(1, 1, 'villains');
        expect(resp).toStrictEqual({
            total: 10,
            pages: 2,
            heroes: [
                { image: 'http://localhost:3000/images/1.jgp' },
                { image: 'http://localhost:3000/images/2.jpg' }
            ]
        })

    });

    test('should return the correct heroes when page is not a number', async () => { 
        const resp = {
            total : 10,
            pages : 1,
            heroes : []
        }

        heroesApiMock.onGet('/').reply(200,resp);

        await getHeoresByPageAction('abc' as unknown as number,2,'');
        const params = heroesApiMock.history.get[0].params
        expect(params).toStrictEqual({ limit: 2, offset: 0, category: '' });

        
     })
})