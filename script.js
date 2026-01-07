/* =========================
   Indian number format
   ========================= */
function formatIndian(num) {
  return Number(num).toLocaleString("en-IN");
}

/* =========================
   Auto format while typing
   (Stable cursor, no 3-digit bug)
   ========================= */
document.querySelectorAll("input").forEach(input => {

  // Only allow numbers
  input.addEventListener("keypress", function (e) {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  });

  input.addEventListener("input", function () {

    let cursorPos = this.selectionStart;
    let oldValue = this.value;

    let raw = oldValue.replace(/,/g, "");

    if (raw === "") {
      this.value = "";
      return;
    }

    if (isNaN(raw)) return;

    let formatted = formatIndian(raw);

    // Count commas before cursor
    let beforeCommas = oldValue
      .slice(0, cursorPos)
      .replace(/[^,]/g, "").length;

    this.value = formatted;

    // Count commas after format
    let afterCommas = formatted
      .slice(0, cursorPos)
      .replace(/[^,]/g, "").length;

    let newPos = cursorPos + (afterCommas - beforeCommas);
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

  // Inputs
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

  // Gujarati Result Output
  document.getElementById("result").innerHTML = `
    <h3>📊 ગણતરી વિગત</h3>

    <p><strong>1️⃣ કાચો માલ વપરાશ</strong></p>
    <p>
      ${rupee(opRM)} (શરૂઆતનો કાચો માલ)
      + ${rupee(purchase)} (નવી ખરીદી)
      − ${rupee(clRM)} (અંતનો બચેલો કાચો માલ)
      = <strong>${rupee(rawUsed)}</strong>
    </p>

    <p><strong>2️⃣ ઉત્પાદન ખર્ચ</strong></p>
    <p>
      ${rupee(rawUsed)} (વપરાયેલ કાચો માલ)
      + ${rupee(expense)} (ખર્ચ)
      = <strong>${rupee(costOfProduction)}</strong>
    </p>

    <p><strong>3️⃣ વેચાયેલ માલ ખર્ચ</strong></p>
    <p>
      ${rupee(opFG)} (શરૂઆતનો તૈયાર માલ)
      + ${rupee(costOfProduction)} (ઉત્પાદન ખર્ચ)
      − ${rupee(clFG)} (અંતનો તૈયાર માલ)
      = <strong>${rupee(cogs)}</strong>
    </p>

    <p><strong>4️⃣ નફો / નુકસાન</strong></p>
    <p>
      ${rupee(sales)} (વેચાણ)
      − ${rupee(cogs)} (વેચાયેલ માલ ખર્ચ)
      = <strong>${rupee(profit)}</strong>
    </p>

    <hr>

    <h2 style="color:${profit >= 0 ? 'green' : 'red'}">
      ${profit >= 0 ? "✅ કુલ નફો" : "❌ કુલ નુકસાન"} : ${rupee(profit)}
    </h2>
  `;
}