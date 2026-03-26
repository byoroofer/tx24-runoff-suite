# Compliance gates

## Election timing constants

- Registration deadline: `2026-04-27`
- Early voting: `2026-05-18` through `2026-05-22`
- Election day: `2026-05-26`

## Enforced controls

- Locked disclosure blocks on public pages always include `political advertising`.
- SMS sends require proof-of-consent before enqueue and again before provider dispatch.
- STOP-family inbound keywords create immediate suppression within tenant scope.
- Publishing cannot proceed without provenance.
- Near-duplicate publishing is blocked by similarity scoring unless an override is audited.
- Altered image and deepfake assets require compliance approval; altered images also require an `IMAGE IS ALTERED` label artifact.
- AI generation can assist drafting and classification, but cannot publish or send without human review.

## QA checklist

1. Confirm every public page renders a disclosure footer.
2. Attempt SMS enqueue without proof artifact and verify rejection.
3. Submit inbound `STOP` and verify suppression prevents the next enqueue attempt.
4. Submit near-duplicate content and verify publish is blocked with a machine-readable reason.
5. Submit altered image content without label proof and verify block.
6. Review compliance center warnings for TCR/Campaign Verify timelines before go-live.

## Escalation runbook

- Compliance override requires `admin` or `compliance` role and an append-only audit log entry.
- Altered-media issues escalate to compliance review immediately.
- Suspected false-source or deepfake content inside the warning window must not publish until compliance signs off.
- Twilio signature failures must be treated as suspicious inbound traffic and logged without processing.

