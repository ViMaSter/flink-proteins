import * as fs from 'fs'
const locData = await (await fetch("https://consumer-api.goflink.com/v1/locations/hub?lat=53.5506201&long=9.9545555")).json()
const products = await (await fetch(new Request('https://consumer-api.goflink.com/v1/products', {
    method: 'GET',
    headers: new Headers({
        "locale": "de",
        "hub-slug": "de_ham_wate"
    }),
    mode: 'cors',
    cache: 'default',
}))).json();

fs.writeFileSync("products.json", JSON.stringify(products, null, 2));