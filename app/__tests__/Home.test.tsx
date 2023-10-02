import { render, screen } from '@testing-library/react';
import Home from '../page';

 describe('Home', () => {

    it("renders Home without crashing", async () => {
        render(<Home />);

        const homeC = screen.queryByText("Apprentissage");

        expect(homeC).toBeInTheDocument();
    })
})