 import { Comment } from '../interfaces/comment';
 export interface Shoe {
    ID: string;
    Name: string;
    BrandName?: string;
    MarketPrice: number;
    SalePrice: number;
    DetailLink: string;
    Seller: string;
    Image: string;
    Comments?: Comment[];
    RateValue?: number;
    SimilarWith?: Shoe[];
 }
