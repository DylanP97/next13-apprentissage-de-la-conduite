import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe('Home', () => {
    it('should have the text Conduite', () => {
        render(<Home />) // ARRANGE
    
        const text = screen.getByText('Conduite') // ACT
    
        expect(text).toBeInTheDocument() // ASSERT
    })

    it('should contain the text Apprentissage', () => {
        render(<Home />) // ARRANGE
    
        const text = screen.getByText(/apprentissage/i) // ACT
    
        expect(text).toBeInTheDocument() // ASSERT
    })

    it('should have the text Apprentissage', () => {
        render(<Home />) // ARRANGE
    
        const text = screen.getByRole('heading', {
            
        }) // ACT
    
        expect(text).toBeInTheDocument() // ASSERT
    })
})