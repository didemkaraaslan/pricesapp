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
            Name = $(elm).children('.product-item-details').children('.product-item-heading').children().text().toLowerCase();
            MarketPrice = $(elm).children('.product-item-details').children('.ng-hide').children('.price').text().toLowerCase();
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
    
    request('https://www.ayakkabidunyasi.com.tr/list/?search_text=spor+ayakkab%C4%B1&attributes_integration_stkalan01=adidas', (error, statusCode, page) => {
        let $ = cheerio.load(page);
        let Name, MarketPrice, SalePrice, DetailLink, Image, BrandName;
            
        $('.col-sm-3.col-xs-6.product-item-box').each((i,elm) => {
            let productItemInfoContainer = $(elm).children('.product-item-wrapper.js-product-wrapper')
            .children('.product-item-info');
            let productImageInfoContainer = $(elm).children('.product-item-wrapper.js-product-wrapper')
            .children('.product-item-image-link');
            DetailLink = productItemInfoContainer.children('.product-name').children('a').attr('href');
            BrandName = productItemInfoContainer.children('.product-name').children('a').text().toLowerCase();
            Name = productItemInfoContainer.children('.product-name').children('span').text().toLowerCase();
            SalePrice = productItemInfoContainer.children('.product-price').children('.product-sale-price').text();
            MarketPrice = productItemInfoContainer.children('.product-price').children('.product-list-price').text();
            Image = productImageInfoContainer.children('.product-item-image').attr('src');
            
            let Product  = {
                Name: Name,
                BrandName: BrandName,
                MarketPrice: parseInt(MarketPrice),
                SalePrice: parseInt(SalePrice),
                DetailLink: `https://www.ayakkabidunyasi.com.tr${DetailLink}`,
                Seller: 'www.ayakkabidunyasi.com.tr',
                Image: Image
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
      rp('https://www.trendyol.com/adidas+slazenger?q=Spor+Ayakab%C4%B1&st=spor%20ayakab%C4%B1&qt=spor%20ayakab%C4%B1&qs=search'),
      rp('https://www.trendyol.com/adidas+slazenger?q=Spor+Ayakab%C4%B1&st=spor%20ayakab%C4%B1&qt=spor%20ayakab%C4%B1&qs=search&pi=2')
    ];
    Promise.all(promises).then((pages) => {
        pages.forEach(page => {
            let $ = cheerio.load(page);
            
            const products = $('.product-card-wrapper.col-lg-4.col-md-4.col-xs-4');
            let productDescriptionContainer;
            let productPricesContainer;
            let productImageContainer;
        
            products.each((i, elm) => {
                let productInfoContainer = $(elm).children('.product-detail-link').children('.product-card')
                  .children('.product-info-container');
                productImageContainer = $(elm).children('.product-detail-link').children('.product-card').children('.product-image-container');
                productDescriptionContainer = $(productInfoContainer).children('.product-description-container');
                productPricesContainer = $(productInfoContainer).children('.product-prices-container');
                let detailLink = $(elm).children('.product-detail-link').attr('href');
                let Image = productImageContainer.children('.product-image.lazy').attr('data-original');
                
                let Product = {
                  Name: productDescriptionContainer.children('.product-brand-name').text().toLowerCase(),
                  BrandName: productDescriptionContainer.children('.product-name').text().toLowerCase(),
                  MarketPrice: parseInt(productPricesContainer.children('.product-market-price').text()),
                  SalePrice: parseInt(productPricesContainer.children('.product-sale-price').text()),
                  DetailLink: `https://www.trendyol.com${detailLink}`,
                  Seller: 'www.trendyol.com',
                  Image: (Image === undefined) ? '' : Image
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
       Name = shoeInfoContainer.children('.left').children('.brand.main_font').text().toLowerCase();
  
       let Product = {
           Name: Name,
           BrandName: '',
           MarketPrice: parseInt(MarketPrice),
           SalePrice: parseInt(SalePrice),
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
 *  Function which fetches shoes data from seller 1V1Y
 */
exports.fetchShoesFrom1V1Y = () => {
  return new Promise(function(resolve, reject) {
        var parsedResults = [];
          
        request('https://www.1v1y.com/ara?q=spor+ayakkab%C4%B1&marka=4800-57986', (error, statusCode, page) => {
            let $ = cheerio.load(page);
            let Name;
            let BrandName;
            let SalePrice;
            let MarketPrice;
            let DetailLink;
      
        
            $('.col-xs-12.col-sm-4.col-lg-4.product-box').each((i,elm) => {
              let ProductInfoContainer = $(elm).children('.product').children('.product-info');
              Name = ProductInfoContainer.children('.product-title').text().toLowerCase();
              BrandName = ProductInfoContainer.children('.product-type').text().toLowerCase();
              SalePrice = ProductInfoContainer.children('.product-price').children('.new').children('.price').text();
              MarketPrice = ProductInfoContainer.children('.product-price').children('.old').children('.price').text();
              DetailLink = $(elm).children('.product').attr('href');
        
              let Product = {
               
                Name: Name,
                BrandName: BrandName,
                MarketPrice: parseInt(MarketPrice),
                SalePrice:  parseInt(SalePrice),
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
 *  Function which fetches shoes data from seller Sportive
 */
exports.fetchShoesFromSportive = () => {
  return new Promise(function(resolve, reject) {
    var parsedResults = [];
    var promises = [
      rp('https://www.sportive.com.tr/tum-spor-ayakkabilar/slazenger-adidas'),
      rp('https://www.sportive.com.tr/catalog/category/view/id/570/?marka=1042%2C899&p=2'),
      rp('https://www.sportive.com.tr/catalog/category/view/id/570/?marka=1042%2C899&p=3')
    ];
    Promise.all(promises).then((pages) => {
     
        pages.forEach(page => {
            let $ = cheerio.load(page);
            let Name;
            let BrandName;
            let SalePrice;
            let MarketPrice;
            let DetailLink;
        
            $('.col-xs-12.col-sm-4.col-lg-4.product-box').each((i,elm) => {
                  let ProductInfoContainer = $(elm).children('.product').children('.product-info');
                  let ProductImageContainer = $(elm).children('.product').children('.product-photo');

                  Name = ProductInfoContainer.children('.product-title').text();
                  BrandName = ProductInfoContainer.children('.product-type').text();
                  SalePrice = ProductInfoContainer.children('.product-price').children('.new').children('.price').text();
                  MarketPrice = ProductInfoContainer.children('.product-price').children('.old').children('.price').text();
                  DetailLink = $(elm).children('.product').attr('href');
                  Image = ProductImageContainer.children().attr("data-original");
            
                  let Product = {
                    Name: Name.toLowerCase(),
                    BrandName: BrandName.toLowerCase(),
                    MarketPrice: parseInt(MarketPrice),
                    SalePrice: parseInt(SalePrice),
                    DetailLink: DetailLink,
                    Seller: 'www.sportive.com.tr',
                    Image: (Image === undefined) ? '' : Image
                  }
      
                  parsedResults.push(Product);
            });  
        });
        resolve(parsedResults);
    });
  });
}

// adidas, nike, slazenger, hummel