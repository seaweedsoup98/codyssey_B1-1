# 03. 기능 → 실제 코드 위치 지도

이 문서는 **"이 기능은 도대체 어디에 구현되어 있지?"**를 빠르게 찾는 용도다.

GitHub에서 파일을 열고 `Cmd/Ctrl + F`로 **검색어**를 찾으면 된다.

## 1. 전체 지도

| 기능 | HTML | CSS | JavaScript | 검색어 |
| --- | --- | --- | --- | --- |
| Navigation | `.nav-container` | `.nav-container` | 내부 링크 listener | `nav-container` |
| 햄버거 | `.menu-toggle`, `.nav-links` | `.menu-toggle.active`, `.nav-links.active` | `renderMenu` | `renderMenu` |
| 다크모드 | `.theme-toggle` | `[data-theme="dark"]` | `renderTheme` | `renderTheme` |
| Hero | `#hero`, `.typing` | `.hero` | `startTyping` | `startTyping` |
| About | `#about` | `.about-card` | reveal observer | `about-card` |
| Skills | `#skills` | `.skill-list` | reveal observer | `skill-list` |
| Projects | `#projects`, `.projects-grid` | `.projects-grid` | `fetchProjects`, `renderProjects` | `fetchProjects` |
| 언어 필터 | `.project-filters` | `.filter-button` | `visibleProjects` | `selectedLanguage` |
| Contact | `#contact-form` | `.contact-form` | `validateField`, `submitForm` | `validateField` |
| Scroll Top | `.scroll-top` | `.scroll-top.visible` | `handleScroll` | `scrollTopThreshold` |
| 등장 효과 | `.reveal` | `.reveal.visible` | `IntersectionObserver` | `revealThreshold` |

---

# 2. HTML 구조

## 시맨틱 태그
**파일:** `index.html`

검색:
```text
<header
<nav
<main
<section
<article
<footer
```

## 섹션 링크
메뉴:
```html
<a href="#projects">Projects</a>
```

대상:
```html
<section id="projects">
```

## 이미지 alt
검색: `profile-image`

## Form label
검색:
```text
for="name"
for="email"
for="message"
```

---

# 3. CSS 구조

## CSS 변수
**파일:** `css/style.css`

검색:
```text
:root
[data-theme="dark"]
```

## Flexbox
검색: `.nav-container`

```css
display: flex;
```

추가 Flex 사용:
- `.hero-actions`
- `.skill-list`
- `.project-filters`
- `.footer-content`

## Grid
검색: `.projects-grid`

```css
display: grid;
grid-template-columns:
  repeat(auto-fit, minmax(250px, 1fr));
```

추가 Grid 사용:
- `.about-card`
- `.contact-layout`
- `.section-heading`

## Mobile First
검색:
```text
@media (min-width: 768px)
@media (min-width: 1024px)
```

---

# 4. JavaScript의 세 묶음

## CONFIG
상수 설정값.

```js
const CONFIG = {
  githubUser: 'seaweedsoup98',
  navScrollThreshold: 60,
  scrollTopThreshold: 300,
  revealThreshold: 0.2,
  ...
};
```

## state
현재 화면 상태.

```text
theme
menuOpen
projects.status/items/selectedLanguage/errorMessage
form.errors/submitStatus
```

## DOM
실제 화면 요소 참조.

```text
header
menuButton
themeButton
projectsGrid
form
...
```

이 셋을 구분하면 main.js가 훨씬 읽기 쉬워진다.

---

# 5. 햄버거 메뉴

### HTML
`.menu-toggle`, `.nav-links`

### state
`state.menuOpen`

### render
`renderMenu()`

### event
```js
DOM.menuButton.addEventListener('click', ...)
```

### CSS
```css
.nav-links { display: none; }
.nav-links.active { display: flex; }
```

### 전체 흐름
```text
click
→ menuOpen 반전
→ renderMenu()
→ active class
→ CSS
```

---

# 6. 다크모드

### 초기값
`getInitialTheme()`

### 저장값 읽기
`getStoredTheme()`

### 화면 반영
`renderTheme()`

### state
`state.theme`

### CSS
`[data-theme="dark"]`

### 저장
`localStorage.setItem(...)`

---

# 7. 스크롤

## Header 60px
- CONFIG: `navScrollThreshold: 60`
- 함수: `handleScroll()`
- class: `scrolled`
- CSS: `.site-header.scrolled`

## Top 300px
- CONFIG: `scrollTopThreshold: 300`
- 함수: `handleScroll()`
- class: `visible`
- click: `window.scrollTo()`

---

# 8. 부드러운 내부 링크

검색:
```text
a[href^="#"]
scrollIntoView
preventDefault
```

흐름:
```text
anchor click
→ href 읽기
→ 대상 DOM 찾기
→ 기본 점프 차단
→ smooth scroll
→ 모바일 메뉴 닫기
```

---

# 9. 타이핑

### HTML
`.typing`의 `data-text`

### JS
`startTyping()`

### 핵심
```js
text.slice(0, index)
setTimeout(type, 45)
```

문자열 앞부분 길이를 1씩 증가.

---

# 10. Projects API

### 시작
`fetchProjects()`

### 상태 UI
`renderProjects()`

### 카드
`projectCard()`

### 필터
`visibleProjects()`

### 필터 버튼
`renderProjectFilters()`

### API 주소
```text
https://api.github.com/users/seaweedsoup98/repos
```

### 상태
```text
loading
success
empty
error
```

### 403
검색: `RATE_LIMIT`

### Retry
검색: `retry-projects`

---

# 11. 배열 메서드

## map
검색:
```text
map(projectCard)
map((language)
```

## filter
검색:
```text
items.filter
filter(Boolean)
```

## forEach
검색: `.forEach(`

사용:
- anchor listener
- form field listener
- reveal observe
- form error reset

---

# 12. Contact Form

### HTML
`#contact-form`

### 필드 배열
`FORM_FIELDS`

### 검사
`validateField()`

### 오류 표시
`renderFieldError()`

### 상태 메시지
`renderFormStatus()`

### 전송
`submitForm()`

### Formspree endpoint
`index.html`의 `data-endpoint`

### 전송 데이터
`new FormData(DOM.form)`

---

# 13. 스크롤 등장 애니메이션

### 대상
`.reveal`

### observer
`IntersectionObserver`

### 기준
`revealThreshold: 0.2`

### CSS
`.reveal.visible`, `@keyframes reveal-in`

---

# 14. 빠른 검색표

| 알고 싶은 것 | 파일 | 검색 |
| --- | --- | --- |
| state | main.js | `const state` |
| DOM 선택 | main.js | `const DOM` |
| 테마 | main.js | `renderTheme` |
| 햄버거 | main.js | `renderMenu` |
| API | main.js | `fetchProjects` |
| API 화면 | main.js | `renderProjects` |
| 프로젝트 카드 | main.js | `projectCard` |
| Form 검사 | main.js | `validateField` |
| Form 전송 | main.js | `submitForm` |
| Flexbox | style.css | `.nav-container` |
| Grid | style.css | `.projects-grid` |
| breakpoint | style.css | `@media` |
| dark CSS | style.css | `data-theme` |
