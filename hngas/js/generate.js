document.addEventListener("DOMContentLoaded", () => {
  //html生成
  window.generateHTML = function generateHTML() {
    const activeTab = document.querySelector(".tab-menu li.active")?.dataset.tab;

    let calendarHTML = "";
    let detailHTML = "";

    if (activeTab === "abiko") {
      // Excelは不要、DOMから生成
      calendarHTML = generateCalendarHTML_abiko(); // 引数なし
      detailHTML = generateDetailHTML_abiko(); // 引数なし
    } else if (activeTab === "koshigaya") {
      // Excel必須
      if (!parsedExcelData.length) {
        alert("先にExcelを読み込んでください");
        return;
      }

      calendarHTML = generateCalendarHTML_koshigaya(parsedExcelData); // Excelベース
      detailHTML = generateDetailHTML_koshigaya(parsedExcelData);
    }

    const activeContent = document.querySelector(".tab-content.active");
    const calendarTA = activeContent.querySelector("#output_calendar");
    const detailTA = activeContent.querySelector("#output_detail");

    calendarTA.value = calendarHTML.trim();
    detailTA.value = detailHTML.trim();
  };

  // Excelファイル選択時の処理
  document.getElementById("excelFile").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      readExcelFile(file, (data) => {
        console.log("✅ Excel読み込み成功");
      });
    }
  });

  //コピーボタン
  window.copyToClipboard = function (targetId) {
    const activeTab = document.querySelector(".tab-menu li.active")?.dataset.tab;
    if (!activeTab) {
      alert("教室のタブが選択されていません");
      return;
    }

    const activeContent = document.querySelector(".tab-content.active"); // ✅ ここが必要
    if (!activeContent) {
      alert("出力エリアが見つかりません");
      return;
    }

    let targetElement;
    if (targetId === "calendar") {
      targetElement = activeContent.querySelector("#output_calendar");
    } else if (targetId === "detail") {
      targetElement = activeContent.querySelector("#output_detail");
    } else {
      alert("コピー対象が不正です");
      return;
    }

    if (!targetElement) {
      alert("コピー対象の出力が見つかりません");
      return;
    }

    navigator.clipboard
      .writeText(targetElement.value)
      .then(() => alert("コピーしました！"))
      .catch((err) => {
        console.error("コピーに失敗しました:", err);
        alert("コピーに失敗しました");
      });
  };
});
