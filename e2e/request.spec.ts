import { expect, test } from "./fixtures";

test.describe("service request", () => {
  test("validates, carries the community, and builds the email draft", async ({ page }) => {
    await page.goto("/#areas");
    await page.getByRole("button", { name: "Indio", pressed: false }).click();
    await page.getByRole("button", { name: "Request in Indio" }).click();

    const sheet = page.getByRole("dialog", { name: "Service request" });
    await expect(sheet.getByRole("heading", { name: "What can we help with?" })).toBeFocused();

    await sheet.getByRole("button", { name: "Continue" }).click();
    await expect(sheet.getByRole("alert")).toHaveText("Choose a service to continue.");

    await sheet.locator("label", { hasText: "Heating service" }).click();
    await sheet.getByRole("button", { name: "Continue" }).click();
    await expect(sheet.getByLabel("Your community")).toHaveValue("Indio");

    await sheet.getByRole("button", { name: "Review request" }).click();
    await expect(sheet.getByLabel("Your name")).toHaveAttribute("aria-invalid", "true");
    await expect(sheet.getByLabel("Your name")).toBeFocused();

    await sheet.getByLabel("Your name").fill("  Ana Ruiz ");
    await sheet.getByLabel("Phone number").fill("760 555 0123");
    await sheet.getByLabel(/What have you noticed/).fill("Furnace clicks & won't light.");
    await sheet.getByRole("button", { name: "Review request" }).click();

    await expect(sheet.getByRole("heading", { name: "Your draft is ready." })).toBeFocused();
    const href = await sheet.getByRole("link", { name: /Open email draft/ }).getAttribute("href");
    expect(href).toMatch(/^mailto:fairwayair2021@gmail\.com\?subject=/);
    const body = decodeURIComponent(href!);
    expect(body).toContain("Service request — Heating service in Indio");
    expect(body).toContain("Name: Ana Ruiz\n");
    expect(body).toContain("Furnace clicks & won't light.");

    await page.keyboard.press("Escape");
    await expect(sheet).toBeHidden();
  });

  test("service rows preselect the service and open on details", async ({ page }) => {
    await page.goto("/#services");
    await page.getByRole("button", { name: /Ask about cooling/ }).click();
    const sheet = page.getByRole("dialog", { name: "Service request" });
    await expect(sheet.getByRole("heading", { name: "A little about you." })).toBeVisible();
    await expect(sheet.getByText("A/C repair", { exact: true })).toBeVisible();
  });

  test("returns focus to the trigger on close", async ({ page, isMobile }) => {
    test.skip(isMobile, "Header trigger is desktop-only");
    await page.goto("/");
    const trigger = page.locator("header > div").getByRole("button", { name: "Request service" });
    await trigger.click();
    const sheet = page.getByRole("dialog", { name: "Service request" });
    await expect(sheet).toBeVisible();
    await sheet.getByRole("button", { name: "Close service request" }).click();
    await expect(sheet).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});
