import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import bcrypt from "bcrypt";

// Define the attributes of the User model
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
}

// Define the attributes of the User model that can be null
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// Define the User model
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Hash the password before saving the user
  public async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }

  // Method to verify password
  public async verifyPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

// Define the User model factory
export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: true,
      sequelize,
      hooks: {
        beforeCreate: async (user: User) => {
          if (user.password) {
            await user.setPassword(user.password);
          }
        },
        beforeUpdate: async (user: User) => {
          if (user.changed("password")) {
            await user.setPassword(user.password);
          }
        },
      },
    }
  );

  return User;
}
