import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user';

// Event attributes interface
interface EventAttributes {
  id: number;
  title: string;
  status: string;
  description: string;
  organizerId: number; // Assuming an event has an organizer (User model)
  date: Date; // Assuming events have a date
}

// Event creation attributes interface with id as optional
interface EventCreationAttributes extends Optional<EventAttributes, 'id'> {}

// Event model definition
export class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
  public id!: number;
  public title!: string;
  public status!: string;
  public description!: string;
  public organizerId!: number;
  public date!: Date;

  // Associated User model (Organizer)
  public readonly organizer?: User;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Event factory function for initializing the Event model
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
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      organizerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'events',
      sequelize,
    }
  );

  return Event;
}
