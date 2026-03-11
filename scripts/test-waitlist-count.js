#!/usr/bin/env node
/**
 * Test script for waitlist count formula: 803 + hours since epoch
 * Run: node scripts/test-waitlist-count.js
 */

const BASE = 803;
const EPOCH = "2026-03-11T00:00:00Z";
const epochMs = new Date(EPOCH).getTime();
const now = Date.now();
const hoursSinceEpoch = Math.max(0, Math.floor((now - epochMs) / 3_600_000));
const displayCount = BASE + hoursSinceEpoch;

console.log("Waitlist count formula test:");
console.log("  Base:", BASE);
console.log("  Epoch:", EPOCH);
console.log("  Hours since epoch:", hoursSinceEpoch);
console.log("  Displayed count:", displayCount.toLocaleString() + "+");
console.log("");
console.log("In 24 hours:", (BASE + hoursSinceEpoch + 24).toLocaleString() + "+");
console.log("In 1 week:", (BASE + hoursSinceEpoch + 168).toLocaleString() + "+");
