# 06. 실제 평가표 직접 대응 문서

이 문서는 **평가 당일 화면에 띄워 놓고 바로 답변하기 위한 문서**다.

학습용 설명이 아니라, 제공된 평가표의 질문 순서에 맞춰 다음 네 가지를 바로 확인할 수 있게 정리했다.

- **바로 말할 답변**
- **실제 코드 위치**
- **직접 시연 방법**
- **꼬리질문 대비**

코드 위치는 줄 번호 대신 **파일명 + 함수/selector 이름**으로 적었다. 줄 번호는 코드 수정 시 바뀌지만 함수와 selector 이름은 그대로 찾기 쉽기 때문이다.

---

# 항목 1. 실제 동작 확인

## 1-1. 브라우저 창 크기를 줄였을 때 레이아웃이 모바일에 맞게 변경되는가?

### 바로 답변

> 네. 모바일 퍼스트로 작성했고 기본 스타일은 모바일용입니다. 화면이 768px 이상일 때 태블릿/데스크톱 레이아웃으로 확장되고, 1024px 이상에서 데스크톱 여백과 프로젝트 카드 폭을 다시 조정합니다. 모바일에서는 일반 네비게이션 대신 햄버거 버튼이 보이고, 데스크톱에서는 햄버거 버튼이 숨겨지고 메뉴가 가로로 표시됩니다.

### 코드 근거

**파일:** `css/style.css`

검색:

```text
@media (min-width: 768px)
@media (min-width: 1024px)
.menu-toggle
.nav-links
.projects-grid
```

핵심:

```css
@media (min-width: 768px) {
  .menu-toggle { display: none; }
  .nav-links {
    position: static;
    display: flex;
    flex-direction: row;
  }
}
```

### 시연 방법

1. Chrome 개발자 도구 열기
2. 화면 폭을 767px로 설정
3. 햄버거 메뉴 확인
4. 768px 이상으로 늘리기
5. 햄버거가 사라지고 About / Skills / Projects / Contact가 가로로 표시되는지 확인
6. Projects 카드 열 수도 화면 폭에 따라 바뀌는지 확인

### 꼬리질문: 왜 768px, 1024px인가?

> 미션에서 지정한 breakpoint를 그대로 사용했습니다. 기본 스타일을 모바일로 두고 768px에서 태블릿, 1024px에서 데스크톱 레이아웃을 확장했습니다.

---

## 1-2. 테마 토글 시 다크/라이트 모드가 전환되고 새로고침 후에도 유지되는가?

### 바로 답변

> 네. 테마 버튼을 누르면 `state.theme`을 light와 dark 사이에서 변경하고 `renderTheme()`이 HTML의 `data-theme` 속성을 변경합니다. CSS는 `[data-theme="dark"]`에서 색상 변수 값을 바꿉니다. 사용자가 선택한 테마는 `localStorage`에 저장해서 새로고침 후에도 유지됩니다.

### 코드 근거

**파일:** `js/main.js`

검색:

```text
getStoredTheme
getInitialTheme
renderTheme
themeButton.addEventListener
themeStorageKey
```

핵심 흐름:

```text
버튼 클릭
→ state.theme 변경
→ renderTheme()
→ <html data-theme="dark">
→ localStorage 저장
→ CSS 변수 변경
```

**파일:** `css/style.css`

검색:

```css
:root
[data-theme="dark"]
```

### 시연 방법

1. Dark 버튼 클릭
2. 다크모드 전환 확인
3. 새로고침
4. 다크모드 유지 확인
5. Light 버튼 클릭 후 다시 새로고침
6. 라이트 모드 유지 확인

### 꼬리질문: 저장된 테마가 없으면?

> `prefers-color-scheme`을 확인해 운영체제의 시스템 테마를 초기값으로 사용합니다.

---

## 1-3. 햄버거 메뉴, 스크롤 애니메이션, 맨 위로 가기 버튼이 정상 동작하는가?

### 바로 답변

