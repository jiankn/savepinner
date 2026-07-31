import assert from "node:assert/strict";
import test from "node:test";

import {
  PinterestUrlError,
  isPinterestHost,
  isPinterestUrl,
  normalizePinterestUrl,
  parsePinterestUrl,
} from "../dist/index.js";

test("parses and normalizes Pin URLs", () => {
  assert.deepEqual(
    parsePinterestUrl("https://de.pinterest.com/pin/987654321/?utm_source=test"),
    {
      kind: "pin",
      originalUrl: "https://de.pinterest.com/pin/987654321/?utm_source=test",
      normalizedUrl: "https://www.pinterest.com/pin/987654321/",
      host: "www.pinterest.com",
      pinId: "987654321",
    },
  );
});

test("extracts the numeric ID from slugged Pin URLs", () => {
  const result = parsePinterestUrl(
    "https://www.pinterest.com/pin/roasted-pineapple-chicken--68746366275/",
  );
  assert.equal(result.kind, "pin");
  assert.equal(result.pinId, "68746366275");
});

test("recognizes pin.it short URLs without resolving them", () => {
  assert.deepEqual(parsePinterestUrl("https://pin.it/AbC123?source=share"), {
    kind: "short",
    originalUrl: "https://pin.it/AbC123?source=share",
    normalizedUrl: "https://pin.it/AbC123/",
    host: "pin.it",
    shortcode: "AbC123",
  });
});

test("classifies profile, board, and Ideas URLs", () => {
  assert.equal(parsePinterestUrl("https://pinterest.com/savepinner/").kind, "profile");
  assert.deepEqual(parsePinterestUrl("https://www.pinterest.com/savepinner/media-tools/"), {
    kind: "board",
    originalUrl: "https://www.pinterest.com/savepinner/media-tools/",
    normalizedUrl: "https://www.pinterest.com/savepinner/media-tools/",
    host: "www.pinterest.com",
    username: "savepinner",
    boardSlug: "media-tools",
  });
  assert.deepEqual(
    parsePinterestUrl("https://www.pinterest.com/ideas/space-wallpaper-4k/926295399832/"),
    {
      kind: "ideas",
      originalUrl: "https://www.pinterest.com/ideas/space-wallpaper-4k/926295399832/",
      normalizedUrl: "https://www.pinterest.com/ideas/space-wallpaper-4k/926295399832/",
      host: "www.pinterest.com",
      ideaSlug: "space-wallpaper-4k",
      ideaId: "926295399832",
    },
  );
});

test("rejects lookalike hosts, HTTP, credentials, and reserved paths", () => {
  const invalid = [
    "https://www.pinterest.com.evil.example/pin/123/",
    "http://www.pinterest.com/pin/123/",
    "https://user:pass@www.pinterest.com/pin/123/",
    "https://www.pinterest.com/search/pins/?q=cats",
  ];

  for (const value of invalid) {
    assert.equal(isPinterestUrl(value), false, value);
    assert.throws(() => parsePinterestUrl(value), PinterestUrlError);
  }
});

test("exposes normalization and exact host helpers", () => {
  assert.equal(
    normalizePinterestUrl("https://pinterest.co.uk/pin/123/?foo=bar"),
    "https://www.pinterest.com/pin/123/",
  );
  assert.equal(isPinterestHost("PINTEREST.CO.UK"), true);
  assert.equal(isPinterestHost("pinterest.co.uk.evil.example"), false);
});
