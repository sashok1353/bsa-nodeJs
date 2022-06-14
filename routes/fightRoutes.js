const { Router } = require("express");
const FightService = require("../services/fightService");
const { responseMiddleware } = require("../middlewares/response.middleware");
const {
  createFightValid,
  updateFightValid,
} = require("../middlewares/fight.validation.middleware");

const router = Router();

// OPTIONAL TODO: Implement route controller for fights
router.get(
  "/",
  (req, res, next) => {
    const fights = FightService.getAll();
    res.data = fights;
    next();
  },
  responseMiddleware
);

router.get(
  "/:id",
  (req, res, next) => {
    try {
      const fights = FightService.getById(req.params.id);
      res.data = fights;
    } catch (error) {
      res.is404 = true;
      res.message = error.message;
    }
    next();
  },
  responseMiddleware
);

router.post(
  "/",
  createFightValid,
  (req, res, next) => {
    try {
      if (!res?.is400) {
        const fight = FightService.create(req.body);
        res.data = fight;
      }
    } catch (error) {
      res.is400 = true;
      res.message = error.message;
    }
    next();
  },
  responseMiddleware
);

router.put(
  "/:id",
  updateFightValid,
  (req, res, next) => {
    try {
      if (!res?.is400) {
        const user = FightService.update(req.params.id, req.body);
        res.data = user;
      }
    } catch (error) {
      res.is404 = true;
      res.message = error.message;
    }
    next();
  },
  responseMiddleware
);

router.delete(
  "/:id",
  (req, res, next) => {
    try {
      const fight = FightService.delete(req.params.id);
      res.data = fight;
    } catch (error) {
      res.is404 = true;
      res.message = error.message;
    }
    next();
  },
  responseMiddleware
);

module.exports = router;
