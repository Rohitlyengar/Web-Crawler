import { test, expect } from "@jest/globals"
import { normalizeURL, getURLsFromHTML } from "../src/crawl.js"

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

test("Link 1 from HTML", () =>
{
    expect(getURLsFromHTML(`<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>`)).toEqual(["https://blog.boot.dev"])
})

test("Link 2 from HTML", () =>
{
    expect(getURLsFromHTML(`<html><body><a href="https://blog.boot.dev/about">About Us</a><a href="https://external.com/page">External Page</a></body></html>`)).toEqual(["https://blog.boot.dev/about", "https://external.com/page"])
})

test("Link 3 from HTML", () =>
{
    expect(getURLsFromHTML(`<html><body><a href="/about">About Us</a><a href="https://external.com/page">External Page</a></body></html>`, "https://blog.boot.dev")).toEqual(["https://blog.boot.dev/about", "https://external.com/page"])
})

test("Link 4 from HTML", () =>
{
    expect(getURLsFromHTML(`<html><body><a href="/about">About Us</a><a href="/contact">Contact</a><a href="https://external.com/page">External Page</a></body></html>`, "https://blog.boot.dev")).toEqual(["https://blog.boot.dev/about", "https://blog.boot.dev/contact", "https://external.com/page"])
})