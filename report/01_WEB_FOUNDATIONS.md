# 01. HTML / CSS 기초부터 실제 코드 읽기

이 문서는 `index.html`과 `css/style.css`을 **처음부터 읽을 수 있게 만드는 것**이 목표다.

# A. HTML

## 1. HTML 문서의 기본 뼈대

실제 `index.html`의 시작은 다음과 같다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Jiho의 반응형 포트폴리오 웹사이트">
  <title>Jiho | Portfolio</title>
  <link rel="stylesheet" href="css/style.css">
  <script src="js/main.js" defer></script>
</head>
<body>
  ...
</body>
</html>
```

각 부분:

| 코드 | 의미 |
| --- | --- |
| `<!DOCTYPE html>` | 이 문서를 현대 HTML 문서로 해석하라는 선언 |
| `<html>` | HTML 문서 전체를 감싸는 최상위 요소 |
| `lang="ko"` | 문서의 주 언어가 한국어임을 표시 |
| `<head>` | 페이지 설정/메타데이터 영역 |
| `<body>` | 실제 화면에 표시되는 콘텐츠 |
| `charset="UTF-8"` | 한글 등 문자를 UTF-8로 해석 |
| `viewport` | 모바일 화면 폭 계산 기준 설정 |
| `<title>` | 브라우저 탭 제목 |
| `<link>` | 외부 CSS 연결 |
| `<script>` | JavaScript 연결 |

### head와 body 차이

- `head`: 화면 콘텐츠 자체가 아니라 브라우저가 문서를 처리하는 데 필요한 정보
- `body`: 사용자가 실제로 보는 페이지 구조

---

## 2. 태그, 요소, 속성

```html
<p class="hero-copy">안녕하세요.</p>
```

정확히 나누면:

```text
<p>             시작 태그
</p>            종료 태그
p               태그 이름
class           속성(attribute) 이름
hero-copy       속성 값
안녕하세요.     텍스트 콘텐츠
전체 <p>...</p> HTML 요소(element)
```

태그와 요소를 완전히 같은 말로 쓰는 경우도 많지만, 엄밀히는 **태그는 문법 조각이고 요소는 시작/끝 태그와 내용까지 포함한 하나의 구성요소**라고 보면 된다.

---

## 3. 부모와 자식

```html
<section>
  <h2>About</h2>
  <p>자기소개입니다.</p>
</section>
```

- section = 부모
- h2, p = section의 자식

이 관계는 CSS selector와 DOM 탐색에서 계속 사용된다.

---

## 4. class와 id

### class

같은 역할이나 스타일을 여러 요소가 공유할 때 쓴다.

```html
<a class="button primary">...</a>
<button class="button primary">...</button>
```

CSS:

```css
.button { ... }
```

점 `.`은 **class selector**라는 뜻이다.

### id

한 페이지에서 특정 요소를 고유하게 식별할 때 쓴다.

```html
<section id="projects">
```

CSS/JavaScript selector에서는 `#`을 사용한다.

```css
#projects { ... }
```

```js
document.querySelector('#projects')
```

### HTML → CSS → JavaScript 연결

```text
HTML class="theme-toggle"
        ↓
CSS .theme-toggle
        ↓
JS document.querySelector('.theme-toggle')
```

CSS의 selector 문법과 `querySelector()`가 같은 형태를 사용한다는 점이 중요하다.

---

## 5. 시맨틱 HTML

화면을 모두 `div`로 만들 수도 있지만, 역할이 있는 영역에는 의미가 드러나는 태그를 사용한다.

| 태그 | 의미 | 프로젝트 |
| --- | --- | --- |
| `header` | 페이지 상단 영역 | 상단 navigation |
| `nav` | 주요 탐색 링크 | About/Skills/Projects/Contact |
| `main` | 페이지의 핵심 콘텐츠 | Hero~Contact |
| `section` | 하나의 주제를 가진 영역 | About, Skills 등 |
| `article` | 독립적으로 볼 수 있는 콘텐츠 | About card, Project card |
| `footer` | 하단 정보 | 저작권/GitHub 링크 |

