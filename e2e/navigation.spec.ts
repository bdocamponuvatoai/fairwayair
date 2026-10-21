import { expect, test } from "./fixtures";

test.describe("mobile navigation", () => {
  test.skip(({ isMobile }) => !isMobile, "Mobile-only layout");

  test("menu opens, closes with Escape, and navigates", async ({ page }) => {
    await page.goto("/");
    const menu = page.getByRole("dialog", { name: "Menu" });

    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(menu).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();

    await page.getByRole("button", { name: "Open menu" }).click();
    await menu.getByRole("link", { name: /Service area/ }).click();
    await expect(menu).toBeHidden();
    await expect(page).toHaveURL(/#areas$/);
    await expect(page.locator("#areas")).toBeInViewport();
  });

  test("action bar appears after the hero", async ({ page }) => {
    await page.goto("/");
    const call = page.getByRole("link", { name: "Call", exact: true });
    await expect(call).not.toBeInViewport();
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.5));
    await expect(call).toBeInViewport();
  });
});

test.describe("desktop navigation", () => {
  test.skip(({ isMobile }) => isMobile, "Desktop-only layout");

  test("skip link is the first tab stop", async ({ page, browserName }) => {
    test.skip(browserName === "webkit", "Safari skips links on Tab by default");
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  });

  test("header turns solid on scroll", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header").first();
    await expect(header).toHaveAttribute("data-theme", "dark");
    await page.evaluate(() => window.scrollTo(0, 800));
    await expect(header).not.toHaveAttribute("data-theme", "dark");
  });
});
