document.addEventListener('DOMContentLoaded', async () => {
    // Get current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Get page information from content script
    chrome.tabs.sendMessage(tab.id, { action: "getPageInfo" }, async (response) => {
      if (response) {
        displayItemPreview(response);
        await loadUserLists();
      }
    });
    
    document.getElementById('save-item').addEventListener('click', saveItem);
  });
  
  function displayItemPreview(itemInfo) {
    const preview = document.getElementById('item-preview');
    preview.innerHTML = `
      <img src="${itemInfo.image || ''}" alt="Product image">
      <h3>${itemInfo.title || 'Product'}</h3>
      <p>${itemInfo.price || 'Price not found'}</p>
    `;
  }
  
  async function loadUserLists() {
    try {
      // Replace with your API endpoint
      const response = await fetch('http://localhost:3000/api/lists', {
        headers: {
          'Authorization': `Bearer ${await getAuthToken()}`
        }
      });
      
      const lists = await response.json();
      const select = document.getElementById('list-select');
      
      lists.forEach(list => {
        const option = document.createElement('option');
        option.value = list.id;
        option.textContent = list.name;
        select.appendChild(option);
      });
    } catch (error) {
      console.error('Error loading lists:', error);
    }
  }
  
  async function saveItem() {
    const listId = document.getElementById('list-select').value;
    if (!listId) {
      alert('Please select a list');
      return;
    }
    
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, { action: "getPageInfo" }, async (itemInfo) => {
      try {
        // Replace with your API endpoint
        const response = await fetch(`http://localhost:3000/api/lists/${listId}/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await getAuthToken()}`
          },
          body: JSON.stringify(itemInfo)
        });
        
        if (response.ok) {
          alert('Item saved successfully!');
          window.close();
        } else {
          alert('Error saving item');
        }
      } catch (error) {
        console.error('Error saving item:', error);
        alert('Error saving item');
      }
    });
  }
  
  async function getAuthToken() {
    // For now, return null or implement your auth token storage
    return new Promise((resolve) => {
      chrome.storage.local.get(['authToken'], (result) => {
        resolve(result.authToken);
      });
    });
  }