import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }

      return this;
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;

// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define(
//     'User',
//     {
//       name: DataTypes.STRING,
//       email: DataTypes.STRING,
//       password_hash: DataTypes.STRING,
//     },
//     {}
//   );
//   User.associate = function(models) {
//     // associations can be defined here
//   };
//   return User;
// };
