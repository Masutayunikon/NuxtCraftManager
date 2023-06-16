import { Model, Sequelize, DataTypes } from 'sequelize';

export default class Token extends Model {
    public id!: number;
    public user_id!: number;
    public token_value!: string;
    public expiration_date!: Date;
}

export const TokenMap = (sequelize: Sequelize) => {
    Token.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            token_value: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            expiration_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: 'tokens',
            timestamps: false,
        }
    );
    Token.sync();
}
