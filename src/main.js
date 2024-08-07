import {crawlPage} from "./crawl.js"

const argv = process.argv;

async function main()
{
    if(argv.length !== 3)
    {
        console.log("Invalid Number Of Arguments!")
    }
    else
    {
        await crawlPage(process.argv[2])
    }
}

await main()
