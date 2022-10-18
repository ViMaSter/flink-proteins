import * as fs from 'fs'
const a = JSON.parse(fs.readFileSync("products.json"));
const itemsWithNutritions = a.filter(e=>e.nutritions.length > 1 && e.nutritions.some(a=>a.includes("Eiweiß:")) && e.nutritions.some(a=>a.includes("Kohlenhydrate:")) && e.nutritions.some(a=>a.includes("Fett:")));
const sortedItemsWithNutritions = itemsWithNutritions.sort((a,b)=> {
    const proteinA = parseFloat(a.nutritions.find(c=>c.includes("Eiweiß:")).replace(/`./, "").replace(",", ".").replace(/\D*/, ""));
    const proteinB = parseFloat(b.nutritions.find(c=>c.includes("Eiweiß:")).replace(/`./, "").replace(",", ".").replace(/\D*/, ""));
    const fatA = parseFloat(a.nutritions.find(c=>c.includes("Fett:")).replace(/`./, "").replace(",", ".").replace(/\D*/, ""));
    const fatB = parseFloat(b.nutritions.find(c=>c.includes("Fett:")).replace(/`./, "").replace(",", ".").replace(/\D*/, ""));
    const carbsA = parseFloat(a.nutritions.find(c=>c.includes("Kohlenhydrate:")).replace(/`./, "").replace(",", ".").replace(/\D*/, ""));
    const carbsB = parseFloat(b.nutritions.find(c=>c.includes("Kohlenhydrate:")).replace(/`./, "").replace(",", ".").replace(/\D*/, ""));
    a.rank = (proteinA/(fatA+carbsA));
    b.rank = (proteinB/(fatB+carbsB));
    return b.rank - a.rank;
}).filter(c=>!Number.isNaN(c.rank)).sort((a,b)=>b.rank-a.rank);

console.log(a.length);
console.log(itemsWithNutritions.length);
console.log(itemsWithNutritions[0])

debugger;