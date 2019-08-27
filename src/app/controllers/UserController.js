import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.email().required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const checkUserExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (checkUserExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, password } = await User.create(req.body);
    return res.json({ id, name, email });
  }

  async index(req, res) {
    const users = await User.findAll({ attributes: ['id', 'name', 'email'] });

    return res.json(users);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string().when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),

      confirmPassoword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const checkUserExists = await User.findOne({
        where: { email },
      });

      if (checkUserExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(400).json({ error: 'Password does not match' });
    }
    const { id, name } = await user.update(req.body);

    return res.json({ id, name, email });
  }

  async show(req, res, next) {
    return res.json({ message: 'this is a show' });
  }

  async delete(req, res, next) {
    return res.json({ message: 'this is a delete' });
  }
}
export default new UserController();
