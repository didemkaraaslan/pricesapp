import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Shoe } from '../interfaces/shoe';
import { Comment } from '../interfaces/comment';

@Injectable()
export class DataService {

  private shoe: Shoe = {
    ID: 'asdas',
    Name: 'Adidas',
    BrandName: 'Adidas kadın spor ayakkabı',
    Seller: 'https://www.trendyol.com',
    DetailLink: 'https://www.trendyol.com/detay1',
    MarketPrice: 150,
    Image: 'https://c.static-nike.com/a/images/t_default/l0wccd0un22ifwhpriph/free-rn-flyknit-2017-big-kids-running-shoe-9LWVx3.jpg',
    SalePrice: 100,
    RateValue: 3,
    Comments: [
      {
        author: 'Didem',
        content: 'sadas'
      },
      {
        author: 'Eylül',
        content: 'cok guzel hemen almam lazım'
      },
      {
        author: 'Cemre',
        content: 'çok kazık yha :s'
      },
      {
        author: 'Mahmut',
        content: 'inş sevgilim istemez'
      }
    ],
    SimilarWith: [
      {
        ID : 'asdas',
        Name: 'Adidas',
        BrandName: 'Adidas kadın spor ayakkabı',
        Seller: 'https://www.trendyol.com1',
        DetailLink: 'https://www.trendyol.com/detay1',
        MarketPrice: 150,
        Image: 'https://c.static-nike.com/a/images/t_default/l0wccd0un22ifwhpriph/free-rn-flyknit-2017-big-kids-running-shoe-9LWVx3.jpg',
        SalePrice: 150,
      },
      {
        ID : 'asdas',
        Name: 'Adidas',
        BrandName: 'Adidas kadın spor ayakkabı',
        Seller: 'https://www.trendyol.com2',
        DetailLink: 'https://www.trendyol.com/detay1',
        MarketPrice: 150,
        Image: 'https://c.static-nike.com/a/images/t_default/l0wccd0un22ifwhpriph/free-rn-flyknit-2017-big-kids-running-shoe-9LWVx3.jpg',
        SalePrice: 170,

      },
      {
        ID : 'asdas',
        Name: 'Adidas',
        BrandName: 'Adidas kadın spor ayakkabı',
        Seller: 'https://www.trendyol.com1',
        DetailLink: 'https://www.trendyol.com/detay1',
        MarketPrice: 150,
        Image: 'https://c.static-nike.com/a/images/t_default/l0wccd0un22ifwhpriph/free-rn-flyknit-2017-big-kids-running-shoe-9LWVx3.jpg',
        SalePrice: 100,

      },
      {
        ID : 'asdas',
        Name: 'Adidas',
        BrandName: 'Adidas kadın spor ayakkabı',
        Seller: 'https://www.trendyol.com1',
        DetailLink: 'https://www.trendyol.com/detay1',
        MarketPrice: 150,
        Image: 'https://c.static-nike.com/a/images/t_default/l0wccd0un22ifwhpriph/free-rn-flyknit-2017-big-kids-running-shoe-9LWVx3.jpg',
        SalePrice: 250,

      },
      {
        ID: 'asdas',
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
