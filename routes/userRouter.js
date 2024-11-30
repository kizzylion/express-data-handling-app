const { Router } = require("express");
const usersRouter = Router();

const {
  usersCreateGet,
  usersListGet,
  usersCreatePost,
  usersUpdateGet,
  usersUpdatePost,
  usersDeletePost,
  usersSearchGet,
} = require("../controllers/userController");

usersRouter.get("/", usersListGet);
usersRouter.get("/search", usersSearchGet);
usersRouter.get("/create", usersCreateGet);
usersRouter.post("/create", usersCreatePost);
usersRouter.get("/:id/update", usersUpdateGet);
usersRouter.post("/:id/update", usersUpdatePost);
usersRouter.post("/:id/delete", usersDeletePost);

module.exports = usersRouter;
