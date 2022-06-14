const { Router } = require("express");
const FighterService = require("../services/fighterService");
const { responseMiddleware } = require("../middlewares/response.middleware");
const {
  createFighterValid,
  updateFighterValid,
} = require("../middlewares/fighter.validation.middleware");

const router = Router();

// TODO: Implement route controllers for fighter
router.get(
  "/",
  (req, res, next) => {
    const fighters = FighterService.getAll();
    res.data = fighters;
    next();
  },
  responseMiddleware
);

router.get(
  "/:id",
  (req, res, next) => {
    try {
      const fighter = FighterService.getById(req.params.id);
      res.data = fighter;
    } catch (error) {
      res.is404 = true;
      res.message = error.message;
    }
    next();
  },
  responseMiddleware
);

router.put(
  "/:id",
  updateFighterValid,
  (req, res, next) => {
    try {
      if (!res?.is400) {
        const fighter = FighterService.update(req.params.id, req.body);
        res.data = fighter;
      }
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
  createFighterValid,
  (req, res, next) => {
    try {
      if (!res?.is400) {
        const fighter = FighterService.create(req.body);
        res.data = fighter;
      }
    } catch (error) {
      res.is400 = true;
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
      const fighter = FighterService.delete(req.params.id);
      res.data = fighter;
    } catch (error) {
      res.is404 = true;
      res.message = error.message;
    }
    next();
  },
  responseMiddleware
);

module.exports = router;
