import { JwtPayload, jwtDecode } from "jwt-decode";
import { UserData } from "../interfaces/UserData";

class AuthService {
  // Get user data from token
  getProfile() {
    return jwtDecode<UserData>(this.getToken());
  }

  // Check if user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Redirect if user is not logged in
  redirectIfNotLoggedIn(navigate: Function) {
    if (!this.loggedIn()) {
      localStorage.removeItem("id_token");
      navigate("/login");
      return true;
    }
  }

  // Redirect if token is expired
  redirectIfExpired() {
    if (this.isTokenExpired(this.getToken())) {
      localStorage.removeItem("id_token");
      window.location.assign("/login");
      return true;
    }
  }

  // Check if token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded?.exp && decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  // Get token from local storage
  getToken(): string {
    const loggedUser = localStorage.getItem("id_token") || "";
    return loggedUser;
  }

  // Login user and set token to local storage
  login(idToken: string) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  // Logout user by removing token from
  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export default new AuthService();
