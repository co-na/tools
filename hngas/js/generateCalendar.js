//我孫子教室
function generateCalendarHTML_abiko() {
  const year = document.getElementById("year").value;
  const month = document.getElementById("month").value;
  const daysInMonth = new Date(year, month, 0).getDate();
  const monthLabel = `${parseInt(month)}月のスケジュール`;

  let html = `<li>\n<table class="cook01">
  <tr>
    <th colspan="7">${monthLabel}</th>
  </tr>
  <tr class="bdr">
    <td class="bg_red w126">SUN</td>
    <td class="bg_orange w126">MON</td>
    <td class="bg_orange w126">TUE</td>
    <td class="bg_orange w126">WED</td>
    <td class="bg_orange w126">THU</td>
    <td class="bg_orange w126">FRI</td>
    <td class="bg_blue w67">SAT</td>
  </tr>\n`;

  const firstDay = new Date(year, month - 1, 1).getDay();
  const totalCells = firstDay + daysInMonth;
  const weeks = Math.ceil(totalCells / 7);

  let day = 1;
  let currentCell = 0;

  for (let w = 0; w < weeks; w++) {
    let weekCells = [];
    let hasSplitMenu = false;

    for (let d = 0; d < 7; d++) {
      let cell = "";
      if (currentCell < firstDay || day > daysInMonth) {
        cell = `<td>\n<span></span>\n</td>`;
      } else {
        const mmdd = `${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`;

        const time_am = document.getElementById(`time_am_${mmdd}`)?.value;
        const menu_am = document.getElementById(`menu_am_${mmdd}`)?.value;
        const time_pm = document.getElementById(`time_pm_${mmdd}`)?.value;
        const menu_pm = document.getElementById(`menu_pm_${mmdd}`)?.value;

        if (menu_am && !menu_pm && !time_pm) {
          cell = `<td class="ch02 accepting">\n<span>${day}</span><br />\n`;
          if (time_am) cell += `<img class="mb_05" src="img/${getTimeIcon(time_am)}" alt="" /><br />\n`;
          cell += `<a href="#${mmdd}">${formatMenuText(menu_am)}</a>\n</td>`;
        } else if (menu_am && !menu_pm && time_pm) {
          cell = `<td class="ch accepting">\n<span>${day}</span><br />\n`;
          if (time_am) cell += `<img class="mb_05" src="img/${getTimeIcon(time_am)}" alt="" /><br />\n`;
          if (time_pm) cell += `<img class="mb_05" src="img/${getTimeIcon(time_pm)}" alt="" /><br />\n`;
          cell += `<a href="#${mmdd}">${formatMenuText(menu_am)}</a>\n</td>`;
        } else if (menu_am && menu_pm && menu_am.trim() !== menu_pm.trim()) {
          hasSplitMenu = true;
          cell = `<td class="ch accepting" style="background-position: center bottom 0.65rem">\n<span>${day}</span>\n`;
          cell += `<div class="mb_05">\n`;
          if (time_am) cell += `<img class="mb_05" src="img/${getTimeIcon(time_am)}" alt="" /><br />\n`;
          cell += `<a href="#${mmdd}_01">${formatMenuText(menu_am)}</a>\n</div>\n`;

          cell += `<div class="mb_30">\n`;
          if (time_pm) cell += `<img class="mb_05" src="img/${getTimeIcon(time_pm)}" alt="" /><br />\n`;
          cell += `<a href="#${mmdd}_02">${formatMenuText(menu_pm)}</a>\n</div>\n</td>`;
        } else {
          cell = `<td>\n<span>${day}</span>\n</td>`;
        }

        day++;
      }

      weekCells.push(cell);
      currentCell++;
    }

    if (hasSplitMenu) {
      weekCells = weekCells.map((td) => {
        if (td.includes("<td") && !td.includes("style=")) {
          return td.replace("<td", '<td style="background-position: center bottom 0.65rem"');
        }
        return td;
      });
    }

    html += `<tr class="bdr">\n${weekCells.join("\n")}\n</tr>\n`;
  }

  html += "</table>\n</li>";
  return html;
}

