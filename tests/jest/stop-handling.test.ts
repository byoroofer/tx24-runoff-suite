import { expect, test } from "@jest/globals";
import { extractStopKeyword, shouldSuppressFromInbound } from "../../packages/shared/src";

test("matches STOP-family keywords case-insensitively", () => {
  expect(extractStopKeyword("stop")).toBe("STOP");
  expect(extractStopKeyword("Unsubscribe")).toBe("UNSUBSCRIBE");
});

test("suppresses when inbound body is a stop keyword", () => {
  expect(shouldSuppressFromInbound("QUIT")).toBe(true);
  expect(shouldSuppressFromInbound("hello there")).toBe(false);
});
