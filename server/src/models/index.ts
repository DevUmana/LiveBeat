import sequelize from "../config/connection.js";
import { UserFactory } from "./user.js";
import { EventFactory } from "./events.js";

// Create a new Sequelize instance
const sequelizeConfig = sequelize;

// Define the User and Event models
const User = UserFactory(sequelizeConfig);
const Event = EventFactory(sequelizeConfig);

// Define the associations
// A user can have many events and an event belongs to a user
User.hasMany(Event, { foreignKey: "userId", onDelete: "CASCADE" });
Event.belongsTo(User, { foreignKey: "userId" });

export { sequelizeConfig, User, Event };
