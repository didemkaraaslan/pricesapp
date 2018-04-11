import { Shoe } from '../interfaces/shoe';

const cheerio = require('cheerio');
const request = require('request');
const rp = require('request-promise');




/**
 * Function which fetches shoes data from seller HM
 */
export function fetchShoesFromHM() {
  return new Promise(function(resolve, reject) {
    const parsedResults = [];
    const shoes: Shoe[] = [];

    request('http://www2.hm.com/tr_tr/search-results.html?q=spor+ayakkab%C4%B1&sort=stock&offset=0&page-size=50',
     (error, statusCode, page) => {
        const $ = cheerio.load(page);

        $('.product-item').each((i, elm) => {
            const Link = $(elm).children('.product-item-details').children('.product-item-heading').children().attr('href');
            const Name = $(elm).children('.product-item-details').children('.product-item-heading').children().text().toLowerCase();
            const MarketPrice = $(elm).children('.product-item-details').children('.ng-hide').children('.price').text().toLowerCase();
            const SalePrice = $(elm).children('.product-item-details').children().children('.price').text();
            const Code  = $(elm).attr('data-articlecode');
            const Image = $(elm).children('.product-item-link').children().attr('src');

            const shoe: Shoe = {
              ID: '',
              Name: Name,
              BrandName: '',
              SalePrice: parseInt(SalePrice),
              MarketPrice: parseInt(MarketPrice),
              DetailLink: `http://www2.hm.com${Link}`,
              Seller: 'www2.hm.com',
              Image: Image,
              RateValue: 0
            };
            shoes.push(shoe);

        });
        resolve(shoes);
    });

  });
}




/**
 *  Function which fetches shoes data from seller Ayakkabı Dünyası
 */
export function fetchShoesFromAyakkabiDunyasi() {
  return new Promise(function(resolve, reject) {
    const shoes: Shoe[] = [];

    request('https://www.ayakkabidunyasi.com.tr/list/?search_text=spor+ayakkab%C4%B1&attributes_integration_stkalan01=adidas',
     (error, statusCode, page) => {
        const $ = cheerio.load(page);

        $('.col-sm-3.col-xs-6.product-item-box').each((i, elm) => {
            const productItemInfoContainer = $(elm).children('.product-item-wrapper.js-product-wrapper')
            .children('.product-item-info');
            const productImageInfoContainer = $(elm).children('.product-item-wrapper.js-product-wrapper')
            .children('.product-item-image-link');
            const DetailLink = productItemInfoContainer.children('.product-name').children('a').attr('href');
            const BrandName = productItemInfoContainer.children('.product-name').children('a').text().toLowerCase();
            const Name = productItemInfoContainer.children('.product-name').children('span').text().toLowerCase();
            const SalePrice = productItemInfoContainer.children('.product-price').children('.product-sale-price').text();
            const MarketPrice = productItemInfoContainer.children('.product-price').children('.product-list-price').text();
            const Image = productImageInfoContainer.children('.product-item-image').attr('src');

            const shoe: Shoe  = {
                ID: '',
                Name: Name,
                BrandName: BrandName,
                MarketPrice: parseInt(MarketPrice),
                SalePrice: parseInt(SalePrice),
                DetailLink: `https://www.ayakkabidunyasi.com.tr${DetailLink}`,
                Seller: 'www.ayakkabidunyasi.com.tr',
                Image: Image,
                RateValue: 0,
                Comments: [
                  {
                    author: 'admin',
                    content: 'ilk yorum'
                  }
                ]
            };
            shoes.push(shoe);
        });
       resolve(shoes);
    });

  });
}




/**
 *  Function which fetches shoes data from seller Trendyol
 */
export function fetchShoesFromTrendyol() {
  return new Promise(function(resolve, reject) {
    const shoes: Shoe[] = [];
    const promises = [
      rp('https://www.trendyol.com/adidas+slazenger?q=Spor+Ayakab%C4%B1&st=spor%20ayakab%C4%B1&qt=spor%20ayakab%C4%B1&qs=search'),
      rp('https://www.trendyol.com/adidas+slazenger?q=Spor+Ayakab%C4%B1&st=spor%20ayakab%C4%B1&qt=spor%20ayakab%C4%B1&qs=search&pi=2')
    ];
    Promise.all(promises).then((pages) => {
        pages.forEach(page => {
            const $ = cheerio.load(page);

            const products = $('.product-card-wrapper.col-lg-4.col-md-4.col-xs-4');
            let productDescriptionContainer;
            let productPricesContainer;
            let productImageContainer;

            products.each((i, elm) => {
                const productInfoContainer = $(elm).children('.product-detail-link').children('.product-card')
                  .children('.product-info-container');
                productImageContainer = $(elm).children('.product-detail-link').children('.product-card')
                .children('.product-image-container');
                productDescriptionContainer = $(productInfoContainer).children('.product-description-container');
                productPricesContainer = $(productInfoContainer).children('.product-prices-container');
                const detailLink = $(elm).children('.product-detail-link').attr('href');
                const Image = productImageContainer.children('.product-image.lazy').attr('data-original');

                const shoe: Shoe = {
                  ID: '',
                  Name: productDescriptionContainer.children('.product-brand-name').text().toLowerCase(),
                  BrandName: productDescriptionContainer.children('.product-name').text().toLowerCase(),
                  MarketPrice: parseInt(productPricesContainer.children('.product-market-price').text()),
                  SalePrice: parseInt(productPricesContainer.children('.product-sale-price').text()),
                  DetailLink: `https://www.trendyol.com${detailLink}`,
                  Seller: 'www.trendyol.com',
                  Image: (Image === undefined) ? '' : Image,
                  RateValue: 0,
                  Comments: [
                    {
                      author: 'admin',
                      content: 'ilk yorum'
                    }
                  ]
                };
                shoes.push(shoe);
            });
        });
     resolve(shoes);
    });
  });
}

