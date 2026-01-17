# Monday CRM extractor

A Chrome extension to scrape contact data (name and email) from a Monday.com board and export that as a CSV.

Features
Contacts extraction from the Monday board currently displayed
- Cleaning and removing duplicates from data.
Data extracted are stored using chrome.storage.local

- Export contacts as CSV
Installation
1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions`
3. Activate **Developer mode**

4. Click **Load unpacked**
5. Choose the project folder
Usage
1. Create a Monday.com board
2. Click the Extension icon

3. Click **Extract Current Board**
4. Click **Export CSV**
5. Open the downloaded CSV file

Technical Notes-

 -Uses Chrome Extension Manifest V3.
 -Data extraction is handled via content scripts.
 -Popup and content script communicate via chrome.runtime messaging.
 
 ## DOM Selection Strategy

- The extension runs only on Monday.com board pages.
- Data is extracted directly from the board table DOM.
- Stable column headers and row containers are used instead of dynamic class names.
- The script waits for the board content to fully load before querying rows.
- This approach ensures compatibility across Contacts, Deals, and other board types.

## Storage Schema

- Extracted board data is stored temporarily in `chrome.storage.local`.
- Data structure is an array of row objects.
- Each row object contains:
  - itemName
  - columnValues (key-value pairs)
  - boardType
  - groupName
- Stored data persists across popup refresh until manually cleared or exported.

 Demo: See demo video link in submission email.
