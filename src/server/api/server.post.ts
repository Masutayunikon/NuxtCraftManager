import { serverCreate } from '../../utils/server';

export default defineEventHandler(async (event) => {
   const body = await readBody(event);

   console.log(body);

   serverCreate(body.type, body.category, body.version);

   return {
      statusCode: 200,
      body
   }
});
