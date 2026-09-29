# 02. JavaScript / DOM을 실제 main.js 수준까지 읽기

이 문서는 `js/main.js`를 처음부터 읽을 수 있도록 **문법 → DOM → 이벤트 → 상태 → 비동기** 순서로 설명한다.

# A. 변수, 값, 객체, 배열

## 1. const와 let

```js
const CONFIG = { ... };
let index = 0;
```

- `const`: 변수 이름이 다른 값을 다시 가리키지 않게 함
- `let`: 나중에 다른 값을 다시 대입할 수 있음

주의:

```js
const state = { theme: 'light' };
state.theme = 'dark';
```

는 가능하다.

`const`는 `state = 다른객체`처럼 **변수 자체를 재대입하는 것**을 막는다. 객체 내부 속성 변경까지 막는 것은 아니다.

---

## 2. 기본 데이터 타입

| 타입 | 예 |
| --- | --- |
| string | `'dark'` |
| number | `300` |
| boolean | `true`, `false` |
| array | `['name', 'email']` |
| object | `{ theme: 'light' }` |
| null | 의도적으로 값 없음 |
| undefined | 값이 아직 정해지지 않음 |

---

## 3. 객체와 property

```js
const state = {
  theme: 'light',
  projects: {
    status: 'idle',
    items: []
  }
};
```

객체는 **이름(key)과 값(value)**의 묶음이다.

접근:

```js
state.theme
state.projects.status
state.projects.items
```

점이 이어지는 것은 **객체 안의 객체로 계속 들어가는 것**이다.

```text
state
└─ projects
   └─ status
```

---

## 4. dot notation과 bracket notation

둘 다 객체 속성 접근 방법이다.

```js
state.theme
state['theme']
```

둘은 같은 값을 가리킨다.

그런데 속성 이름이 변수에 들어 있을 때는 bracket notation이 필요하다.

```js
const name = 'email';
state.form.errors[name]
```

이때 실제 접근은:

```js
state.form.errors['email']
```

과 같다.

그래서 form field 이름이 동적으로 바뀌는 코드에서 `errors[name]`을 사용한다.

---

## 5. 배열

```js
const FORM_FIELDS = ['name', 'email', 'message'];
```

배열은 순서가 있는 값 묶음이다.

```js
FORM_FIELDS[0] // 'name'
FORM_FIELDS[1] // 'email'
```

`.length`는 배열이나 문자열 길이를 나타내는 property다.

```js
FORM_FIELDS.length
projects.length
text.length
```

---

# B. 함수

## 6. 함수 정의와 호출

```js
const renderMenu = () => {
  ...
};
```

이것은 함수를 **정의**한 것이다.

```js
renderMenu();
```

이것은 함수를 **지금 실행(호출)**하는 것이다.

매우 중요:

```text
renderMenu    함수 자체
renderMenu()  함수를 지금 실행
```

---

## 7. parameter와 argument

함수 정의:

```js
const validateField = (name, value) => {
  ...
};
```

여기서:
- `name`
- `value`

는 **parameter(매개변수)**다. 함수가 받을 값의 자리다.

함수 호출:

```js
validateField('email', 'abc@example.com');
```

여기서 실제로 넘기는 두 값은 **argument(인자)**다.

```text
정의:    (name, value)
호출:    ('email', 'abc@example.com')
           ↓       ↓
          name    value
```

실제 프로젝트:

```js
validateField(name, event.target.value)
```

에서도 같은 원리다.

---

## 8. return

함수는 값을 밖으로 돌려줄 수 있다.

```js
const double = (number) => {
  return number * 2;
};

const result = double(3); // 6
```

실제 코드:

```js
return storedTheme;
```

는 저장된 theme 값을 함수 결과로 돌려준다.

### early return

```js
if (!button) return;
```

값을 돌려주는 것이 목적이 아니라 **함수를 그 자리에서 종료**한다.

즉 return은:
1. 결과값 반환
2. 함수 실행 종료

