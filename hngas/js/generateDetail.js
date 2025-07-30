//我孫子教室
function generateDetailHTML_abiko() {
  const year = document.getElementById("year").value;
  const month = document.getElementById("month").value;
  const daysInMonth = new Date(year, month, 0).getDate();
  const monthLabel = `${parseInt(month)}月の日程`;

  let html = `<!--■■■${monthLabel}ここから■■■-->\n<div class="heading mt_50" id="schedule03">${monthLabel}</div>\n`;

  for (let day = 1; day <= daysInMonth; day++) {
    const mmdd = `${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`;
    const mm = mmdd.slice(0, 2);
    const weekdayClass = getWeekdayClass(year, month, day);

    const time_am = document.getElementById(`time_am_${mmdd}`)?.value;
    const menu_am = document.getElementById(`menu_am_${mmdd}`)?.value;

    const time_pm = document.getElementById(`time_pm_${mmdd}`)?.value;
    const menu_pm = document.getElementById(`menu_pm_${mmdd}`)?.value;

    const teacher = document.getElementById(`teacher_am_${mmdd}`)?.value;
    const rawPrice = document.getElementById(`price_am_${mmdd}`)?.value || "";
    const price = rawPrice.replace(/[¥,]/g, "").trim();

    const photo = `ph_${mmdd}`;

    //午前
    if (time_am) {
      const menuLines = menu_am.split(/[\r\n]+/).filter((line) => line.trim() !== "");
      const menuTitle = menuLines[0]?.replace(/^・\s*/, "") || "未設定";
      const menuDescription = menuLines.slice(1).join("<br />");

      const title_am = (menu_am || "").split(/[\r\n]+/)[0]?.replace(/^・\s*/, "") || "";
      const title_pm_raw = (menu_pm || "").split(/[\r\n]+/)[0] || "";
      const title_pm = title_pm_raw.replace(/^・\s*/, "").trim();

      // 午後メニューがあり、かつタイトルが異なる場合は別扱い
      const isPmDifferent = time_pm && menu_pm && title_am !== title_pm;
      const amId = isPmDifferent ? `${mmdd}_01` : mmdd;
      const photo_am = isPmDifferent ? `${photo}_01` : photo;

      html += `<!--▼▼イベント▼▼-->\n`;
      html += `<div class="date" id="${amId}"><span class="ico_${weekdayClass}">${parseInt(month)}/${day}</span>${time_am}`;
      if (time_pm) html += `　☆★午前の部★☆`;
      html += `</div>\n`;

      html += `<div class="date02"></div>\n<!--date02-->\n<div class="overflow_clear">\n`;
      html += `<div class="ph">\n<a rel="lightbox[group-${mm}]" href="img/25/${photo_am}_large.jpg" title="${menuTitle}"><img src="img/25/${photo_am}.jpg" alt="${menuTitle}" /></a>\n</div>\n<!--ph-->\n`;
      html += `<div class="txt">\n<p class="event_name">${menuTitle}</p>\n<p class="mb_none">・${menuTitle}`;
      if (menuDescription) html += `<br />${menuDescription}`;
      html += `</p>\n</div>\n<!--txt-->\n`;

      html += `<div class="tb">\n<img class="mb_05" src="img/teacher/img_${teacher}_${price}.jpg" alt="受講料・講師" />\n</div>\n<!--tb-->\n`;
      html += `<div class="btn"><a href="DUMMY" target="_blank"><img src="img/btn_form01.jpg" alt="お申込み受付中！" /></a></div>\n<!--btn-->\n</div>\n<!--overflow_clear-->\n<!--▲▲イベント▲▲-->\n`;
    }

    //午後
    if (time_pm && !menu_pm) {
      const menuLines = menu_am.split(/[\r\n]+/);
      const menuTitle = menuLines[0].replace(/^・\s*/, "");
      const menuDescription = menuLines.slice(1).join("<br />");

      html += `<!--▼▼イベント▼▼-->\n`;
      html += `<div class="date"><span class="ico_${weekdayClass}">${parseInt(month)}/${day}</span>${time_pm}　☆★午後の部★☆</div>\n`;
      html += `<div class="date02"></div>\n<!--date02-->\n<div class="overflow_clear">\n`;
      html += `<div class="ph">\n<a rel="lightbox[group-${mm}]" href="img/25/${photo}_large.jpg" title="${menuTitle}"><img src="img/25/${photo}.jpg" alt="${menuTitle}" /></a>\n</div>\n<!--ph-->\n`;
      html += `<div class="txt">\n<p class="event_name">${menuTitle}</p>\n<p class="mb_none">・${menuTitle}`;
      if (menuDescription) html += `<br />${menuDescription}`;
      html += `</p>\n</div>\n<!--txt-->\n`;

      if (teacher && price) {
        html += `<div class="tb">\n<img class="mb_05" src="img/teacher/img_${teacher}_${price}.jpg" alt="受講料・講師" />\n</div>\n<!--tb-->\n`;
      }

      html += `<div class="btn"><a href="DUMMY" target="_blank"><img src="img/btn_form01.jpg" alt="お申込み受付中！" /></a></div>\n<!--btn-->\n</div>\n<!--overflow_clear-->\n<!--▲▲イベント▲▲-->\n`;
    }

    //午後（別メニュー）
    if (time_pm && menu_pm) {
      const menuLines = menu_pm.split(/[\r\n]+/);
      const menuTitle = menuLines[0].replace(/^・\s*/, "");
      const menuDescription = menuLines.slice(1).join("<br />");

      html += `<!--▼▼イベント▼▼-->\n`;
      html += `<div class="date" id="${mmdd}_02"><span class="ico_${weekdayClass}">${parseInt(month)}/${day}</span>${time_pm}　☆★午後の部★☆</div>\n`;
      html += `<div class="date02"></div>\n<!--date02-->\n<div class="overflow_clear">\n`;
      html += `<div class="ph">\n<a rel="lightbox[group-${mm}]" href="img/25/${photo}_02_large.jpg" title="${menuTitle}"><img src="img/25/${photo}_02.jpg" alt="${menuTitle}" /></a>\n</div>\n<!--ph-->\n`;
      html += `<div class="txt">\n<p class="event_name">${menuTitle}</p>\n<p class="mb_none">・${menuTitle}`;
      if (menuDescription) html += `<br />${menuDescription}`;
      html += `</p>\n</div>\n<!--txt-->\n`;

      if (teacher && price) {
        html += `<div class="tb">\n<img class="mb_05" src="img/teacher/img_${teacher}_${price}.jpg" alt="受講料・講師" />\n</div>\n<!--tb-->\n`;
      }

      html += `<div class="btn"><a href="DUMMY" target="_blank"><img src="img/btn_form01.jpg" alt="お申込み受付中！" /></a></div>\n<!--btn-->\n</div>\n<!--overflow_clear-->\n<!--▲▲イベント▲▲-->\n`;
    }
  }

  html += `<!--■■■${monthLabel}ここまで■■■-->`;
  return html;
}

