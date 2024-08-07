import { JSDOM } from 'jsdom'

function normalizeURL(url)
{
    const myURL = new URL(url);
    let newURL = `${myURL.hostname}${myURL.pathname}`;
    if (newURL[newURL.length - 1] === '/')
    {
        return newURL.slice(0, newURL.length - 1);
    }
    return newURL;
}

function getURLsFromHTML(htmlBody, baseURL)
{
    const URLs = []
    const dom = new JSDOM(htmlBody)
    const anchors = dom.window.document.querySelectorAll('a');

    for(let anchor of anchors)
    {
        if(anchor.hasAttribute('href'))
        {
            let href = anchor.getAttribute('href');

            try {
                href = new URL(href, baseURL)
                URLs.push(href)
            }
            catch(err)
            {
                console.log(err)
            }
        }
    }
    return URLs
}

async function fetchWebPage(url)
{
    try {
        const response = await fetch(url);

        if(response.status > 399)
        {
            console.error(`Error Code ${response.status}: ${response.statusText} on ${url}`);
        }
        else if(!response.headers.get('content-type').includes('text/html'))
        {
            console.error(`${response.headers.get('content-type')} cannot be crawled`)
        }

        console.log(`Starting to crawl ${url}\n`);
        return response.text()
    }
    catch(err)
    {
        console.error(err);
    }
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {})
{
    const baseURLobj = new URL(baseURL);
    const currentURLobj = new URL(currentURL);

    if (baseURLobj.hostname !== currentURLobj.hostname)
    {
        return pages
    }

    let normalizedCurrentURL = normalizeURL(currentURLobj);

    if(pages[normalizedCurrentURL] > 0)
    {
        pages[normalizedCurrentURL]++
        return pages
    }
    pages[normalizedCurrentURL] = 1

    let webPage

    try {
        webPage = await fetchWebPage(currentURL)
    } catch(err)
    {
        console.log(err)
        return pages
    }

    let newURLs = getURLsFromHTML(webPage, baseURL)

    for(let newURL of newURLs)
    {
        pages = await crawlPage(baseURL, newURL, pages)
    }

    return pages
}

export { normalizeURL, getURLsFromHTML, crawlPage };
