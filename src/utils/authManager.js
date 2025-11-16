const TOKEN_KEY = 'googleAuthToken';

class AuthManager {
  static setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  static getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  static isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  static clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('userId');
    localStorage.removeItem('avalancheId');
    localStorage.removeItem('user');
    localStorage.removeItem('payment');
  }

  static async authenticatedFetch(url, options = {}) {
    const token = this.getToken();

    if (!token) throw new Error('SESSION_EXPIRED');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    };

    const response = await fetch(url, {
      ...options,
      headers
    });

    if (response.status === 401) {
      const data = await response.json();
      if (data.requiresLogin) {
        this.clearAuth();
        throw new Error('SESSION_EXPIRED');
      }
    }

    return response;
  }
}

export default AuthManager;
