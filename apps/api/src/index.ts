import { createApp } from "./app";
import { getEnv } from "./env";

const env = getEnv();
const app = createApp();

app.listen(env.PORT, () => {
  console.log(`tx24-api listening on ${env.PORT}`);
});

