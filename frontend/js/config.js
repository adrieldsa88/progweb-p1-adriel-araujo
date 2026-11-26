const LOCAL = ['localhost', '127.0.0.1'].includes(location.hostname);

export const API_URL = LOCAL
  ? 'http://localhost:3000'
  : 'https://progweb-p1-adriel-araujo-motomanager-api.onrender.com';