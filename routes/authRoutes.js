const { Router } = require("express");
const AuthService = require("../services/authService");
const { responseMiddleware } = require("../middlewares/response.middleware");

const router = Router();

router.post(
  "/login",
  (req, res, next) => {
    try {
      // TODO: Implement login action (get the user if it exist with entered credentials)
      const user = AuthService.login(req.body);
      res.data = user;
    } catch (err) {
      res.is404 = true;
      res.message = err.message;
    } finally {
      next();
    }
  },
  responseMiddleware
);

module.exports = router;
