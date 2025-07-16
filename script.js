function updateLoanAmount() {
  const propertyPrice = parseFloat(document.getElementById('propertyPrice').value) || 0;
  const ownCapital = parseFloat(document.getElementById('ownCapital').value) || 0;
  const loan = Math.max(0, propertyPrice - ownCapital);
  document.getElementById('loanAmount').value = loan;
}

function toggleBorrowerFields() {
  const count = document.getElementById('borrowerCount').value;
  const section = document.getElementById('borrower2Section');
  section.style.display = count === '2' ? 'block' : 'none';
}

function calculate() {
  const income = parseFloat(document.getElementById('income').value);
  const expenses = parseFloat(document.getElementById('expenses').value);
  const percentInput = parseFloat(document.getElementById('maxReturnPercent').value);
  const maxReturnPercent = Math.min(Math.max(percentInput, 10), 40);

  const age1 = parseInt(document.getElementById('age1').value);
  const gender1 = document.getElementById('gender1').value;

  const borrowerCount = document.getElementById('borrowerCount').value;

  let avgAge = age1;
  let avgRetirement = gender1 === 'male' ? 67 : 62;

  if (borrowerCount === '2') {
    const age2 = parseInt(document.getElementById('age2').value);
    const gender2 = document.getElementById('gender2').value;
    avgAge = (age1 + age2) / 2;
    const retirementAge1 = gender1 === 'male' ? 67 : 62;
    const retirementAge2 = gender2 === 'male' ? 67 : 62;
    avgRetirement = (retirementAge1 + retirementAge2) / 2;
  }

  const maxYears = Math.floor(avgRetirement - avgAge);

  const propertyPrice = parseFloat(document.getElementById('propertyPrice').value);
  const ownCapital = parseFloat(document.getElementById('ownCapital').value);
  const loanAmount = propertyPrice - ownCapital;
  const interestRate = parseFloat(document.getElementById('interestRate').value);
  const years = parseInt(document.getElementById('years').value);

  const freeIncome = income - expenses;
  const maxMonthlyPayment = freeIncome * (maxReturnPercent / 100);

  const months = years * 12;
  const monthlyInterest = interestRate / 100 / 12;

  let result = "";

  if (maxYears <= 0) {
    result += "<p class='error'>❌ גיל ממוצע של הלווים חורג מגיל הפרישה. לא ניתן לקבל משכנתא.</p>";
    document.getElementById("result").innerHTML = result;
    return;
  }

  if (years > maxYears) {
    result += `<p class='error'>⚠️ תקופת ההלוואה חורגת מגיל הפרישה הממוצע (${avgRetirement}). התקופה המקסימלית האפשרית היא ${maxYears} שנים.</p>`;
  }

  const monthlyPayment = loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, months) /
                         (Math.pow(1 + monthlyInterest, months) - 1);
  const totalPayment = monthlyPayment * months;
  const financingPercent = (loanAmount / propertyPrice) * 100;

  result += `<p><strong>שווי הנכס:</strong> ₪${propertyPrice.toLocaleString('he-IL')}</p>`;
  result += `<p><strong>הון עצמי:</strong> ₪${ownCapital.toLocaleString('he-IL')}</p>`;
  result += `<p><strong>אחוז מימון:</strong> ${financingPercent.toFixed(1)}%</p>`;
  result += `<p><strong>כושר החזר חודשי לפי ${maxReturnPercent}% מהכנסה פנויה:</strong> ₪${maxMonthlyPayment.toLocaleString('he-IL', { minimumFractionDigits: 2 })}</p>`;
  result += `<p><strong>החזר חודשי משוער:</strong> ₪${monthlyPayment.toLocaleString('he-IL', { minimumFractionDigits: 2 })}</p>`;
  result += `<p><strong>סכום כולל לתשלום:</strong> ₪${totalPayment.toLocaleString('he-IL', { maximumFractionDigits: 2 })}</p>`;

  if (monthlyPayment <= maxMonthlyPayment && years <= maxYears) {
    result += "<p class='success'>✅ אתה עומד בתנאי המשכנתא!</p>";
  } else {
    result += "<p class='error'>❌ אינך עומד בתנאי המשכנתא.</p>";
    const maxAffordableLoan = maxLoanAmount(monthlyInterest, months, maxMonthlyPayment);
    result += `<p><strong>סכום מקסימלי שאתה יכול לקבל לפי התנאים:</strong> ₪${maxAffordableLoan.toLocaleString('he-IL')}</p>`;
  }

  localStorage.setItem('lastSimulation', result);
  document.getElementById("result").innerHTML = result;
}

function maxLoanAmount(r, n, monthlyPayment) {
  return monthlyPayment * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
}