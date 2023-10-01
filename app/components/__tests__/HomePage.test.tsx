import { render, screen } from '@testing-library/react';
import HomePage from '../HomePage';

const mockCurrentUser = {
    createdAt: "dsdsd",
    updatedAt: "dsdsd",
    emailVerified: false,
    id: "dsdsd",
    firstName: "dsdsd",
    lastName: "dsdsd",
    name: "dsdsd",
    email: "dsdsd",
    hashedPassword: "dsdsd",
    subscriptionPlan: 5,
}

const mockBlogs = "";

describe('HomePage', () => {

    it("renders without crashing", () => {
        render(<HomePage currentUser={mockCurrentUser} blogs={mockBlogs} />); // ARRANGE

        const homepage = screen.queryByRole('main'); // ACT

        expect(homepage).toBeInTheDocument(); // ASSERT
    });
})