두 역할을 가진다.

---

## 9. 기본 매개변수

```js
const renderTheme = (save = true) => {
  ...
};
```

호출할 때 값을 안 주면:

```js
renderTheme();
```

`save`는 자동으로 `true`.

직접 주면:

```js
renderTheme(false);
```

`save`는 false.

---

## 10. 함수와 method

일반 함수:

```js
renderMenu()
```

객체에 붙어 있는 함수:

```js
text.trim()
array.map(...)
localStorage.getItem(...)
```

이런 형태를 보통 **method**라고 부른다.

---

# C. 조건과 Boolean

## 11. ===, !==

```js
state.theme === 'dark'
```

값과 타입을 엄격하게 비교한다.

```js
state.projects.status !== 'success'
```

는 같지 않다는 뜻.

---

## 12. !, &&, ||

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

현재 true면 false, false면 true.

### &&

둘 다 참일 때 참.

```js
name === 'email' && emailIsInvalid
```

앞 조건이 false면 뒤 조건은 검사하지 않아도 결과가 false다.

### ||

둘 중 하나라도 참이면 참.

실제 코드:

```js
description || '설명이 등록되지 않은 저장소입니다.'
```

description이 비어 있으면 뒤 기본 문구를 사용한다.

---

## 13. truthy / falsy

JavaScript는 boolean이 아닌 값도 조건문에서 true/false처럼 판단한다.

대표 falsy:

```text
false
0
''
null
undefined
NaN
```

그 외 대부분은 truthy다.

그래서:

```js
if (!trimmed)
```

은 trimmed가 빈 문자열 `''`이면 true가 된다.

```js
if (type)
```

은 type에 비어 있지 않은 문자열이 있으면 실행된다.

### Boolean()

값을 명시적으로 boolean으로 바꾼다.

```js
Boolean('')
// false

Boolean('오류 메시지')
// true
```

실제 코드:

```js
field.classList.toggle('invalid', Boolean(message));
```

오류 메시지가 있으면 invalid class를 붙인다.

---

## 14. 삼항 연산자

```js
const text = isDark ? 'Light' : 'Dark';
```

해석:

```text
isDark가 true?
├─ yes → 'Light'
└─ no  → 'Dark'
```

짧은 if/else 표현이다.

---

# D. callback과 배열 메서드

## 15. callback

함수를 다른 함수에 **나중에 실행할 값으로 전달**할 수 있다.

```js
button.addEventListener('click', () => {
  renderMenu();
});
```

`() => {...}`가 callback이다.

지금 실행되는 것이 아니라 click이 발생하면 브라우저가 실행한다.

### 함수 자체 vs 함수 호출 다시 보기

```js
FORM_FIELDS.forEach(renderFieldError);
```

여기서 `renderFieldError`는 함수 자체를 넘긴다.

```js
FORM_FIELDS.forEach(renderFieldError());
```

처럼 쓰면 등록 전에 함수가 바로 실행되어 의도와 달라진다.

---

## 16. forEach

각 원소에 같은 작업을 수행한다.

```js
FORM_FIELDS.forEach((name) => {
  console.log(name);
});
```

반환 배열을 만드는 것이 목적은 아니다.

이 프로젝트에서는:
- 여러 anchor에 listener 등록
- form field마다 input listener 등록
- reveal 요소 observe
- form error 갱신

에 사용한다.

---

## 17. map

각 원소를 다른 값으로 변환해 **새 배열**을 만든다.

```js
const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2);
// [2, 4, 6]
```

실제 프로젝트:

```js
projects.map(projectCard)
```

```text
repository 객체
→ projectCard()
→ HTML 문자열
```

---

## 18. filter

조건이 true인 원소만 남긴 **새 배열**을 만든다.

```js
[1, 2, 3].filter((n) => n >= 2)
// [2, 3]
```

실제:

```js
items.filter(({ language }) =>
  language === selectedLanguage
)
```

