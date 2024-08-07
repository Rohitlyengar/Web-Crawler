function normalizeURL(url)
{
    const myURL = new URL(url);
    let newURL = `${myURL.hostname}${myURL.pathname}`;
    if (newURL[newURL.length - 1] === '/')
    {
        return newURL.slice(0, newURL.length - 1);
    }
    else
    {
        return newURL;
    }
}


export { normalizeURL };
