module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      field: 'first_name',
      type: DataTypes.STRING
    },
    lastName: {
      field: 'last_name',
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING
    },
    paymentOption: {
      field: 'payment_option',
      type: DataTypes.INTEGER(4)
    },
    address: {
      type: DataTypes.TEXT
    },
    avatarUrl: {
      field: 'avatar_url',
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    registrationService: {
      field: 'registration_service',
      type: DataTypes.INTEGER(11)
    },
    externalUserId: {
      field: 'external_user_id',
      type: DataTypes.BIGINT
    },
    token: {
      type: DataTypes.STRING
    },
    tokenExpiresAt: {
      field: 'token_expires_at',
      type: DataTypes.DATE
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE
    }
  }, {
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
};
