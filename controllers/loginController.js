const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const handleLogin = async (req, res) => {
  try {
    const { user, pwd } = req.body;
    if (!user || !pwd) {
      return res
        .status(400)
        .json({ message: 'Username and password are required' });
    }

    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) {
      return res.sendStatus(401); // Unauthorized
    }

    const match = await bcryptjs.compare(pwd, foundUser.password);
    if (!match) {
      return res.sendStatus(401); // Unauthorized
    }

    // Get the roles
    const roles = Object.values(foundUser.roles);
    // Create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    // Save refreshToken with found user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    console.log(result);

    //! Store refreshToken in HTTP only cookie which is safer than in cookie or localStorage
    /*
      An HttpOnly Cookie is a tag added to a browser cookie that prevents client-side scripts from accessing data. 
      It provides a gate that prevents the specialized cookie from being accessed by anything other than the server.
    */
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      // secure: true, // Uncomment for production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = handleLogin;
