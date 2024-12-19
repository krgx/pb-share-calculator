document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("calculator-form");
    const result = document.getElementById("result");
    const increasePercentageContainer = document.getElementById("increase-percentage-container");
    const targetMarginContainer = document.getElementById("target-margin-container");
    const increaseMarginRadio = document.getElementById("increase-margin");
    const targetMarginRadio = document.getElementById("target-margin");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const currentIncome = parseFloat(document.getElementById("current-income").value);
        const currentExpense = parseFloat(document.getElementById("current-expense").value);
        const method = document.querySelector('input[name="method"]:checked').value;

        let pbShare = 0;

        if (method === "1") {
            const increasePercentage = parseFloat(document.getElementById("increase-percentage").value);
            pbShare = calculatePbShareByPercentage(currentIncome, currentExpense, increasePercentage);
            result.textContent = `Для увеличения маржи на ${increasePercentage}% настройте pb share на: ${pbShare.toFixed(4)}`;
        } else if (method === "2") {
            const targetMargin = parseFloat(document.getElementById("target-margin-value").value);
            pbShare = calculatePbShareByTargetMargin(currentIncome, currentExpense, targetMargin);
            result.textContent = `Для достижения маржи ${targetMargin * 100}% настройте pb share на: ${pbShare.toFixed(4)}`;
        }
    });

    increaseMarginRadio.addEventListener("change", function () {
        increasePercentageContainer.style.display = "block";
        targetMarginContainer.style.display = "none";
    });

    targetMarginRadio.addEventListener("change", function () {
        increasePercentageContainer.style.display = "none";
        targetMarginContainer.style.display = "block";
    });
});

function calculatePbShareByPercentage(currentIncome, currentExpense, increasePercentage) {
    const currentMargin = currentIncome - currentExpense;
    const newMargin = currentMargin * (1 + increasePercentage / 100);
    const newExpense = currentIncome - newMargin;
    return newExpense / currentExpense;
}

function calculatePbShareByTargetMargin(currentIncome, currentExpense, targetMargin) {
    const newExpense = currentIncome * targetMargin;
    return newExpense / currentExpense;
}
