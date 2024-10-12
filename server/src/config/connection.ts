import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

// Create a new Sequelize instance
const sequelize = process.env.DB_URL
  ? // If the DB_URL environment variable is set, use it to connect to the database
    new Sequelize(process.env.DB_URL, {
      dialect: "postgres",
      dialectOptions: {
        decimalNumbers: true,
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : // Otherwise, use the environment variables for the database connection
    new Sequelize(
      process.env.DB_NAME || "",
      process.env.DB_USER || "",
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "postgres",
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );

export default sequelize;
