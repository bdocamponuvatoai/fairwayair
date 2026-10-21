import { expect, test } from "./fixtures";

test.describe("home page", () => {
  test("renders one h1, sections, and contact routes", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Desert outside.");
    for (const id of ["services", "approach", "areas", "faq"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
    await expect(page.locator("main a[href='tel:+17605749788']").first()).toBeVisible();
  });

  test("has no horizontal overflow", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("sends production security headers", async ({ page }) => {
    const response = await page.goto("/");
    const headers = response!.headers();
    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-powered-by"]).toBeUndefined();
  });

  test("keeps all content visible with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const hidden = await page
      .locator("[data-reveal]")
      .evaluateAll((els) => els.filter((el) => getComputedStyle(el).opacity !== "1").length);
    expect(hidden).toBe(0);
    await expect(page.getByText("72 degrees Fahrenheit")).toBeAttached();
  });

  test("FAQ disclosures open", async ({ page }) => {
    await page.goto("/#faq");
    await page.getByText("Does an online request confirm my appointment?").click();
    await expect(page.getByText(/confirmed only after Fairway Air responds/)).toBeVisible();
  });

  test("service-area selector updates the card", async ({ page }) => {
    await page.goto("/#areas");
    await page.getByRole("button", { name: "La Quinta", pressed: false }).click();
    await expect(page.getByRole("button", { name: "La Quinta", pressed: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Request in La Quinta" })).toBeVisible();
  });
});

test.describe("other routes", () => {
  test("privacy page", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("You’re in control.");
    await expect(page).toHaveTitle(/Privacy/);
  });

  test("unknown routes return the branded 404", async ({ page, pageErrors }) => {
    const response = await page.goto("/does-not-exist");
    expect(response?.status()).toBe(404);
    // The browser logs the 404 document itself; that one is expected.
    pageErrors.splice(0, pageErrors.length, ...pageErrors.filter((e) => !/status of 404/.test(e)));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page has gone quiet.");
  });

  test("robots and sitemap are served", async ({ request }) => {
    expect((await request.get("/robots.txt")).ok()).toBe(true);
    expect(await (await request.get("/sitemap.xml")).text()).toContain("/privacy");
  });
});
