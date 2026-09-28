# 01. HTML / CSS / 웹 기초

## 1. 웹사이트를 열면 브라우저는 무엇을 할까?

사용자가 GitHub Pages 주소를 열면 대략 다음 순서로 진행된다.

```text
1. 브라우저가 서버에 index.html 요청
2. HTML 내용을 다운로드
3. HTML을 읽다가 CSS 링크 발견 → style.css 요청
4. JavaScript script 발견 → main.js 요청
5. HTML을 DOM 트리로 구성
6. CSS 규칙을 계산
7. 화면을 그림
8. JavaScript 실행
9. 클릭, 입력, 스크롤 등을 기다림
```

### 서버와 클라이언트

- **클라이언트**: 지금 페이지를 보는 Chrome 같은 브라우저
- **서버**: 파일이나 데이터를 제공하는 쪽
- 이 사이트 파일을 제공하는 서버 역할은 GitHub Pages가 한다.
- 프로젝트 데이터는 GitHub API 서버에 별도로 요청한다.
- Contact 메시지는 Formspree 서버로 보낸다.

---

## 2. HTML은 무엇인가?

HTML은 문서의 **구조와 의미**를 표현하는 언어다.

기본 형태:

```html
<p class="hero-copy">안녕하세요.</p>
```

- `p`: 태그 이름
- `class="hero-copy"`: 속성
- `안녕하세요.`: 내용

요소 안에 다른 요소가 들어갈 수 있다.

```html
<section>
  <h2>About</h2>
  <p>자기소개입니다.</p>
</section>
```

여기서 section은 부모, h2와 p는 자식이라고 생각할 수 있다.

---

## 3. class와 id

### class

같은 역할이나 디자인을 여러 요소가 공유할 때 사용한다.

```html
<div class="section-inner">
```

CSS에서는 점(`.`)으로 찾는다.

```css
.section-inner { ... }
```

### id

페이지 안의 특정 요소를 고유하게 식별한다.

```html
<section id="projects">
```

링크:

```html
<a href="#projects">프로젝트 보기</a>
```

는 id가 projects인 요소를 목적지로 삼는다.

우리 프로젝트 기준은:

- 반복되는 스타일/역할 → class
- 고유 섹션/입력 요소 → id

---

## 4. 시맨틱 태그

시맨틱 태그는 이름 자체가 역할을 설명한다.

| 태그 | 의미 | 우리 프로젝트 |
| --- | --- | --- |
| header | 상단 정보 | 사이트 헤더 |
| nav | 탐색 링크 | 메뉴 |
| main | 핵심 콘텐츠 | Hero ~ Contact |
| section | 주제별 영역 | About, Skills 등 |
| article | 독립 콘텐츠 | About 카드, Project 카드 |
| footer | 하단 정보 | 저작권/GitHub 링크 |

`div`만으로도 같은 화면은 만들 수 있다. 그러나 시맨틱 태그는 코드를 읽는 사람과 보조 기술에 구조를 더 명확하게 전달한다.

---

## 5. head에 들어간 중요한 설정

### viewport

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

모바일 브라우저가 페이지 폭을 실제 기기 폭에 맞춰 계산하게 한다. 반응형 웹에서 핵심이다.

### CSS 연결

```html
<link rel="stylesheet" href="css/style.css">
```

### JavaScript와 defer

```html
<script src="js/main.js" defer></script>
```

HTML은 위에서 아래로 파싱된다. JavaScript가 너무 일찍 실행되면 아직 만들어지지 않은 DOM을 찾을 수 있다.

`defer`는 HTML 파싱을 방해하지 않고, 파싱이 끝난 뒤 JavaScript를 실행하도록 한다.

---

## 6. 폼과 접근성

Contact에서:

```html
<label for="email">이메일</label>
<input id="email" name="email" type="email">
```

`for="email"`과 `id="email"`을 연결했다.

- label 클릭 시 input으로 포커스 이동
- 어떤 설명이 어느 입력칸에 해당하는지 명확

### name

`name`은 서버로 폼 데이터를 보낼 때 필드 이름이 된다.

### alt

```html
<img src="images/profile.png" alt="Jiho의 프로필 사진">
```

이미지가 표시되지 않거나 시각적으로 볼 수 없을 때 이미지 의미를 제공한다.

### ARIA

우리 코드의 예:

- `aria-expanded`: 메뉴가 열렸는지
- `aria-pressed`: 테마 버튼 상태
- `aria-busy`: Projects 로딩 여부
- `aria-live`: 동적 메시지 변화
- `aria-invalid`: 폼 값 오류 여부

---

# CSS

## 7. CSS 문법

```css
.hero-copy {
  color: var(--muted);
  font-size: 1.08rem;
}
```

구조:

