// 1. import data from expense-data.js
import theExpenses from "./expense-data.js";

// 2. select the container element that our cards will be nested in
const expenseContainer = document.getElementById("expense-container")

// 3. render out the data as a grid of cards
function renderExpenses(expenses) {
    // const expenseList = document.getElementById("expense-list")
    expenseContainer.innerHTML = ""; // clear the container in prep for data

    expenses.forEach(
        (expense) => {
            expenseContainer.innerHTML += `
            <div class="card" id="${expense.id}">
                <div class="header">
                    <div>
                        <div class="title">${expense.title}</div>
                        <div class="meta category">${expense.category}</div>
                    </div>
                    <div class="amount">$${expense.amount}</div>
                </div>
                <div class="meta date">${expense.date}</div>
                <div class="actions">
                    <button class="edit-btn" id=${expense.id}>Edit</button>
                    <button class="delete-btn" id=${expense.id}>Delete</button>
                </div>
            </div>
            `
        }
    );
}

// 4. render the result (we can recall this to re-render the page)
renderExpenses(theExpenses);

// 5. implement add/edit behaviour
document
.getElementById("expense-form-add")
.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();
        // we're going to write this behavior so it can be reusable between existing parts
        const title = document.getElementById("title").value;
        const category = document.getElementById("category").value;
        const date = document.getElementById("date").value;
        const amount = parseFloat(document.getElementById("amount").value);
        // because I can I'll use the inline text on the button
        if (document.getElementById("submiter").innerText === "Add Expense") {
            // ideally, a bit of quick validation
            if (title && category && date && !isNaN(amount)) {
                // create a new expense object we'll be adding to the grid of cards
                const newExpense = {
                    id: theExpenses.length +1, // auto-incrementing
                    title,
                    category,
                    date,
                    amount
                };
                // to get this to go up, push it to the array of data
                theExpenses.push(newExpense);
                renderExpenses(theExpenses);
                this.reset(); // reset the form after input submission
            } else {
                alert("Please fill in all fields correctly")
            }
        } else {
            // non-obvious: if the text isn't "Add Expense"
            const expenseId = parseInt(document.getElementById("expense-id").value); // reading from hideen input
            const expenseToEdit = theExpenses.find(
                (expense) => expense.id === expenseId
            );
            if (expenseToEdit) { // simple null check ( did I actually find a mathcing elemtn?)
                expenseToEdit.title = title;
                expenseToEdit.category = category;
                expenseToEdit.date = date;
                expenseToEdit.amount = amount;
                this.reset(); // after submitting, reset input fields
                renderExpenses(theExpenses); // re-render data
            }
        }
    }
);

// 6. implement live search filtration
document
    .getElementById("searchbox")
    .addEventListener(
        "input",
        function (event) {
            const searchTerm = event.target.value.toLowerCase(); // gets the value within the search bar
            const filteredExpenses = theExpenses.filter(
                // filter: apply a conditional expression
                (expense) => expense.title.toLowerCase().includes(searchTerm)
            );
            renderExpenses(filteredExpenses);
        }
    );

// 7. 
// We're searching in the entire expense container so we need to specify what button we're clicking
// We can use the ID associated with each individual card and check which of the two buttons was presses
// The alternative is attaching a listener to every card which is not feasible
expenseContainer.addEventListener(
    "click",
    function (event) {
        // a) look for the edit button click OR...
        if (event.target.classList.contains("delete-btn")) { // classList not classlist
            const expenseId = parseInt(event.target.id)
            const expenseIndex = theExpenses.findIndex(
                // notice we're getting the position of the desired element, not it itself
                (expense) => expense.id === expenseId
            );
            if (expenseIndex != -1) {
                theExpenses.splice(expenseIndex, 1)
                // ^ pay attention to the parameters here (e.g. mouseover splice in vscode):
                //    param1 - the index to begin deleting at (required)
                //    param2 - how many elements to remove (including starting element).
                //              is optional - if not provided, removes everything at or after the param1 index
                renderExpenses(theExpenses);
            }
            // b) look for the delete button click
        }   else if (event.target.classlist.contains("edit-btn")) {
            const expenseId = parseInt(event.target.id);
            const expenseToEdit = theExpenses.find(
                (expense) => expense.id === expenseId
            );
            if (expenseToEdit) {
                document.getElementById("title").value = expenseToEdit.title
                document.getElementById("category").value = expenseToEdit.category
                document.getElementById("date").value = expenseToEdit.date
                document.getElementById("amount").value = expenseToEdit.amount
                document.getElementById("expense-id").value = expenseToEdit.id
                document.getElementById("submiter").innerText = "Save Changes"
            }
        }
    }
)