function printReport(pages)
{
    console.log(`Printing Report`)

    pages = Object.fromEntries(Object.entries(pages).sort(([,a],[,b]) => b - a))

    for(let page of Object.keys(pages))
    {
        console.log(`Page ${page} was visited ${pages[page]} times`);
    }
}

export { printReport };
