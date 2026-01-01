function calculate() {
  // Get input values (default 0)
  const opRM = Number(document.getElementById("opRM").value) || 0;
  const purchase = Number(document.getElementById("purchase").value) || 0;
  const clRM = Number(document.getElementById("clRM").value) || 0;
  const expense = Number(document.getElementById("expense").value) || 0;
  const sales = Number(document.getElementById("sales").value) || 0;
  const opFG = Number(document.getElementById("opFG").value) || 0;
  const clFG = Number(document.getElementById("clFG").value) || 0;

  // -------------------------------
  // RESULT 1 (LOCKED – BASE LOGIC)
  // -------------------------------

  // Raw material consumption
  const rawUsed = opRM + purchase - clRM;

  // Total expense
  const totalExpense = rawUsed + expense;

  // Profit (base calculation)
  const profit = sales - totalExpense;

  // -------------------------------
  // RESULT 2 (EXTRA EXPLANATION)
  // -------------------------------

  // Finished goods movement (for understanding)
  const finishedGoodsUsed = opFG - clFG;

  // -------------------------------
  // DISPLAY RESULT
  // -------------------------------

  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = `
    <h3>નફો પરિણામ (મૂળ ગણતરી)</h3>
    <p>કાચો માલ વપરાશ: ₹${rawUsed}</p>
    <p>ખર્ચ: ₹${expense}</p>
    <p>વેચાણ: ₹${sales}</p>
    <p><strong>નફો: ₹${profit}</strong></p>

    <hr>

    <h3>વિગતવાર સમજ / વધારાની ગણતરી</h3>
    <p>કાચો માલ વપરાશ: ₹${rawUsed}</p>
    <p>ખર્ચ: ₹${expense}</p>
    <p>Total Exp: ${rawUsed} + ${expense} = ₹${totalExpense}</p>

    <br>

    <p>વેચાણ: ₹${sales} (તૈયાર માલ આધારિત)</p>
    <p>તૈયાર માલ ફેરફાર: ${opFG} − ${clFG} = ₹${finishedGoodsUsed}</p>

    <p><strong>નફો: ₹${profit}</strong></p>
  `;
}