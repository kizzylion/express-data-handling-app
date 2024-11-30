const usersStorage = require("../storages/usersStorage");
const { body, validationResult } = require("express-validator");

exports.usersListGet = (req, res) => {
  res.render("index", {
    title: "Users list",
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("createUser", {
    title: "Create user",
  });
};

const alphaErr = "Must only contain letters";
const lengthErr = "Must be between 1 and 10 characters.";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First Name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`last Name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`last name ${lengthErr}`),
  body("email").isEmail().withMessage("Invalid email"),
  body("age")
    .optional()
    .isInt({ min: 18, max: 120 })
    .withMessage("Age must be a number between 18 to 120"),
  body("bio")
    .optional()
    .isLength({ max: 200 })
    .withMessage("Bio must be less than 200 characters"),
];

//We can pass the entire array of middleware validation to our controller

exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      console.log(result.errors);
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: result.errors,
      });
    }

    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/");
  },
];

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);

  res.render("updateUser", {
    title: "Update users",
    user: user,
  });
};

exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);

    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: user,
        errors: result.errors,
      });
    }

    const { firstName, lastName, email, age, bio } = req.body;

    usersStorage.updateUser(req.params.id, {
      firstName,
      lastName,
      email,
      age,
      bio,
    });
    res.redirect("/");
  },
];

exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};

exports.usersSearchGet = (req, res) => {
  const { search } = req.query;
  const users = usersStorage.searchUsers(search);
  console.log(users);
  res.render("search", { title: "Search results", users });
};
