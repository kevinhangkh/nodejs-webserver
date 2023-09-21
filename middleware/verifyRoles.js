const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    console.log({ req });
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];

    console.log(rolesArray);
    console.log(req.roles);

    const result = req.roles
      .map((role) => rolesArray.includes(role)) // Creates a boolean array
      .some((role) => !!role); // Returns true if at least one of the elements is true

    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