//越谷教室
//置換
function normalizeText(str) {
  if (!str) return "";
  return String(str)
    .replace(/＆/g, "&amp;")
    .replace(/　/g, " ")
    .replace(/\(/g, "（")
    .replace(/\)/g, "）")
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
    .replace(/[\u2460-\u2473]/g, (s) => `&#${s.charCodeAt(0)};`);
}

function generateDetailHTML_koshigaya(excelData) {
  const year = excelMeta.year;
  const month = excelMeta.month;
  const monthLabel = `${parseInt(month)}月の日程`;

  let html = `<!--■■■${monthLabel}ここから■■■-->\n<div class="heading mt_50" id="schedule03">${monthLabel}</div>\n`;

  const events = [];

  excelData.forEach((row) => {
    const menuRaw = normalizeText(row[2] || "");
    const intro = normalizeText(row[3] || "");
    const takeoutRaw = normalizeText(row[4] || "");
    const detail = normalizeText(row[5] || "").trimEnd();
    const teacher = normalizeText(row[6] || "");
    const rawPrice = String(row[7] || "");
    const price = rawPrice.replace(/[¥,]/g, "").trim();
    const rawPriceFormatted = Number(price || 0).toLocaleString();
    const dates = (row[9] || "").split("・");
    const timeRaw = row[10] || "";
    const deadline = normalizeText(row[11] || "");

    // メニュー（タイトルと詳細）
    const menuLines = menuRaw.split(/[\r\n]+/).filter((line) => line.trim() !== "");
    const menuTitleSingle = menuLines[1]?.replace(/^・\s*/, "") || "未設定";
    const first = menuLines[0] ? `【${menuLines[0]}】` : "";
    const rest = menuLines.slice(1);
    const menuTitleFull = [first, ...rest].join("");

    // 紹介文（末尾の改行を除外）
    const introHTML = String(intro || "")
      .replace(/\r?\n/g, "<br />")
      .replace(/(<br\s*\/?>)+$/, "");

    // 改行を削除して「持ち帰り（2人前）」のように1行にまとめる
    const takeout = takeoutRaw.replace(/\r?\n/g, "").trim();
    const takeoutHTML = takeout ? `<ul>\n<li>${takeout}</li>\n</ul>\n` : "";

    // 詳細（各行に「・」を付けてbr）
    const detailFormatted = String(detail || "")
      .split(/[\r\n]+/)
      .filter((line) => line.trim() !== "")
      .map((line) => {
        const trimmed = line.trim();
        return trimmed.startsWith("（") ? trimmed : `・${trimmed}`;
      })
      .join("<br />");

    const timeLines = timeRaw
      .split(/[\r\n]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    let datesToUse = dates;

    const hasSplit = timeLines.length === 2;

    // 時間が2つで、日付が1つしかない場合は、同じ日を2回使う（午前・午後）
    if (timeLines.length === 2 && dates.length === 1) {
      datesToUse = [dates[0], dates[0]];
    }

    datesToUse.forEach((dateStr, index) => {
      const match = dateStr.match(/(\d{1,2})/);
      if (!match) return;
      const day = parseInt(match[1]);
      const mmdd = `${month.padStart(2, "0")}${String(day).padStart(2, "0")}`;
      const mm = mmdd.slice(0, 2);
      const weekdayClass = getWeekdayClass(year, month, day);

      // ▼▼イベント▼▼
      const isPM = hasSplit && index === 1;
      const time = timeLines[index] || timeLines[0] || "";
      const id = mmdd;
      const tag = isPM ? "午後の部" : hasSplit ? "午前の部" : "";

      let block = `<!--▼▼イベント▼▼-->\n`;
      block += `<div class="date" id="${id}"><span class="ico_${weekdayClass}">${parseInt(month)}/${day}</span>${time}`;
      if (tag) block += `　☆★${tag}★☆`;
      block += `</div>\n`;

      block += `<div class="date02"></div>\n<!--date02-->\n<div class="overflow_clear">\n`;
      block += `<div class="col_l">\n<div class="ph">\n<a rel="lightbox[group-${mm}]" href="img/25/ph_${id}_large.jpg" title="${menuTitleSingle}"><img src="img/25/ph_${id}.jpg" alt="${menuTitleSingle}" /></a>\n</div>\n`;
      block += takeoutHTML;
      block += `</div>\n<!--ph-->\n`;

      block += `<div class="col_c">\n<div class="txt">\n<p class="event_name">${menuTitleFull}</p>\n<p>${introHTML}</p>\n</div>\n<!--txt-->\n`;
      block += `<div class="txt menu">\n<p class="event_name">メニュー</p>\n`;
      if (detailFormatted) {
        block += `<p>${detailFormatted}</p>\n`;
      }
      block += `</div>\n<!--txt-->\n`;

      block += `<table class="tb">\n<tr>\n<th>会費</th>\n<td>${rawPriceFormatted}円</td>\n</tr>\n<tr>\n<th>先生</th>\n<td>${teacher}</td>\n</tr>\n<tr>\n<th>締切</th>\n<td>${deadline}</td>\n</tr>\n</table>\n<!--tb-->\n</div>\n<!--detail-->\n`;
      block += `<div class="btn">\n<a href="DUMMY" target="_blank"><img src="img/btn_form01.jpg" alt="お申込み受付中！" /></a>\n</div>\n<!--btn-->\n`;
      block += `</div>\n<!--overflow_clear-->\n<!--▲▲イベント▲▲-->\n`;

      events.push({ sortKey: `${mmdd}_${index}`, html: block });
    });
  });

  // 開催日順に並び替え
  events.sort((a, b) => a.sortKey.localeCompare(b.sortKey));
  html += events.map((e) => e.html).join("\n");

  html += `<!--■■■${monthLabel}ここまで■■■-->`;
  return html;
}
