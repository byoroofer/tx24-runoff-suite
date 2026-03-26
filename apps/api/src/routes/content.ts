import { Router } from "express";
import { evaluatePublication, publishGovernanceInputSchema } from "@tx24/shared";

export const contentRouter = Router();

contentRouter.post("/publish", (req, res) => {
  const parsed = publishGovernanceInputSchema.parse(req.body);
  const evaluation = evaluatePublication(parsed);

  if (evaluation.blocked) {
    return res.status(422).json({
      ok: false,
      error: "PUBLISH_GOVERNANCE_BLOCKED",
      reasons: evaluation.reasons,
      similarityScore: evaluation.similarityScore
    });
  }

  return res.status(200).json({ ok: true, published: true, similarityScore: evaluation.similarityScore });
});

