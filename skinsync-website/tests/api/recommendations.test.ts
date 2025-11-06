Sure, here's the contents for the file `/skinsync-website/skinsync-website/tests/api/recommendations.test.ts`:

import request from 'supertest';
import app from '../../src/app'; // Adjust the path as necessary

describe('Recommendations API', () => {
    it('should return personalized product recommendations', async () => {
        const response = await request(app)
            .post('/api/recommendations')
            .send({
                skinType: 'oily',
                sensitivityLevel: 'medium',
                ingredients: ['aloe vera', 'glycerin']
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('recommendations');
        expect(Array.isArray(response.body.recommendations)).toBe(true);
    });

    it('should return a 400 error for invalid input', async () => {
        const response = await request(app)
            .post('/api/recommendations')
            .send({
                skinType: 'unknown',
                sensitivityLevel: 'medium',
                ingredients: []
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});