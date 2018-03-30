const cheerio = require('cheerio');
const request = require('request');
const rp = require('request-promise');




/**
 * Function which fetches shoes data from seller HM
 */
exports.fetchShoesFromHM = () => {
  return new Promise(function(resolve, reject) {
    let parsedResults = [];
        
    request('http://www2.hm.com/tr_tr/search-results.html?q=spor+ayakkab%C4%B1&sort=stock&offset=0&page-size=50', (error, statusCode, page) => {
        let $ = cheerio.load(page);
        let Name;
        let MarketPrice;
        let SalePrice;
        let Link;
        let Code;
        
        $('.product-item').each((i,elm) => {
            Link = $(elm).children('.product-item-details').children('.product-item-heading').children().attr('href');
            Name = $(elm).children('.product-item-details').children('.product-item-heading').children().text();
            MarketPrice = $(elm).children('.product-item-details').children('.ng-hide').children('.price').text();
            SalePrice = $(elm).children('.product-item-details').children().children('.price').text();
            Code  = $(elm).attr('data-articlecode');
            Image = $(elm).children('.product-item-link').children().attr('src');

            let Product  = {
                Name: Name,
                MarketPrice: parseInt(MarketPrice),
                SalePrice: parseInt(SalePrice),
                DetailLink: `http://www2.hm.com${Link}`,
                Seller: 'www2.hm.com',
                Image: Image
            }
            parsedResults.push(Product);

        });
        resolve(parsedResults);
    });

  });
}




/**
 *  Function which fetches shoes data from seller Ayakkabı Dünyası
 */
exports.fetchShoesFromAyakkabiDunyasi = () => {
  return new Promise(function(resolve, reject){
    var parsedResults = [];
    
    request('https://www.ayakkabidunyasi.com.tr/list/?search_text=spor+ayakkab%C4%B1', (error, statusCode, page) => {
        let $ = cheerio.load(page);
        let Name, MarketPrice, SalePrice, DetailLink, Code, BrandName;
            
        $('.col-sm-3.col-xs-6.product-item-box').each((i,elm) => {
            let productItemInfoContainer = $(elm).children('.product-item-wrapper.js-product-wrapper')
            .children('.product-item-info');
            let productImageInfoContainer = $(elm).children('.product-item-wrapper.js-product-wrapper')
            .children('.product-item-image-link');
            DetailLink = productItemInfoContainer.children('.product-name').children('a').attr('href');
            BrandName = productItemInfoContainer.children('.product-name').children('a').text();
            Name = productItemInfoContainer.children('.product-name').children('span').text();
            SalePrice = productItemInfoContainer.children('.product-price').children('.product-sale-price').text();
            MarketPrice = productItemInfoContainer.children('.product-price').children('.product-list-price').text();
            Code  = $(elm).attr('data-articlecode');
            
            let Product  = {
                Name: Name,
                BrandName: BrandName,
                MarketPrice: MarketPrice,
                SalePrice: SalePrice,
                DetailLink: `https://www.ayakkabidunyasi.com.tr${DetailLink}`,
                Seller: 'www.ayakkabidunyasi.com.tr',
                Image: ''
            }
            parsedResults.push(Product);
        });
       resolve(parsedResults);
    });

  });
}




/**
 *  Function which fetches shoes data from seller Trendyol
 */
exports.fetchShoesFromTrendyol = () => {
  return new Promise(function(resolve, reject) {
    var parsedResults = [];
    var promises = [
      rp('https://www.trendyol.com/spor-ayakkabi?st=spor%20ayakka&qt=Spor%20Ayakkab%C4%B1&qs=search'),
      rp('https://www.trendyol.com/spor-ayakkabi?st=spor%20ayakka&qt=Spor%20Ayakkab%C4%B1&qs=search&pi=2'),
      rp('https://www.trendyol.com/spor-ayakkabi?st=spor%20ayakka&qt=Spor%20Ayakkab%C4%B1&qs=search&pi=3'),
      rp('https://www.trendyol.com/spor-ayakkabi?st=spor%20ayakka&qt=Spor%20Ayakkab%C4%B1&qs=search&pi=4')
      
    ];
    Promise.all(promises).then((pages) => {
        pages.forEach(page => {
            let $ = cheerio.load(page);
            const products = $('.product-card-wrapper.col-lg-4.col-md-4.col-xs-4');
            let productDescriptionContainer;
            let productPricesContainer;
        
            products.each((i, elm) => {
                let productInfoContainer = $(elm).children('.product-detail-link').children('.product-card')
                  .children('.product-info-container');
                productDescriptionContainer = $(productInfoContainer).children('.product-description-container');
                productPricesContainer = $(productInfoContainer).children('.product-prices-container');
                let detailLink = $(elm).children('.product-detail-link').attr('href');
          
                let Product = {
                  Name: productDescriptionContainer.children('.product-name').text(),
                  BrandName: productDescriptionContainer.children('.product-brand-name').text(),
                  MarketPrice: productPricesContainer.children('.product-market-price').text(),
                  SalePrice: productPricesContainer.children('.product-sale-price').text(),
                  DetailLink: `https://www.trendyol.com${detailLink}`,
                  Seller: 'www.trendyol.com',
                  Image: ''
                }
                parsedResults.push(Product);
            });  
        });
     resolve(parsedResults);
    });
  });
}