```text
선택자 {
  속성: 값;
}
```

### 선택자 예

- `.button`: class가 button
- `#projects`: id가 projects
- `.project-card p`: project-card 안의 p
- `.button:hover`: 마우스를 올린 button
- `[data-theme="dark"]`: data-theme 속성이 dark

---

## 8. Box Model

브라우저는 대부분의 요소를 사각형 박스로 다룬다.

```text
margin
└─ border
   └─ padding
      └─ content
```

- content: 실제 내용
- padding: 내용 안쪽 여백
- border: 테두리
- margin: 요소 바깥 여백

우리 CSS:

```css
* { box-sizing: border-box; }
```

는 width 계산에 padding과 border까지 포함하게 해서 크기 계산을 직관적으로 만든다.

---

## 9. CSS 변수와 다크모드

라이트 모드 색은:

```css
:root {
  --bg: #f7f8fb;
  --text: #172033;
  --accent: #3158d4;
}
```

사용:

```css
body {
  background: var(--bg);
  color: var(--text);
}
```

다크 모드는:

```css
[data-theme="dark"] {
  --bg: #10131a;
  --text: #f2f4f7;
}
```

즉 컴포넌트 스타일을 두 벌 만드는 것이 아니라 **변수 값만 갈아 끼운다.**

```text
JavaScript가 <html data-theme="dark"> 설정
             ↓
[data-theme="dark"] CSS 적용
             ↓
CSS 변수 값 변경
             ↓
var(--bg), var(--text)를 쓰는 모든 곳이 변경
```

---

## 10. Flexbox

`css/style.css`의 `.nav-container`:

```css
.nav-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
```

Flexbox는 **한 축 중심 배치**에 적합하다.

Navigation에서는 로고와 버튼/메뉴를 가로 방향으로 정렬한다.

```css
.logo {
  margin-right: auto;
}
```

남는 공간을 로고의 오른쪽 margin이 가져가므로 뒤의 요소가 오른쪽으로 밀린다.

---

## 11. Grid

Projects:

```css
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

해석:

- `minmax(250px, 1fr)`: 열 하나가 최소 250px, 여유가 있으면 늘어남
- `auto-fit`: 들어갈 수 있는 만큼 열을 자동 배치
- `repeat`: 같은 열 규칙 반복

따라서 카드 수나 화면 폭에 따라 한 열/여러 열이 자동 조정된다.

---

## 12. Flexbox와 Grid의 차이

평가 답변:

> Flexbox는 한 축을 기준으로 요소를 정렬하는 데 적합해서 Navigation에 사용했습니다. Grid는 행과 열을 함께 관리하기 좋아 Projects 카드 배치에 사용했습니다. Projects는 API 응답에 따라 카드 개수가 바뀌기 때문에 auto-fit과 minmax로 화면 폭에 따라 열 수가 자동 조정되게 했습니다.

---

## 13. 반응형 웹과 Mobile First

우리 CSS 기본 규칙은 모바일용이다.

그 뒤 큰 화면 규칙을 덧붙인다.

```css
@media (min-width: 768px) { ... }
@media (min-width: 1024px) { ... }
```

- 기본: 모바일
- 768px 이상: 태블릿
- 1024px 이상: 데스크톱

예를 들어 모바일에서는 햄버거 버튼이 보이지만:

```css
@media (min-width: 768px) {
  .menu-toggle { display: none; }
}
```

태블릿 이상에서는 숨긴다.

---

## 14. position

### sticky

Header:

```css
position: sticky;
top: 0;
```

스크롤하면 위에 붙는다.

### fixed

Scroll Top 버튼:

```css
position: fixed;
right: 1rem;
bottom: 1rem;
```

화면 오른쪽 아래에 고정된다.

### absolute

모바일 메뉴:

```css
position: absolute;
top: 64px;
right: 1rem;
```

nav-container를 기준으로 드롭다운처럼 배치된다.

---

## 15. transition과 animation

### transition

상태가 바뀔 때 중간 변화를 부드럽게 연결한다.

```css
.button {
  transition: transform 0.2s ease;
}
.button:hover {
  transform: translateY(-2px);
}
```

### animation

정해진 keyframes 순서대로 움직인다.

```css
@keyframes reveal-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 16. 여기까지 이해했는지 확인

다음 질문에 답할 수 있으면 HTML/CSS 기초는 충분하다.

- HTML과 CSS 역할의 차이는?
- class와 id는 언제 쓰나?
- 왜 시맨틱 태그를 쓰나?
- Flexbox와 Grid의 차이는?
- Mobile First는 무엇인가?
- CSS 변수를 쓰면 다크모드 구현이 왜 쉬워지는가?
- 768px 미디어 쿼리는 무엇을 의미하는가?