장점:
- 코드를 읽을 때 역할이 바로 보임
- 문서 구조가 명확해짐
- 스크린리더 같은 보조 기술에 의미 전달

---

## 6. 내부 링크와 id

```html
<a href="#projects">Projects</a>
...
<section id="projects">
```

`href="#projects"`의 `#projects`는 같은 페이지의 `id="projects"`를 가리킨다.

브라우저 기본 동작은 해당 요소로 이동하는 것이다. 이 프로젝트는 JavaScript가 그 기본 동작을 막고 부드러운 스크롤로 대신한다.

---

## 7. data-* 속성과 dataset

HTML에는 개발자가 자유롭게 값을 저장할 수 있는 `data-*` 속성이 있다.

실제 프로젝트:

```html
<p class="typing"
   data-text="Operations Research를 공부하며...">
```

JavaScript:

```js
DOM.typingTarget.dataset.text
```

연결 규칙:

```text
data-text      → dataset.text
data-endpoint  → dataset.endpoint
data-language  → dataset.language
```

즉 HTML에 데이터를 심어 두고 JavaScript가 읽을 수 있다.

실제 사용:
- 타이핑 문구
- Formspree endpoint
- 프로젝트 언어 필터

---

## 8. Form 구조

```html
<form id="contact-form" novalidate>
  <label for="email">이메일</label>
  <input id="email" name="email" type="email">
  <button type="submit">보내기</button>
</form>
```

### form
여러 입력값을 하나의 제출 단위로 묶는다.

### label / for / id
```html
<label for="email">
<input id="email">
```

같은 값으로 연결된다.

### name
```html
<input name="email">
```

서버에 데이터를 보낼 때 key 이름으로 사용된다.

FormData는 대략:

```text
name=홍길동
email=a@example.com
message=안녕하세요
```

형태로 값을 모은다.

### button type

- `type="submit"`: form 제출 이벤트 발생
- `type="button"`: 일반 버튼, form 제출 안 함

그래서 테마/햄버거 버튼은 `type="button"`, Contact의 보내기는 `type="submit"`이다.

### novalidate

브라우저 기본 form validation UI를 사용하지 않도록 한다.

이 프로젝트에서는 JavaScript가 직접 오류 메시지를 보여주므로:

```html
<form ... novalidate>
```

를 사용했다.

---

# B. CSS

## 9. CSS는 HTML 요소를 선택해서 규칙을 적용한다

HTML:

```html
<a class="button primary">프로젝트 보기</a>
```

CSS:

```css
.button {
  border-radius: 10px;
}

.button.primary {
  background: var(--accent);
}
```

브라우저는 HTML 요소의 class 목록을 보고 맞는 CSS selector를 적용한다.

`.button.primary`는:
- `button` class도 있고
- `primary` class도 있는

요소를 뜻한다.

---

## 10. 자주 쓰는 selector

| selector | 의미 |
| --- | --- |
| `*` | 모든 요소 |
| `body` | body 태그 |
| `.button` | class=button |
| `#projects` | id=projects |
| `.project-card p` | project-card 안의 p |
| `.button:hover` | button에 마우스를 올린 상태 |
| `.button:focus-visible` | 키보드 등으로 focus가 보이는 상태 |
| `.typing::after` | typing 요소 뒤에 가상 요소 생성 |
| `.menu-toggle span:nth-child(1)` | 첫 번째 span |
| `[data-theme="dark"]` | data-theme 속성값이 dark |

### pseudo-class와 pseudo-element

- `:hover`, `:focus-visible`, `:nth-child()` → 요소의 **상태/조건**
- `::before`, `::after` → HTML에 없는 **가상 요소**

