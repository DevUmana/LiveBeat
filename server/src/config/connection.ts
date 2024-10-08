import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true, // Enforce SSL
          rejectUnauthorized: false, // This allows self-signed certificates, if any
        },
      },
    })
  : new Sequelize(
      process.env.DB_NAME || "",
      process.env.DB_USER || "",
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "postgres",
        dialectOptions: {
          decimalNumbers: true,
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    );

export default sequelize;
