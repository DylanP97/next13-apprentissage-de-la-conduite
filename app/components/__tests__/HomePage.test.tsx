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

const mockBlogs = {
    blogs: [
        {
            createdAt: "dsdsd",
            updatedAt: "dsdsd",
            id: "dsdsd3345345",
            title: "Thisiesisdfd",
            content: "dsdsd",
            author: {
                createdAt: "dsdsd",
                updatedAt: "dsdsd",
                emailVerified: false,
                id: "dsdsd",
                firstName: "dsdsd",
                lastName: "dsdsd",
                name: "dsdsd",
                email: "dsdsd",
                hashedPassword: "<PASSWORD>",
                subscriptionPlan: 5,
            },
        },
        {
            createdAt: "dsdsd",
            updatedAt: "dsdsd",
            id: "dsds32132123d",
            title: "dsdsd",
            content: "dsdsd",
            author: {
                createdAt: "dsdsd",
                updatedAt: "dsdsd",
                emailVerified: false,
                id: "aadsqdsq",
                firstName: "dsdsd",
                lastName: "dsdsd",
                name: "dsdsd",
                email: "dsdsd",
                hashedPassword: "<PASSWORD>",
                subscriptionPlan: 5,
            },
        },
        {
            createdAt: "dsdsd",
            updatedAt: "dsdsd",
            id: "d876873sdsd",
            title: "sdcdscs",
            content: "dsdsd",
            author: {
                createdAt: "dsdsd",
                updatedAt: "dsdsd",
                emailVerified: false,
                id: "dsdsd",
                firstName: "dsdsd",
                lastName: "dsdsd",
                name: "dsdsd",
                email: "dsdsd",
                hashedPassword: "<PASSWORD>",
                subscriptionPlan: 5,
            },
        }
    ],
}

describe('HomePage', () => {

    it("renders main container", () => {
        render(<HomePage currentUser={mockCurrentUser} blogs={[]} />); // ARRANGE

        const homepage = screen.queryByRole('main'); // ACT

        expect(homepage).toBeInTheDocument(); // ASSERT
    });

    it("should render 'Il n'y a pas d'articles' when array is empty", () => {
        render(<HomePage currentUser={mockCurrentUser} blogs={[]} />);

        const h1 = screen.getByText("Il n'y a pas d'articles");

        expect(h1).toBeInTheDocument();
    });
})