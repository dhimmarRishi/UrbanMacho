const { User } = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken') 

const handleLogin = async (req, res) => {
  console.log("Request reached");
  console.log(req.body);

  const tempUser = await User.findOne({ email: req.body.email }).lean();
  if (!tempUser) return res.status(404).json({ msg: "go to register" });

  console.log(req.body.password)
  console.log(tempUser.password)

  if (!bcrypt.compareSync(req.body.password, tempUser.password))
    return res.status(401).json({ msg: "Invalid Password" });

  console.log("User found");
  console.log(tempUser);

  const key = jwt.sign({e_id : tempUser.email}, "PRIVATE_KEY")
  tempUser.key = key

  res.json({ msg: "Good To Go", user: tempUser });
};

const handleRegister = async (req, res) => {
  try {
    console.log("Register request");
    console.log(req.body);

    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser)
      return res.status(409).json({ msg: "User Already exists" });

    delete req.body.cpassword;

    const tempUser = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 8),
    };
    console.log(tempUser);

    const newUser = new User(tempUser);
    await newUser.save();

    res.json({ msg: "Good to go", newUser });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ msg: "Error" });

  }
};

module.exports = {
  handleLogin,
  handleRegister,
};
