# nlp-js
- <a href="https://nlp-js-pal.herokuapp.com/index.html">English Analysis Tests</a>

### 説明
- 英文を入力すると解析して結果を表示する
- 5つのテストを作成した
- テストの色ごとに結果が表示される

### 正規表現を使用したテスト
- <b>green</b> Match finite verb groups in past progressive tense（e.g. was watching）
- <b>orange</b> Detect relational verbs（e.g. be, contain）
- <b>yellow</b> Macth the pattern of vowel, consonant, vowel, letter at the end of a word.
（e.g. come, fine）

### nlp-compromiseを使用したテスト
- <b>blue</b> Match and colour code verb groups in simple tenses.
- <b>purple</b> Match place names and people names in any text.

### コンストラクター、ライブラリ
#### RegExp
- パターンに従ったテキストにマッチする正規表現オブジェクトを生成するコンストラクター
- <a href="https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/RegExp">RegExp</a>

#### nlp-compromise
- JavaScriptのNLPライブラリ
- <a href="http://compromise.cool/">nlp-compromise</a>

