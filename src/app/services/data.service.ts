import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Shoe } from '../interfaces/shoe';

@Injectable()
export class DataService {

  private shoe: Shoe = {
    Name: 'Adidas',
    BrandName: 'Adidas kadın spor ayakkabı',
    Seller: 'https://www.trendyol.com',
    DetailLink: 'https://www.trendyol.com/detay1',
    MarketPrice: 150,
    Image: 'https://c.static-nike.com/a/images/t_default/l0wccd0un22ifwhpriph/free-rn-flyknit-2017-big-kids-running-shoe-9LWVx3.jpg',
    SalePrice: 100,
    SimilarWith: [
      {
        Name: 'Adidas',
        BrandName: 'Adidas kadın spor ayakkabı',
        Seller: 'https://www.trendyol.com1',
        DetailLink: 'https://www.trendyol.com/detay1',
        MarketPrice: 150,
        Image: 'https://c.static-nike.com/a/images/t_default/l0wccd0un22ifwhpriph/free-rn-flyknit-2017-big-kids-running-shoe-9LWVx3.jpg',
        SalePrice: 150,

      },
      {
        Name: 'Adidas',
        BrandName: 'Adidas kadın spor ayakkabı',
        Seller: 'https://www.trendyol.com2',
        DetailLink: 'https://www.trendyol.com/detay1',
        MarketPrice: 150,
        Image: 'https://c.static-nike.com/a/images/t_default/l0wccd0un22ifwhpriph/free-rn-flyknit-2017-big-kids-running-shoe-9LWVx3.jpg',
        SalePrice: 170,

      },
      {
        Name: 'Adidas',
        BrandName: 'Adidas kadın spor ayakkabı',
        Seller: 'https://www.trendyol.com1',
        DetailLink: 'https://www.trendyol.com/detay1',
        MarketPrice: 150,
        Image: 'https://c.static-nike.com/a/images/t_default/l0wccd0un22ifwhpriph/free-rn-flyknit-2017-big-kids-running-shoe-9LWVx3.jpg',
        SalePrice: 100,

      },
      {
        Name: 'Adidas',
        BrandName: 'Adidas kadın spor ayakkabı',
        Seller: 'https://www.trendyol.com1',
        DetailLink: 'https://www.trendyol.com/detay1',
        MarketPrice: 150,
        Image: 'https://c.static-nike.com/a/images/t_default/l0wccd0un22ifwhpriph/free-rn-flyknit-2017-big-kids-running-shoe-9LWVx3.jpg',
        SalePrice: 250,

      },
      {
        Name: 'Adidas',
        BrandName: 'Adidas kadın spor ayakkabı',
        Seller: 'https://www.trendyol.com1',
        DetailLink: 'https://www.trendyol.com/detay1',
        MarketPrice: 150,
        Image: 'https://c.static-nike.com/a/images/t_default/l0wccd0un22ifwhpriph/free-rn-flyknit-2017-big-kids-running-shoe-9LWVx3.jpg',
        SalePrice: 50,

      },
    ]
  };

  private dataSource = new BehaviorSubject<Shoe>(this.shoe);
  currentData = this.dataSource.asObservable();

  constructor() { }

  communicate(data: Shoe) {
    this.dataSource.next(data);
  }

}
