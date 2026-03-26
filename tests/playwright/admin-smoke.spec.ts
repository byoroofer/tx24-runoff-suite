import { test, expect } from "@playwright/test";

test("admin shell shows compliance-first messaging", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Compliance-first campaign operating system")).toBeVisible();
  await expect(page.getByText("A2P / TCR / Campaign Verify")).toBeVisible();
});

