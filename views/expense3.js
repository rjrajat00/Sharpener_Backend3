document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const getData = document.getElementById("getData");

  async function getAllData() {
    try {
      const response = await axios.get("/expenses/get");
      const expenses = response.data.expense;

      // Clear the existing content in the container
      getData.innerHTML = "";

      // Create a new list element for each expense and append it to the container
      expenses.forEach((expense) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${expense.description}: ₹${expense.amount}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.id = "delBtn";
        deleteBtn.classList.add("btn", "btn-danger");
        deleteBtn.dataset.expenseId = expense.id;
        deleteBtn.style.marginLeft = "20px";
        deleteBtn.style.marginTop = "20px";
        deleteBtn.style.marginBottom = "20px";

        const editBtn = document.createElement("button");
        editBtn.classList = "editBtn, btn btn-warning";
        editBtn.id = "editBtn";
        editBtn.textContent = "Edit";
        editBtn.style.marginLeft = "20px";
        editBtn.style.marginTop = "20px";
        editBtn.style.marginBottom = "20px";
        editBtn.dataset.expenseId = expense.id;
        // editBtn.setAttribute('href', `/update_form?id=${expense._id}`)

        listItem.appendChild(deleteBtn);
        listItem.appendChild(editBtn);
        getData.appendChild(listItem);
      });
    } catch (error) {
      console.error("Error:", error);
    }

    document.querySelectorAll("#delBtn").forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const expenseId = deleteBtn.dataset.expenseId;

        try {
          // Send DELETE request to backend
          await axios.delete(`/expenses/${expenseId}`);

          // Remove the HTML element from the page
          deleteBtn.parentElement.remove();
        } catch (error) {
          console.error("Error deleting expense:", error);
          // Handle the error
        }
      });
    });

    document.querySelectorAll("#editBtn").forEach((editBtn) => {
      editBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        console.log("edit button is clicked");

        const expenseId = editBtn.dataset.expenseId;

        // Fetch the specific expense data by ID
        try {
          const response = await axios.get(`/expenses/${expenseId}`);
          const expense = response.data.expense;

          // Show the editable fields in a form or modal
          // For simplicity, I'll use an alert to show the fields
          alert(
            `Editing Expense with ID ${expenseId}:\n\nDescription: ${expense.description}\nAmount: ${expense.amount}`
          );
        } catch (error) {
          console.error("Error fetching expense data:", error);
          // Handle the error
        }
      });
    });
  }

  getAllData();

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    console.log("inside the add event listener");
    // Get form values
    const description = document.getElementById("desc").value;
    const amount = document.getElementById("amount").value;

    // Create data object
    const data = {
      description: description,
      amount: amount,
    };

    try {
      // Send POST request to backend
      const response = await axios.post("/expenses", data);

      // Handle response from the backend
      document.getElementById("form").reset();

      document.getElementById("button").disabled = false;
      console.log(response.data);
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  });
});