> 네. 햄버거 메뉴는 모바일에서만 보이며 클릭할 때 `state.menuOpen`을 반전시키고 `active` 클래스를 토글합니다. 스크롤 애니메이션은 `IntersectionObserver`로 요소가 20% 이상 보이면 `visible` 클래스를 추가합니다. 맨 위로 가기 버튼은 300px 이상 스크롤했을 때 나타나고 클릭하면 `window.scrollTo()`로 맨 위로 부드럽게 이동합니다.

### 코드 근거

**햄버거**

- HTML: `index.html` → `.menu-toggle`, `.nav-links`
- JS: `renderMenu()`, `DOM.menuButton.addEventListener('click', ...)`
- CSS: `.nav-links.active`, `.menu-toggle.active`

**스크롤 애니메이션**

- JS: `IntersectionObserver`, `revealThreshold: 0.2`
- CSS: `.reveal.visible`, `@keyframes reveal-in`

**Scroll Top**

- JS: `scrollTopThreshold: 300`, `handleScroll()`, `window.scrollTo()`
- CSS: `.scroll-top`, `.scroll-top.visible`

### 시연 방법

- 모바일 화면에서 햄버거 버튼을 눌러 메뉴 열기/닫기
- 페이지를 아래로 스크롤해 section 등장 효과 확인
- 300px 이상 내려가 우측 하단 ↑ 버튼 확인
- ↑ 클릭 후 맨 위로 이동 확인

---

## 1-4. GitHub API 데이터가 화면에 표시되고 loading/error/empty 상태가 구분되는가?

### 바로 답변

> 네. 페이지 로드 시 `fetchProjects()`가 GitHub API를 호출합니다. 요청 전에는 status를 loading으로 바꿔 "프로젝트 로딩 중..."을 보여주고, 성공하면 repository 배열을 state에 저장해 카드로 렌더링합니다. 응답 배열이 비어 있으면 empty, 요청이 실패하면 error 상태로 바꿉니다. 403은 API rate limit으로 별도 안내하고 error 상태에는 다시 시도 버튼도 표시합니다.

### 코드 근거

**파일:** `js/main.js`

검색:

```text
fetchProjects
renderProjects
state.projects.status
RATE_LIMIT
retry-projects
```

상태:

```text
idle
 ↓
loading
 ├─ success
 ├─ empty
 └─ error
```

API:

```text
https://api.github.com/users/seaweedsoup98/repos
```

### 시연 방법

정상 상태:

1. 페이지 새로고침
2. Projects 영역 확인
3. GitHub repository 카드가 나타나는지 확인

error 상태를 설명할 때:

> 코드에서는 `response.ok`와 `response.status === 403`을 확인해 실패를 error 상태로 변경하고, `renderProjects()`가 오류 메시지와 Retry 버튼을 렌더링하도록 했습니다.

empty 상태를 설명할 때:

> API에서 빈 배열이 오면 `projects.length ? 'success' : 'empty'`로 판단합니다.

---

## 1-5. 필수 입력값 누락 및 이메일 형식 오류에 즉각적인 피드백이 표시되는가?

### 바로 답변

> 네. 이름, 이메일, 메시지 필드 각각에 input 이벤트를 연결했습니다. 입력할 때마다 `validateField()`가 현재 값의 유효성을 검사하고 `state.form.errors`를 변경한 뒤 `renderFieldError()`가 필드 바로 아래 에러 메시지를 갱신합니다. submit 시에도 모든 필드를 다시 검사하기 때문에 빈 상태로 바로 제출하는 경우도 처리됩니다.

### 코드 근거

**파일:** `js/main.js`

검색:

```text
FORM_FIELDS
validateField
renderFieldError
addEventListener('input'
addEventListener('submit'
```

HTML 에러 표시 위치:

**파일:** `index.html`

```html
<p class="field-error" id="name-error"></p>
<p class="field-error" id="email-error"></p>
<p class="field-error" id="message-error"></p>
```

### 시연 방법

1. 빈 상태로 보내기 클릭 → 필수 입력 메시지 확인
2. 이메일에 `abc` 입력 → 이메일 형식 오류 확인
3. 올바른 이메일 입력 → 오류가 즉시 사라지는지 확인
4. 모두 정상 입력 → Formspree 실제 전송 확인

실제 이메일 수신까지 검증 완료했다.

---

# 항목 2. HTML / CSS / JavaScript 기본 설계 설명

