import { describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from '@testing-library/react'
import { useHeroSummary } from "./useHeroSummary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { getSummaryAction } from "../actions/get-heroes-summary.action";
import type { Summary } from "../types/get-heroes-summary.interface";


vi.mock('../actions/get-heroes-summary.action',() => ({
    getSummaryAction: vi.fn()
}))

const mockGetSummaryAction = vi.mocked(getSummaryAction);

const tanstackCustomProvider = () => {
    
    const queryClient = new QueryClient({
        defaultOptions :{
            queries: {
                retry : false
            }
        }
    })

    return ({children} : PropsWithChildren) => {
        return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    }
}


describe('UseHeroSummary', () => { 
    test('should return the initial state isLoading', () => { 
        const { result } = renderHook(() => useHeroSummary(),{
            wrapper: tanstackCustomProvider()
        });
        expect(result.current.isLoading).toBeTruthy();
     });

     test('should return success state with data when api calls succeds', async () => { 
        const mockSummaryData = {
            totalHeroes : 10,
            strongestHero: {
                id : '1',
                name : 'Superman'
            },
            smartestHero: {
                id :'2',
                name: 'Batman'
            },
            heroCount:18,
            villainCount: 7
        }

        mockGetSummaryAction.mockResolvedValue(mockSummaryData as Summary)

        const { result } = renderHook(() => useHeroSummary(),{
            wrapper: tanstackCustomProvider()
        });
        
        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });
        expect(result.current.isLoading).toBeFalsy();
        expect(result.current.isError).toBeFalsy();
      });

      test('should return error state when api calls fails', async () => { 
        const mockError = new Error('Failed to fetch summary');
        mockGetSummaryAction.mockRejectedValue(mockError)
        const { result } = renderHook(() => useHeroSummary(),{
            wrapper: tanstackCustomProvider()
        });

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });

        expect(result.current.error).toBeDefined();
        expect(result.current.isLoading).toBeFalsy();
        expect(mockGetSummaryAction).toHaveBeenCalled();
       })


 })