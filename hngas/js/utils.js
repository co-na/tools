// タブ切り替え処理
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tab-menu li").forEach((tab) => {
    tab.addEventListener("click", () => {
      // タブのクラス切り替え
      document.querySelectorAll(".tab-menu li").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // コンテンツの表示切り替え
      const target = tab.dataset.tab;
      document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active");
      });
      document.getElementById(target).classList.add("active");
    });
  });
});

//入力エリアの表示・非表示
function toggleInputs(selectElement) {
  const td = selectElement.closest("td");
  const targetType = selectElement.dataset.target;
  const targets = td.querySelectorAll("input, textarea, select");

  const selectedValue = selectElement.value;

  targets.forEach((el) => {
    if (el === selectElement) return;

    // 対象が指定されている場合は、それ以外のものを無視
    if (targetType && !el.id.includes(`_${targetType}_`)) return;

    if (selectedValue) {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.value = "";
      }
    }
  });
}

// 時間に応じたアイコン名を返す
function getTimeIcon(time) {
  if (!time) return "ico_time01.png";
  if (time.startsWith("10：00")) return "ico_time03.png";
  if (time.startsWith("10：30")) return "ico_time01.png";
  if (time.startsWith("13：00")) return "ico_time06.png";
  if (time.startsWith("13：30")) return "ico_time05.png";
  if (time.startsWith("14：00")) return "ico_time02.png";
  if (time.startsWith("14：30")) return "ico_time04.png";
  return "ico_time01.png";
}

// メニューのタイトル（1行目）を整形して返す
function formatMenuText(menu) {
  if (!menu) return "";
  const firstLine = menu.split(/[\r\n]+/)[0];
  return firstLine.replace(/^・\s*/, "");
}

// 曜日クラスを取得
function getWeekdayClass(year, month, day) {
  const date = new Date(year, month - 1, day);
  return ["sun01", "mon01", "tue01", "wed01", "thu01", "fri01", "sat01"][date.getDay()];
}

//Excel読込
let parsedExcelData = [];
let excelMeta = { month: "1", year: new Date().getFullYear() }; // ← 追加

function readExcelFile(file, callback) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // C1セルから年月を抽出してグローバルに格納
    const c1Raw = sheet["C1"]?.v || "";
    const matched = c1Raw.match(/(\d{4})\.(\d{1,2})月/);
    if (matched) {
      excelMeta.year = matched[1];
      excelMeta.month = matched[2];
    }

    const json = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 3 });
    parsedExcelData = json;
    if (callback) callback(json);
  };
  reader.readAsArrayBuffer(file);
}