## 2-1. HTML, CSS, JavaScript를 왜 각각 파일로 분리했는가?

### 바로 답변

> 역할을 분리하기 위해서입니다. `index.html`은 콘텐츠와 문서 구조, `css/style.css`은 색상과 레이아웃 같은 표현, `js/main.js`은 이벤트 처리와 상태 변경, API 호출 같은 동작을 담당합니다. 이렇게 분리하면 어떤 문제가 생겼을 때 수정할 파일을 찾기 쉽고, 구조·표현·동작이 서로 섞이지 않아 유지보수와 학습이 쉽습니다.

### 프로젝트에서의 역할

| 파일 | 책임 | 예 |
| --- | --- | --- |
| `index.html` | 구조/콘텐츠 | Hero, About, Form |
| `css/style.css` | 표현/레이아웃 | 색상, Grid, 반응형 |
| `js/main.js` | 동작/상태 | 이벤트, API, Form 검증 |

### 연결 위치

`index.html`의 `<head>`:

```html
<link rel="stylesheet" href="css/style.css">
<script src="js/main.js" defer></script>
```

---

## 2-2. 시맨틱 태그를 어떤 기준으로 선택했는가?

### 바로 답변

> 단순히 디자인상의 박스가 아니라 콘텐츠의 역할을 기준으로 태그를 선택했습니다. 페이지 상단은 `header`, 주요 이동 링크는 `nav`, 핵심 내용은 `main`, About/Skills/Projects/Contact처럼 하나의 주제를 가진 영역은 `section`, 독립적으로 읽을 수 있는 콘텐츠는 `article`, 하단 정보는 `footer`를 사용했습니다.

### 실제 위치

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

### 왜 div만 쓰지 않았는가?

> div로도 화면은 만들 수 있지만 역할이 코드에 드러나지 않습니다. 시맨틱 태그는 개발자가 구조를 이해하기 쉽고, 브라우저와 스크린리더 같은 보조 기술에도 의미를 전달할 수 있습니다.

---

## 2-3. CSS 변수(:root)를 쓰면 어떤 이점이 있는가?

### 바로 답변

> 반복되는 색상, radius, shadow, 최대 너비 같은 디자인 값을 한 곳에서 관리할 수 있습니다. 예를 들어 배경색을 여러 selector에 직접 적지 않고 `var(--bg)`를 사용하므로 색상을 바꿀 때 한 곳만 수정하면 됩니다. 다크모드에서도 컴포넌트 CSS를 다시 작성하지 않고 `[data-theme="dark"]`에서 같은 변수의 값만 교체하면 전체 테마가 바뀝니다.

### 코드 위치

**파일:** `css/style.css`

```css
:root {
  --bg: ...;
  --surface: ...;
  --text: ...;
  --accent: ...;
  --radius: 18px;
}

[data-theme="dark"] {
  --bg: ...;
  --surface: ...;
  --text: ...;
}
```

사용 예:

```css
body {
  background: var(--bg);
  color: var(--text);
}
```

### 구체적인 장점

1. 중복 감소
2. 전체 스타일 일관성
3. 한 곳에서 값 변경
4. 다크모드처럼 동일 컴포넌트의 테마 교체가 쉬움

---

## 2-4. onclick 대신 addEventListener를 사용한 이유는?

### 바로 답변

> `onclick`을 HTML 속성으로 쓰면 HTML 구조와 JavaScript 동작이 한 파일에 섞입니다. `addEventListener`를 사용하면 HTML은 구조, JavaScript는 동작으로 역할을 분리할 수 있습니다. 또한 같은 요소에 여러 이벤트를 독립적으로 추가하기 쉽고, callback 함수로 이벤트 객체를 받아 처리하기도 편합니다.

### 비교

```html
<!-- 사용하지 않은 방식 -->
<button onclick="toggleTheme()">Dark</button>
```

우리 방식:

```js
DOM.themeButton.addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  renderTheme();
});
```

### 코드 위치

**파일:** `js/main.js`

검색: `addEventListener`

이 프로젝트에는 HTML inline `onclick`이 없다.

---

# 항목 3. 핵심 동작 원리 설명

