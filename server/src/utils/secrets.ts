export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
export const COOKIE_KEY = process.env.COOKIE_KEY as string;

//   app.addHook("onRequest", async function (request, reply) {
//     const authHeader = request.headers.authorization;

//     if (!authHeader) {
//       return;
//     }

//     try {
//       const token = authHeader.replace("Bearer ", "");
//       const decoded = jwt.verify(token, "secret") as User;

//       console.log("user", decoded);

//       request.user = decoded;
//     } catch (e) {}
//   });

//   // register plugins
//   app.register(guard, {
//     requestProperty: "user",
//     scopeProperty: "scopes",
//     errorHandler: (result, request, reply) => {
//       return reply.send("you can not do that");
//     },