선택한 언어와 같은 repository만 남긴다.

---

## 19. some

배열 안에 조건을 만족하는 값이 **하나라도 있으면 true**.

```js
[false, true, false].some(Boolean)
// true
```

실제 코드:

```js
Object.values(state.form.errors).some(Boolean)
```

뜻은:

```text
errors 객체의 값들만 배열로 꺼냄
→ ['', '이메일 오류', '']
→ Boolean으로 검사
→ [false, true, false]
→ 하나라도 true?
→ true
```

즉 오류가 하나라도 있는지 검사한다.

---

## 20. Object.values

객체의 value만 배열로 만든다.

```js
Object.values({
  name: '',
  email: '오류'
})
// ['', '오류']
```

---

## 21. join

문자열 배열을 하나의 문자열로 합친다.

```js
['A', 'B', 'C'].join('')
// 'ABC'
```

Project cards:

```js
projects.map(projectCard).join('')
```

카드 HTML 문자열 여러 개를 하나로 만들어 `innerHTML`에 넣는다.

---

## 22. sort

배열을 정렬한다.

언어 필터 목록을 알파벳순으로 정렬할 때 사용한다.

---

# E. 구조분해, spread, Set, chaining

## 23. 구조분해 할당

객체에서 필요한 속성을 바로 꺼낸다.

```js
const project = {
  name: 'B1-1',
  language: 'JavaScript'
};

const { name, language } = project;
```

함수 parameter에서도 가능:

```js
const projectCard = ({ name, language }) => {
  ...
};
```

즉 함수가 project 객체 전체를 받고 그 안에서 필요한 값만 바로 꺼낸다.

---

## 24. spread (...)

```js
const values = [1, 2, 3];
const copy = [...values];
```

`...`는 배열/iterable의 값을 펼친다.

실제:

```js
[...new Set(...)]
```

은 Set의 값을 다시 일반 배열로 펼치는 것이다.

---

## 25. new Set

Set은 중복 값을 허용하지 않는 컬렉션이다.

```js
new Set(['Python', 'Python', 'HTML'])
```

결과에는 Python이 한 번만 남는다.

실제 언어 목록 코드를 풀어쓰면:

```js
const languagesWithDuplicates =
  state.projects.items.map(
    ({ language }) => language
  );

const validLanguages =
  languagesWithDuplicates.filter(Boolean);

const uniqueLanguageSet =
  new Set(validLanguages);

const uniqueLanguages =
  [...uniqueLanguageSet];

const languages =
  uniqueLanguages.sort();
```

원래 코드는 위 단계를 한 줄로 연결한 것이다.

```js
const languages = [
  ...new Set(
    state.projects.items
      .map(({ language }) => language)
      .filter(Boolean)
  )
].sort();
```

이렇게 함수 결과에 바로 다음 method를 연결하는 것을 **method chaining**이라고 한다.

---

## 26. filter(Boolean)

```js
array.filter(Boolean)
```

은 각 값을 Boolean 함수에 넣어 true인 값만 남기는 짧은 표현이다.

예:

```js
['Python', null, '', 'HTML']
  .filter(Boolean)
// ['Python', 'HTML']
```

언어 값이 없는 repository를 제거하는 데 사용한다.

---

# F. 문자열 method

## 27. trim

```js
'  hello  '.trim()
// 'hello'
```

앞뒤 공백 제거.

폼에 공백만 입력한 경우를 빈 값으로 처리한다.

## 28. slice

```js
'hello'.slice(0, 2)
// 'he'
```

타이핑 효과에서 앞부분 길이를 한 글자씩 늘릴 때 사용.

## 29. replaceAll

문자열 안의 특정 값을 모두 치환한다.

`escapeHtml()`에서 HTML 특수문자를 안전한 문자열로 바꾸는 데 사용한다.

---

# G. DOM 기본

## 30. window와 document

- `window`: 현재 브라우저 창/탭
- `document`: 현재 HTML 문서

