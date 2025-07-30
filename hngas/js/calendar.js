document.addEventListener("DOMContentLoaded", function () {
  var selectYear = document.getElementById("year");
  var currentYear = new Date().getFullYear();
  var futureYear = currentYear + 1;

  for (var year = currentYear; year <= futureYear; year++) {
    var option = document.createElement("option");
    option.value = year;
    option.text = year;
    selectYear.appendChild(option);
  }

  var selectMonth = document.getElementById("month");
  for (var month = 1; month <= 12; month++) {
    var option = document.createElement("option");
    option.value = month;
    option.text = month;
    selectMonth.appendChild(option);
  }
});

// 年月日をyymmdd形式に変換
function formatDateId(month, day) {
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${mm}${dd}`;
}

function generateCalendar() {
  var selectedYear = document.getElementById("year").value;
  var selectedMonth = document.getElementById("month").value;
  var startingDay = new Date(selectedYear, selectedMonth - 1, 1).getDay();
  var daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

  var timeOptions_am_start = ["", "10：00 ～ 11：30", "10：00 ～ 13：00", "10：30 ～ 13：00", "10：30 ～ 13：30"];
  var timeOptions_pm_start = ["", "14：00 ～ 17：00"];
  var teacherOptions = ["numasaki", "yamasita", "osaki", "kusakabe", "watanabe"];

  var calendarHTML = "<table><tr><th>sun</th><th>mon</th><th>tue</th><th>wed</th><th>thu</th><th>fri</th><th>sat</th></tr><tr>";

  for (var i = 0; i < startingDay; i++) {
    calendarHTML += "<td></td>";
  }

  for (var day = 1; day <= daysInMonth; day++) {
    var dateId = formatDateId(selectedMonth, day);

    calendarHTML += `<td id="entry_${dateId}">`;
    calendarHTML += `<div>${day}</div><div>`;

    // 開始時間
    calendarHTML += `<select id="time_am_${dateId}" data-target="am" autocomplete="off" onchange="toggleInputs(this)">`;
    timeOptions_am_start.forEach(function (option) {
      calendarHTML += `<option value="${option}">${option}</option>`;
    });
    calendarHTML += `</select>`;
    // メニュー
    calendarHTML += `<textarea id="menu_am_${dateId}" autocomplete="off" class="hidden" placeholder="メニュー"></textarea>`;
    calendarHTML += "</div><div>";

    // 開始時間
    calendarHTML += `<select id="time_pm_${dateId}" data-target="pm" autocomplete="off" onchange="toggleInputs(this)">`;
    timeOptions_pm_start.forEach(function (option) {
      calendarHTML += `<option value="${option}">${option}</option>`;
    });
    calendarHTML += `</select>`;
    // メニュー
    calendarHTML += `<textarea id="menu_pm_${dateId}" autocomplete="off" class="hidden" placeholder="メニュー"></textarea>`;
    calendarHTML += "</div><div>";

    // 講師・受講料
    calendarHTML += `<select id="teacher_am_${dateId}" autocomplete="off" class="hidden">`;
    calendarHTML += `<option value=>講師</option>`;
    teacherOptions.forEach(function (option) {
      calendarHTML += `<option value="${option}">${option}</option>`;
    });
    calendarHTML += `</select>`;
    calendarHTML += `<input type="text" id="price_am_${dateId}" autocomplete="off" class="hidden" placeholder="受講料">`;
    calendarHTML += "</div></td>";

    if ((day + startingDay) % 7 === 0) {
      calendarHTML += "</tr><tr>";
    }
  }

  if ((startingDay + daysInMonth) % 7 !== 0) {
    var remainingDays = 7 - ((startingDay + daysInMonth) % 7);
    for (var i = 0; i < remainingDays; i++) {
      calendarHTML += "<td></td>";
    }
  }

  calendarHTML += "</tr></table>";
  document.getElementById("calendarContainer").innerHTML = calendarHTML;
}
