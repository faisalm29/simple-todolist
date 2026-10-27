import configureOpenAPI from "./lib/configure-open-api";
import createApp from "./lib/create-app";
import { registerRoutes } from "./routes";

const app = registerRoutes(createApp());
configureOpenAPI(app);

export default app;

// import { Hono } from 'hono'

// const app = new Hono()

// app.get('/', (c) => {
//   return c.text('Hello Hono!')
// })

// export default app
