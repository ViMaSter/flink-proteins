import * as fs from 'fs'
const a = JSON.parse(fs.readFileSync("products.json")).products;
const itemsWithNutritions = a.filter(e=>e.nutritions.length > 1 && e.nutritions.some(a=>a.includes("Eiweiß:")) && e.nutritions.some(a=>a.includes("Kohlenhydrate:")) && e.nutritions.some(a=>a.includes("Fett:")));
const sortedItemsWithNutritions = itemsWithNutritions.sort((a,b)=> {
    const proteinA = parseFloat(a.nutritions.find(c=>c.includes("Eiweiß:")).replace(/`./, "").replace(",", ".").replace(/\D*/, ""));
    const proteinB = parseFloat(b.nutritions.find(c=>c.includes("Eiweiß:")).replace(/`./, "").replace(",", ".").replace(/\D*/, ""));
    const fatA = parseFloat(a.nutritions.find(c=>c.includes("Fett:")).replace(/`./, "").replace(",", ".").replace(/\D*/, "")) * 2;
    const fatB = parseFloat(b.nutritions.find(c=>c.includes("Fett:")).replace(/`./, "").replace(",", ".").replace(/\D*/, "")) * 2;
    const carbsA = parseFloat(a.nutritions.find(c=>c.includes("Kohlenhydrate:")).replace(/`./, "").replace(",", ".").replace(/\D*/, ""));
    const carbsB = parseFloat(b.nutritions.find(c=>c.includes("Kohlenhydrate:")).replace(/`./, "").replace(",", ".").replace(/\D*/, ""));
    a.rank = (proteinA/(fatA+carbsA));
    b.rank = (proteinB/(fatB+carbsB));
    return b.rank - a.rank;
}).filter(c=>!Number.isNaN(c.rank)).sort((a,b)=>b.rank-a.rank);

const generateItem = (item) => {
    let output = "";

    const nutritions = {
        carbs: parseFloat(item.nutritions.find(c=>c.includes("Kohlenhydrate:")).replace(/`./, "").replace(",", ".").replace(/\D*/, "")),
        fat: parseFloat(item.nutritions.find(c=>c.includes("Fett:")).replace(/`./, "").replace(",", ".").replace(/\D*/, "")) * 2,
        protein: parseFloat(item.nutritions.find(c=>c.includes("Eiweiß:")).replace(/`./, "").replace(",", ".").replace(/\D*/, ""))
    };

    nutritions.score = (nutritions.protein/(nutritions.fat+nutritions.carbs));

    output += `<div class="product" data-score="${nutritions.score}" data-carbs="${nutritions.carbs}" data-fat="${nutritions.fat}" data-protein="${nutritions.protein}">`;
    if (item.images.length > 0)
    {
        output += `<img src="${item.images[0]}">`;
    }
    output += `<p>${item.name}</p>`
    output += `<div class="canvas-container"> <canvas width="200" height="200" style="width:200px; height:200px"></canvas></div>`;
    output += "</div>";

    return output;
};

fs.writeFileSync("output.html", fs.readFileSync("layout.html").toString().replace("{{content}}", sortedItemsWithNutritions.map(generateItem).join("\r\n")));