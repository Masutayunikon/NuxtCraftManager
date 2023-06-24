import User, { UserMap } from "../../utils/models/user";
import Token, { TokenMap } from "../../utils/models/token";
import sequelize from "../../utils/sequelize";
import jwt from 'jsonwebtoken';
import { getHeader } from "h3"

export default defineEventHandler(async (event) => {
    // check if url is /login
    return;
    if (!event.path.startsWith('/api')) {
        return;
    }
    if (event.path === '/api/auth/login') {
        return;
    }

    // get token from authorization header Bearer token
    const token = getHeader(event, 'authorization')?.split(' ')[1];

    if (!token) {
        return sendRedirect(event, '/login');
    }

    // get user from token
    TokenMap(sequelize);

    const tokenRecord = await Token.findOne({ where: { token_value: token } });

    if (!tokenRecord) {
        return sendRedirect(event, '/login');
    }

    let decodedToken;

    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return sendRedirect(event, '/login');
    }

    if (!decodedToken) {
        return sendRedirect(event, '/login');
    }

    UserMap(sequelize);

    if (!await User.findOne({ where: { id: tokenRecord.user_id } })) {
        return sendRedirect(event, '/login');
    }

    return;
})