/**
 *  Function which fetches shoes data from seller Rovigo
 */
export function fetchShoesFromRovigo() {
  return new Promise(function(resolve, reject) {
    const parsedResults = [];

    request('https://www.rovigo.com.tr/index.php?route=product/search&search=spor+ayakkab%C4%B1&limit=100', (error, statusCode, page) => {
      const $ = cheerio.load(page);
      let Name;
      let MarketPrice;
      let SalePrice;
      let DetailLink;

      $('.item.contrast_font').each((i,elm) => {

       const shoeImageInfoContainer = $(elm).children('.image').children('.image_hover');
       const shoeInfoContainer = $(elm).children('.information_wrapper');


       DetailLink = shoeImageInfoContainer.children().attr('href');
       MarketPrice = shoeInfoContainer.children('.price').children('.price-old').text();
       SalePrice = shoeInfoContainer.children('.price').children('.price-new').text();
       Name = shoeInfoContainer.children('.left').children('.brand.main_font').text().toLowerCase();

       const Product = {
           ID: '',
           Name: Name,
           BrandName: '',
           MarketPrice: parseInt(MarketPrice),
           SalePrice: parseInt(SalePrice),
           DetailLink: DetailLink,
           Seller: 'www.rovigo.com.tr',
           Image: '',
           RateValue: 0
       };

       parsedResults.push(Product);
      });
       resolve(parsedResults);
    });

  });
}





/**
 *  Function which fetches shoes data from seller 1V1Y
 */
export function fetchShoesFrom1V1Y() {
  return new Promise(function(resolve, reject) {
        const parsedResults = [];

        request('https://www.1v1y.com/ara?q=spor+ayakkab%C4%B1&marka=4800-57986', (error, statusCode, page) => {
            const $ = cheerio.load(page);
            let Name;
            let BrandName;
            let SalePrice;
            let MarketPrice;
            let DetailLink;


            $('.col-xs-12.col-sm-4.col-lg-4.product-box').each((i,elm) => {
              const ProductInfoContainer = $(elm).children('.product').children('.product-info');
              Name = ProductInfoContainer.children('.product-title').text().toLowerCase();
              BrandName = ProductInfoContainer.children('.product-type').text().toLowerCase();
              SalePrice = ProductInfoContainer.children('.product-price').children('.new').children('.price').text();
              MarketPrice = ProductInfoContainer.children('.product-price').children('.old').children('.price').text();
              DetailLink = $(elm).children('.product').attr('href');

              const Product = {
                ID: '',
                Name: Name,
                BrandName: BrandName,
                MarketPrice: parseInt(MarketPrice),
                SalePrice:  parseInt(SalePrice),
                DetailLink: DetailLink,
                Seller: 'www.sportive.com.tr',
                RateValue: 0
              }

              parsedResults.push(Product);

            });
        });
        resolve(parsedResults);
  });

}



/**
 *  Function which fetches shoes data from seller Sportive
 */
export function fetchShoesFromSportive() {
  return new Promise(function(resolve, reject) {
    const shoes: Shoe[] = [];
    const promises = [
      rp('https://www.sportive.com.tr/tum-spor-ayakkabilar/slazenger-adidas'),
      rp('https://www.sportive.com.tr/catalog/category/view/id/570/?marka=1042%2C899&p=2'),
      rp('https://www.sportive.com.tr/catalog/category/view/id/570/?marka=1042%2C899&p=3')
    ];
    Promise.all(promises).then((pages) => {

        pages.forEach(page => {
            const $ = cheerio.load(page);

            $('.col-xs-12.col-sm-4.col-lg-4.product-box').each((i,elm) => {
                  const ProductInfoContainer = $(elm).children('.product').children('.product-info');
                  const ProductImageContainer = $(elm).children('.product').children('.product-photo');

                  const Name = ProductInfoContainer.children('.product-title').text();
                  const BrandName = ProductInfoContainer.children('.product-type').text();
                  const SalePrice = ProductInfoContainer.children('.product-price').children('.new').children('.price').text();
                  const MarketPrice = ProductInfoContainer.children('.product-price').children('.old').children('.price').text();
                  const DetailLink = $(elm).children('.product').attr('href');
                  const Image = ProductImageContainer.children().attr('data-original');

                  const shoe: Shoe = {
                    ID: '',
                    Name: Name.toLowerCase(),
                    BrandName: BrandName.toLowerCase(),
                    MarketPrice: parseInt(MarketPrice),
                    SalePrice: parseInt(SalePrice),
                    DetailLink: DetailLink,
                    Seller: 'www.sportive.com.tr',
                    Image: (Image === undefined) ? '' : Image,
                    RateValue: 0,
                    Comments: [
                      {
                        author: 'admin',
                        content: 'ilk yorum'
                      }
                    ]
                  };

                  shoes.push(shoe);
            });
        });
        resolve(shoes);
    });
  });
}
