# 02. JavaScript / DOM / 이벤트 / 비동기 압축 정리

# A. JavaScript 기본 문법

## 1. JavaScript가 담당하는 기능

- 햄버거 메뉴
- 다크/라이트 테마
- 스크롤 UI
- 타이핑 효과
- GitHub API
- 프로젝트 필터
- 폼 검증
- Formspree 전송
- 스크롤 등장 효과

---

## 2. const와 let

```js
const state = { theme: 'light' };
let index = 0;
```

### const
변수 이름이 다른 값을 다시 가리키지 않게 한다.

### let
재대입이 필요한 값.

주의:

```js
const state = { theme: 'light' };
state.theme = 'dark'; // 가능
```

const 객체의 속성 변경은 가능하다.

---

## 3. 데이터 타입

| 타입 | 프로젝트 예 |
| --- | --- |
| string | `'dark'` |
| number | `300` |
| boolean | `true` |
| array | `['name','email','message']` |
| object | `state`, `CONFIG` |
| null | 명시적으로 값 없음 |
| undefined | 값이 아직 없음 |

---

## 4. 객체와 배열

### 객체

```js
const CONFIG = {
  githubUser: 'seaweedsoup98',
  scrollTopThreshold: 300
};
```

이름이 있는 값을 묶는다.

접근:

```js
CONFIG.githubUser
```

### 배열

```js
const FORM_FIELDS = ['name', 'email', 'message'];
```

순서가 있는 값 모음.

접근:

```js
FORM_FIELDS[0]
```

---

## 5. 함수

```js
const renderMenu = () => {
  ...
};
```

실행:

```js
renderMenu();
```

함수의 장점:
- 한 작업을 이름으로 묶음
- 반복 가능
- 복잡한 코드를 작은 책임으로 분리

---

## 6. 화살표 함수와 callback

```js
button.addEventListener('click', () => {
  renderMenu();
});
```

여기서 `() => {...}`는 click이 발생했을 때 나중에 브라우저가 호출하는 callback 함수다.

```text
지금 실행 X
↓
함수를 등록
↓
나중에 click
↓
브라우저가 callback 실행
```

---

## 7. if / else

```js
if (!response.ok) {
  throw new Error('REQUEST_FAILED');
}
```

조건이 true면 블록 실행.

---

## 8. 삼항 연산자

```js
state.theme =
  state.theme === 'dark' ? 'light' : 'dark';
```

```text
조건 ? 참일 때 : 거짓일 때
```

---

## 9. === 와 !

### ===
값과 타입을 엄격 비교.

### !
boolean 반전.

```js
!true  // false
!false // true
```

햄버거:

```js
state.menuOpen = !state.menuOpen;
```

---

# B. DOM

## 10. DOM이란?

HTML:

```html
<button class="theme-toggle">Dark</button>
```

브라우저는 이를 JavaScript에서 다룰 수 있는 객체로 만든다.

```js
document.querySelector('.theme-toggle')
```

JavaScript는 저장소의 HTML 파일을 고치는 것이 아니라 현재 브라우저의 DOM을 바꾼다.

---

## 11. querySelector / querySelectorAll

### 하나

```js
document.querySelector('.site-header')
```

### 여러 개

```js
document.querySelectorAll('a[href^="#"]')
```

---

## 12. DOM 참조를 객체에 모은 이유

```js
const DOM = {
  header: document.querySelector('.site-header'),
  themeButton: document.querySelector('.theme-toggle'),
  ...
};
```

장점:
- 매번 selector를 다시 쓰지 않음
- 코드 의미가 명확
- state와 DOM을 구분

```text
state = 화면을 결정하는 데이터
DOM   = 실제 화면 요소 참조
```

---

## 13. DOM 변경 세 가지

### textContent

```js
DOM.themeButton.textContent = 'Light';
```

텍스트만 변경.

### innerHTML

```js
DOM.projectsGrid.innerHTML =
  projects.map(projectCard).join('');
```

내부 HTML 구조 변경.

### classList

```js
DOM.navLinks.classList.toggle('active', true);
```

CSS class 변경.

---

# C. 이벤트

## 14. 이벤트란?

브라우저에서 일어난 사건.

| 이벤트 | 발생 |
| --- | --- |
| click | 클릭 |
| input | 입력값 변경 |
| submit | 폼 제출 |
| scroll | 스크롤 |
| change | 시스템 테마 변화 등 |

연결:

```js
element.addEventListener('click', callback);
```

---

## 15. event 객체

callback의 첫 매개변수로 이벤트 정보가 온다.

```js
link.addEventListener('click', (event) => {
  event.preventDefault();
});
```

`event.target`은 실제 이벤트가 시작된 요소다.

---

## 16. preventDefault

브라우저 기본 행동을 막는다.

이 프로젝트:
- 내부 링크의 즉시 점프를 막고 smooth scroll
- form 기본 제출을 막고 검증 후 fetch 전송

---

# D. 상태와 렌더링

## 17. state

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

상태는 현재 화면이 어떤 모습이어야 하는지를 결정하는 데이터다.

---

## 18. render

state는 화면에 자동 반영되지 않는다.

```text
state 변경
↓
render 함수 호출
↓
DOM 변경
↓
CSS 적용
↓
새 화면
```

예: 메뉴

```text
menuOpen=false
↓ click
menuOpen=true
↓ renderMenu()
active class
↓
메뉴 보임
```

---

