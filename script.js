function calculate() {

  // Input values (₹)
  let opRM = parseFloat(document.getElementById("opRM").value) || 0;
  let purchase = parseFloat(document.getElementById("purchase").value) || 0;
  let clRM = parseFloat(document.getElementById("clRM").value) || 0;
  let expense = parseFloat(document.getElementById("expense").value) || 0;
  let sales = parseFloat(document.getElementById("sales").value) || 0;
  let opFG = parseFloat(document.getElementById("opFG").value) || 0;
  let clFG = parseFloat(document.getElementById("clFG").value) || 0;

  // Calculations
  let rawMaterialConsumed = opRM + purchase - clRM;
  let costOfProduction = rawMaterialConsumed + expense;
  let costOfGoodsSold = opFG + costOfProduction - clFG;
  let profit = sales - costOfGoodsSold;

  // Result display
  let resultHTML = `
    <p>🧾 કાચો માલ વપરાશ: ₹ ${rawMaterialConsumed.toFixed(2)}</p>
    <p>🏭 ઉત્પાદન ખર્ચ: ₹ ${costOfProduction.toFixed(2)}</p>
    <p>📦 વેચાયેલ માલ ખર્ચ (COGS): ₹ ${costOfGoodsSold.toFixed(2)}</p>
    <hr>
    <h3>${profit >= 0 ? "✅ નફો" : "❌ નુકસાન"} : ₹ ${profit.toFixed(2)}</h3>
  `;

  document.getElementById("result").innerHTML = resultHTML;
}
