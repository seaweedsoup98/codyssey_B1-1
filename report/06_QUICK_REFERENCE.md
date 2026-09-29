# 06. 핵심 기능 빠른 복습

이 문서는 처음 배우는 설명서가 아니라 **이미 한 번 공부한 뒤 기능별 핵심만 빠르게 다시 보는 용도**다.

---

## 1. 반응형

### 핵심
> 기본 CSS는 모바일용이고, 768px과 1024px `min-width` media query에서 큰 화면 규칙을 추가한다.

### 코드
- `@media (min-width: 768px)`
- `@media (min-width: 1024px)`

### 눈으로 확인
- 767px: 햄버거
- 768px 이상: 가로 navigation

---

## 2. 다크모드

### 흐름

```text
Dark click
→ state.theme
→ renderTheme()
→ <html data-theme="dark">
→ CSS dark 변수
→ 화면 변경
→ localStorage 저장
```

### 검색
- `getInitialTheme`
- `renderTheme`
- `themeStorageKey`
- `[data-theme="dark"]`

---

## 3. 햄버거 메뉴

```text
click
→ state.menuOpen 반전
→ renderMenu()
→ active class
→ display none/flex
```

검색:
- `state.menuOpen`
- `renderMenu`
- `.nav-links.active`

---

## 4. Header / Scroll Top

```text
scrollY >= 60
→ header scrolled

scrollY >= 300
→ scroll-top visible

Top click
→ window.scrollTo({top:0})
```

검색:
- `CONFIG`
- `handleScroll`

---

## 5. Reveal animation

```text
IntersectionObserver
→ threshold 0.2
→ isIntersecting
→ visible class
→ CSS animation
→ unobserve
```

---

## 6. GitHub API

```text
fetchProjects()
→ loading
→ GET GitHub API
→ Response
→ response.ok
├─ fail → error
└─ success
   → response.json()
   → items
   → success / empty
→ renderProjects()
```

검색:
- `fetchProjects`
- `renderProjects`
- `RATE_LIMIT`

---

## 7. repository → 카드

```text
repository 배열
→ filter: 선택 언어
→ map(projectCard)
→ HTML 문자열 배열
→ join('')
→ innerHTML
```

검색:
- `visibleProjects`
- `projectCard`
- `map(projectCard)`

---

## 8. 언어 필터 목록

```text
repository 배열
→ map(language)
→ filter(Boolean)
→ Set 중복 제거
→ spread로 배열
→ sort
→ All 추가
→ 버튼 HTML
```

---

## 9. Flexbox / Grid

### Navigation
Flexbox: 한 줄 중심 배치.

### Projects
Grid: 여러 행/열 카드.

```css
repeat(auto-fit, minmax(250px, 1fr))
```

---

## 10. Form 검증

```text
input
→ validateField()
→ state.form.errors[name]
→ renderFieldError()
```

submit 때 모든 field를 다시 검사.

검색:
- `FORM_FIELDS`
- `validateField`
- `renderFieldError`

---

## 11. Formspree

```text
검증 통과
→ FormData
→ POST fetch
→ response.ok
├─ success → reset + 성공 메시지
└─ fail → 실패 메시지
→ finally 버튼 복구
```

검색:
- `data-endpoint`
- `submitForm`

---

## 12. state

```text
state
├─ theme
├─ menuOpen
├─ projects
└─ form
```

state는 데이터일 뿐 자동 렌더링 기능이 없다. 변경 후 render 함수를 직접 호출한다.

---

## 13. DOM 변경

| 방법 | 역할 |
| --- | --- |
| `textContent` | 텍스트 변경 |
| `innerHTML` | 내부 HTML 구조 변경 |
| `classList` | class 추가/삭제 |
| `setAttribute` | HTML attribute 변경 |
| `dataset` | data-* 읽기/쓰기 |

---

## 14. JavaScript 문법 핵심

| 문법 | 의미 |
| --- | --- |
| `const` | 재대입하지 않을 변수 |
| `let` | 재대입하는 변수 |
| `() => {}` | 화살표 함수 |
| `return` | 함수 종료/값 반환 |
| `===` | 엄격 비교 |
| `!` | boolean 반전 |
| `&&` | 둘 다 참 |
| `||` | 앞 값이 falsy면 뒤 값 |
| `...` | 값을 펼침 |
| `{ name }` | 구조분해 |

---

## 15. 비동기 핵심

```text
fetch()
→ Promise
→ await
→ Response
→ response.json()
→ 실제 JavaScript 데이터
```

오류:
```text
throw
→ catch
→ finally
```

---

## 16. 접근성 핵심

- `alt`: 이미지 의미
- `label for`: 입력 설명 연결
- `aria-expanded`: 메뉴 열림
- `aria-live`: 동적 메시지
- `aria-invalid`: 입력 오류
- `prefers-reduced-motion`: 움직임 감소

---

# 코드 찾기

| 기능 | 검색어 |
| --- | --- |
| 설정 | `const CONFIG` |
| 상태 | `const state` |
| DOM | `const DOM` |
| 테마 | `renderTheme` |
| 햄버거 | `renderMenu` |
| 스크롤 | `handleScroll` |
| 타이핑 | `startTyping` |
| API | `fetchProjects` |
| API UI | `renderProjects` |
| 카드 | `projectCard` |
| 필터 | `visibleProjects` |
| Form 검사 | `validateField` |
| Form 전송 | `submitForm` |
| Flexbox | `.nav-container` |
| Grid | `.projects-grid` |
| 반응형 | `@media` |
