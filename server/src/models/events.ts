import { DataTypes, Sequelize, Model, Optional } from "sequelize";
//import { User } from "./user.js";

interface EventAttributes {
  id: number;
  title: string;
  date: Date;
  address: string;
  thumbnail: string;
  link: string;
  // assignedUserId?: number;
}

interface EventCreationAttributes extends Optional<EventAttributes, "id"> {}

export class Event
  extends Model<EventAttributes, EventCreationAttributes>
  implements EventAttributes
{
  public id!: number;
  public title!: string;
  public date!: Date;
  public address!: string;
  public thumbnail!: string;
  public link!: string;
  // public assignedUserId!: number;

  // public readonly assignedUser?: User;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function EventFactory(sequelize: Sequelize): typeof Event {
  Event.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // assignedUserId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      // },
    },
    {
      tableName: "events",
      timestamps: false,
      sequelize,
    }
  );

  return Event;
}
