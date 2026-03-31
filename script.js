let chart;
let historyList = [];

function calculate() {

  let time = parseFloat(document.getElementById("time").value);
  let energy = parseFloat(document.getElementById("energy").value);
  let products = parseFloat(document.getElementById("products").value);

  if (!time || !energy || !products) {
    alert("Enter all values");
    return;
  }

  let ep = (energy / products).toFixed(2);
  let tp = (time / products).toFixed(2);
  let eff = (products / energy * 100).toFixed(0);

  document.getElementById("ep").innerText = ep + " kWh";
  document.getElementById("tp").innerText = tp + " hrs";
  document.getElementById("eff").innerText = eff + "%";

  // Circle animation
  document.querySelector(".circle").style.background =
    `conic-gradient(#4CAF50 ${eff}%, #ddd ${eff}%)`;

  // Smart Suggestions
  let suggestion = "";

  if (eff < 40) {
    suggestion = "⚠ Very Low Efficiency! Reduce machine idle time & energy waste.";
  } else if (eff < 70) {
    suggestion = "⚠ Moderate Efficiency. Improve process optimization.";
  } else {
    suggestion = "✅ High Efficiency! System performing well.";
  }

  document.getElementById("suggestion").innerText = suggestion;

  // Chart
  let ctx = document.getElementById("chart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Energy', 'Products'],
      datasets: [{
        label: 'Factory Data',
        data: [energy, products]
      }]
    }
  });

  // Save History
  let record = `Energy:${energy}, Products:${products}, Eff:${eff}%`;
  historyList.push(record);

  let historyHTML = "";
  historyList.forEach(item => {
    historyHTML += `<li>${item}</li>`;
  });

  document.getElementById("history").innerHTML = historyHTML;
}
function askAI() {
  let q = document.getElementById("question").value.toLowerCase();
  let ans = "";

  if (q.includes("energy")) {
    ans = "Reduce machine idle time and use efficient motors.";
  } else if (q.includes("efficiency")) {
    ans = "Optimize production and reduce waste.";
  } else {
    ans = "Analyze your factory data to get better insights.";
  }

  document.getElementById("answer").innerText = ans;
}// Save history permanently
localStorage.setItem("factoryHistory", JSON.stringify(historyList));

// Load when page opens
window.onload = function () {
  let saved = JSON.parse(localStorage.getItem("factoryHistory")) || [];
  historyList = saved;

  let html = "";
  historyList.forEach(item => {
    html += `<li>${item}</li>`;
  });

  document.getElementById("history").innerHTML = html;
}
chart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Energy', 'Products'],
    datasets: [{
      data: [energy, products]
    }]
  }
});