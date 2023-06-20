import User, { UserMap } from "../../utils/models/user";
import Token, { TokenMap } from "../../utils/models/token";
import sequelize from "../../utils/sequelize";

export default defineEventHandler(async (event) => {
    UserMap(sequelize);
    TokenMap(sequelize);


    const { id } = await readBody(event);


    const user = await User.findOne({ where: { id } });

    if (!user) {
        return createError({
            statusCode: 404,
            message: 'User not found',
        });
    }

    await Token.destroy({ where: { user_id: user.id } });

    await user.destroy();

    return {
        statusCode: 200,
        message: 'Successfully deleted user',
    };
});