## 3-1. "이벤트 → 상태 변경 → 화면 업데이트" 흐름을 코드로 설명할 수 있는가?

평가에서는 **다크모드**를 예로 드는 것이 가장 쉽다.

### 바로 답변

> 다크모드 버튼의 click 이벤트가 발생하면 이벤트 핸들러가 `state.theme` 값을 light/dark로 변경합니다. 그다음 `renderTheme()`을 호출합니다. renderTheme은 HTML의 `data-theme`을 바꾸고 버튼 텍스트와 aria 상태를 갱신하고 localStorage에 저장합니다. CSS는 `[data-theme="dark"]`를 보고 변수 값을 바꾸므로 최종적으로 화면 전체의 색상이 변경됩니다.

### 코드 흐름

```text
Dark 버튼 click
        ↓
state.theme 변경
        ↓
renderTheme()
        ↓
document.documentElement.dataset.theme 변경
        ↓
CSS [data-theme="dark"]
        ↓
화면 색상 변경
```

### 코드 위치

- 이벤트: `DOM.themeButton.addEventListener('click', ...)`
- 상태: `state.theme`
- 렌더 함수: `renderTheme()`
- CSS: `[data-theme="dark"]`

### 다른 예시도 말할 수 있어야 함

**햄버거**

```text
click → state.menuOpen → renderMenu() → active class → 메뉴 표시
```

**언어 필터**

```text
필터 click
→ selectedLanguage 변경
→ renderProjectFilters()
→ renderProjects()
→ 카드 목록 변경
```

**폼**

```text
input
→ state.form.errors 변경
→ renderFieldError()
→ 에러 메시지 표시/제거
```

---

## 3-2. async/await과 try/catch로 API 성공/실패를 어떻게 분기했는가?

### 바로 답변

> `fetchProjects()`를 async 함수로 만들고 `await fetch()`로 GitHub 응답을 기다렸습니다. 응답이 와도 HTTP 오류가 자동으로 catch로 가지 않을 수 있기 때문에 `response.ok`를 직접 검사합니다. 403이면 RATE_LIMIT 오류, 그 외 실패 응답이면 REQUEST_FAILED 오류를 throw합니다. 성공하면 `response.json()`을 기다려 배열을 state에 저장합니다. throw되거나 네트워크 오류가 발생하면 catch에서 projects 상태를 error로 변경합니다.

### 단계별 흐름

```text
async fetchProjects()
↓
status = loading
↓
try
  ↓
  await fetch()
  ↓
  response.ok 확인
  ├─ 403 → throw RATE_LIMIT
  ├─ 기타 실패 → throw REQUEST_FAILED
  └─ 성공 → await response.json()
                  ↓
              items 저장
                  ↓
            success / empty
↓
catch
  ↓
status = error
↓
renderProjects()
```

### 코드 위치

**파일:** `js/main.js`

검색:

```text
const fetchProjects = async
await fetch
response.ok
response.status === 403
catch (error)
```

### 핵심 꼬리질문: fetch는 404면 자동 catch인가?

> 아닙니다. HTTP 오류 응답 자체는 정상적으로 Response 객체를 받을 수 있어서 `response.ok`를 직접 확인해야 합니다. 네트워크 자체 실패는 reject되어 catch로 갑니다.

---

## 3-3. map/filter로 GitHub 데이터를 카드 UI로 어떻게 바꾸는가?

### 바로 답변

> 먼저 GitHub API에서 repository 객체 배열을 받아 `state.projects.items`에 저장합니다. 언어 필터가 All이 아니면 `filter()`로 선택한 언어의 repository만 남깁니다. 그 결과 배열에 `map(projectCard)`을 적용해 repository 하나마다 HTML 문자열 하나를 만들고, `join('')`으로 하나의 문자열로 합친 뒤 `.projects-grid.innerHTML`에 넣습니다.

### 단계

```text
GitHub API
↓
repository 객체 배열
↓
state.projects.items
↓
filter()  ← 선택한 언어
↓
repository 배열
↓
map(projectCard)
↓
HTML 문자열 배열
↓
join('')
↓
projectsGrid.innerHTML
↓
화면의 카드
```

### 실제 함수 위치

