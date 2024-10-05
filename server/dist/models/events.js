import { DataTypes, Model } from 'sequelize';
// Event model definition
export class Event extends Model {
}
// Event factory function for initializing the Event model
export function EventFactory(sequelize) {
    Event.init({
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
    }, {
        tableName: 'events',
        sequelize,
    });
    return Event;
}
