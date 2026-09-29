# 01. HTML / CSS / 브라우저 기초 압축 정리

# A. 웹의 가장 기본 구조

## 1. 클라이언트와 서버

- **클라이언트**: 페이지를 보는 Chrome 같은 브라우저
- **서버**: 파일이나 데이터를 제공하는 쪽
- **GitHub Pages**: HTML/CSS/JS 파일 제공
- **GitHub API**: repository 데이터를 JSON으로 제공
- **Formspree**: Contact 데이터를 받아 이메일로 전달

```text
브라우저 ──요청──> 서버
브라우저 <─응답── 서버
```

HTTP는 이 요청/응답에서 사용하는 대표적인 통신 규칙이다.

---

# B. HTML

## 2. HTML 요소 구조

```html
<p class="hero-copy">안녕하세요.</p>
```

| 부분 | 의미 |
| --- | --- |
| `p` | 태그 |
| `class` | 속성 이름 |
| `hero-copy` | 속성 값 |
| 안녕하세요 | 콘텐츠 |

HTML 요소는 서로 중첩될 수 있다.

```html
<section>
  <h2>About</h2>
  <p>소개입니다.</p>
</section>
```

- section = 부모
- h2, p = 자식

---

## 3. class와 id

### class
여러 요소가 같은 이름을 공유할 수 있다.

```html
<div class="section-inner">
```

CSS에서는 점으로 찾는다.

```css
.section-inner { ... }
```

### id
페이지 안에서 특정 요소를 고유하게 식별한다.

```html
<section id="projects">
<a href="#projects">프로젝트 보기</a>
```

`href="#projects"`가 `id="projects"`를 목적지로 사용한다.

---

## 4. 시맨틱 태그

| 태그 | 역할 | 이 프로젝트 |
| --- | --- | --- |
| `header` | 상단 영역 | 사이트 header |
| `nav` | 주요 탐색 | 메뉴 |
| `main` | 핵심 콘텐츠 | Hero~Contact |
| `section` | 주제별 구역 | About, Skills 등 |
| `article` | 독립 콘텐츠 | About/Project 카드 |
| `footer` | 하단 정보 | 저작권/GitHub |

왜 쓰나?

- 코드만 보고 역할 파악 가능
- 문서 구조가 명확
- 스크린리더 같은 보조 기술에 의미 전달

`div`만으로도 화면은 만들 수 있지만 의미가 코드에 덜 드러난다.

---

## 5. head의 핵심 세 줄

### viewport

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

모바일 브라우저가 실제 기기 폭을 viewport 기준으로 사용하게 한다. 반응형 웹에 중요하다.

### CSS 연결

```html
<link rel="stylesheet" href="css/style.css">
```

### JS + defer

```html
<script src="js/main.js" defer></script>
```

`defer`의 의미:

```text
HTML 읽는 중
├─ JS 다운로드 병행
└─ HTML DOM 구성 완료 후 JS 실행
```

DOM이 만들어지기 전에 JS가 요소를 찾는 문제를 줄인다.

---

## 6. Form의 기본

```html
<label for="email">이메일</label>
<input id="email" name="email" type="email">
```

- `label for` ↔ `input id`: 설명과 입력칸 연결
- `name`: 서버로 전송할 필드 이름
- `type="email"`: 이메일 입력 의미
- `textarea`: 여러 줄 입력

---

## 7. alt와 ARIA

### alt

```html
<img src="..." alt="Jiho의 프로필 사진">
```

이미지의 의미를 텍스트로 제공한다.

### 이 프로젝트의 ARIA

| 속성 | 의미 |
| --- | --- |
| `aria-expanded` | 메뉴 열림/닫힘 |
| `aria-pressed` | 테마 버튼 상태 |
| `aria-busy` | 로딩 중 여부 |
| `aria-live` | 바뀐 메시지를 알림 |
| `aria-invalid` | 입력 오류 여부 |

---

# C. CSS

## 8. CSS 기본 문법

```css
.hero-copy {
  color: var(--muted);
  font-size: 1.08rem;
}
```

```text
선택자 {
  속성: 값;
}
```

### 자주 쓰는 선택자

