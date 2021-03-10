export interface Product {
    produit_id: number;
    produit_ref_frs: string;
    produit_nom_nom: string;
    produit_nom_nom_court: string;
    desc_legende: string;
    fournisseur_id: number;
    fournisseur_nom: string;
    fournisseur_nom_court: string;
    boutique_default_id: number;
    produit_bonneaffaire: number;
    produit_prix_ttc: number;
    produit_prix_ht: number;
    prix_ttc: number;
    produit_prix_conseille: number;
    promo: string;
    promo_ttc: string;
    produit_eco_part: number;
    boutique_produit_bestseller: number;
    Disponibilite: string;
    produit_image?: (ProduitImageEntity)[] | null;
    type_livraison: string;
    dropshipping: number;
    lien: string;
    lien_format: string;
    gammes: any;
    note_moyenne: number;
    qte_min: boolean;
    caracVals?: (null)[] | null;
    tailles?: (null)[] | null;
    couleurs?: (null)[] | null;
    shop_name?: string;
}
export interface ProduitImageEntity {
    360: string;
    mini: string;
    liste: string;
    display: string;
    alt: string;
    zoom: string;
    source: string;
    option_valeur_id_bis?: null;
    special: string;
    bloc: string;
    panier: string;
    default: boolean;
    is_360: number;
    maxi: string;
    detail: string;
    id: number;
    rang: number;
}
  