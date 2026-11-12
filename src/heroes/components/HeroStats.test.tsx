import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { HeroStats } from "./HeroStats";
import { useHeroSummary } from "../hooks/useHeroSummary";
import type { Summary } from "../types/get-heroes-summary.interface";
// import { Hero }  from '../types/hero.interface'

vi.mock("../hooks/useHeroSummary");
const mockUseHeroSummary = vi.mocked(useHeroSummary);

const mockSummaryData = {
    totlaHeroes : 25,
    strongest : expect.any(Array)
} as unknown as Summary

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry : false
        }
    }
})

const renderHeroStats = (mockData? : Partial<Summary>) => {
   
    
    if(mockData) {
        mockUseHeroSummary.mockResolvedValue({
        data : mockData
    } as unknown as ReturnType<typeof useHeroSummary> )
    } else {
        mockUseHeroSummary.mockResolvedValue({
        data : undefined
    } as unknown as ReturnType<typeof useHeroSummary> )
    }
    
   
    return render(
        <QueryClientProvider client={queryClient}>
           <HeroStats/>
        </QueryClientProvider>
    )
}

describe('HeroStatsComponent', () => { 
    test('should render component with default values', () => { 
        renderHeroStats();
        screen.debug();
        expect(screen.getByText('Total de personajes')).toBeDefined(); 
     });

     test('should render HeroStats with mock information', () => { 
        const { container } =  renderHeroStats(mockSummaryData);
        screen.debug()
        
      })
 })