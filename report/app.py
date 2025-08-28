import zipfile
import os
from pathlib import Path
import shutil

zip_folder = "./zips"
output_folder = "./output"

os.makedirs(output_folder, exist_ok=True)

for zip_filename in os.listdir(zip_folder):
    if zip_filename.endswith(".zip"):
        zip_path = os.path.join(zip_folder, zip_filename)
        base_name = os.path.splitext(zip_filename)[0]

        with zipfile.ZipFile(zip_path, 'r') as zip_file:
            extracted_paths = []  # 抽出ファイルのパスを記録
            for member in zip_file.namelist():
                if member.endswith("/") or "__MACOSX" in member or ".DS_Store" in member:
                    continue

                extracted_path = zip_file.extract(member, output_folder)
                extracted_path = Path(extracted_path)

                new_name = f"{base_name}{extracted_path.suffix}"
                renamed_path = Path(output_folder) / new_name

                shutil.copy2(extracted_path, renamed_path)
                extracted_path.unlink()
                extracted_paths.append(extracted_path)

        print(f"{zip_filename} の処理が完了しました！")

# 空フォルダ削除（output配下のサブフォルダ）
for path in Path(output_folder).glob("*"):
    if path.is_dir() and not any(path.iterdir()):
        path.rmdir()
