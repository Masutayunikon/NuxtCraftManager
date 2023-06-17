import User, { UserMap } from "../../utils/models/user";
import Token, { TokenMap } from "../../utils/models/token";
import sequelize from "../../utils/sequelize";
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    // check if url is /login
    if (event.path === '/login' || event.path === '/api/auth/login') {
        return;
    }

    // get token from cookie
    const token = getCookie(event, 'token');

    if (!token) {
        return sendRedirect(event, '/login');
    }

    // get user from token
    TokenMap(sequelize);

    const tokenRecord = await Token.findOne({ where: { token_value: token } });

    if (!tokenRecord) {
        return sendRedirect(event, '/login');
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
        return sendRedirect(event, '/login');
    }

    UserMap(sequelize);

    if (!await User.findOne({ where: { id: tokenRecord.user_id } })) {
        return sendRedirect(event, '/login');
    }

    return;
})