타이핑 커서 `|`는 `.typing::after`로 만든다.

---

## 11. Cascade와 specificity

한 요소에 여러 CSS 규칙이 적용될 수 있다.

```css
.button { color: black; }
.button.primary { color: white; }
```

더 구체적인 `.button.primary`가 우선한다.

같은 수준이라면 뒤에 선언된 규칙이 우선하는 경우가 많다.

이 원리를 **cascade**라고 하고, selector가 얼마나 구체적인지 나타내는 개념을 **specificity**라고 한다.

---

## 12. Box Model

모든 요소는 기본적으로 사각형 박스로 생각할 수 있다.

```text
margin
└─ border
   └─ padding
      └─ content
```

- content: 글자/이미지 같은 실제 내용
- padding: 내용과 테두리 사이 안쪽 여백
- border: 테두리
- margin: 다른 요소와의 바깥 간격

```css
* { box-sizing: border-box; }
```

를 쓰면 width에 padding/border가 포함되어 크기 계산이 더 직관적이다.

---

## 13. CSS 값의 상속

```css
a {
  color: inherit;
}
```

`inherit`는 부모 요소의 값을 그대로 물려받으라는 뜻이다.

또:

```css
background: currentColor;
```

의 `currentColor`는 현재 요소의 `color` 값을 사용한다.

햄버거의 선 색상을 버튼 글자색과 일치시키는 데 사용한다.

---

## 14. 길이 단위

| 단위 | 뜻 | 예 |
| --- | --- | --- |
| `px` | 픽셀 단위 | 768px breakpoint |
| `rem` | 최상위 글자 크기 기준 | padding 1rem |
| `vw` | viewport 폭의 1% | 70vw |
| `vh` | viewport 높이의 1% | 100vh |
| `%` | 부모 기준 비율 | width 100% |
| `fr` | Grid의 남은 공간 비율 | 1fr |

---

## 15. CSS 함수

CSS에도 함수 형태 문법이 있다. JavaScript 함수와는 별개의 CSS 문법이다.

### calc()

```css
min-height: calc(100vh - 64px);
```

viewport 전체 높이에서 header 64px을 뺀다.

### min()

```css
width: min(220px, 70vw);
```

두 값 중 작은 값을 선택한다.

### clamp()

```css
font-size: clamp(2.3rem, 9vw, 4.8rem);
```

- 최소 2.3rem
- 화면에 따라 9vw로 변화
- 최대 4.8rem

즉 너무 작거나 너무 커지지 않게 제한한다.

### color-mix()

두 색을 섞는다.

```css
background:
  color-mix(in srgb, var(--surface) 92%, transparent);
```

surface 색 92% + 투명색을 섞어 반투명 배경을 만든다.

---

## 16. CSS 변수와 다크모드

```css
:root {
  --bg: #f7f8fb;
  --text: #172033;
}
```

사용:

```css
body {
  background: var(--bg);
  color: var(--text);
}
```

다크모드:

```css
[data-theme="dark"] {
  --bg: #10131a;
  --text: #f2f4f7;
}
```

JavaScript가:

```html
<html data-theme="dark">
```

를 만들면 같은 `var(--bg)`가 다크용 값으로 바뀐다.

장점은 각 컴포넌트마다 다크 CSS를 다시 쓰지 않아도 된다는 것이다.

---

## 17. Flexbox를 실제 코드로 이해하기

```css
.nav-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
```

`display: flex`를 쓰면 바로 아래 자식들이 **flex item**이 된다.

기본 방향은 가로다.

```text
[logo] [theme] [menu]
→ main axis
```

핵심 속성:
- `flex-direction`: main axis 방향
- `justify-content`: main axis 방향 정렬
- `align-items`: 반대 축 정렬
- `gap`: item 사이 간격
- `flex-wrap`: 공간 부족 시 다음 줄로 넘길지

### margin-right: auto

