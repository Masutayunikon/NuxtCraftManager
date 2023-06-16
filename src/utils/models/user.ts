import { Model, Sequelize, DataTypes } from 'sequelize';

export default class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
    public email!: string;
    public created_at!: Date;
    public updated_at!: Date;
}

export const UserMap = (sequelize: Sequelize) => {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
            created_at: {
                type: DataTypes.DATE,
            },
            updated_at: {
                type: DataTypes.DATE,
            },
        }, {
            sequelize,
            tableName: 'users',
            timestamps: false,
        }
    );
    User.sync();
}

export const isUser = (obj: any): obj is User => {
    return obj instanceof User;
}

