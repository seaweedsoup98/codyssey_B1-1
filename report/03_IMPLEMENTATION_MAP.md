# 03. 기능 → 실제 코드 위치 지도

이 문서는 기능을 보고 **HTML, CSS, JavaScript의 연결 위치를 한 번에 찾는 지도**다.

GitHub에서 파일을 연 뒤 `Cmd/Ctrl + F`로 아래 검색어를 찾으면 된다.

## 1. 전체 지도

| 기능 | HTML | CSS | JavaScript |
| --- | --- | --- | --- |
| 상단 Navigation | `.nav-container` | `.nav-container` | 내부 링크 click listener |
| 햄버거 메뉴 | `.menu-toggle`, `.nav-links` | `.menu-toggle.active`, `.nav-links.active` | `state.menuOpen`, `renderMenu()` |
| 다크모드 | `.theme-toggle` | `:root`, `[data-theme="dark"]` | `getInitialTheme()`, `renderTheme()` |
| Hero | `#hero`, `.typing` | `.hero`, `.typing::after` | `startTyping()` |
| About | `#about`, `.profile-image` | `.about-card`, `.profile-image` | reveal observer |
| Skills | `#skills` | `.skill-list` | reveal observer |
| Projects | `#projects`, `.projects-grid` | `.projects-grid`, `.project-card` | `fetchProjects()`, `renderProjects()` |
| 언어 필터 | `.project-filters` | `.filter-button` | `visibleProjects()`, `renderProjectFilters()` |
| Contact | `#contact-form` | `.contact-form`, `.field-error` | `validateField()`, `submitForm()` |
| Header 변화 | `.site-header` | `.site-header.scrolled` | `handleScroll()` |
| Scroll Top | `.scroll-top` | `.scroll-top.visible` | `handleScroll()`, `window.scrollTo()` |
| 등장 효과 | `.reveal` | `.reveal.visible`, `@keyframes reveal-in` | `IntersectionObserver` |

---

# 2. JavaScript의 출발점 세 객체

## CONFIG

**파일:** `js/main.js`  
**검색:** `const CONFIG`

```js
const CONFIG = {
  githubUser: 'seaweedsoup98',
  navScrollThreshold: 60,
  scrollTopThreshold: 300,
  revealThreshold: 0.2,
  themeStorageKey: 'portfolio-theme'
};
```

자주 조정할 설정값을 모아 둔 객체다.

## state

**검색:** `const state`

```text
state
├─ theme
├─ menuOpen
├─ projects
│  ├─ status
│  ├─ items
│  ├─ selectedLanguage
│  └─ errorMessage
└─ form
   ├─ errors
   └─ submitStatus
```

현재 화면을 결정하는 데이터다.

## DOM

**검색:** `const DOM`

```js
const DOM = {
  header:
    document.querySelector('.site-header'),
  ...
};
```

실제 페이지 요소를 찾아 이름을 붙여 둔 객체다.

```text
CONFIG = 설정값
state  = 현재 UI 데이터
DOM    = 현재 화면 요소 참조
```

이 셋을 구분하면 main.js 구조가 훨씬 명확해진다.

---

# 3. 햄버거 메뉴

## HTML
`index.html`

검색:
- `menu-toggle`
- `nav-links`

버튼 안의 span 세 개가 햄버거의 세 줄이다.

## CSS

기본 모바일:

```css
.nav-links {
  display: none;
}

.nav-links.active {
  display: flex;
}
```

768px 이상:

```css
.menu-toggle {
  display: none;
}
```

## JavaScript

상태:

```js
state.menuOpen
```

렌더:

```js
renderMenu()
```

이벤트:

```js
DOM.menuButton.addEventListener(
  'click',
  ...
)
```

흐름:

```text
click
→ menuOpen 반전
→ renderMenu
→ active class 추가/제거
→ CSS display 변경
```

---

# 4. 다크모드

## HTML
검색: `theme-toggle`

## JavaScript

초기값:
- `getStoredTheme()`
- `getInitialTheme()`

화면 반영:
- `renderTheme()`

저장:
- `localStorage.setItem(...)`

핵심 DOM 변경:

```js
document.documentElement.dataset.theme =
  state.theme;
```

여기서:
- `document.documentElement` = `<html>`
- `dataset.theme` = `data-theme`

즉:

```text
dataset.theme = 'dark'
↓
<html data-theme="dark">
```

## CSS

```css
:root { ... }

[data-theme="dark"] { ... }
```

---

# 5. Hero 타이핑

## HTML

```html
<p
  class="hero-copy typing"
  data-text="Operations Research를 ...">
</p>
```

## JavaScript

검색: `startTyping`

핵심:

```js
const text =
  DOM.typingTarget.dataset.text;

DOM.typingTarget.textContent =
  text.slice(0, index);

setTimeout(type, 45);
```

연결:

```text
HTML data-text
↓ dataset.text
문자열
↓ slice
앞부분만 추출
↓ textContent
화면 글자 증가
```

---

# 6. 스크롤 UI

## Header: 60px

CONFIG:

```js
navScrollThreshold: 60
```

함수:

```js
handleScroll()
```

class:
```text
scrolled
```

CSS:
```text
.site-header.scrolled
```

## Scroll Top: 300px

CONFIG:
```js
scrollTopThreshold: 300
```

JS:
- `handleScroll()`
- `window.scrollTo()`

