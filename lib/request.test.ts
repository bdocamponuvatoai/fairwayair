import assert from "node:assert/strict";
import { test } from "node:test";
import { createMailtoHref, createRequestMessage, isServiceOption, validateRequest } from "./request.ts";

const sample = {
  service: "A/C repair",
  name: "  Test Resident  ",
  phone: "760-555-0123",
  city: "Palm Desert",
  details: "Warm air & unusual sound.",
};

test("message trims the name and keeps entered details verbatim", () => {
  const message = createRequestMessage(sample);
  assert.ok(message.includes("Name: Test Resident\n"));
  assert.ok(message.endsWith("\nTest Resident"));
  assert.ok(message.includes("Warm air & unusual sound."));
});

test("message never claims a confirmed booking", () => {
  const message = createRequestMessage(sample);
  assert.ok(message.includes("appointment availability"));
  assert.ok(!/confirmed|booked|scheduled for/i.test(message));
});

test("empty details fall back to a phone conversation", () => {
  const message = createRequestMessage({ ...sample, details: "   " });
  assert.ok(message.includes("discuss the details by phone"));
});

test("mailto link encodes subject and body", () => {
  const href = createMailtoHref("owner@example.com", sample);
  assert.ok(href.startsWith("mailto:owner@example.com?subject="));
  assert.ok(href.includes(encodeURIComponent("Warm air & unusual sound.")));
  assert.ok(!href.includes(" "));
});

test("validation requires a service, a name, and a 10-digit phone", () => {
  assert.deepEqual(validateRequest({ service: "", name: " ", phone: "555-0123" }), {
    service: "Choose a service to continue.",
    name: "Enter your name.",
    phone: "Enter a phone number with at least 10 digits.",
  });
  assert.deepEqual(validateRequest({ service: "Maintenance", name: "Ana", phone: "(760) 555-0123" }), {});
});

test("service options are recognised strictly", () => {
  assert.ok(isServiceOption("Maintenance"));
  assert.ok(!isServiceOption("maintenance"));
  assert.ok(!isServiceOption(undefined));
});
