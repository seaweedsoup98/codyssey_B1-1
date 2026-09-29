# 04. 실제 실행 흐름 따라가기

이 문서는 main.js를 **프로그램이 실제로 실행되는 순서**로 읽는다.

코드를 위에서 아래로 읽는 것과 실제 실행 순서는 다를 수 있다. 함수는 먼저 정의만 되고, 나중에 이벤트나 초기 실행에서 호출되기 때문이다.

# 1. 함수 정의와 실제 실행을 구분하기

```js
const renderMenu = () => {
  ...
};
```

이 코드는 함수를 정의한 것이다. 아직 menu를 바꾸지 않는다.

```js
renderMenu();
```

처럼 호출하거나 click callback에서 호출될 때 실제 코드가 실행된다.

---

# 2. 페이지를 처음 열었을 때

main.js 맨 아래:

```js
state.theme = getInitialTheme();
renderTheme(false);
renderMenu();
handleScroll();
startTyping();
fetchProjects();
DOM.year.textContent =
  new Date().getFullYear();
```

이 부분이 초기 실행의 핵심이다.

## 2-1. getInitialTheme()

```text
getStoredTheme()
↓
localStorage에서 portfolio-theme 읽기
↓
light 또는 dark 저장값인가?
├─ yes → 그 값 return
└─ no  → 시스템 색상 설정 확인
          ├─ dark → dark
          └─ 아니면 → light
```

결과를 `state.theme`에 저장한다.

## 2-2. renderTheme(false)

함수 정의:

```js
const renderTheme = (save = true) => {
  ...
};
```

호출:

```js
renderTheme(false);
```

따라서 이번에는 `save=false`다. 초기 화면을 맞추는 과정에서 시스템 설정을 사용자의 직접 선택처럼 localStorage에 저장하지 않기 위해서다.

함수 안에서는:

```text
state.theme
↓
document.documentElement.dataset.theme
↓
<html data-theme="...">
↓
CSS 변수 변경
```

버튼 글자와 ARIA 상태도 같이 갱신한다.

## 2-3. renderMenu()

초기 `menuOpen=false`를 DOM에 반영한다.

## 2-4. handleScroll()

새로고침 시 현재 scrollY에 맞게 header와 Scroll Top 버튼 상태를 맞춘다.

## 2-5. startTyping()

HTML의 `data-text`를 `dataset.text`로 읽는다.

움직임 감소 설정이 있으면 전체 문장을 즉시 표시한다.

그 외에는:

```text
index=0
↓
300ms 뒤 type()
↓
index=1
↓
slice(0, 1)
↓
첫 글자 표시
↓
45ms 뒤 type() 다시 예약
↓
index=2 ...
```

## 2-6. fetchProjects()

페이지 로드와 동시에 GitHub API 요청을 시작한다.

---

# 3. Dark 버튼을 눌렀을 때

등록된 click callback:

```js
state.theme =
  state.theme === 'dark'
    ? 'light'
    : 'dark';

renderTheme();
```

순서:

```text
click
↓
현재 state.theme 확인
↓
반대 값 저장
↓
renderTheme()
↓
html의 data-theme 변경
↓
버튼 text/ARIA 변경
↓
localStorage 저장
↓
CSS 변수 교체
↓
화면 변경
```

중요: JavaScript가 모든 요소 색을 하나씩 바꾸는 것이 아니다. JavaScript는 theme 표시를 바꾸고, 색상 변경은 CSS가 담당한다.

---

# 4. 햄버거 버튼

```js
state.menuOpen =
  !state.menuOpen;

renderMenu();
```

초기 false라면 `!false`는 true다.

`renderMenu()`:

```js
DOM.navLinks.classList.toggle(
  'active',
  state.menuOpen
);
```

두 번째 argument가 true면 active class를 붙이고 false면 제거한다.

```text
menuOpen=true
↓
nav-links에 active
↓
CSS .nav-links.active
↓
display:flex
↓
메뉴 표시
```

`.menu-toggle.active` CSS는 세 줄을 회전/숨김 처리해 X 모양으로 만든다.

---

# 5. 내부 메뉴 링크

대상:

