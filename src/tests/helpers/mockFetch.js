import mockToken from './mockToken';

const mockFetch = () => Promise.resolve({
  json: () => Promise.resolve(mockToken),
});

export default mockFetch;