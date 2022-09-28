
//this may or may not make sense -- just
const DataTypes
const SECRET
const sequelizDatabase

const UsersModel = sequelizeDatabase.define('Users', {
  username: {
    type: DataTypes.STRING,
    allownull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM,
    values: ['user', 'writer', 'editor', 'admin'],
    defaultValue: 'user',
  },
  token: {
    type: DataTypes.VIRTUAL,
    get() {
      return jwt.sign({username: this.username}), SECRET, {expiresIn: 86400000};
    },
    set(token) {
      let tokenObj = jwt.sign(token, SECRET, {expiresIn: 86400000});
      return tokenObj;
    },

  },
  capabilities: {
    type: DataTypes.VIRTUAL,
    get() {
      const acl = {
        user: ['read'],
        writer: ['read', 'ceate'],
        editor: ['read', 'create', 'update'],
        admin: ['read', 'create', 'update', 'delete'],
      };
      return acl[this.role];
    },
  },
});