```js
document.querySelectorAll(
  'a[href^="#"]'
)
```

selector 해석:

```text
a
→ anchor 요소

[href^="#"]
→ href 속성이 #으로 시작
```

각 링크를 클릭하면:

```text
getAttribute('href')
→ #projects 같은 문자열

document.querySelector(...)
→ 목적지 DOM

preventDefault()
→ 기본 순간 이동 취소

scrollIntoView(...)
→ smooth 이동

menuOpen=false
→ 모바일 메뉴 닫기
```

---

# 6. 스크롤 이벤트

등록:

```js
window.addEventListener(
  'scroll',
  handleScroll,
  { passive: true }
);
```

여기서는 `handleScroll` 함수 자체를 callback으로 전달한다. `handleScroll()`처럼 즉시 호출하는 것이 아니다.

`passive: true`는 이 handler가 스크롤 자체를 막지 않는다고 브라우저에 알려 최적화에 도움을 준다.

## 6-1. 60px

```text
scrollY >= 60
↓
header에 scrolled class
↓
.site-header.scrolled CSS
```

## 6-2. 300px

```text
scrollY >= 300
↓
scroll-top에 visible
↓
opacity 1
pointer-events auto
```

Top 버튼 click:

```js
window.scrollTo({
  top: 0,
  behavior: 'smooth'
});
```

---

# 7. Reveal animation

각 `.reveal` 요소를 observer에 등록한다.

```js
observer.observe(element)
```

관찰 결과 callback의 `entries`에는 여러 요소의 결과가 들어온다.

각 `entry`에서:

```js
if (!entry.isIntersecting) return;
```

화면에 들어오지 않았으면 그 entry 처리를 종료한다.

들어오면:

```text
entry.target에 visible class
↓
CSS reveal-in animation
↓
unobserve
↓
한 번 실행 후 감시 종료
```

---

# 8. GitHub Projects 전체 흐름

## 8-1. 요청 전에 loading

```js
state.projects.status = 'loading';
state.projects.errorMessage = '';
renderProjectFilters();
renderProjects();
```

네트워크 요청보다 먼저 "프로젝트 로딩 중..." 화면을 만든다.

## 8-2. fetch

```js
const response =
  await fetch(url);
```

`response`는 repository 배열이 아니라 HTTP Response 객체다.

## 8-3. HTTP 상태 검사

```js
if (!response.ok) {
  if (response.status === 403) {
    throw new Error('RATE_LIMIT');
  }

  throw new Error('REQUEST_FAILED');
}
```

403과 다른 실패를 나눈다. `throw`하면 try의 나머지 코드를 건너뛰고 catch로 이동한다.

## 8-4. JSON 읽기

```js
const projects =
  await response.json();
```

응답 body를 JavaScript 배열로 변환한다.

## 8-5. state 저장

```js
state.projects.items = projects;

state.projects.status =
  projects.length
    ? 'success'
    : 'empty';
```

`projects.length`가 0이면 falsy이므로 empty, 1 이상이면 success.

## 8-6. 최종 render

성공/실패 처리 후:

```js
renderProjectFilters();
renderProjects();
```

현재 state를 다시 화면에 반영한다.

---

# 9. 언어 목록 생성의 어려운 한 줄

원래 코드:

```js
const languages = [
  ...new Set(
    state.projects.items
      .map(({ language }) => language)
      .filter(Boolean)
  )
].sort();
```

풀어쓰면:

```js
const languageValues =
  state.projects.items.map(
    (project) => project.language
  );

const validLanguages =
  languageValues.filter(
    (language) => Boolean(language)
  );

const uniqueSet =
  new Set(validLanguages);

const uniqueLanguages =
  [...uniqueSet];

const languages =
  uniqueLanguages.sort();
```

즉:

```text
repository 배열
→ language만 추출
→ 값 없는 항목 제거
→ 중복 제거
→ 다시 배열
→ 정렬
```

그 다음 `['All', ...languages]`로 All을 앞에 붙인다.

---

# 10. 언어 필터 click

필터 버튼은 API 성공 뒤 동적으로 생긴다.

부모에 listener를 둔다.

