import { expect, test } from "@jest/globals";
import { buildDisclosureText } from "../../packages/shared/src";

test("disclosure text always includes political advertising phrase", () => {
  const disclosure = buildDisclosureText({
    paidForBy: "TX-24 Runoff Digital Committee",
    authorizedBy: "TX-24 Runoff Digital Committee"
  });

  expect(disclosure).toContain("political advertising");
  expect(disclosure).toContain("Paid for by");
  expect(disclosure).toContain("Authorized by");
});
