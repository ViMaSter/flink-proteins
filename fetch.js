import * as fs from 'fs'
const products = await (await fetch(new Request('https://consumer-api.goflink.com/v1/search?query=&page_size=5000', {
    method: 'GET',
    headers: new Headers({
        "hub": "de_ham_otte",
        "hub-slug": "de_ham_otte"
    }),
    mode: 'cors',
    cache: 'default',
}))).json();

fs.writeFileSync("products.json", JSON.stringify(products, null, 2));