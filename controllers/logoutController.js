const fsPromises = require('fs').promises;
const path = require('path');

const userDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleLogout = async (req, res) => {
  // TODO on FE, also delete the accessToken from the browser

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  // Check if refreshToken in DB
  const foundUser = userDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    // Clear the JWT cookie
    res.clearCookie('jwt', {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    return res.sendStatus(204);
  }

  // Delete refreshToken in DB
  const otherUsers = userDB.users.filter(
    (person) => person.refreshToken !== refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: '' };
  userDB.setUsers([...otherUsers, currentUser]);

  try {
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(userDB.users)
    );
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
