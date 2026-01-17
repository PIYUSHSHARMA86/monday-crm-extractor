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

 Uses Chrome Extension Manifest V3 
 Data extraction is handled via content scripts
 Popup and content script communicate via chrome.runtime messaging.

 Demo: See demo video link in submission email.