**파일:** `js/main.js`

- `visibleProjects()` → `filter()`
- `projectCard()` → repository 1개를 HTML로 변환
- `renderProjects()` → `map(projectCard).join('')`
- `renderProjectFilters()` → 언어 버튼 생성에도 `map()` 사용

### map/filter 차이

> filter는 원소를 **골라내고**, map은 각 원소를 **다른 형태로 변환**합니다. 둘 다 원본 배열을 직접 수정하지 않고 새 배열을 만듭니다.

---

## 3-4. Flexbox와 Grid를 어디에 적용했고 왜 선택했는가?

### 바로 답변

> Navigation은 로고와 버튼, 메뉴를 한 줄의 가로 방향으로 정렬하는 1차원 배치라 Flexbox를 사용했습니다. Projects는 카드가 여러 행과 여러 열에 배치되고 API 결과 개수와 화면 폭에 따라 열 수가 바뀌므로 Grid를 사용했습니다. Grid에서 `auto-fit`과 `minmax()`를 사용해 별도 열 개수 계산 없이 반응형 카드 배치를 만들었습니다.

### Flexbox 위치

**파일:** `css/style.css`

```css
.nav-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
```

추가 사용:

- `.hero-actions`
- `.skill-list`
- `.project-filters`
- `.footer-content`

### Grid 위치

```css
.projects-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(250px, 1fr));
}
```

그 외:

- `.about-card`
- `.contact-layout`
- `.section-heading`

### 비교 한 문장

> 한 축 중심 정렬이면 Flexbox, 행과 열을 함께 관리해야 하면 Grid를 선택했습니다.

---

# 항목 4. 설계 선택 이유

## 4-1. STATE 객체를 따로 만든 이유는? 그냥 변수로 하면 안 되는가?

### 바로 답변

> 개별 변수로도 구현은 가능합니다. 하지만 이 프로젝트에서는 화면 상태를 결정하는 값이 테마, 메뉴 열림 여부, API 상태와 데이터, 선택 언어, 폼 오류처럼 여러 개입니다. 이것들을 `state` 객체 한 곳에 모으면 어떤 값이 UI 상태인지 명확하고, 기능별로 관련 상태를 묶을 수 있어 추적하기 쉽습니다. 특히 미션의 핵심인 "이벤트 → 상태 변경 → 렌더링" 흐름을 코드 구조에서 드러내기 위해 별도의 state 객체를 사용했습니다.

### 실제 state

**파일:** `js/main.js`

```js
const state = {
  theme: 'light',
  menuOpen: false,
  projects: {
    status: 'idle',
    items: [],
    selectedLanguage: 'All',
    errorMessage: ''
  },
  form: {
    errors: {},
    submitStatus: 'idle'
  }
};
```

### 그냥 변수로 하면?

가능:

```js
let theme = 'light';
let menuOpen = false;
let projectStatus = 'idle';
let projects = [];
let selectedLanguage = 'All';
let formErrors = {};
```

하지만 상태가 늘어나면 관련 값이 흩어져 보인다.

현재 구조:

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

### 중요

> state 객체를 쓴다고 자동으로 화면이 갱신되는 것은 아닙니다. 이 프로젝트는 React가 아니므로 state를 바꾼 뒤 `renderTheme()`, `renderProjects()` 같은 render 함수를 직접 호출해야 합니다.

이 문장을 말하면 상태 개념을 제대로 이해했다는 것을 보여주기 좋다.

---

## 4-2. 왜 Mobile First로 작성했는가?

### 바로 답변

> 작은 화면에서 사용할 핵심 레이아웃을 기본 규칙으로 먼저 정의하고, 화면이 넓어질 때 `min-width` 미디어 쿼리로 기능과 레이아웃을 확장하는 방식입니다. 모바일의 제한된 공간부터 설계하면 핵심 콘텐츠의 우선순위를 먼저 정할 수 있고, 큰 화면으로 갈수록 규칙을 추가하는 방향이라 CSS 구조를 따라가기 쉽습니다. 미션에서도 모바일 퍼스트와 768px/1024px breakpoint를 요구했습니다.

### 코드 위치

**파일:** `css/style.css`

기본 규칙:

