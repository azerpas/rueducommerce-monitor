type ProductProps = {
	productName: string;
	price: number;
	url: string;
	fournisseur: string;
	shop: string;
	thumbnail: string;
}
export const send = async (props: ProductProps) => {
	const { thumbnail, productName, price, url, fournisseur, shop } = props;
	const data = {
        "content": null,
        "embeds": [
            {
                "title": "DETECTED PRODUCT 🚨", "color": 7340287,
                "fields": [
                    {
                        "name": "Product name","value": productName,"inline": true
                    },
                    {
                        "name": "Price","value": `${price}`, "inline": true
                    },
                    {
                        "name": "URL","value": url,"inline": true
                    },
                    {
                        "name": "Fournisseur","value": fournisseur, "inline": true 
                    },
                    {
                        "name": "Shop name","value": shop,"inline": true
                    },
                ],
                "footer": {  "text": "azerpas" }, "timestamp": new Date().toISOString(),
                "thumbnail": { url: thumbnail }
            }
        ]
    }
}
