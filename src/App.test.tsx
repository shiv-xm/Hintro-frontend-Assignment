import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

describe('App', () => {
    it('renders login page initially', () => {

        render(<App />);
        expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    });
});
