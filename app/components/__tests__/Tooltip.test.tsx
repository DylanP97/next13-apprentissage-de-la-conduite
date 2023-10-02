import { render, screen } from '@testing-library/react';
import Tooltip from '../Tooltip';

describe('Tooltip', () => {

    it("renders Supprimer l'utilisateur without crashing", () => {
        const message = "Supprimer l'utilisateur";
        render(<Tooltip message={message}><h3>icon</h3>{message}</Tooltip>); // ARRANGE
        const tooltipC = screen.queryByText("Supprimer l'utilisateur"); // ACT
        expect(tooltipC).toBeInTheDocument(); // ASSERT
    });

    it('renders YOYOYOYYOYO without crashing', () => {
        const message = "YOYOYOYYOYO";
        render(<Tooltip message={message}><h3>icon</h3>{message}</Tooltip>); // ARRANGE
        const tooltipC = screen.queryByText("YOYOYOYYOYO"); // ACT
        expect(tooltipC).toBeInTheDocument(); // ASSERT
    });
})