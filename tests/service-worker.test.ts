import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, expect, it, vi } from "vitest";

describe("service worker navigation lifecycle", () => {
  it("registers cache refresh work before the fetch event handler returns", async () => {
    const listeners = new Map<string, (event: unknown) => void>();
    const response = new Response("ok");
    const responsePromises: Promise<Response>[] = [];
    let dispatching = true;

    const waitUntil = vi.fn((promise: Promise<unknown>) => {
      if (!dispatching) throw new DOMException("event handler finished", "InvalidStateError");
      void promise;
    });

    runInNewContext(readFileSync("public/sw.js", "utf8"), {
      URL,
      caches: {
        delete: vi.fn(),
        keys: vi.fn(async () => []),
        match: vi.fn(async () => undefined),
        open: vi.fn(async () => ({
          addAll: vi.fn(),
          put: vi.fn(async () => undefined),
        })),
      },
      fetch: vi.fn(async () => response),
      self: {
        clients: { claim: vi.fn() },
        location: { origin: "https://savepinner.com" },
        skipWaiting: vi.fn(),
        addEventListener: (type: string, listener: (event: unknown) => void) => {
          listeners.set(type, listener);
        },
      },
    });

    const fetchListener = listeners.get("fetch");
    expect(fetchListener).toBeTypeOf("function");

    fetchListener?.({
      request: {
        method: "GET",
        mode: "navigate",
        url: "https://savepinner.com/",
      },
      respondWith: (promise: Promise<Response>) => responsePromises.push(promise),
      waitUntil,
    });
    dispatching = false;

    expect(waitUntil).toHaveBeenCalledTimes(1);
    await expect(responsePromises[0]).resolves.toBe(response);
  });
});
