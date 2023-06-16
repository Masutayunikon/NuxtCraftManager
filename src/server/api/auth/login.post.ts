import User, { UserMap } from "../../../utils/models/user";
import Token, { TokenMap } from "../../../utils/models/token";
import sequelize from "../../../utils/sequelize";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {

    const { email, password } = await readBody(event);

    if (!email || !password) {
        return createError({
            statusCode: 400,
            message: 'Missing required fields',
        });
    }

    UserMap(sequelize);

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return createError({
            statusCode: 400,
            message: 'Invalid username or password',
        });
    }

    // bcrypt compare password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return createError({
            statusCode: 400,
            message: 'Invalid username or password',
        });
    }

    // create token
    TokenMap(sequelize);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1 day' });

    const tokenRecord = await Token.create({
        user_id: user.id,
        token_value: token,
        expiration_date: new Date(Date.now() + 86400000),
    });

    if (!tokenRecord) {
        return createError({
            statusCode: 500,
            message: 'Error creating token',
        });
    }

    return {
        statusCode: 200,
        message: 'Successfully logged in',
        token,
    }
})
