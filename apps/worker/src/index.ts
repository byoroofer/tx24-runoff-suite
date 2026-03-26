import { createMessagingWorker } from "./jobs/messaging-dispatcher";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  console.error("REDIS_URL is required for the worker process.");
  process.exit(1);
}

createMessagingWorker(redisUrl);
console.log("tx24-worker listening for queue jobs");

