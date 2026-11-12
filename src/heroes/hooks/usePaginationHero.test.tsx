import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { usePaginationHero } from "./usePaginationHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { getHeoresByPageAction } from "../actions/get-heroes-by-page.action";
import { beforeEach } from "node:test";


vi.mock('../actions/get-heroes-by-page.action', () => ({
    getHeoresByPageAction: vi.fn()
}))

const mockGetHeroesByPageAction = vi.mocked(getHeoresByPageAction);

const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    })

const tanstackCustomProvider = () => {
    return ({ children }: PropsWithChildren) => {
        return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    }
}

describe('UsePaginationHero', () => {
    
    beforeEach(()=> {
        vi.clearAllMocks();
        queryClient.clear();
    })
    
    test('should return the initial state isLoading', () => {
        const { result } = renderHook(() => usePaginationHero(1, 6, 'all'), {
            wrapper: tanstackCustomProvider()
        });
        expect(result.current.isLoading).toBeTruthy();
    });

    test('should return success date with data when api call succeds', async () => {

        const mockHeroesData = {
            total: 20,
            pages: 4,
            heroes: []
        };

        const { result } = renderHook(() => usePaginationHero(1, 6, 'all'), {
            wrapper: tanstackCustomProvider()
        });


        mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

        await waitFor(() => {
            expect(result.current.isPending).toBeFalsy()
        });

        expect(mockGetHeroesByPageAction).toHaveBeenLastCalledWith(1, 6, 'all')

    });

    test('should call getHeroesByPageAction with arguments', async () => {
        const mockHeroesData = {
            total: 20,
            pages: 4,
            heroes: []
        };

        const { result } = renderHook(() => usePaginationHero(1, 6, 'heroes'), {
            wrapper: tanstackCustomProvider()
        });


        mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

        await waitFor(() => {
            expect(result.current.isPending).toBeFalsy()
        });

        expect(mockGetHeroesByPageAction).toHaveBeenLastCalledWith(1, 6, 'heroes')
    });
})