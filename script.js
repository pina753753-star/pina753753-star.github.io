const STORAGE_KEY = "codexOrderMakerForm";

const fields = [
  "clientName",
  "productType",
  "purpose",
  "target",
  "designMood",
  "customMood",
  "contentText",
  "imageUse",
  "ctaUrl",
  "mustDo",
  "avoidDo",
  "deliveryType",
  "promptOutput"
];

const form = document.getElementById("orderForm");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const resetBtn = document.getElementById("resetBtn");
const statusMessage = document.getElementById("statusMessage");
const customMoodField = document.getElementById("customMoodField");

const getElement = (id) => document.getElementById(id);
const getValue = (id) => getElement(id).value.trim() || "未入力";

function saveForm() {
  const data = {};
  fields.forEach((id) => {
    data[id] = getElement(id).value;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) return;

  try {
    const data = JSON.parse(savedData);
    fields.forEach((id) => {
      if (typeof data[id] === "string") {
        getElement(id).value = data[id];
      }
    });
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function updateCustomMoodVisibility() {
  const isCustom = getElement("designMood").value === "自由入力";
  customMoodField.classList.toggle("is-visible", isCustom);
}

function getDesignDirection() {
  const selectedMood = getElement("designMood").value;
  const customMood = getElement("customMood").value.trim();

  if (selectedMood === "自由入力") {
    return customMood || "自由入力（詳細未入力）";
  }

  return selectedMood || "未入力";
}

function getImageInstruction() {
  const imageUse = getValue("imageUse");

  if (imageUse === "使う") {
    return "画像を使う。画像素材が未提供の場合は、配置場所が分かる仮の画像枠・代替テキストを用意し、差し替えやすいファイル名とコメントを入れる。";
  }

  if (imageUse === "使わない") {
    return "画像は使わず、余白・配色・文字組み・装飾だけで見やすく仕上げる。";
  }

  return "画像利用は未定。画像なしでも成立する構成にし、後から画像を追加しやすい余白やセクション設計にする。";
}

function buildPrompt() {
  const deliveryType = getValue("deliveryType");
  const ctaUrl = getValue("ctaUrl");

  return `あなたはWeb制作に強いCodexです。以下の制作オーダーをもとに、初心者にも扱いやすい完成データを作ってください。

## 依頼者
${getValue("clientName")}

## 制作物の種類
${getValue("productType")}

## 目的
${getValue("purpose")}

## ターゲット
${getValue("target")}

## デザイン方針
- 雰囲気：${getDesignDirection()}
- スマホで読みやすく、操作しやすいUIにする。
- 余白をしっかり取り、初心者でも迷わない構成にする。

## 入れたい文章・内容
${getValue("contentText")}

## 画像を使う場合の扱い
${getImageInstruction()}

## CTAリンク
- リンク先URL：${ctaUrl}
- CTAが未入力の場合は、後から差し替えやすい仮リンクとコメントを入れる。
- CTAボタンはスマホで押しやすい大きさにする。

## 絶対に守ること
${getValue("mustDo")}

## やってはいけないこと
${getValue("avoidDo")}

## 納品形式
${deliveryType}

## 必要なファイル構成
- index.html
- style.css
- script.js（必要な場合のみ。動きが不要なら空ファイルではなく省略可）
- README.md
- 画像を使う場合は images/ フォルダに配置する

## 実装条件
- 外部ライブラリは使わない。
- サーバー不要で、GitHub Pagesに置くだけで動くようにする。
- HTML/CSS/JavaScriptは分かりやすく整理する。
- スマホ表示を最優先にし、PCでは中央にスマホ幅で表示する。

## スマホ表示の確認
- 幅430px以下で崩れないか確認する。
- ボタンや入力欄が指で押しやすいか確認する。
- 文字が小さすぎないか確認する。
- 横スクロールが出ないか確認する。

## 完成後の確認チェックリスト
- [ ] 制作物の目的がひと目で分かる
- [ ] ターゲットに合う言葉とデザインになっている
- [ ] CTAリンクが正しく設定されている
- [ ] 画像を使う場合の配置・代替テキスト・差し替え方法が分かる
- [ ] スマホで見やすく操作しやすい
- [ ] GitHub Pagesでそのまま公開できる
- [ ] README.mdに使い方と公開方法が書かれている

## 最後に必ず行うこと
- 変更内容を確認し、必要なテストまたは表示確認を行う。
- git statusで差分を確認する。
- 完成したら必ずコミットする。`;
}

function generatePrompt() {
  getElement("promptOutput").value = buildPrompt();
  statusMessage.textContent = "指示書を作りました";
  saveForm();
}

async function copyPrompt() {
  const output = getElement("promptOutput");

  if (!output.value.trim()) {
    generatePrompt();
  }

  try {
    await navigator.clipboard.writeText(output.value);
  } catch (error) {
    output.select();
    document.execCommand("copy");
  }

  statusMessage.textContent = "コピーしました";
}

function resetForm() {
  form.reset();
  getElement("promptOutput").value = "";
  localStorage.removeItem(STORAGE_KEY);
  updateCustomMoodVisibility();
  statusMessage.textContent = "リセットしました";
}

loadForm();
updateCustomMoodVisibility();

fields.forEach((id) => {
  getElement(id).addEventListener("input", saveForm);
  getElement(id).addEventListener("change", saveForm);
});

getElement("designMood").addEventListener("change", updateCustomMoodVisibility);
generateBtn.addEventListener("click", generatePrompt);
copyBtn.addEventListener("click", copyPrompt);
resetBtn.addEventListener("click", resetForm);
