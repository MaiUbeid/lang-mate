const { compare } = require('bcrypt');
const { jwtSign } = require('../../helpers');
const { getUserByUsername, reactivateUser } = require('../../database/queries/users');

exports.login = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) return next({ code: 400, msg: 'bad request !!!!' });

  const key = process.env.KEY;
  let id;
  getUserByUsername(username)
    .then(({ rows }) => {
      if (rows && rows[0]) {
        const [{ id: dbId, password: dbPassword, isactive }] = rows;
        id = dbId;
        const reactivePromise = isactive ? Promise.resolve(true) : reactivateUser();
        return Promise.all([compare(password, dbPassword), reactivePromise]);
      }
      return next({ code: 400, msg: 'username doesn\'t exist' });
    })
    .then(([isValid]) => {
      if (isValid) {
        return jwtSign({ userInfo: { username, id } }, key);
      }
      return next({ code: 400, msg: 'username or password doesn\'t match our records' });
    })
    .then((token) => {
      res.cookie('token', token, { maxAge: 8400000, httpOnly: true });
      res.send({ isSuccess: true, message: 'success' });
    })
    .catch(next);
};
