
function formatTextToHTML(text) {
  // Convert **bold text** to <strong class="font-bold">bold text</strong>
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong class='font-bold'>$1</strong>");

  // Convert inline code (`some_text`) to <span> with underline and font-medium
  text = text.replace(/`(.*?)`/g, "<span class='underline font-medium'>$1</span>");

  // Split text into lines
  const lines = text.split("\n");
  let formattedText = "";
  let isOrderedList = false;
  let tableBuffer = [];
  let isInsideTable = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // Detect table row (starts and ends with '|')
    if (/^\|.*\|$/.test(line)) {
      tableBuffer.push(line);
      isInsideTable = true;
      continue;
    }

    if (isInsideTable && (!line || !/^\|.*\|$/.test(line))) {
      formattedText += convertMarkdownTableToHTML(tableBuffer);
      tableBuffer = [];
      isInsideTable = false;
    }

    // Convert headings (### some_text → <h3 class="...">some_text</h3>)
    if (/^#+\s*/.test(line)) {
      let textWithoutHash = line.replace(/^#+\s*/, "");
      formattedText += `<h3 class='my-2 font-bold text-lg'>${textWithoutHash}</h3>`;
      continue;
    }

    // Check if the line starts with a number (ordered list)
    if (/^\d+\.\s+/.test(line)) {
      if (!isOrderedList) {
        formattedText += "<ol class='mt-2 list-decimal pl-5'>";
        isOrderedList = true;
      }
      formattedText += `<li>${line.replace(/^\d+\.\s+/, "")}</li>`;
    } else {
      if (isOrderedList) {
        formattedText += "</ol>";
        isOrderedList = false;
      }
      if (line && !isInsideTable) {
        formattedText += `<p class='my-2 text-gray-800'>${line}</p>`;
      }
    }
  }

  // Flush table if still open
  if (isInsideTable) {
    formattedText += convertMarkdownTableToHTML(tableBuffer);
  }

  if (isOrderedList) {
    formattedText += "</ol>";
  }

  return formattedText;
}

// Helper to convert Markdown table to HTML
function convertMarkdownTableToHTML(rows) {
  if (rows.length < 2) return "";

  const headers = rows[0].split("|").slice(1, -1).map(h => h.trim());
  const separator = rows[1];
  const dataRows = rows.slice(2);

  let html = "<div class='w-full text-nowrap overflow-auto max-h-[300px] my-4 custom-scrollbar custom-scrollbar-1'><table class='table-auto border-collapse w-full border border-gray-400'>";
  html += "<thead><tr>";
  headers.forEach(header => {
    html += `<th class='border border-gray-400 px-3 py-2 bg-gray-100 text-left font-bold'>${header}</th>`;
  });
  html += "</tr></thead><tbody>";

  dataRows.forEach(row => {
    const cells = row.split("|").slice(1, -1).map(c => c.trim());
    html += "<tr class='hover:bg-gray-300'>";
    cells.forEach(cell => {
      html += `<td class='border border-gray-300 px-3 py-2'>${cell}</td>`;
    });
    html += "</tr>";
  });

  html += "</tbody></table></div>";
  return html;
}

export {
    formatTextToHTML
}