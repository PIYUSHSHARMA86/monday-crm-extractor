console.log("✅ Monday CRM Extractor loaded");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "extract") {
    console.log("📥 Extract request received");
    extractContacts();
    sendResponse({ status: "started" });
  }
});

function extractContacts() {
  console.log("📊 Extracting contacts...");

  // Simple visible-text fallback (works with Monday's React DOM)
  const elements = [...document.querySelectorAll("div")]
    .filter(el => el.innerText.includes("@"));

  const rawContacts = elements.map(el => {
    const lines = el.innerText.split("\n").map(l => l.trim());
    return {
      name: lines[0] || "",
      email: lines.find(l => l.includes("@")) || ""
    };
  });

  // Clean: remove empty + duplicates
  const seen = new Set();
  const cleanContacts = rawContacts.filter(c => {
    if (!c.email) return false;
    if (seen.has(c.email)) return false;
    seen.add(c.email);
    return true;
  });

  console.log("✅ Clean contacts:", cleanContacts.length);
  console.table(cleanContacts);

  chrome.storage.local.set({ contacts: cleanContacts }, () => {
    console.log("💾 Contacts saved to chrome.storage.local");
  });
}
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "export_csv") {
    chrome.storage.local.get("contacts", ({ contacts }) => {
      if (!contacts || !contacts.length) {
        alert("No contacts found. Please extract first.");
        return;
      }

      const csv = convertToCSV(contacts);
      downloadCSV(csv);
    });
  }
});

function convertToCSV(data) {
  const headers = ["name", "email"];
  const rows = data.map(c =>
    `"${c.name.replace(/"/g, '""')}","${c.email}"`
  );

  return [headers.join(","), ...rows].join("\n");
}

function downloadCSV(csv) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "monday_contacts.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

