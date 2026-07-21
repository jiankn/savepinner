import { describe, expect, it } from "vitest";
import { isPrivateOrReservedIp } from "@/lib/net-guard";

describe("isPrivateOrReservedIp", () => {
  it("flags private/reserved IPv4 ranges", () => {
    const blocked = [
      "0.0.0.0",
      "10.0.0.1",
      "10.255.255.255",
      "100.64.0.1",
      "127.0.0.1",
      "127.1.2.3",
      "169.254.1.1",
      "172.16.0.1",
      "172.31.255.255",
      "192.0.0.1",
      "192.0.2.1",
      "192.168.0.1",
      "198.18.0.1",
      "198.51.100.1",
      "203.0.113.1",
      "224.0.0.1",
      "255.255.255.255",
    ];
    for (const ip of blocked) {
      expect(isPrivateOrReservedIp(ip), ip).toBe(true);
    }
  });

  it("allows public IPv4", () => {
    for (const ip of ["8.8.8.8", "1.1.1.1", "151.101.0.81", "172.32.0.1", "11.0.0.1"]) {
      expect(isPrivateOrReservedIp(ip), ip).toBe(false);
    }
  });

  it("flags loopback, ULA and link-local IPv6", () => {
    expect(isPrivateOrReservedIp("::1")).toBe(true);
    expect(isPrivateOrReservedIp("fc00::1")).toBe(true);
    expect(isPrivateOrReservedIp("fd00::1")).toBe(true);
    expect(isPrivateOrReservedIp("fe80::1")).toBe(true);
  });

  it("flags IPv4-mapped IPv6 private addresses", () => {
    expect(isPrivateOrReservedIp("::ffff:127.0.0.1")).toBe(true);
    expect(isPrivateOrReservedIp("::ffff:192.168.1.1")).toBe(true);
    expect(isPrivateOrReservedIp("::ffff:8.8.8.8")).toBe(false);
  });

  it("does not flag plain hostnames (resolved separately)", () => {
    expect(isPrivateOrReservedIp("i.pinimg.com")).toBe(false);
  });
});
