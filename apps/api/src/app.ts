import express from "express";
import pinoHttp from "pino-http";
import { healthRouter } from "./routes/health";
import { messagingRouter } from "./routes/messaging";
import { contentRouter } from "./routes/content";
import { seoRouter } from "./routes/seo";
import { sitesRouter } from "./routes/sites";
import { trackingRouter } from "./routes/tracking";
import { webhooksRouter } from "./routes/webhooks";

export function createApp() {
  const app = express();

  app.use(
    pinoHttp({
      redact: {
        paths: ["req.headers.authorization", "req.body.token", "req.body.authToken"],
        censor: "[REDACTED]"
      }
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/auth/me", (_req, res) => {
    res.json({
      user: {
        id: "00000000-0000-0000-0000-000000000001",
        role: "admin"
      }
    });
  });
  app.use("/health", healthRouter);
  app.use("/seo", seoRouter);
  app.use("/sites", sitesRouter);
  app.use("/messaging", messagingRouter);
  app.use("/content", contentRouter);
  app.use("/", trackingRouter);
  app.use("/webhooks", webhooksRouter);

  return app;
}
