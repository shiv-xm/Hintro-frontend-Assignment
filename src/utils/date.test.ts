import { describe, it, expect } from 'vitest';
import { formatDate, isOverdue } from './date';

describe('Date Utils', () => {
    it('formats date correctly', () => {
        const date = '2023-10-15';
        expect(formatDate(date)).toContain('Oct 15');
    });

    it('identifies overdue dates correctly', () => {
        const pastDate = '2020-01-01';
        expect(isOverdue(pastDate)).toBe(true);
    });

    it('identifies future dates correctly', () => {
        // secure future date
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);
        expect(isOverdue(futureDate.toISOString())).toBe(false);
    });
});
