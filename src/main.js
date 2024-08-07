import {crawlPage} from "./crawl.js"
import {printReport} from "./report.js";

const argv = process.argv;

async function main()
{
    if(argv.length !== 3)
    {
        console.log("Invalid Number Of Arguments!")
    }
    else
    {
        const pages = await crawlPage(process.argv[2])
        printReport(pages);
    }
}

await main()
