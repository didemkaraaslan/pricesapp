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

            let Shoe  = {
                Name: Name,
                MarketPrice: parseInt(MarketPrice),
                SalePrice: parseInt(SalePrice),
                DetailLink: `http://www2.hm.com${Link}`,
                Seller: 'https://www2.hm.com',
                Code: Code,
                Image: Image
            }
            parsedResults.push(Shoe);

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
                Seller: 'https://www.ayakkabidunyasi.com.tr',
                Code: '222'
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
          Seller: 'https://www.sportive.com.tr',
          Code: ''
        }
  
        parsedResults.push(Product);
        promises.push(rp(DetailLink));
  
      });
  
      Promise.all(promises).then((pages) => {
        let i = 0;
        pages.forEach(page => {
          let $ = cheerio.load(page);
          let Code = $('.code').text();
          let fix =  Code.substring(Code.lastIndexOf(":") + 2);
      
          parsedResults[i].Code = fix;
          i++;
        });
        
        resolve(parsedResults);
      });
    });

  });
}


/**
 *  Function which fetches shoes data from seller Trendyol
 */
exports.fetchShoesFromTrendyol = () => {
  return new Promise(function(resolve, reject) {
    var parsedResults = [];
    var detail = [];
    var promises = [];
  
    request('https://www.trendyol.com/kadin+spor-ayakkabi', (error, statusCode, page) => {
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
          Seller: 'https://www.trendyol.com',
          Code: ''
        }
        parsedResults.push(Product);
  
        promises.push(rp(`https://www.trendyol.com${detailLink}`));
      });
  
      Promise.all(promises).then((pages) => {
        let i = 0;
        pages.forEach(page => {
          let $ = cheerio.load(page);
          let Code = $('.product-name-text').text();
          parsedResults[i].Code = Code;
          i++;
        });
        
        resolve(parsedResults);
      });
     
    });

  });
}

