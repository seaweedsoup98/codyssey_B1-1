# 00. 프로젝트 전체 그림부터 이해하기

이 문서는 코드를 보기 전에 **브라우저가 무엇을 하고, 저장소의 각 파일이 어떤 역할을 하는지** 이해하는 데 목적이 있다.

## 1. 이 프로젝트는 정적 웹사이트다

이 저장소에는 서버 프로그램이 없다.

```text
GitHub 저장소
├─ index.html
├─ css/style.css
├─ js/main.js
└─ images/...
```

GitHub Pages가 이 파일들을 웹에서 내려받을 수 있게 제공한다.

- **GitHub 저장소**: 파일과 commit을 보관하는 곳
- **GitHub Pages**: 저장소의 정적 파일을 웹사이트로 제공하는 기능
- **브라우저**: 전달받은 HTML/CSS/JS를 해석해 실제 화면을 만드는 프로그램

Contact에서 이메일이 전송되는 것은 GitHub Pages가 메일 서버 역할을 해서가 아니다. JavaScript가 별도의 **Formspree 서버**에 데이터를 보낸다.

Projects도 저장소 안에 프로젝트 카드가 미리 적혀 있는 것이 아니다. JavaScript가 **GitHub API 서버**에 데이터를 요청해서 받아온다.

---

## 2. 페이지를 열었을 때 일어나는 일

```text
사용자가 URL 입력
        ↓
GitHub Pages에 index.html 요청
        ↓
브라우저가 index.html 다운로드
        ↓
HTML을 위에서 아래로 읽음
        ↓
<link> 발견 → css/style.css 요청
<script defer> 발견 → js/main.js 다운로드
        ↓
HTML을 DOM으로 구성
        ↓
CSS 규칙 계산
        ↓
첫 화면 그림
        ↓
HTML 구성이 끝난 뒤 main.js 실행
        ↓
이벤트 등록 + 초기 함수 실행 + GitHub API 요청
        ↓
사용자 클릭/입력/스크롤에 반응
```

### HTML 파일과 DOM은 다르다

저장소의 HTML:

```html
<button class="theme-toggle">Dark</button>
```

브라우저는 이 코드를 읽고 메모리 안에 **버튼 객체**를 만든다. 이 객체가 DOM의 일부다.

JavaScript:

```js
document.querySelector('.theme-toggle')
```

은 HTML 파일의 문자열을 수정하는 것이 아니라 **브라우저가 만들어 둔 현재 DOM 객체를 찾는 코드**다.

그래서 다크모드를 눌렀다고 저장소의 index.html 파일이 변경되는 것은 아니다. 현재 열린 페이지의 DOM만 바뀐다.

---

## 3. window, document, DOM의 관계

브라우저가 JavaScript에 기본으로 제공하는 객체가 있다.

```text
window
└─ document
   └─ <html>
      ├─ <head>
      └─ <body>
         ├─ header
         ├─ main
         └─ footer
```

- `window`: 현재 브라우저 탭/창을 나타내는 가장 바깥 객체
- `document`: 현재 HTML 문서를 나타내는 객체
- `document.documentElement`: HTML의 `<html>` 요소
- DOM Element: button, section, input 같은 개별 요소 객체

실제 코드:

```js
window.scrollY
document.querySelector('.theme-toggle')
document.documentElement.dataset.theme
```

각각 브라우저 창, 문서, html 요소를 다룬다.

---

## 4. 파일별 책임

| 파일 | 책임 | 대표 예 |
| --- | --- | --- |
| `index.html` | 페이지 구조와 콘텐츠 | nav, About, form |
| `css/style.css` | 색상, 크기, 배치, 반응형 | Grid, dark theme |
| `js/main.js` | 이벤트, 상태, API, DOM 변경 | renderTheme, fetchProjects |
| `images/` | 프로필/스크린샷 | profile.png |
| `.github/workflows/pages.yml` | Pages 배포 절차 | GitHub Actions |
| `report/` | 학습 자료 | 이 문서들 |

## 5. index.html에서 화면 위치 찾기

| 화면 | 검색어 |
| --- | --- |
| 상단 메뉴 | `site-header`, `nav-container` |
| 첫 화면 | `id="hero"` |
| 자기소개 | `id="about"` |
| Skills | `id="skills"` |
| Projects | `id="projects"` |
| Contact | `id="contact"` |
| Footer | `site-footer` |

## 6. style.css에서 기능 찾기

| 기능 | 검색어 |
| --- | --- |
| 공통 색상 | `:root` |
| 다크모드 | `[data-theme="dark"]` |
| 상단 가로 배치 | `.nav-container` |
| 프로젝트 카드 Grid | `.projects-grid` |
| 모바일 메뉴 | `.menu-toggle`, `.nav-links` |
| 태블릿 이상 | `@media (min-width: 768px)` |
| 데스크톱 이상 | `@media (min-width: 1024px)` |

## 7. main.js에서 기능 찾기

main.js는 크게 다음 순서다.

```text
CONFIG       숫자/이름 같은 설정값
state        현재 UI 상태
DOM          화면 요소 참조
↓
작은 기능 함수
↓
Projects 관련 함수
↓
Form 관련 함수
↓
이벤트 등록
↓
IntersectionObserver
↓
초기 실행
```

대표 검색어:

| 기능 | 검색어 |
| --- | --- |
| 테마 | `renderTheme` |
| 햄버거 | `renderMenu` |
| 스크롤 | `handleScroll` |
| 타이핑 | `startTyping` |
| GitHub 요청 | `fetchProjects` |
| 카드 출력 | `renderProjects` |
| 폼 검사 | `validateField` |
| 폼 전송 | `submitForm` |

---

## 8. 기능 하나를 이해하는 네 단계

예를 들어 햄버거 메뉴를 공부한다.

### 1단계: HTML
버튼과 메뉴가 어디 있는지 찾는다.

```text
.menu-toggle
.nav-links
```

### 2단계: CSS
닫혔을 때와 열렸을 때 모양을 본다.

```css
.nav-links { display: none; }
.nav-links.active { display: flex; }
```

### 3단계: JavaScript
클릭 이벤트와 상태를 찾는다.

```text
state.menuOpen
renderMenu()
menuButton.addEventListener(...)
```

### 4단계: 전체 흐름
```text
클릭
→ menuOpen 값 변경
→ renderMenu()
→ active class 추가/제거
→ CSS 규칙 변경
→ 메뉴가 보이거나 숨겨짐
```

다른 기능도 같은 방법으로 보면 된다.

---

## 9. 개발자 도구 세 탭

Chrome에서 개발자 도구를 열면 코드를 직접 관찰할 수 있다.

### Elements
현재 DOM과 적용된 CSS를 확인한다.

추천:
- 다크모드 클릭 후 `<html data-theme="dark">` 확인
- 햄버거 클릭 후 `.nav-links.active` 확인

### Console
JavaScript를 직접 실행한다.

```js
document.querySelector('.theme-toggle')
window.scrollY
localStorage.getItem('portfolio-theme')
```

### Network
실제 HTTP 요청을 본다.

- Projects 로딩 → GitHub API GET 요청
- Contact 전송 → Formspree POST 요청

GET/POST 같은 HTTP 용어는 [08_HTTP_API_ACCESSIBILITY.md](08_HTTP_API_ACCESSIBILITY.md)에서 자세히 설명한다.

---

## 10. 프로젝트의 핵심 한 문장

> HTML로 구조를 만들고 CSS로 반응형 디자인을 적용한 뒤, JavaScript가 이벤트와 외부 데이터에 따라 state를 변경하고 DOM을 갱신하는 구조다.
