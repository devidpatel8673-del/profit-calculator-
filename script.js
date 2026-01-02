/* =========================
   Indian number format
   ========================= */
function formatIndian(num) {
  return Number(num).toLocaleString("en-IN");
}

/* =========================
   Auto format while typing
   ========================= */
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", function () {
    let raw = this.value.replace(/,/g, "");
    if (raw === "") return;
    if (isNaN(raw)) {
      this.value = this.value.slice(0, -1);
      return;
    }
    this.value = formatIndian(raw);
  });
});

/* =========================
   Safe number read
   ========================= */
function getNum(id) {
  return Number(
    document.getElementById(id).value.replace(/,/g, "")
  ) || 0;
}

/* =========================
   Rupee display
   ========================= */
function rupee(n) {
  return "₹ " + formatIndian(n);
}

/* =========================
   MAIN CALCULATION
   ========================= */
function calculate() {

  // 1️⃣ Inputs
  let opRM = getNum("opRM");
  let purchase = getNum("purchase");
  let clRM = getNum("clRM");
  let expense = getNum("expense");
  let sales = getNum("sales");
  let opFG = getNum("opFG");
  let clFG = getNum("clFG");

  // 2️⃣ Raw Material Consumed
  // Opening RM + Purchase – Closing RM
  let rawUsed = opRM + purchase - clRM;

  // 3️⃣ Cost of Production
  // Raw Used + Expense
  let costOfProduction = rawUsed + expense;

  // 4️⃣ Cost of Goods Sold (COGS)
  // Opening FG + Cost of Production – Closing FG
  let cogs = opFG + costOfProduction - clFG;

  // 5️⃣ Profit / Loss
  // Sales – COGS
  let profit = sales - cogs;

  // 6️⃣ Output with explanation
  document.getElementById("result").innerHTML = `
    <h3>📊 ગણતરી વિગત (Calculation Details)</h3>

    <p><strong>1️⃣ કાચો માલ વપરાશ</strong></p>
    <p>${rupee(opRM)} (Opening RM)
       + ${rupee(purchase)} (Purchase)
       − ${rupee(clRM)} (Closing RM)
       = <strong>${rupee(rawUsed)}</strong></p>

    <p><strong>2️⃣ ઉત્પાદન ખર્ચ</strong></p>
    <p>${rupee(rawUsed)} (Raw Used)
       + ${rupee(expense)} (Expense)
       = <strong>${rupee(costOfProduction)}</strong></p>

    <p><strong>3️⃣ વેચાયેલ માલ ખર્ચ (COGS)</strong></p>
    <p>${rupee(opFG)} (Opening FG)
       + ${rupee(costOfProduction)} (Production Cost)
       − ${rupee(clFG)} (Closing FG)
       = <strong>${rupee(cogs)}</strong></p>

    <p><strong>4️⃣ નફો / નુકસાન</strong></p>
    <p>${rupee(sales)} (Sales)
       − ${rupee(cogs)} (COGS)
       = <strong>${rupee(profit)}</strong></p>

    <hr>
    <h2 style="color:${profit >= 0 ? 'green' : 'red'}">
      ${profit >= 0 ? "✅ કુલ નફો" : "❌ કુલ નુકસાન"} : ${rupee(profit)}
    </h2>
  `;
}