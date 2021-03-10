import got from "got"

const API_URL="https://www.rueducommerce.fr/listingDyn?boutique_id=18&langue_id=1&categoriesId=15333&nbImage=2&caracteristiquesValeursId=552298&from=0";

(async () => {
	const r = await got(API_URL);
	if(r.statusCode !== 200){
		console.error(`Error while fetching the API: ${r.body}`);
	}
	const js = JSON.parse(r.body);
	console.info(`Slug ${js.slug}`);
})();
