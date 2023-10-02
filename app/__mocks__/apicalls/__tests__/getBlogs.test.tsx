import { server } from '../../server';
import { rest } from 'msw';
import getBlogsMock from '../getBlogsmock';

describe('getting blogs from get blogs', () => {
    it('should return an array of blogs', async () => {
        const blogsArray = await getBlogsMock();
        expect(blogsArray.length).toBe(3);
    })
    it('should return an empty array if error', async () => {
        server.use(
            rest.get('/blogs', (req, res, ctx) => {
                return res(ctx.status(400));
            })
        )
        const blogsArray = await getBlogsMock();
        expect(blogsArray.length).toBe(0);
    })
})