
const TOKEN_KEY = 'googleAuthToken';
const TOKEN_EXPIRY_KEY = 'tokenExpiry';
const SESSION_DURATION = 8 * 60 * 60 * 1000; // 1 hour in milliseconds

class AuthManager {
  // Store token with expiry timestamp
  static setToken(token) {
    const expiryTime = Date.now() + SESSION_DURATION;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
  }

  // Get token if valid, null if expired
  static getToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);

    if (!token || !expiry) {
      return null;
    }

    // Check if token is expired
    if (Date.now() > parseInt(expiry)) {
      console.warn('⚠️ Token expired. Logging out...');
      this.clearAuth();
      return null;
    }

    return token;
  }

  // Check if token is valid
  static isAuthenticated() {
    return this.getToken() !== null;
  }

  // Get time remaining until expiry (in minutes)
  static getTimeRemaining() {
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiry) return 0;

    const remaining = parseInt(expiry) - Date.now();
    return Math.max(0, Math.floor(remaining / 60000)); // Convert to minutes
  }

  // Clear all auth data
  static clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
    localStorage.removeItem('userId');
    localStorage.removeItem('avalancheId');
    localStorage.removeItem('user');
    localStorage.removeItem('payment');
  }

  // Make authenticated API call
  static async authenticatedFetch(url, options = {}) {
    const token = this.getToken();

    if (!token) {
      throw new Error('SESSION_EXPIRED');
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    };

    const response = await fetch(url, {
      ...options,
      headers
    });

    // Handle 401 Unauthorized (token expired on server)
    if (response.status === 401) {
      const data = await response.json();
      if (data.requiresLogin) {
        this.clearAuth();
        throw new Error('SESSION_EXPIRED');
      }
    }

    return response;
  }

  // Start session monitor (checks every minute)
  static startSessionMonitor(onExpire) {
    // Clear any existing interval
    if (window.sessionCheckInterval) {
      clearInterval(window.sessionCheckInterval);
    }

    window.sessionCheckInterval = setInterval(() => {
      if (!this.isAuthenticated()) {
        clearInterval(window.sessionCheckInterval);
        if (onExpire) onExpire();
      } else {
        const remaining = this.getTimeRemaining();
        console.log(`⏱️ Session expires in ${remaining} minutes`);
        
        // Warn user 5 minutes before expiry
        if (remaining === 5 && !window.sessionWarningShown) {
          window.sessionWarningShown = true;
          if (window.confirm('Your session will expire in 5 minutes. Click OK to continue or Cancel to logout now.')) {
            window.sessionWarningShown = false;
          } else {
            this.clearAuth();
            if (onExpire) onExpire();
          }
        }
      }
    }, 60000); // Check every minute
  }

  // Stop session monitor
  static stopSessionMonitor() {
    if (window.sessionCheckInterval) {
      clearInterval(window.sessionCheckInterval);
      window.sessionCheckInterval = null;
    }
  }
}

export default AuthManager;