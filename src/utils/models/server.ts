import { Model, Sequelize, DataTypes } from 'sequelize';

export default class Server extends Model {
    public id!: number
    public server_id: string
    public type: string
    public category: string
    public version: string
    public name: string
    public memory_min: number
    public memory_max: number
    public state: string
    public user_id: number
}

/* here the sql of the table

CREATE TABLE servers (
                         id SERIAL,
                         server_id VARCHAR(255) NOT NULL,
                         name VARCHAR(255) NOT NULL,
                         type VARCHAR(50) NOT NULL,
                         category VARCHAR(50) NOT NULL,
                         version VARCHAR(50) NOT NULL,
                         memory_min INTEGER,
                         memory_max INTEGER,
                         state VARCHAR(20),
                         user_id INTEGER REFERENCES users(id),
                         PRIMARY KEY (id, server_id)
);


*/

export const ServerMap = (sequelize: Sequelize) => {
    Server.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        server_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        version: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        memory_min: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        memory_max: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'servers',
        timestamps: false
    });
    Server.sync();
}