```js
const button =
  event.target.closest(
    '[data-language]'
  );

if (!button) return;

state.projects.selectedLanguage =
  button.dataset.language;

renderProjectFilters();
renderProjects();
```

흐름:

```text
부모가 click 받음
↓
closest로 실제 필터 버튼 확인
↓
없으면 return
↓
data-language 읽기
↓
selectedLanguage 변경
↓
버튼/카드 다시 render
```

---

# 11. Project 카드 렌더링

현재 보일 project 배열:

```js
const projects =
  visibleProjects();
```

카드 생성:

```js
projects
  .map(projectCard)
  .join('')
```

```text
repository 객체 배열
↓ map(projectCard)
HTML 문자열 배열
↓ join('')
하나의 HTML 문자열
↓ innerHTML
실제 Project card DOM
```

---

# 12. Retry

error UI의 Retry 버튼도 동적으로 생긴다.

```text
Retry click
↓
이벤트 bubbling
↓
부모 projectsGrid listener
↓
closest('.retry-projects')
↓
fetchProjects()
↓
loading부터 다시 시작
```

---

# 13. Form input

각 field에 input listener를 등록한다.

```js
DOM.form.elements[name]
```

은 form 안에서 해당 `name`을 가진 input/textarea를 찾는다.

입력 흐름:

```text
event.target.value
↓
validateField(name, value)
↓
오류 메시지 문자열
↓
state.form.errors[name]
↓
renderFieldError(name)
```

---

# 14. validateField()

```js
const trimmed = value.trim();
```

앞뒤 공백을 제거한다.

```js
if (!trimmed)
  return '필수 입력 항목입니다.';
```

빈 문자열은 falsy라 오류를 반환한다.

email일 때는 정규표현식으로 기본 형식을 검사한다.

정상이면 빈 문자열 `''`을 반환한다. 이 프로젝트에서 빈 문자열은 "오류 없음"이라는 의미다.

---

# 15. renderFieldError()

name이 `email`이라면:

```js
document.querySelector(
  `#${name}-error`
)
```

는 실제로:

```text
#email-error
```

selector가 된다.

그 후:
- 오류 요소의 textContent
- input의 invalid class
- aria-invalid

를 함께 변경한다.

---

# 16. Form submit

```text
submit
↓
preventDefault
↓
모든 field 재검사
↓
errors 객체 완성
↓
Object.values(errors)
↓
some(Boolean)
↓
오류 하나라도 있음?
├─ yes → 상태 메시지 + return
└─ no  → submitForm()
```

input 이벤트만으로 끝내지 않는 이유는 사용자가 field를 한 번도 건드리지 않고 바로 제출할 수 있기 때문이다.

---

# 17. submitForm()

## endpoint

HTML의 `data-endpoint`를:

```js
DOM.form.dataset.endpoint
```

로 읽는다.

## 전송 전

```text
submitStatus='sending'
button.disabled=true
button text='전송 중...'
```

중복 제출을 막는다.

## POST

```js
fetch(endpoint, {
  method: 'POST',
  body: new FormData(DOM.form),
  headers: {
    Accept: 'application/json'
  }
})
```

## 성공
- form.reset()
- errors 초기화
- 성공 메시지

## 실패
catch에서 실패 메시지.

## finally
성공/실패와 관계없이:
- submitStatus idle
- button 다시 활성화
- 글자 "보내기"

---

# 18. 시스템 dark mode 변화

```text
시스템 theme change
↓
저장된 사용자 theme 있음?
├─ yes → return
└─ no
    ↓
    event.matches
    ↓
    state.theme
    ↓
    renderTheme(false)
```

사용자가 직접 선택해 localStorage에 저장한 값이 있으면 시스템 변화보다 사용자 선택을 우선한다.

---

# 19. 프로젝트 전체 공식

```text
초기 실행
→ state 초기화
→ render
→ API 요청

사용자 이벤트
→ callback
→ state 변경
→ render
→ DOM 변경
→ CSS 적용

API 응답
→ state 변경
→ render
→ DOM 변경
```

이 구조를 기준으로 main.js의 다른 부분도 추적할 수 있다.
