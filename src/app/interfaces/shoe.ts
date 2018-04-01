 export interface Shoe {
    Name: string;
    BrandName?: string;
    MarketPrice: number;
    SalePrice: number;
    DetailLink: string;
    Seller: string;
    Image: string;
    SimilarWith?: Shoe[];
 }
