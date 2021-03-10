import got from "got"
import * as dotenv from 'dotenv';

dotenv.config();

const API_URL=process.env.API_URL || "https://www.rueducommerce.fr/listingDyn?boutique_id=18&langue_id=1&categoriesId=15333&nbImage=2&caracteristiquesValeursId=552298&from=0";
const PRICE_LIMIT=1650.00;

(async () => {
	const r = await got(API_URL);
	if(r.statusCode !== 200){
		console.error(`Error while fetching the API: ${r.body}`);
	}
	const js = JSON.parse(r.body);
	console.info(`Slug ${js.slug}`);
	const availables = js.produits.filter((p: any) => p.Disponibilite !== 'epuise' && p.shop_name == "Rue du Commerce");
	if(availables.length === 0){
		console.info("No stock available");
	}else{
		console.info(`Product${availables.length > 1 ? "s" : ""} found!`);
		for(const p of availables){
			if(p.prix_ttc > PRICE_LIMIT) continue;
			console.log(`${p.fournisseur_nom} - ${p.produit_nom_nom} - ${p.prix_ttc}`);
			console.log(`https://www.rueducommerce.fr${p.lien}`);
		}
	}	
	process.exit(0);
})();
