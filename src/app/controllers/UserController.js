import User from '../models/User';

class UserController {
  async store(req, res, next) {
    const checkUserExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (checkUserExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, password } = await User.create(req.body);
    return res.json({ id, name, email });
  }

  async index(req, res, next) {
    const users = await User.findAll({ attributes: ['id', 'name', 'email'] });

    return res.json(users);
  }

  async update(req, res, next) {
    return res.json({ message: 'this is an update' });
  }

  async show(req, res, next) {
    return res.json({ message: 'this is a show' });
  }

  async delete(req, res, next) {
    return res.json({ message: 'this is a delete' });
  }
}
export default new UserController();
