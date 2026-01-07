/* =========================
   Indian number format
   ========================= */
function formatIndian(num) {
  return Number(num).toLocaleString("en-IN");
}

/* =========================
   Auto format while typing
   (No cursor jump, no 3-digit bug)
   ========================= */
document.querySelectorAll("input").forEach(input => {

  // Block non-numeric keys
  input.addEventListener("keypress", function (e) {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  });

  input.addEventListener("input", function () {

    let cursorPos = this.selectionStart;
    let oldValue = this.value;

    // Remove commas
    let raw = oldValue.replace(/,/g, "");

    // Allow empty
    if (raw === "") {
      this.value = "";
      return;
    }

    if (isNaN(raw)) return;

    // Format
    let formatted = formatIndian(raw);

    // Count commas before cursor
    let commasBefore = oldValue
      .slice(0, cursorPos)
      .replace(/[^,]/g, "").length;

    this.value = formatted;

    // Count commas after format
    let commasAfter = formatted
      .slice(0, cursorPos)
      .replace(/[^,]/g, "").length;

    let newPos = cursorPos + (commasAfter - commasBefore);
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

  // 1️⃣ કાચો માલ વપરાશ
  let rawUsed = opRM + purchase - clRM;

  // 2️⃣ ઉત્પાદન ખર્ચ
  let costOfProduction = rawUsed + expense;

  // 3️⃣ વેચાયેલ માલ ખર્ચ
  let cogs = opFG + costOfProduction - clFG;

  // 4️⃣ નફો / નુકસાન
  let profit = sales - cogs;

  document.getElementById("result").innerHTML = `
    <h3>📊 ગણતરી વિગત</h3>

    <p><b>1️⃣ કાચો માલ વપરાશ</b><br>
      ${rupee(opRM)} (શરૂઆતનો કાચો માલ)
      + ${rupee(purchase)} (નવી ખરીદી)
      − ${rupee(clRM)} (અંતનો બચેલો કાચો માલ)
      = <b>${rupee(rawUsed)}</b>
    </p>

    <p><b>2️⃣ ઉત્પાદન ખર્ચ</b><br>
      ${rupee(rawUsed)} (વપરાયેલ કાચો માલ)
      + ${rupee(expense)} (ખર્ચ)
      = <b>${rupee(costOfProduction)}</b>
    </p>

    <p><b>3️⃣ વેચાયેલ માલ ખર્ચ</b><br>
      ${rupee(opFG)} (શરૂઆતનો તૈયાર માલ)
      + ${rupee(costOfProduction)} (ઉત્પાદન ખર્ચ)
      − ${rupee(clFG)} (અંતનો તૈયાર માલ)
      = <b>${rupee(cogs)}</b>
    </p>

    <p><b>4️⃣ નફો / નુકસાન</b><br>
      ${rupee(sales)} (વેચાણ)
      − ${rupee(cogs)} (વેચાયેલ માલ ખર્ચ)
      =
      <b style="color:${profit >= 0 ? 'green' : 'red'}">
        ${rupee(profit)}
      </b>
    </p>

    <hr>

    <h2 style="color:${profit >= 0 ? 'green' : 'red'}">
      ${profit >= 0 ? "✅ કુલ નફો" : "❌ કુલ નુકસાન"} : ${rupee(profit)}
    </h2>
  `;
}