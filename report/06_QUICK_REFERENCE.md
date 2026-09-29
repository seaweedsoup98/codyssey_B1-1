# 06. 핵심 기능 설명 카드

기능을 빠르게 설명하거나 코드 위치를 찾을 때 사용하는 문서다.

---

## 1. 반응형

### 한 문장
> 기본 CSS를 모바일용으로 작성하고 768px, 1024px min-width 미디어 쿼리에서 큰 화면 레이아웃을 확장했다.

### 코드
- `css/style.css`
- `@media (min-width: 768px)`
- `@media (min-width: 1024px)`

### 확인
767px: 햄버거  
768px+: 가로 메뉴

---

## 2. 다크모드

### 한 문장
> 클릭 이벤트가 state.theme을 변경하고 renderTheme이 html의 data-theme과 localStorage를 갱신하며, CSS는 data-theme에 따라 변수 값을 교체한다.

### 흐름
```text
click
→ state.theme
→ renderTheme()
→ data-theme
→ CSS variables
→ 화면
```

### 코드
- `state.theme`
- `getInitialTheme()`
- `renderTheme()`
- `[data-theme="dark"]`

---

## 3. 햄버거 메뉴

### 한 문장
> 모바일에서 클릭할 때 menuOpen 상태를 반전하고 active class를 토글해 메뉴를 표시/숨긴다.

### 코드
- `state.menuOpen`
- `renderMenu()`
- `.nav-links.active`

---

## 4. 스크롤

### Header
```text
60px → scrolled class
```

### Top
```text
300px → visible class
click → scrollTo(0)
```

### 코드
- `CONFIG`
- `handleScroll()`

---

## 5. 스크롤 등장 효과

### 한 문장
> IntersectionObserver가 요소가 약 20% viewport에 들어오면 visible class를 붙여 CSS animation을 실행한다.

### 코드
- `revealThreshold: 0.2`
- `IntersectionObserver`
- `.reveal.visible`

---

## 6. GitHub API

### 한 문장
> fetch와 async/await로 repository 배열을 받아 state에 저장하고 loading/success/error/empty 상태에 따라 renderProjects가 다른 UI를 그린다.

### 흐름
```text
fetchProjects
→ loading
→ fetch
├─ success → items → success/empty
└─ fail    → error
→ renderProjects
```

### 코드
- `fetchProjects()`
- `renderProjects()`
- `response.ok`
- `RATE_LIMIT`

---

## 7. map / filter

### filter
선택 언어 repository만 남김.

```js
items.filter(({ language }) =>
  language === selectedLanguage
)
```

### map
repository를 카드 HTML로 변환.

```js
projects.map(projectCard).join('')
```

---

## 8. Flexbox / Grid

### Navigation
Flexbox — 한 줄 정렬.

### Projects
Grid — 여러 행/열 카드.

```css
repeat(auto-fit, minmax(250px, 1fr))
```

---

## 9. Form 검증

### 흐름
```text
input
→ validateField
→ state.form.errors
→ renderFieldError
```

submit에서는 전체 필드를 다시 검사.

### 코드
- `FORM_FIELDS`
- `validateField()`
- `renderFieldError()`

---

## 10. Formspree

### 흐름
```text
검증 통과
→ FormData
→ POST fetch
→ 성공/실패 메시지
→ finally 버튼 복구
```

### 코드
- `submitForm()`
- `new FormData(DOM.form)`
- `data-endpoint`

실제 이메일 수신 확인 완료.

---

## 11. state 객체

### 한 문장
> 여러 UI 상태를 기능별로 한 객체에 묶어 현재 화면을 결정하는 데이터를 한 곳에서 추적하기 위해 사용했다.

```text
state
├─ theme
├─ menuOpen
├─ projects
└─ form
```

중요:
state를 바꾸는 것만으로는 화면이 자동 변경되지 않는다.  
Vanilla JS이므로 render 함수를 직접 호출한다.

---

## 12. Mobile First

### 한 문장
> 제한된 모바일 화면의 핵심 레이아웃을 기본으로 하고, 넓은 화면에서 필요한 규칙을 min-width로 추가한다.

### 코드
기본 CSS → 모바일  
768px → 태블릿 이상  
1024px → 데스크톱 이상

---

## 13. HTML/CSS/JS 분리

```text
HTML → 구조
CSS  → 표현
JS   → 동작
```

한 영역 수정이 다른 책임과 섞이지 않아 파일 위치와 역할이 명확하다.

---

## 14. 시맨틱 태그

```text
header → 상단
nav → 탐색
main → 핵심
section → 주제
article → 독립 콘텐츠
footer → 하단
```

---

## 15. addEventListener

### 한 문장
> HTML inline onclick 대신 JavaScript 파일에서 이벤트를 연결해 구조와 동작을 분리했다.

---

# 코드 찾기 표

| 기능 | 검색어 |
| --- | --- |
| 상태 | `const state` |
| DOM | `const DOM` |
| 테마 | `renderTheme` |
| 햄버거 | `renderMenu` |
| 스크롤 | `handleScroll` |
| 타이핑 | `startTyping` |
| API | `fetchProjects` |
| API 화면 | `renderProjects` |
| 카드 | `projectCard` |
| filter | `visibleProjects` |
| form 검사 | `validateField` |
| form 전송 | `submitForm` |
| Flex | `.nav-container` |
| Grid | `.projects-grid` |
| 반응형 | `@media` |