```js
window.scrollY
window.scrollTo(...)
document.querySelector(...)
```

## 31. querySelector

CSS selector로 첫 번째 DOM 요소 하나를 찾는다.

```js
document.querySelector('.theme-toggle')
```

## 32. querySelectorAll

조건에 맞는 모든 요소를 찾는다.

```js
document.querySelectorAll('a[href^="#"]')
```

반환된 여러 요소를 `forEach`로 순회한다.

---

## 33. DOM 객체를 DOM 상수에 모은 이유

```js
const DOM = {
  header: document.querySelector('.site-header'),
  themeButton: document.querySelector('.theme-toggle'),
  ...
};
```

- selector를 반복하지 않아도 됨
- `DOM.themeButton`처럼 의미가 분명함
- state와 실제 화면 요소를 구분하기 쉬움

```text
state = 현재 UI를 결정하는 데이터
DOM   = 현재 페이지 요소에 대한 참조
```

---

## 34. property와 method

DOM 객체에도 property와 method가 있다.

```js
DOM.themeButton.textContent
DOM.submitButton.disabled
DOM.form.elements
```

은 property.

```js
DOM.form.reset()
DOM.themeButton.setAttribute(...)
DOM.navLinks.classList.toggle(...)
```

은 method.

---

## 35. textContent / innerHTML

### textContent
문자열을 **텍스트 그대로** 넣는다.

```js
error.textContent = message;
```

### innerHTML
문자열을 **HTML 코드로 해석**해 DOM 구조를 만든다.

```js
DOM.projectsGrid.innerHTML =
  '<p>로딩 중...</p>';
```

외부 데이터를 innerHTML에 넣을 때는 안전성에 주의해야 한다. 이 프로젝트의 `escapeHtml()`은 [08_HTTP_API_ACCESSIBILITY.md](08_HTTP_API_ACCESSIBILITY.md)에서 설명한다.

---

## 36. classList

DOM의 class를 조작한다.

```js
classList.add('scrolled')
classList.remove('scrolled')
classList.toggle('active', condition)
```

CSS와 JavaScript를 연결하는 핵심 방법이다.

```text
JS가 class 변경
↓
CSS selector가 달라짐
↓
화면 모양 변경
```

---

## 37. attribute와 dataset

HTML attribute 읽기:

```js
link.getAttribute('href')
```

쓰기:

```js
button.setAttribute('aria-expanded', 'true')
```

`data-*` 속성은 `dataset`으로 읽는다.

```html
data-language="Python"
```

```js
button.dataset.language
```

---

# H. 이벤트

## 38. addEventListener

```js
DOM.themeButton.addEventListener(
  'click',
  () => {
    ...
  }
);
```

뜻:

```text
themeButton에서
click 이벤트가 발생하면
이 callback을 실행해라
```

HTML inline `onclick` 대신 JS 파일에서 동작을 관리할 수 있다.

---

## 39. event 객체

브라우저는 callback에 이벤트 정보 객체를 전달한다.

```js
(event) => {
  console.log(event.target);
}
```

`event.target`은 실제 클릭된 요소다.

---

## 40. preventDefault

브라우저 기본 동작을 막는다.

사용 위치:
- anchor의 즉시 이동을 막고 smooth scroll
- form 기본 제출을 막고 JS 검증 후 fetch 전송

---

## 41. bubbling과 이벤트 위임

button을 클릭하면 click 이벤트는 상위 요소 방향으로 전달될 수 있다.

```text
button
↓
부모 div
↓
그 위 부모
```

이것을 **event bubbling**이라고 한다.

그래서 동적으로 나중에 생기는 Retry 버튼에 listener를 직접 달지 않고 부모 Projects 영역에 listener 하나를 둘 수 있다.

```js
DOM.projectsGrid.addEventListener(
  'click',
  (event) => {
    if (
      event.target.closest('.retry-projects')
    ) {
      fetchProjects();
    }
  }
);
```

