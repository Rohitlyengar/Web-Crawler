import { test, expect } from "@jest/globals"
import { normalizeURL } from "../src/crawl.js"

test("Normalize URL https://blog.boot.dev/path/", () =>
{
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
})

test("Normalize URL https://blog.boot.dev/path", () =>
{
    expect(normalizeURL("https://blog.boot.dev/path")).toBe("blog.boot.dev/path")
})

test("Normalize URL http://blog.boot.dev/path/", () =>
{
    expect(normalizeURL("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
})

test("Normalize URL http://blog.boot.dev/path/", () =>
{
    expect(normalizeURL("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
})
