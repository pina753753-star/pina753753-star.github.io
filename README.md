# GitHub Pages スマホLP

完成版LP全体画像 1 枚を、そのままスマホ向けLPとして表示する構成です。

## 画像の差し替え方法

1. 新しい完成版LP全体画像を用意します。
2. ファイル名を `design-reference.jpeg` に変更します。
3. `images/design-reference.jpeg` を新しい画像で上書きします。
4. 画像サイズやCTA位置が変わる場合は、`style.css` の `.cta-link--top` と `.cta-link--bottom` の `left` / `top` / `width` / `height` を調整してください。

## CTAリンクの変更方法

`index.html` にある2か所のCTAリンクの `href` を変更します。

```html
<a class="cta-link cta-link--top" href="https://note.com/pinapina53" aria-label="Codex入門を見る"></a>
<a class="cta-link cta-link--bottom" href="https://note.com/pinapina53" aria-label="Codex入門を見る"></a>
```

上のCTAと下のCTAは同じリンク先にしています。必要に応じて、それぞれ別のURLに変更できます。

## 実装メモ

- LP本体は `images/design-reference.jpeg` 1枚だけを表示しています。
- CTA以外のリンクは設置していません。
- 画像は `width: 100%; height: auto; display: block;` で表示しています。
- LP全体は `max-width: 430px; margin: 0 auto;` で中央配置しています。
- `object-fit: cover`、固定height、画像を見切る `overflow: hidden` は使っていません。
