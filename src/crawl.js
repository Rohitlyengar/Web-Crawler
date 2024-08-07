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
    const dom = new JSDOM(htmlBody)
    const tags = dom.window.document.querySelectorAll('a');

    const URLs = Array.from(tags).map(elem => elem.getAttribute('href'));
    URLs.forEach((elem, index, array) =>
        {
            if(elem[0] === '/')
            {
                array[index] = `${baseURL}${elem}`;
            }
        }
    )
    return URLs
}

async function crawlPage(currentURL)
{
    try {
        const response = await fetch(currentURL);

        if(response.status > 399)
        {
            console.error(`Error Code ${response.status}: ${response.statusText} on ${currentURL}`);
        }
        else if(!response.headers.get('content-type').includes('text/html'))
        {
            console.error(`${response.headers.get('content-type')} cannot be crawled`)
        }

        console.log(`Starting to crawl ${currentURL}\n`);
        console.log(await response.text());
    }
    catch(err)
    {
        console.error(err);
    }
}

export { normalizeURL, getURLsFromHTML, crawlPage };
