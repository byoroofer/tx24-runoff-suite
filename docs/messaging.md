# Messaging subsystem

## Supported sender types

- 10DLC
- Toll-free
- Short code

## Queueing rules

- All outbound sends must go through BullMQ.
- Consent and suppression checks run before enqueue and again immediately before provider dispatch.
- Rate limits are enforced per queue worker.
- Direct request-response sends are prohibited.

## Twilio / A2P / TCR / Campaign Verify notes

- A2P 10DLC review can take approximately 10-15 days.
- Short code approval can take approximately 6-10 weeks.
- Political traffic must use the correct special use case and Campaign Verify support where required.
- Snowshoeing, number rotation, and other program-evasion tactics are prohibited.

## Example cost model assumptions

- Base Twilio US SMS send/receive assumption: `$0.0083`
- Carrier surcharges: configurable placeholder
- TCR monthly brand/campaign fees: configurable placeholder

Example outbound costs before surcharges:

- 10,000 SMS: `$83.00`
- 100,000 SMS: `$830.00`
- 1,000,000 SMS: `$8,300.00`

These examples are illustrative only and should be overridden with current platform pricing before launch.

