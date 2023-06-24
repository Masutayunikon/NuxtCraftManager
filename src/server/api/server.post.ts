import { serverCreate } from '../../utils/server';
import Token, { TokenMap } from "../../utils/models/token";
import Server, { ServerMap } from "../../utils/models/server";
import sequelize from "../../utils/sequelize";
import {getHeader} from "h3";

export default defineEventHandler(async (event) => {
   const body = await readBody(event);

   // create random id 50 characters long
    const idServer = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // get user id from token
   const token = getHeader(event, 'authorization')?.split(' ')[1];

    TokenMap(sequelize);

    const tokenRecord = await Token.findOne({ where: { token_value: token } });

    if (!tokenRecord) {
        return sendRedirect(event, '/login');
    }

    let user_id = tokenRecord.user_id;

    // create server
    ServerMap(sequelize);

    const serverRecord = await Server.create({
       server_id: idServer,
       user_id: user_id,
       name: body.name,
       memory_min: body.memory_min,
       memory_max: body.memory_max,
       state: "stopped",
    })

    if (!serverRecord) {
         return createError({
             statusCode: 500,
             message: 'Error creating server',
         });
    }

    await serverCreate(idServer, body.type, body.category, body.version);

   return {
      statusCode: 200,
      message: 'Successfully created server',
   }
});
