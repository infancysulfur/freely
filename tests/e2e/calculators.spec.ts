import { expect, test } from "@playwright/test";

test("calculators page links to key MVP calculators", async ({ page }) => {
  await page.goto("/calculators");

  await expect(page.getByRole("heading", { name: "금융 계산기" })).toBeVisible();
  await expect(page.getByRole("link", { name: /복리 계산기/ })).toHaveAttribute(
    "href",
    "/calculators/investment/compound",
  );
  await expect(page.getByRole("link", { name: /FIRE 계산기/ })).toHaveAttribute(
    "href",
    "/calculators/fire",
  );
});

test("compound calculator renders input and result areas", async ({ page }) => {
  await page.goto("/calculators/investment/compound");

  await expect(page.getByRole("heading", { name: "복리 계산기" })).toBeVisible();
  await expect(page.getByLabel("초기 투자금")).toBeVisible();
  await expect(page.getByText("예상 최종 자산")).toBeVisible();
});

test("fire calculator renders core result and progress", async ({ page }) => {
  await page.goto("/calculators/fire");

  await expect(page.getByRole("heading", { name: "FIRE 계산기" })).toBeVisible();
  await expect(page.getByLabel("월 생활비")).toBeVisible();
  await expect(page.getByText("당신의 FIRE 목표자산")).toBeVisible();
  await expect(page.getByText(/현재 FIRE 달성률/)).toBeVisible();
});
