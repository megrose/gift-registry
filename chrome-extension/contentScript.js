// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getPageInfo") {
      // Get page information
      const pageInfo = {
        title: document.title,
        url: window.location.href,
        price: findPrice(),
        image: findMainImage(),
        description: findDescription()
      };
      sendResponse(pageInfo);
    }
  });
  
  // Helper function to find price on the page
  function findPrice() {
    const priceSelectors = [
      '[data-price]',
      '.price',
      '#price',
      '[itemprop="price"]',
      '.product-price'
    ];
    
    for (let selector of priceSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        return element.textContent.trim();
      }
    }
    return '';
  }
  
  // Helper function to find main product image
  function findMainImage() {
    const imageSelectors = [
      '[data-main-image]',
      '.product-image',
      '#main-image',
      '[itemprop="image"]',
      '.product-image img'
    ];
    
    for (let selector of imageSelectors) {
      const element = document.querySelector(selector);
      if (element && element.src) {
        return element.src;
      }
    }
    return '';
  }
  
  // Helper function to find product description
  function findDescription() {
    const descriptionSelectors = [
      '[data-description]',
      '.product-description',
      '#description',
      '[itemprop="description"]',
      '.product-details'
    ];
    
    for (let selector of descriptionSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        return element.textContent.trim();
      }
    }
    return '';
  }