//越谷教室
function generateCalendarHTML_koshigaya(excelData) {
  const year = excelMeta.year;
  const month = excelMeta.month;
  const daysInMonth = new Date(year, parseInt(month), 0).getDate();

  const monthLabel = `${parseInt(month)}月のスケジュール`;

  // 日付ごとのデータをまとめるためのマップ
  const dayMap = {};

  excelData.forEach((row) => {
    const menuRaw = row[2] || ""; // C列: メニュー名
    const introduction = row[3] || ""; // D列: 紹介文
    const takeout = row[4] || ""; // E列: テイクアウト
    const detail = row[5] || ""; // F列: メニュー詳細
    const teacher = row[6] || ""; // G列: 講師
    const price = row[7] || ""; // H列: 受講料
    const dates = (row[9] || "").split("・"); // J列: 日程（複数可）
    const time = row[10] || ""; // K列: 時間
    const deadline = row[11] || ""; // L列: 締切

    const menuLines = String(menuRaw).split(/\r?\n/);
    const menuTitle = menuLines[1] || ""; // 2行目を取得（1行目は index 0）

    dates.forEach((dateStr) => {
      const dayMatch = dateStr.match(/(\d{1,2})/);
      if (!dayMatch) return;
      const day = parseInt(dayMatch[1]);

      if (!dayMap[day]) dayMap[day] = [];

      dayMap[day].push({
        mmdd: `${month.padStart(2, "0")}${String(day).padStart(2, "0")}`,
        menuTitle: menuTitle,
        time: time,
      });
    });
  });

  // カレンダーHTML生成
  let html = `<li>\n<table class="cook01">\n`;
  html += `  <tr>\n    <th colspan="7">${monthLabel}</th>\n  </tr>\n`;
  html += `  <tr class="bdr">\n`;
  html += `    <td class="bg_red w70per">SUN</td>\n`;
  html += `    <td class="bg_orange w70per">MON</td>\n`;
  html += `    <td class="bg_orange w70per">TUE</td>\n`;
  html += `    <td class="bg_orange w70per">WED</td>\n`;
  html += `    <td class="bg_orange w70per">THU</td>\n`;
  html += `    <td class="bg_orange w70per">FRI</td>\n`;
  html += `    <td class="bg_blue w70per">SAT</td>\n  </tr>\n<tr class="bdr">\n`;

  const startingDay = 1; // 仮に1日が水曜なら 3、火曜なら 2（0=日曜）

  let dayOfWeek = new Date(2025, month - 1, 1).getDay(); // JSの月は0始まり
  for (let i = 0; i < dayOfWeek; i++) {
    html += `<td><span></span></td>\n`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cellData = dayMap[day];
    let cell = `<td><span>${day}</span></td>\n`;

    if (cellData && cellData.length > 0) {
      const entry = cellData[0];
      const isOyako = entry.menuTitle.includes("親子"); // ← ここでチェック

      const tdClass = isOyako ? "ch02" : "ch"; // ← 条件分岐

      cell = `<td class="${tdClass} accepting">\n  <span>${day}</span><br />\n`;

      const timeLines = entry.time
        .split(/\r?\n/)
        .map((t) => t.trim())
        .filter(Boolean);
      timeLines.forEach((time) => {
        const icon = getTimeIcon(time);
        if (icon) {
          cell += `  <img class="mb_05" src="img/${icon}" alt="" /><br />\n`;
        }
      });

      cell += `  <a href="#${entry.mmdd}">${entry.menuTitle}</a>\n</td>\n`;
    }

    html += cell;

    if ((day + dayOfWeek) % 7 === 0) {
      html += `</tr>\n<tr class="bdr">\n`;
    }
  }

  const remainder = (daysInMonth + dayOfWeek) % 7;
  if (remainder !== 0) {
    for (let i = 0; i < 7 - remainder; i++) {
      html += `<td><span></span></td>\n`;
    }
    html += `</tr>\n`;
  }

  html += `</table>\n</li>`;
  return html;
}
