import User, { UserMap } from "../../../utils/models/user";
import Token, { TokenMap } from "../../../utils/models/token";
import sequelize from "../../../utils/sequelize";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {

    const { username, password, email } = await readBody(event);

    if (!username || !password || !email) {
        return createError({
            statusCode: 400,
            message: 'Missing required fields',
        });
    }

    UserMap(sequelize);

    if (await User.findOne({ where: { email } })) {
        return createError({
            statusCode: 400,
            message: 'User already exists',
        });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));

    const hashedPassword = await bcrypt.hash(password, salt);

    if (!hashedPassword) {
        return createError({
            statusCode: 500,
            message: 'Error hashing password',
        });
    }



    const user = await User.create({
        username,
        password: hashedPassword,
        email,
    });

    if (!user) {
        return createError({
            statusCode: 500,
            message: 'Error creating user',
        });
    }

    // set status code to 201)
    return {
        statusCode: 201,
        message: 'Successfully registered',
    }
})
