# Deployment checklist

1. Provision Postgres and Redis.
2. Apply `infra/migrations`.
3. Create Vercel projects for `apps/admin` and `apps/public`.
4. Create Render or Heroku services for `apps/api` and `apps/worker`.
5. Set environment variables from `.env.example`.
6. Register messaging senders, complete A2P/TCR setup, and secure Campaign Verify token storage.
7. Configure Twilio inbound and status callbacks to the API service.
8. Run Jest and Playwright smoke tests in CI before promotion.
9. Confirm disclosure rendering on each tenant domain before cutover.

## Messaging Onboarding Timeline

- 10DLC review can take approximately 10-15 days.
- Short codes can take approximately 6-10 weeks.
- Start registration immediately, especially for political use cases and Campaign Verify dependencies.

