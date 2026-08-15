import { defineStore } from 'pinia';
export const useUser = defineStore('user', {
  state: () => ({ user: null, token: localStorage.getItem('token') || null }),
  actions: {
    setUser(user, token) {
      this.user = user;
      this.token = token;
      if (token) localStorage.setItem('token', token);
      else localStorage.removeItem('token');
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    }
  }
});