```css
.logo {
  margin-right: auto;
}
```

로고 오른쪽 margin이 남는 공간을 모두 차지한다.

```text
[logo][----------남는 공간----------][theme][menu]
```

그래서 logo는 왼쪽, 나머지는 오른쪽에 배치된다.

---

## 18. Grid를 실제 코드로 이해하기

```css
.projects-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(250px, 1fr));
}
```

한 조각씩 해석한다.

```text
minmax(250px, 1fr)
= 카드 한 열은 최소 250px
= 공간이 남으면 늘어날 수 있음

auto-fit
= 현재 컨테이너에 몇 열이 들어갈지 자동 계산

repeat(...)
= 같은 열 규칙을 반복
```

예를 들어 컨테이너가 좁으면 1열, 넓어지면 2~3열 이상이 된다.

`grid-column: 1 / -1`은 첫 열부터 마지막 열까지 차지하라는 뜻이다. 그래서 status message가 카드 한 칸이 아니라 전체 폭을 사용한다.

---

## 19. position 관계

### relative + absolute는 세트로 자주 쓴다

```css
.nav-container {
  position: relative;
}

.nav-links {
  position: absolute;
  top: 64px;
  right: 1rem;
}
```

`position: relative`는 nav-container 자체를 크게 움직이기 위한 것이 아니라, **absolute 자식의 위치 기준점**을 만들기 위해 사용한다.

그래서 모바일 메뉴의 `top`, `right`는 nav-container를 기준으로 계산된다.

### sticky
스크롤하다 지정 위치에 닿으면 붙는다.

### fixed
viewport에 고정된다. Scroll Top 버튼에 사용.

---

## 20. 이미지 관련 속성

```css
.profile-image {
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
}
```

- `aspect-ratio: 1`: 가로:세로를 1:1로 유지
- `object-fit: cover`: 비율을 유지하면서 영역을 꽉 채우고 넘치는 부분은 잘라냄
- `border-radius: 50%`: 원형으로 표시

---

## 21. transform / opacity / z-index / pointer-events

- `transform: translateY(...)`: 요소를 시각적으로 이동
- `rotate(...)`: 회전
- `opacity: 0`: 투명
- `z-index`: 요소가 겹칠 때 위아래 순서
- `pointer-events: none`: 마우스/터치 클릭 대상에서 제외

Scroll Top 버튼은 안 보일 때:
- opacity 0
- pointer-events none

보일 때:
- opacity 1
- pointer-events auto

로 바뀐다.

---

## 22. transition과 animation

### transition
상태 A에서 B로 바뀌는 중간 과정을 부드럽게 만든다.

### animation
`@keyframes`에 정의된 여러 단계의 변화를 실행한다.

Reveal:

```css
@keyframes reveal-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 23. Mobile First

기본 CSS가 모바일용이다.

그 뒤:

```css
@media (min-width: 768px) { ... }
@media (min-width: 1024px) { ... }
```

에서 큰 화면 규칙을 추가한다.

```text
0~767px       기본 모바일
768~1023px    태블릿 이상 규칙 추가
1024px~       데스크톱 규칙 추가
```

모바일에서 햄버거가 보이고, 768px부터 햄버거를 숨기고 일반 nav를 표시하는 것이 대표 예다.

---

## 24. 움직임 감소 설정

일부 사용자는 운영체제에서 애니메이션을 줄이도록 설정한다.

```css
@media (prefers-reduced-motion: reduce) {
  ...
}
```

이 프로젝트는 이 설정이 있으면 transition/animation을 사실상 제거한다.

JavaScript 타이핑 효과도 같은 설정을 확인해서 문장을 즉시 표시한다.

이것은 단순 디자인이 아니라 **웹 접근성**을 위한 처리다.

접근성은 [08_HTTP_API_ACCESSIBILITY.md](08_HTTP_API_ACCESSIBILITY.md)에 따로 정리되어 있다.