## 19. 이 프로젝트의 대표 상태 흐름

### 테마
```text
click → state.theme → renderTheme → data-theme → CSS 변수
```

### 메뉴
```text
click → state.menuOpen → renderMenu → active class
```

### Projects
```text
fetch → projects.status/items → renderProjects → 카드/메시지
```

### Form
```text
input → form.errors → renderFieldError → 오류 메시지
```

---

# E. 배열과 ES6+

## 20. map

입력 배열의 각 원소를 다른 값으로 변환.

```js
projects.map(projectCard)
```

```text
repository 객체
→ projectCard()
→ HTML 문자열
```

---

## 21. filter

조건을 만족하는 원소만 남김.

```js
items.filter(({ language }) =>
  language === selectedLanguage
)
```

---

## 22. forEach

각 요소에 같은 작업 수행.

```js
FORM_FIELDS.forEach((name) => {
  ...
});
```

map/filter와 달리 결과 배열을 만드는 것이 주목적이 아니다.

---

## 23. 구조분해 할당

```js
const { items, selectedLanguage } = state.projects;
```

는:

```js
const items = state.projects.items;
const selectedLanguage = state.projects.selectedLanguage;
```

를 짧게 쓴 것과 비슷하다.

함수 매개변수에서도 사용:

```js
const projectCard = ({ name, language }) => ...
```

---

## 24. 템플릿 리터럴

백틱:

```js
`<h3>${name}</h3>`
```

- 여러 줄 문자열
- `${...}`로 값 삽입

Project 카드 동적 HTML 생성에 사용.

---

## 25. Set

```js
new Set(...)
```

중복 없는 값 집합.

Project 필터 언어 목록에서 중복 언어 제거에 사용.

```text
['Python','Python','HTML']
→ Set
→ ['Python','HTML']
```

---

# F. 비동기

## 26. 왜 비동기가 필요한가?

GitHub 서버 응답은 시간이 걸린다.

브라우저 전체가 응답까지 멈추면 UI가 얼어버린다.

그래서 네트워크 작업은 비동기 처리한다.

---

## 27. Promise

나중에 결과가 정해질 작업을 표현하는 객체.

```text
Promise
├─ pending
├─ fulfilled
└─ rejected
```

`fetch()`는 Promise를 반환한다.

---

## 28. async / await

```js
const fetchProjects = async () => {
  const response = await fetch(url);
  const data = await response.json();
};
```

- `async`: 함수가 비동기 작업을 다룸
- `await`: Promise 결과가 준비될 때까지 이 함수의 다음 줄을 보류

브라우저 전체를 멈추는 것은 아니다.

---

## 29. fetch

```js
const response = await fetch(url);
```

response에는:
- status
- ok
- headers
- body

등이 있다.

중요:

> HTTP 404/500이어도 fetch 자체가 반드시 reject되는 것은 아니다.

그래서:

```js
if (!response.ok) { ... }
```

를 검사한다.

---

## 30. JSON

GitHub API 응답은 JSON 형태다.

```js
const projects = await response.json();
```

JSON을 JavaScript 객체/배열로 변환한다.

---

## 31. try / catch / finally

```js
try {
  // 실패할 수 있는 코드
} catch (error) {
  // 실패 처리
} finally {
  // 성공/실패 모두 마지막 처리
}
```

Formspree 전송:
- try → 전송
- catch → 실패 메시지
- finally → 버튼 복구

---

# G. 브라우저 API

## 32. localStorage

브라우저에 문자열 저장.

```js
localStorage.setItem('key', 'value');
localStorage.getItem('key');
```

새로고침 이후에도 남는다.

테마 유지에 사용.

---

## 33. matchMedia

```js
window.matchMedia('(prefers-color-scheme: dark)')
```

시스템 다크모드 선호 확인.

---

## 34. IntersectionObserver

viewport에 요소가 들어왔는지 관찰.

```js
new IntersectionObserver(callback, {
  threshold: 0.2
});
```

20% 정도 보이면 callback.

직접 scroll 좌표를 매번 계산하는 코드보다 목적이 명확하다.

---

## 35. 이벤트 위임

Project 필터/Retry 같은 일부 버튼은 나중에 innerHTML로 생긴다.

이때 부모에게 click listener를 걸고 실제 클릭 요소를 찾는다.

```js
event.target.closest('.retry-projects')
```

이를 이벤트 위임이라고 한다.

---

# H. Form

## 36. trim

```js
value.trim()
```

문자열 앞뒤 공백 제거.

공백만 입력한 값을 빈 값처럼 처리.

---

## 37. 정규표현식

이메일 검사:

```js
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

완벽한 이메일 표준 검증이라기보다 기본 형식 확인용.

---

## 38. FormData

```js
new FormData(DOM.form)
```

form의 name/value 쌍을 전송 가능한 형태로 모은다.

Formspree POST body로 사용.

---

# I. 5분 복습

- DOM = 브라우저가 만든 HTML 객체 트리
- event = 사용자/브라우저의 사건
- state = 현재 화면을 결정하는 데이터
- render = state를 DOM에 반영
- map = 변환
- filter = 선별
- forEach = 반복 작업
- fetch = HTTP 요청
- Promise = 나중에 완료될 작업
- async/await = Promise를 읽기 쉽게 처리
- try/catch = 실패 분기
- localStorage = 새로고침 후에도 저장
- IntersectionObserver = viewport 진입 감지
