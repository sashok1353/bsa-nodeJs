const UserService = require("./userService");

class AuthService {
  login(userData) {
    const { email, password } = userData;
    if (!email || !password) throw Error("Fields can't be empty");
    const user = UserService.search(userData);
    if (!user) throw Error("User not found");

    return user;
  }
}

module.exports = new AuthService();
