const jwt = require('jsonwebtoken');
const User = require('../model/User');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }

  const refreshToken = cookies.jwt;
  // Find the user that matches the refreshToken
  const foundUser = await User.findOne({ refreshToken }).exec();
  // const foundUser = userDB.users.find(
  //   (person) => person.refreshToken === refreshToken
  // );
  if (!foundUser) {
    return res.sendStatus(401); // Unauthorized
  }

  // Evaluate JWT
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) { // Compare usernames
      return res.sendStatus(403);
    }

    // Get the roles
    const roles = Object.values(foundUser.roles);
    // Create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
    );
    res.json({ accessToken });
  });
};

module.exports = handleRefreshToken;
