// --- 1. Setup and Local Storage ---
// We try to load saved data. If there is none, we start with an empty array [].
let expenses = JSON.parse(localStorage.getItem('financeData')) || [];
const budgetLimit = 500.00; // A static target for our dashboard

// Get our HTML elements
const form = document.getElementById('expense-form');
const tableBody = document.getElementById('table-body');
const searchInput = document.getElementById('search');

// --- 2. The 4 RegEx Validation Rules (Assignment Requirement) ---
// RegEx is a way to search for specific text patterns to ensure the user types things correctly.
const rules = {
    // Rule 1: Forbids leading/trailing spaces or double spaces
    badSpaces: /^\s|\s$|\s{2,}/, 
    // Rule 2: Checks if it's a number, and optionally allows exactly 2 decimal places
    centsFormat: /^\d+(\.\d{2})?$/, 
    // Rule 3: Ensures date is exactly YYYY-MM-DD
    dateFormat: /^\d{4}-\d{2}-\d{2}$/, 
    // Rule 4 (Advanced): Catches if you type the same word twice (e.g., "coffee coffee")
    duplicateWords: /\b(\w+)\s+\1\b/i 
};

// --- 3. Update Dashboard Stats ---
function updateStats() {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        total += parseFloat(expenses[i].amount);
    }
    
    document.getElementById('total-spent').innerText = "$" + total.toFixed(2);
    let remaining = budgetLimit - total;
    document.getElementById('remaining-budget').innerText = "$" + remaining.toFixed(2);
}

// --- 4. Render the Table ---
function renderTable(dataToRender) {
    tableBody.innerHTML = ""; // Clear table first
    
    for (let i = 0; i < dataToRender.length; i++) {
        let record = dataToRender[i];
        let row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.description}</td>
            <td>${record.category}</td>
            <td>$${parseFloat(record.amount).toFixed(2)}</td>
            <td>
                <button onclick="deleteRecord(${record.id})" style="background: #e74c3c;">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    }
    updateStats();
}

// --- 5. Add New Expense (With Validation) ---
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop page from refreshing

    let desc = document.getElementById('description').value;
    let amt = document.getElementById('amount').value;
    let cat = document.getElementById('category').value;
    let dte = document.getElementById('date').value;

    // Run our RegEx Checks
    if (rules.badSpaces.test(desc)) {
        alert("Description cannot have extra spaces at the start, end, or middle.");
        return; // Stop the function
    }
    if (rules.duplicateWords.test(desc)) {
        alert("You typed a duplicate word in the description!");
        return;
    }
    if (!rules.centsFormat.test(amt)) {
        alert("Amount must be a number with up to 2 decimal places (e.g., 12 or 12.50).");
        return;
    }
    if (!rules.dateFormat.test(dte)) {
        alert("Date must be YYYY-MM-DD.");
        return;
    }

    // Create the new record object
    let newRecord = {
        id: Date.now(), // Unique ID based on current time
        description: desc,
        amount: amt,
        category: cat,
        date: dte
    };

    expenses.push(newRecord); // Add to our array
    localStorage.setItem('financeData', JSON.stringify(expenses)); // Save to browser
    
    form.reset(); // Clear form
    renderTable(expenses); // Update screen
});

// --- 6. Delete Record ---
function deleteRecord(id) {
    if (confirm("Are you sure you want to delete this?")) {
        // Filter out the one we want to delete
        expenses = expenses.filter(function(record) {
            return record.id !== id;
        });
        localStorage.setItem('financeData', JSON.stringify(expenses));
        renderTable(expenses);
    }
}

// --- 7. Live Search ---
searchInput.addEventListener('input', function(event) {
    let searchTerm = event.target.value.toLowerCase();
    
    let filteredData = expenses.filter(function(record) {
        return record.description.toLowerCase().includes(searchTerm) || 
               record.category.toLowerCase().includes(searchTerm);
    });
    
    renderTable(filteredData);
});

// --- 8. JSON Export / Import ---
document.getElementById('export-btn').addEventListener('click', function() {
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(expenses));
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "finance_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
});

document.getElementById('import-file').addEventListener('change', function(event) {
    let reader = new FileReader();
    reader.onload = function(e) {
        expenses = JSON.parse(e.target.result);
        localStorage.setItem('financeData', JSON.stringify(expenses));
        renderTable(expenses);
    };
    reader.readAsText(event.target.files[0]);
});

// Start the app!
renderTable(expenses);