CSS:
- `.scroll-top`
- `.scroll-top.visible`

---

# 7. 내부 링크 부드러운 이동

검색:

```text
a[href^="#"]
getAttribute('href')
preventDefault
scrollIntoView
```

순서:

```text
링크 클릭
→ href 값 읽기
→ 해당 id DOM 찾기
→ 브라우저 기본 점프 취소
→ scrollIntoView smooth
→ 모바일 메뉴 닫기
```

---

# 8. GitHub Projects

## HTML

`index.html`의 Projects에는 처음부터 카드가 없다.

```html
<div class="project-filters"></div>
<div class="projects-grid"></div>
```

JavaScript가 API 결과를 받아 나중에 채운다.

## 주요 함수

| 함수 | 역할 |
| --- | --- |
| `fetchProjects()` | GitHub API 요청 |
| `renderProjects()` | 상태별 Projects 화면 |
| `projectCard()` | repository 1개 → 카드 HTML |
| `visibleProjects()` | 선택 언어로 필터 |
| `renderProjectFilters()` | 언어 버튼 생성 |

## 상태

```text
idle
↓
loading
├─ success
├─ empty
└─ error
```

## API 실패

검색:
- `response.ok`
- `response.status === 403`
- `RATE_LIMIT`

## Retry

검색:
- `retry-projects`
- `DOM.projectsGrid.addEventListener`
- `closest`

부모 Projects 영역이 동적으로 생성된 Retry 버튼 클릭을 이벤트 위임으로 처리한다.

---

# 9. 언어 목록의 어려운 한 줄

검색:

```js
const languages = [
  ...new Set(...)
].sort();
```

단계:

```text
repository 배열
→ map으로 language만 추출
→ filter(Boolean)로 값 없는 항목 제거
→ Set으로 중복 제거
→ spread로 배열로 변환
→ sort로 정렬
```

문법 자체는 02 문서에서 자세히 설명한다.

---

# 10. Project 카드 생성

검색: `projectCard`

함수 매개변수:

```js
({
  name,
  description,
  html_url,
  language,
  stargazers_count
})
```

GitHub repository 객체에서 필요한 속성만 구조분해한다.

그 후 템플릿 리터럴로 HTML 문자열을 만든다.

외부 문자열은 `escapeHtml()`을 거쳐 `innerHTML`에 들어간다.

왜 필요한지는 08 문서의 XSS/escapeHtml 부분을 본다.

---

# 11. map / filter / forEach 위치

## map
- 언어 값 추출
- 필터 버튼 생성
- Project 카드 생성

검색:
```text
.map(
map(projectCard)
```

## filter
- 언어 없는 값 제거
- 선택 언어 repository만 남김

검색:
```text
.filter(Boolean)
items.filter
```

## forEach
- 내부 anchor listener
- form input listener
- reveal observe
- form 오류 갱신

검색:
```text
.forEach(
```

---

# 12. Contact Form

## HTML

검색:
- `contact-form`
- `name-error`
- `email-error`
- `message-error`
- `data-endpoint`

## JavaScript

| 함수/값 | 역할 |
| --- | --- |
| `FORM_FIELDS` | 검사할 field 이름 |
| `validateField()` | 값 검증 |
| `renderFieldError()` | field 오류 표시 |
| `renderFormStatus()` | 전체 form 상태 |
| `submitForm()` | Formspree 전송 |

## input 흐름

```text
input 이벤트
→ validateField
→ state.form.errors[name]
→ renderFieldError
```

## submit 흐름

```text
submit
→ preventDefault
→ 모든 field 재검사
→ Object.values(errors).some(Boolean)
├─ 오류 있음 → 종료
└─ 오류 없음 → submitForm
```

## Formspree

HTML:
```text
data-endpoint
```

JS:
```text
DOM.form.dataset.endpoint
new FormData(DOM.form)
fetch(... POST ...)
```

---

# 13. IntersectionObserver

HTML의 여러 요소에 `reveal` class가 있다.

JavaScript:

```js
document.querySelectorAll('.reveal')
```

로 모두 찾아 observer에 등록한다.

검색:
- `IntersectionObserver`
- `isIntersecting`
- `unobserve`
- `revealThreshold`

CSS:
- `.reveal.visible`
- `@keyframes reveal-in`

---

# 14. 시스템 설정 관련 코드

## 시스템 dark mode

검색:

```text
prefers-color-scheme
matchMedia
```

## 움직임 감소

CSS:
```text
prefers-reduced-motion
```

JS:
```text
prefers-reduced-motion
startTyping
```

---

# 15. 가장 빠른 검색표

| 궁금한 것 | 파일 | 검색어 |
| --- | --- | --- |
| state | main.js | `const state` |
| DOM 객체 | main.js | `const DOM` |
| theme | main.js | `renderTheme` |
| hamburger | main.js | `renderMenu` |
| scroll | main.js | `handleScroll` |
| typing | main.js | `startTyping` |
| GitHub API | main.js | `fetchProjects` |
| API UI | main.js | `renderProjects` |
| 카드 생성 | main.js | `projectCard` |
| 언어 필터 | main.js | `visibleProjects` |
| form 검사 | main.js | `validateField` |
| form 전송 | main.js | `submitForm` |
| Flexbox | style.css | `.nav-container` |
| Grid | style.css | `.projects-grid` |
| 반응형 | style.css | `@media` |
| dark CSS | style.css | `data-theme` |