이 패턴을 **event delegation(이벤트 위임)**이라고 한다.

---

## 42. closest

현재 요소에서 시작해 자기 자신 또는 부모 방향으로 selector가 맞는 요소를 찾는다.

```js
event.target.closest('.retry-projects')
```

클릭 위치가 버튼 안의 글자여도 실제 Retry 버튼을 찾을 수 있다.

---

# I. state와 render

## 43. state란?

```js
const state = {
  theme: 'light',
  menuOpen: false,
  projects: { ... },
  form: { ... }
};
```

**현재 화면을 결정하는 데이터**를 모은 객체다.

예:
- `theme='dark'` → dark 화면
- `menuOpen=true` → 모바일 메뉴 열림
- `projects.status='loading'` → 로딩 메시지
- `selectedLanguage='Python'` → Python 카드만 표시

---

## 44. render 함수

state는 바뀐다고 자동으로 화면이 변하지 않는다.

Vanilla JavaScript에서는 직접 DOM을 바꿔야 한다.

```text
state.theme 변경
↓
renderTheme()
↓
DOM attribute/text 변경
↓
CSS 적용
↓
새 화면
```

React 같은 라이브러리는 이 과정 일부를 자동화하지만 이 프로젝트는 직접 구현한다.

---

# J. 비동기

## 45. Promise

Promise는 **아직 결과가 없지만 나중에 성공 또는 실패가 결정될 작업**을 나타내는 객체다.

```text
pending
├─ fulfilled
└─ rejected
```

`fetch()`는 Promise를 반환한다.

---

## 46. async / await

```js
const fetchProjects = async () => {
  const response = await fetch(url);
};
```

- `async`: 비동기 함수를 선언
- `await`: Promise 결과가 준비될 때까지 **현재 async 함수의 다음 줄 실행을 보류**

중요:

```text
fetch 요청 시작
↓
fetchProjects는 await에서 잠시 멈춤
↓
브라우저는 렌더링/클릭 등 다른 일을 계속 처리
↓
응답 도착
↓
fetchProjects의 다음 줄부터 계속
```

브라우저 전체가 멈추는 것이 아니다.

HTTP와 Response는 08 문서에서 자세히 다룬다.

---

## 47. Error와 throw

```js
throw new Error('RATE_LIMIT');
```

단계:

```text
new Error('RATE_LIMIT')
→ Error 객체 생성

throw
→ 현재 정상 실행 흐름 중단
→ 가장 가까운 catch로 이동
```

```js
catch (error) {
  console.log(error.message);
}
```

`error.message`은 `RATE_LIMIT`.

---

## 48. try / catch / finally

```js
try {
  // 실패할 수 있는 코드
} catch (error) {
  // 실패 처리
} finally {
  // 성공/실패 공통 마무리
}
```

Formspree:
- try: POST
- catch: 실패 메시지
- finally: 버튼 다시 활성화

---

# K. main.js에서 가장 어려운 두 줄 풀어읽기

## 49. 언어 목록 생성

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

단계별 의미:

```text
repository 배열
↓ map
language 값 배열
↓ filter(Boolean)
null/빈 값 제거
↓ new Set
중복 제거
↓ spread [...]
다시 일반 배열
↓ sort
정렬
```

## 50. form 오류 존재 여부

원래:

```js
Object.values(state.form.errors)
  .some(Boolean)
```

단계:

```text
errors 객체
↓ Object.values
오류 메시지 배열
↓ some(Boolean)
하나라도 비어 있지 않은 메시지?
↓
true / false
```

---

# L. 이 문서에서 반드시 이해할 것

1. 객체 property 접근
2. 배열과 method
3. parameter / argument / return
4. callback과 함수 호출 차이
5. truthy/falsy
6. map/filter/forEach
7. spread/Set/chaining
8. window/document/DOM 관계
9. event/bubbling/delegation
10. state → render → DOM
11. Promise/async/await
12. Error/throw/catch
