import got from "got"

const API_URL="https://www.rueducommerce.fr/listingDyn?boutique_id=18&langue_id=1&categoriesId=15333&nbImage=2&caracteristiquesValeursId=552298&from=0";

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
			console.log(`${p.fournisseur_nom} - ${p.produit_nom_nom} - ${p.prix_ttc}`);
			console.log(`https://www.rueducommerce.fr${p.lien}`);
		}
	}	
	process.exit(0);
})();
