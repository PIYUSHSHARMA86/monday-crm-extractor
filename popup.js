document.getElementById("extract").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.sendMessage(
    tab.id,
    { action: "extract" },
    () => {
      if (chrome.runtime.lastError) {
        console.error("❌ Extract failed:", chrome.runtime.lastError.message);
      } else {
        console.log("✅ Extract request sent");
      }
    }
  );
});

document.getElementById("export").addEventListener("click", () => {
  chrome.storage.local.get("contacts", ({ contacts }) => {
    if (!contacts || contacts.length === 0) {
      alert("No contacts found. Please extract first.");
      return;
    }

    const csv = convertToCSV(contacts);
    downloadCSV(csv);
  });
});

/* ---------- Helpers ---------- */

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

  chrome.downloads.download({
    url,
    filename: "monday_contacts.csv",
    saveAs: true
  });
}