/**
 *  Function which fetches shoes data from seller Rovigo
 */
exports.fetchShoesFromRovigo = () => {
  return new Promise(function(resolve, reject){
    var parsedResults = [];
      
    request('https://www.rovigo.com.tr/index.php?route=product/search&search=spor+ayakkab%C4%B1&limit=100', (error, statusCode, page) => {
      let $ = cheerio.load(page);
      let Name;
      let MarketPrice;
      let SalePrice;
      let DetailLink;
     
      $('.item.contrast_font').each((i,elm) => {
          
       let shoeImageInfoContainer = $(elm).children('.image').children('.image_hover');
       let shoeInfoContainer = $(elm).children('.information_wrapper');
      
  
       DetailLink = shoeImageInfoContainer.children().attr('href');
       MarketPrice = shoeInfoContainer.children('.price').children('.price-old').text();
       SalePrice = shoeInfoContainer.children('.price').children('.price-new').text();
       Name = shoeInfoContainer.children('.left').children('.brand.main_font').text();
  
       let Product = {
           Name: Name,
           BrandName: '',
           MarketPrice: MarketPrice,
           SalePrice: SalePrice,
           DetailLink: DetailLink,
           Seller: 'www.rovigo.com.tr',
           Image: ''
       }
  
       parsedResults.push(Product);
      });
       resolve(parsedResults);
    });

  });
}



/**
 *  Function which fetches shoes data from seller Sportive
 */
exports.fetchShoesFromSportive = () => {
  return new Promise(function(resolve, reject) {
    var promises = [];
    var parsedResults = [];
  
     request('https://www.sportive.com.tr/tum-spor-ayakkabilar'
    , (error, statusCode, page) => {
      
      let Name;
      let BrandName;
      let SalePrice;
      let MarketPrice;
      let DetailLink;
  
      let $ = cheerio.load(page);
  
      $('.col-xs-12.col-sm-4.col-lg-4.product-box').each((i,elm) => {
        let ProductInfoContainer = $(elm).children('.product').children('.product-info');
        Name = ProductInfoContainer.children('.product-title').text();
        BrandName = ProductInfoContainer.children('.product-type').text();
        SalePrice = ProductInfoContainer.children('.product-price').children('.new').children('.price').text();
        MarketPrice = ProductInfoContainer.children('.product-price').children('.old').children('.price').text();
        DetailLink = $(elm).children('.product').attr('href');
  
        let Product = {
         
          Name: Name,
          BrandName: BrandName,
          MarketPrice: MarketPrice,
          SalePrice: SalePrice,
          DetailLink: DetailLink,
          Seller: 'www.sportive.com.tr'
        }
  
        parsedResults.push(Product);
  
      });
    });
    resolve(parsedResults);
  });
}



/**
 *  Function which fetches shoes data from seller 1V1Y
 */
exports.fetchShoesFrom1V1Y = () => {
  return new Promise(function(resolve, reject) {
        var parsedResults = [];
          
        request('https://www.1v1y.com/ara?q=spor+ayakkab%C4%B1', (error, statusCode, page) => {
            let $ = cheerio.load(page);
        
            let Name;
            let MarketPrice;
            let SalePrice;
            let DetailLink;
            let BrandName;
            let Seller;

            $('.productlink').each((i,elm) => {
              let ProductInfoContainer = $(elm);
              Name = ProductInfoContainer.children('.brand').text();
              BrandName = ProductInfoContainer.children('.category').text();
              MarketPrice = ProductInfoContainer.children('.price').children().first().text();
              SalePrice = ProductInfoContainer.children('.price').children().first().next().text();
              DetailLink = $(elm).attr('href');
        
          
              let Product = {
                Name: Name,
                BrandName: BrandName,
                MarketPrice: MarketPrice,
                SalePrice: SalePrice,
                DetailLink: `${DetailLink}`,
                Seller: 'www.1v1y.com',
                Image: ''
              }
        
              parsedResults.push(Product);
        
            });
          
           
        });
        resolve(parsedResults);
  });

}















