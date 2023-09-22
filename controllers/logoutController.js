const User = require('../model/User');

const handleLogout = async (req, res) => {
  // TODO on FE, also delete the accessToken from the browser

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  try {
    // Check if refreshToken in DB
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
      // Clear the JWT cookie
      res.clearCookie('jwt', {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      return res.sendStatus(204);
    }

    // Delete refreshToken in DB
    foundUser.refreshToken = '';
    const result = await foundUser.save();

    console.log(result);
  } catch (error) {
    console.log(error);
  }

  // Delete the JWT cookie
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    // maxAge: 24 * 60 * 60 * 1000, // No need when deleting cookie
  });

  res.sendStatus(204);
};

module.exports = handleLogout;
