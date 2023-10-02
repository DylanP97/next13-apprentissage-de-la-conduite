// import { render, screen } from '@testing-library/react';
// import { HomeCard } from '../HomeCard';
// import { useRouter } from 'next/navigation';

// jest.mock('next/navigation', () => ({
//   useRouter: () => ({
//     pathname: '/',
//     query: {},
//     asPath: '/',
//     push: jest.fn(),
//     replace: jest.fn(),
//   }),
// }));

// const mockBlog = {
//     createdAt: "dsdsd",
//     id: "dsdsd3345345",
//     title: "Thisiesisdfd",
//     imageUrl: "dddddd",
//     tags: [],
// }

// describe('HomePage', () => {

//     it('should render a list with the correct number of blogs', async () => {
//         render(<HomeCard blog={mockBlog} />);

//         const blog = await screen.findByTestId('blog-item');

//         expect(blog).toHaveText('Thisiesisdfd');
//     });
// });