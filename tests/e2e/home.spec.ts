import { expect, test } from "@playwright/test";

test("home page exposes the FREELY service name", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /돈을 계산하고/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "계산기 둘러보기" })).toBeVisible();
});
