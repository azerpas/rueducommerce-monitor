import got from "got"
import * as dotenv from 'dotenv';
import 'global-agent/bootstrap';

dotenv.config();

const API_URL=process.env.API_URL || "https://www.rueducommerce.fr/listingDyn?boutique_id=18&langue_id=1&categoriesId=15333&nbImage=2&caracteristiquesValeursId=552298&from=0";
const PRICE_LIMIT=1650.00;
const PROXY_HOST = process.env.PROXY_HOST;
const PROXY_PORT = process.env.PROXY_PORT;
const PROXY_USER = process.env.PROXY_USER;
const PROXY_PASSWORD = process.env.PROXY_PASSWORD;

(async () => {
	console.log(`Init with env ${process.env.AWS_EXECUTION_ENV ? "AWS": "DEV"}`); //AWS_Lambda_nodejs14.x
	if(PROXY_HOST && PROXY_PORT){
		console.log(`Setting proxy at host: ${PROXY_HOST}`);
		if(PROXY_USER && PROXY_PASSWORD){
			global.GLOBAL_AGENT.HTTP_PROXY = `http://${PROXY_USER}:${PROXY_PASSWORD}@${PROXY_HOST}:${PROXY_PORT}`;
		}else{
			global.GLOBAL_AGENT.HTTP_PROXY = `http://${PROXY_HOST}:${PROXY_PORT}`;
		}
	}
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
