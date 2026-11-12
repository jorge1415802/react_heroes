import { describe, expect, test } from 'vitest';
import { getSummaryAction } from './get-heroes-summary.action';

describe('GetHeroesSummaryAction', () => {
    test('should fetch summary and return complete information', async () => { 
        const summary = await getSummaryAction();
        expect(summary).toBeDefined();
     })
});