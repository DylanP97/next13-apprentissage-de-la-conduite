import { render, screen } from '@testing-library/react';
import HomePage from '../HomePage';
import getBlogsMock from '@/app/__mocks__/apicalls/getBlogsMock';

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

    it('should render a list with the correct number of blogs', async () => {
        const mockBlogs = await getBlogsMock();

        render(<HomePage currentUser={mockCurrentUser} blogs={mockBlogs} />);

        const blogs = await screen.findAllByTestId('blog-item');

        expect(blogs.length).toBe(3);
    });
})