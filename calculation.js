document.addEventListener('DOMContentLoaded', () => {
  // פונקציה לעדכון סכום משכנתא
  function updateLoanAmount() {
    const propertyPrice = parseFloat(document.getElementById('propertyPrice').value) || 0;
    const ownCapital = parseFloat(document.getElementById('ownCapital').value) || 0;
    const loanAmount = Math.max(0, propertyPrice - ownCapital);
    document.getElementById('loanAmount').value = loanAmount;
  }

  // מאזינים לשינויים בשדות
  document.getElementById('propertyPrice').addEventListener('input', updateLoanAmount);
  document.getElementById('ownCapital').addEventListener('input', updateLoanAmount);

  // ביצוע חישוב ראשון בעת טעינת הדף
  window.onload = updateLoanAmount;
  // אירוע לשינוי מספר הלוויים
  document.getElementById('guarantorCount').addEventListener('change', function() {
    const count = this.value;
    const secondGuarantorDiv = document.getElementById('secondGuarantorFields');
    if (count === '2') {
      secondGuarantorDiv.style.display = 'block';
    } else {
      secondGuarantorDiv.style.display = 'none';
      // איפוס שדות הלווה השני
      document.getElementById('gender2').value = 'male';
      document.getElementById('age2').value = '';
    }
  });

  // אירוע ללחיצה על כפתור חישוב
  document.getElementById('calculateBtn').addEventListener('click', calculate);

  // אירוע לשמירת תוצאה
  document.getElementById('saveBtn').addEventListener('click', () => {
  // מבצע חישוב לפני שמירת התמונה
  calculate();
  // שומר את התוצאה כתמונה
  html2canvas(document.getElementById('result')).then(canvas => {
    const link = document.createElement('a');
    link.download = 'results.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});

  // אירוע ליצוא תוצאה לקובץ טקסט
document.getElementById('exportBtn').addEventListener('click', () => {
  // חישוב לפני יצוא
  calculate();
  // אוספים את הנתונים לתוך טקסט
  const propertyPrice = parseFloat(document.getElementById('propertyPrice').value) || 0;
  const ownCapital = parseFloat(document.getElementById('ownCapital').value) || 0;
  const loanAmount = propertyPrice - ownCapital;
  const dataText = 
    `עלות הדירה: ₪${propertyPrice.toLocaleString('he-IL')}\n` +
    `הון עצמי: ₪${ownCapital.toLocaleString('he-IL')}\n` +
    `סכום משכנתא: ₪${loanAmount.toLocaleString('he-IL')}\n`;
  const blob = new Blob([dataText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'results.txt';
  link.click();
});

  // אירוע לשמירת חישוב
  document.getElementById('saveCalculationBtn').addEventListener('click', () => {
  const data = {
    propertyPrice: document.getElementById('propertyPrice').value,
    ownCapital: document.getElementById('ownCapital').value,
    income: document.getElementById('income').value,
    expenses: document.getElementById('expenses').value,
    maxReturnPercent: document.getElementById('maxReturnPercent').value,
    age1: document.getElementById('age1').value,
    age2: document.getElementById('age2').value,
    gender1: document.getElementById('gender1').value,
    gender2: document.getElementById('gender2').value,
    interestRate: document.getElementById('interestRate').value,
    years: document.getElementById('years').value
  };
  localStorage.setItem('lastCalculation', JSON.stringify(data));
  alert('החישוב נשמר בהצלחה!');
});

  // אירוע לטעינת חישוב שמור
  document.getElementById('loadCalculationBtn').addEventListener('click', () => {
  const dataStr = localStorage.getItem('lastCalculation');
  if (dataStr) {
    const data = JSON.parse(dataStr);
    document.getElementById('propertyPrice').value = data.propertyPrice;
    document.getElementById('ownCapital').value = data.ownCapital;
    document.getElementById('income').value = data.income;
    document.getElementById('expenses').value = data.expenses;
    document.getElementById('maxReturnPercent').value = data.maxReturnPercent;
    document.getElementById('age1').value = data.age1;
    document.getElementById('age2').value = data.age2;
    document.getElementById('gender1').value = data.gender1;
    document.getElementById('gender2').value = data.gender2;
    document.getElementById('interestRate').value = data.interestRate;
    document.getElementById('years').value = data.years;
    alert('החישוב הטעון הוחזר בהצלחה!');
    // אפשר גם להריץ מחדש את חישוב
    calculate();
  } else {
    alert('לא נמצא חישוב שמור.');
  }
});

// בדיקה גילאים
function checkAges() {
  const guarantorCount = parseInt(document.getElementById('guarantorCount').value) || 1;
  const max_years = parseInt(document.getElementById('years').value); // משך ההלוואה
  const ages = [];

  const retirementAgeMale = 67;
  const retirementAgeFemale = 62;

  let totalAgesSum = 0;
  let totalAgesCount = 0;

  for (let i = 1; i <= guarantorCount; i++) {
    const age = parseInt(document.getElementById(`age${i}`).value) || 0;
    const gender = document.getElementById(`gender${i}`).value.toLowerCase();

    // קבע את גיל הפרישה לפי מין
    const retirementAge = (gender === 'male' || gender === 'זכר') ? retirementAgeMale : retirementAgeFemale;

    // בדיקת חריגה מגיל הפרישה
    if (age > retirementAge) {
      alert(`לווה ${i} (${gender}) בגיל ${age} חורג מגיל הפרישה המותר (${retirementAge}).`);
    }

    // בדיקת שהגיל הכולל לא חורג מגיל הפרישה
    if (age + max_years > retirementAge) {
      alert(`גיל הלווה ${i} (${age}) ביחד עם משך ההלוואה ${max_years} שנים חורג מגיל הפרישה (${retirementAge}).`);
    }

    // סיכום לגילאים
    totalAgesSum += age;
    totalAgesCount++;
    ages.push({ age, gender });
  }

  // בדיקת סך הגילאים מול התקופה הכוללת
  if (totalAgesSum > (retirementAgeMale * guarantorCount)) {
    alert(`סכום הגילאים הכולל (${totalAgesSum}) חורג מהמקסימום הכולל (${retirementAgeMale * guarantorCount}).`);
  }

  // בדיקת ממוצע הגילאים מול גיל הפרישה
  const averageAge = totalAgesCount > 0 ? totalAgesSum / totalAgesCount : 0;
  const maxRetirementAge = (guarantorCount > 0 && document.getElementById(`gender1`).value.toLowerCase() === 'female') ? retirementAgeFemale : retirementAgeMale;
  if (averageAge > maxRetirementAge) {
    alert(`ממוצע הגילאים (${averageAge.toFixed(2)}) חורג מגיל הפרישה הממוצע (${maxRetirementAge}).`);
  }
}


  // פונקציה לחישוב
  function calculate() {
  let result = "";

  const propertyPrice = parseFloat(document.getElementById('propertyPrice').value) || 0;
  const ownCapital = parseFloat(document.getElementById('ownCapital').value) || 0;
  const income = parseFloat(document.getElementById('income').value) || 0;
  const expenses = parseFloat(document.getElementById('expenses').value) || 0;
  const percentInput = parseFloat(document.getElementById('maxReturnPercent').value) || 10;
  const maxReturnPercent = Math.min(Math.max(percentInput, 10), 40);

  const years = parseInt(document.getElementById('years').value) || 0;
  const maxYears = years; // הוספת הגדרה ל-maxYears

  const interestRate = parseFloat(document.getElementById('interestRate').value) || 0;
  const annualInterest = interestRate / 100;

  const loanAmount = propertyPrice - ownCapital;
  const months = years * 12;
  const monthlyInterest = annualInterest / 12;

  // חישוב תשלום חודשי
  const monthlyPayment = loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, months) /
                         (Math.pow(1 + monthlyInterest, months) - 1);

  // חישוב תוצאות
  const totalPayment = monthlyPayment * months;
  const financingPercent = (loanAmount / propertyPrice) * 100;

  const maxMonthlyPayment = (income - expenses) * (maxReturnPercent / 100);

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

  document.getElementById("result").innerHTML = result;
  checkAges();
}

  // פונקציה לחישוב מקסימום הלוואה לפי תשלום חודשי
  function maxLoanAmount(r, n, monthlyPayment) {
    return monthlyPayment * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
  }
});
