/* =========================
   Indian number format
   ========================= */
function formatIndian(num) {
  return Number(num).toLocaleString("en-IN");
}

/* =========================
   Auto format while typing
   (NO 3-digit bug, NO cursor jump)
   ========================= */
document.querySelectorAll("input").forEach(input => {

  // Prevent non-numeric keys
  input.addEventListener("keypress", function (e) {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  });

  input.addEventListener("input", function () {

    // Save cursor position
    let start = this.selectionStart;

    // Raw numeric value
    let raw = this.value.replace(/,/g, "");

    // Allow empty
    if (raw === "") {
      this.value = "";
      return;
    }

    // Safety
    if (isNaN(raw)) return;

    // Format number
    let formatted = formatIndian(raw);

    // Count commas before cursor
    let beforeCursor = this.value
      .slice(0, start)
      .replace(/[^,]/g, "").length;

    // Set formatted value
    this.value = formatted;

    // Count commas after format
    let afterCursor = formatted
      .slice(0, start)
      .replace(/[^,]/g, "").length;

    // Adjust cursor position
    let newPos = start + (afterCursor - beforeCursor);
    this.setSelectionRange(newPos, newPos);
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

  let opRM = getNum("opRM");
  let purchase = getNum("purchase");
  let clRM = getNum("clRM");
  let expense = getNum("expense");
  let sales = getNum("sales");
  let opFG = getNum("opFG");
  let clFG = getNum("clFG");

  // Raw material consumed
  let rawUsed = opRM + purchase - clRM;

  // Cost of production
  let costOfProduction = rawUsed + expense;

  // Cost of goods sold
  let cogs = opFG + costOfProduction - clFG;

  // Profit / Loss
  let profit = sales - cogs;

  // Output with explanation
  document.getElementById("result").innerHTML = `
    <h3>📊 ગણતરી વિગત</h3>

    <p><b>કાચો માલ વપરાશ</b><br>
    ${rupee(opRM)} + ${rupee(purchase)} − ${rupee(clRM)}
    = <b>${rupee(rawUsed)}</b></p>

    <p><b>ઉત્પાદન ખર્ચ</b><br>
    ${rupee(rawUsed)} + ${rupee(expense)}
    = <b>${rupee(costOfProduction)}</b></p>

    <p><b>COGS</b><br>
    ${rupee(opFG)} + ${rupee(costOfProduction)} − ${rupee(clFG)}
    = <b>${rupee(cogs)}</b></p>

    <p><b>નફો / નુકસાન</b><br>
    ${rupee(sales)} − ${rupee(cogs)}
    = <b style="color:${profit >= 0 ? 'green' : 'red'}">
      ${rupee(profit)}
    </b></p>
  `;
}