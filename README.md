# Student Finance Tracker
Link to Project:"https://ymutunzi-crypto.github.io/finance-tracker/"
**Author:** Yannick Mutunzi

## 📖 Project Overview
The Student Finance Tracker is a lightweight, responsive web application designed to help students manage their daily budgets. It allows users to log expenses, categorize them, track their remaining budget against a target, and save their data locally. 

This project was built entirely with **Vanilla HTML, CSS, and JavaScript** to demonstrate a core understanding of fundamental web technologies without relying on external frameworks like React or Bootstrap.

---

## ✨ Features & Rubric Alignment

This project was built to satisfy the specific milestones of the Responsive UI grading rubric:

* **Semantic HTML & Accessibility (M2, M7):** Uses proper semantic tags (`<header>`, `<main>`, `<section>`). Includes a "skip-to-content" link for keyboard navigation, visible focus states, and `aria-live="polite"` on the dashboard for screen reader support.
* **Mobile-First CSS (M2):** Fully responsive design utilizing Flexbox. The layout adapts smoothly across three breakpoints (~360px, 768px, 1024px) ensuring a great experience on phones, tablets, and desktops. Includes a tasteful button hover transition.
* **JavaScript DOM Manipulation (M4, M5):** Dynamically renders table rows based on user input. Includes a live-search feature that filters the table array as the user types, without breaking accessibility. Calculates and updates total dashboard stats in real-time.
* **Data Persistence & JSON (M6):** Utilizes browser `localStorage` to ensure data survives page reloads. Includes full functionality to Export records to a `.json` file and Import a valid `.json` file back into the app.

---

## 🔍 RegEx Validation Catalog (M3)
To ensure clean data entry, the Add Expense form implements four specific Regular Expression rules before allowing a submission:

1. **No Bad Spaces:** `/^\s|\s$|\s{2,}/`
   * *Purpose:* Prevents the user from submitting a description with leading spaces, trailing spaces, or consecutive double spaces.
2. **Strict Currency Format:** `/^\d+(\.\d{2})?$/`
   * *Purpose:* Ensures the amount entered is a valid number and forces exactly two decimal places for cents (e.g., `12` or `12.50`).
3. **Date Format:** `/^\d{4}-\d{2}-\d{2}$/`
   * *Purpose:* Enforces the standard `YYYY-MM-DD` date layout.
4. **Advanced Rule (Duplicate Words):** `/\b(\w+)\s+\1\b/i`
   * *Purpose:* Uses a back-reference to detect if the user accidentally typed the same word twice in the description (e.g., catching "Coffee Coffee").

---

## 🚀 How to Run the Project locally
Because this project uses vanilla web technologies, no complex node packages or servers are required.

1. Clone this repository to your local machine:
   `git clone https://github.com/ymutunzi-crypto/finance-tracker.git`
2. Open the project folder.
3. Double-click the `index.html` file to open it directly in any modern web browser.
4. *Alternatively, view the live deployed version via GitHub Pages (Link provided in the assignment submission).*
