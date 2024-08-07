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

export { normalizeURL, getURLsFromHTML };
