import User, { UserMap } from "../../utils/models/user";
import sequelize from "../../utils/sequelize";

export default defineEventHandler(async (event) => {
    UserMap(sequelize);

    const users = await User.findAll();

    return {
        statusCode: 200,
        users
    };
});