```text
.menu-toggle → 표시
.nav-links → 모바일 드롭다운
about-card → 1열
contact-layout → 1열
```

768px 이상:

```css
@media (min-width: 768px) {
  .menu-toggle { display: none; }
  .nav-links { display: flex; flex-direction: row; }
  .about-card { grid-template-columns: 220px 1fr; }
  .contact-layout { grid-template-columns: 1fr 1.2fr; }
}
```

### Desktop First와 비교

> Desktop First는 큰 화면 스타일을 먼저 만든 뒤 `max-width`로 줄여가는 경우가 많습니다. 이 프로젝트는 Mobile First라 기본 CSS 자체가 모바일이고 `min-width`로 확장합니다.

---

# 항목 5. 보너스 문제 해결 크레딧

미션의 보너스 요구사항 네 가지를 모두 구현했다.

| 보너스 | 구현 위치 | 확인 방법 |
| --- | --- | --- |
| 프로젝트 언어 필터 | `visibleProjects()`, `renderProjectFilters()` | Projects의 언어 버튼 클릭 |
| Hero 타이핑 효과 | `startTyping()` | 첫 화면 문구 한 글자씩 출력 |
| Form 실제 전송 | `submitForm()`, Formspree | 실제 이메일 수신 확인 완료 |
| 시스템 다크모드 감지 | `matchMedia('(prefers-color-scheme: dark)')` | 저장 테마 없이 시스템 모드 반영 |

### 평가에서 말할 답변

> 보너스는 네 가지 모두 구현했습니다. GitHub 저장소 언어별 필터링은 filter로 구현했고, Hero에는 타이핑 효과를 추가했습니다. Contact 폼은 Formspree와 실제 연동해서 이메일 수신까지 검증했습니다. 또한 저장된 사용자 테마가 없을 때 prefers-color-scheme으로 시스템 다크모드를 감지합니다.

---

# 평가 직전 2분 요약

아래만 보고 들어가도 전체 흐름을 말할 수 있어야 한다.

## HTML

> 시맨틱 태그로 구조를 만들고 각 section에 id를 두어 navigation과 연결했습니다. Form은 label-for와 input-id를 연결했고 이미지에는 alt를 넣었습니다.

## CSS

> 모바일 퍼스트로 기본 CSS를 만들고 768/1024px min-width 미디어 쿼리로 확장했습니다. Navigation은 Flexbox, Projects는 Grid를 사용했고 CSS 변수로 라이트/다크 테마를 관리했습니다.

## JavaScript

> 화면에 영향을 주는 값을 state 객체에 모았습니다. 사용자의 click/input/scroll 이벤트가 state를 변경하고 render 함수가 DOM의 textContent, innerHTML, classList 등을 갱신합니다.

## API

> fetch와 async/await로 GitHub API를 호출하고 loading/success/error/empty 상태를 구분했습니다. response.ok를 확인하고 try/catch로 실패를 처리합니다.

## 배열

> filter로 언어 조건에 맞는 repository를 고르고 map으로 각 repository를 카드 HTML로 변환한 뒤 join해서 innerHTML에 넣습니다.

## 폼

> input마다 실시간 검증하고 submit에서 전체 검증을 다시 한 뒤 FormData로 Formspree에 POST합니다. 실제 이메일 수신까지 확인했습니다.

---

# 평가 중 코드 찾는 검색어

평가자가 "코드 어디 있어요?"라고 물으면 아래를 `Cmd/Ctrl + F`로 찾는다.

| 질문 | 검색어 |
| --- | --- |
| 상태 객체 | `const state` |
| 다크모드 | `renderTheme` |
| localStorage | `getStoredTheme` |
| 햄버거 | `renderMenu` |
| 60/300px | `CONFIG` |
| 스크롤 애니메이션 | `IntersectionObserver` |
| API | `fetchProjects` |
| API 상태 UI | `renderProjects` |
| map | `map(projectCard)` |
| filter | `visibleProjects` |
| 폼 검사 | `validateField` |
| Formspree | `submitForm` |
| Flexbox | `.nav-container` |
| Grid | `.projects-grid` |
| Mobile First | `@media (min-width: 768px)` |