| 선택자 | 의미 |
| --- | --- |
| `.button` | class=button |
| `#projects` | id=projects |
| `.card p` | card 안의 p |
| `.button:hover` | 마우스를 올린 상태 |
| `[data-theme="dark"]` | 특정 속성값 |
| `.nav-links.active` | 두 class를 동시에 가짐 |

---

## 9. Cascade와 specificity 최소 이해

같은 요소에 여러 CSS 규칙이 적용되면 브라우저가 어떤 규칙이 더 구체적인지 판단한다.

```css
.button { color: black; }
.button.primary { color: white; }
```

`.button.primary`가 더 구체적이므로 white가 적용된다.

같은 우선순위라면 뒤에 선언된 규칙이 적용되는 경우가 많다.

---

## 10. Box Model

```text
margin
└── border
    └── padding
        └── content
```

- content: 실제 내용
- padding: 내용과 테두리 사이
- border: 테두리
- margin: 바깥 간격

```css
* { box-sizing: border-box; }
```

width 계산에 padding/border를 포함해 크기 계산을 단순하게 만든다.

---

## 11. 길이 단위

| 단위 | 의미 | 사용 예 |
| --- | --- | --- |
| `px` | 고정 픽셀 | breakpoint 768px |
| `rem` | root 글자 크기 기준 | padding, font-size |
| `vw` | viewport 폭의 1% | 반응형 크기 |
| `vh` | viewport 높이의 1% | Hero 높이 |
| `%` | 부모 기준 비율 | width |

이 프로젝트는 상황에 따라 여러 단위를 섞어 사용한다.

---

## 12. CSS 변수

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

장점:
- 중복 감소
- 전체 스타일 일관성
- 한 곳에서 수정
- 테마 교체가 쉬움

---

## 13. 다크모드 원리

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

를 만들면 같은 `var(--bg)`가 다른 값을 가리킨다.

핵심은 **컴포넌트 CSS를 복제하지 않고 변수 값만 바꾼 것**이다.

---

## 14. Flexbox

Navigation:

```css
.nav-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
```

Flexbox는 **한 방향의 정렬**에 강하다.

```css
.logo { margin-right: auto; }
```

로고 오른쪽 margin이 남은 공간을 차지하면서 나머지 요소가 오른쪽으로 밀린다.

---

## 15. Grid

Projects:

```css
.projects-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(250px, 1fr));
}
```

해석:

- `1fr`: 남은 공간 한 몫
- `minmax(250px, 1fr)`: 최소 250px, 여유가 있으면 확장
- `auto-fit`: 들어갈 수 있는 열 수 자동 계산
- `repeat`: 같은 규칙 반복

정리:

```text
한 축 중심 → Flexbox
행 + 열 → Grid
```

---

## 16. 반응형과 Mobile First

기본 CSS = 모바일.

```css
@media (min-width: 768px) { ... }
@media (min-width: 1024px) { ... }
```

즉:

```text
0 ~ 767px       모바일
768 ~ 1023px    태블릿
1024px 이상     데스크톱
```

모바일에서는 햄버거 표시, 768px 이상에서는 일반 메뉴 표시.

---

## 17. position 세 가지

### sticky
Header:

```css
position: sticky;
top: 0;
```

스크롤하다 위에 닿으면 붙는다.

### fixed
Scroll Top:

```css
position: fixed;
right: 1rem;
bottom: 1rem;
```

viewport에 고정된다.

### absolute
모바일 dropdown:

```css
position: absolute;
top: 64px;
right: 1rem;
```

가까운 positioned 조상을 기준으로 배치된다.

---

## 18. transition vs animation

### transition
상태 A → B 사이를 부드럽게.

```css
.button {
  transition: transform 0.2s ease;
}
.button:hover {
  transform: translateY(-2px);
}
```

### animation
keyframes 순서를 실행.

```css
@keyframes reveal-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

---

# D. 3분 복습

- HTML = 구조
- CSS = 표현
- class = 여러 요소 공유
- id = 고유 식별
- semantic = 태그 이름에 역할이 있음
- Flexbox = 한 축
- Grid = 행/열
- Mobile First = 작은 화면 기본 + min-width 확장
- CSS 변수 = 반복 값 중앙 관리
- data-theme = JS와 CSS를 연결하는 테마 스위치
