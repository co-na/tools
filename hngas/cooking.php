<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HTML Generator</title>
  <link rel="stylesheet" type="text/css" href="/tool/generator/hngas/css/reset.css" />
  <link rel="stylesheet" type="text/css" href="/tool/generator/hngas/css/tool.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=M+PLUS+2:wght@100..900&family=Palanquin+Dark:wght@400;500;600;700&family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
</head>

<body>
  <div class="content">
    <h1>ニチガス 料理教室更新用</h1>
    <ul class="tab-menu">
      <li class="active" data-tab="abiko">我孫子</li>
      <li data-tab="koshigaya">越谷</li>
    </ul>

    <!-- 我孫子料理教室 -->
    <div class="tab-content active" id="abiko">
      <p>我孫子料理教室</p>
      <div>
        <p>
          テキストエリアに情報を入力した後、『html生成』ボタンを押すと「カレンダー」と「詳細」のHTMLが生成されます。<br />
          『コピー』ボタンを押すと生成されたソースコードがコピーされます。<br />
          午前と午後に同じ料理教室がある場合、午後は時間のみ入力してください。
        </p>
      </div>
      <div class="inner">
        <div class="date">
          <div class="date_select">
            <select id="year"></select>
            <label for="year">年</label>
            <select id="month"></select>
            <label for="month">月</label>
          </div>
        </div>
        <button class="calendar" onclick="generateCalendar()">カレンダー表示</button>
      </div>

      <form id="schedule-form">
        <div id="calendarContainer"></div>
        <button type="button" onclick="generateHTML()">html生成</button>
      </form>

      <div class="generate_area_wrap">
        <div class="generate_area">
          <h2>カレンダー</h2>
          <textarea id="output_calendar" rows="10" style="width: 100%;"></textarea>
          <button class="copyButton" onclick="copyToClipboard('calendar')">コピー</button>
        </div>
        <div class="generate_area">
          <h2>詳細</h2>
          <textarea id="output_detail" rows="10" style="width: 100%;"></textarea>
          <button class="copyButton" onclick="copyToClipboard('detail')">コピー</button>
        </div>
      </div>
    </div>


    <!-- 越谷料理教室 -->
    <div class="tab-content" id="koshigaya">
      <p>越谷料理教室</p>

      <p>
        原稿（Excel）をアップロードすると「カレンダー」と「詳細」のHTMLが生成されます。<br />
        『コピー』ボタンを押すと生成されたソースコードがコピーされます。<br />
        Excelは下記のとおりに適宜修正してください。
      </p>
      <div class="inner">
        <p>
          --------------------<br />
          C列：2行目にメニュー名がくるようにしてください<br />
          F列：各メニューは改行してください<br />
          --------------------
        </p>
        <div id="excel">
          <h2>Excelアップロード</h2>
          <input type="file" id="excelFile" accept=".xlsx" />
        </div>
      </div>
      <button class="generateButton" type="button" onclick="generateHTML()">html生成</button>

      <div class="generate_area_wrap">
        <div class="generate_area">
          <h2>カレンダー</h2>
          <textarea id="output_calendar" rows="10" style="width: 100%;"></textarea>
          <button class="copyButton" onclick="copyToClipboard('calendar')">コピー</button>
        </div>
        <div class="generate_area">
          <h2>詳細</h2>
          <textarea id="output_detail" rows="10" style="width: 100%;"></textarea>
          <button class="copyButton" onclick="copyToClipboard('detail')">コピー</button>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
  <script src="js/utils.js"></script>
  <script src="js/calendar.js"></script>
  <script src="js/generateCalendar.js"></script>
  <script src="js/generateDetail.js"></script>
  <script src="js/generate.js"></script>
</body>

</html>