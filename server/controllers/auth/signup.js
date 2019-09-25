const { hash } = require('bcrypt');
const { signupSchema } = require('./validation/signup-validation');
const { users: { getUserByUsername, getUserByEmail, addUser } } = require('../../database/queries');


exports.signup = (req, res, next) => {
  // signupSchema.validate(userData).then(()=>)

  res.send(' Hello from signup file');
  const {
    username, email, password, native_lang_id, learning_lang_id,
  } = req.body;

  signupSchema.validate({
    username, email, password, native_lang_id, learning_lang_id,
  })
    .then(() => getUserByUsername(username))
    .then((result) => {
      if (result.rows.length !== 0) throw Error({ err: 'username exists' });
    })
    .then(() => getUserByEmail(username))
    .then((result) => {
      if (result.rows.length !== 0) throw Error('email exists');
    })
    .then(() => hash(password, 10))
    .then((hashed) => addUser({
      username, email, password: hashed, native_lang_id, learning_lang_id,
    }))
    .catch(({ err }) => {
      if (err) {
        next(err);
      } else {
        next();
      }
    });
};
