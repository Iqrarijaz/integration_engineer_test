const { listJobs } = require('../../server/services/jobs/index');
const { mockClient } = require('../__mocks__/client');

(async () => {
  // Dynamically import `vitest` functions
  const { expect, test, vi } = await import('vitest');

  // Set up the mock for `client.query`
  vi.mock('../../server/services/jobs/client', () => ({
    client: mockClient,
  }));

  test('listJobs returns jobs with pagination', async () => {
    // Mock the database responses
    mockClient.query.mockResolvedValueOnce({
      rows: [
        {
          id: 1,
          title: 'Job 1',
          expiry_date: '2025-01-01',
          created_at: '2023-07-10',
        },
        {
          id: 2,
          title: 'Job 2',
          expiry_date: '2025-01-01',
          created_at: '2023-07-10',
        },
      ],
    });

    mockClient.query.mockResolvedValueOnce({
      rows: [{ count: '2' }],
    });

    // Mock request and response objects
    const req = {
      query: {
        page: '1',
        limit: '2',
      },
    };
    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    };

    // Call the function
    await listJobs(req, res);

    // Assertions
    expect(res.json).toHaveBeenCalledWith({
      result: [
        {
          id: 1,
          title: 'Job 1',
          expiry_date: '2025-01-01',
          created_at: '2023-07-10',
        },
        {
          id: 2,
          title: 'Job 2',
          expiry_date: '2025-01-01',
          created_at: '2023-07-10',
        },
      ],
      pagination: {
        page: 1,
        limit: 2,
        total_count: 2,
        total_pages: 1,
      },
      meta: {
        message: 'Jobs retrieved successfully',
      },
      errors: [],
    });

    expect(mockClient.query).toHaveBeenCalledTimes(2);
    expect(mockClient.query).toHaveBeenCalledWith(
      'SELECT * FROM jobs WHERE expiry_date > CURRENT_DATE ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [2, 0]
    );
    expect(mockClient.query).toHaveBeenCalledWith(
      'SELECT COUNT(*) FROM jobs WHERE expiry_date > CURRENT_DATE'
    );
  });
})();
