# 08. HTTP / API / Formspree / 접근성 / 안전한 HTML 출력

이 문서는 `fetchProjects()`, `submitForm()`, `escapeHtml()`, ARIA 관련 코드를 이해하기 위한 보충 자료다.

# A. HTTP와 API

## 1. URL을 나눠 읽기

GitHub API 주소:

```text
https://api.github.com/users/seaweedsoup98/repos?sort=updated&per_page=100
```

나누면:

```text
https://
→ protocol

api.github.com
→ host

/users/seaweedsoup98/repos
→ path

?
→ query string 시작

sort=updated
→ sort라는 query parameter

&
→ 다음 parameter 연결

per_page=100
→ 페이지당 최대 100개 요청
```

URL이 길어도 이런 조각의 조합이다.

---

## 2. API란?

API는 프로그램끼리 정해진 방식으로 데이터를 주고받는 접점이라고 생각하면 된다.

이 프로젝트:

```text
우리 JavaScript
↓ HTTP GET
GitHub API
↓ JSON 응답
우리 JavaScript
↓
Projects 카드
```

브라우저 화면을 긁어오는 것이 아니라 GitHub가 프로그램용으로 제공하는 데이터를 요청한다.

---

## 3. HTTP 요청과 응답

HTTP 요청에는 대표적으로 다음 정보가 있다.

```text
method   무엇을 하려는가
URL      어디에 요청하는가
headers  요청에 대한 부가 정보
body     실제로 보내는 데이터
```

응답에는:

```text
status   결과 코드
headers  응답 부가 정보
body     실제 응답 데이터
```

가 있다.

---

## 4. GET과 POST

### GET
데이터를 가져오는 요청.

GitHub Projects:

```js
fetch('https://api.github.com/...')
```

method를 생략하면 기본적으로 GET.

### POST
데이터를 서버에 보내는 요청.

Formspree:

```js
fetch(endpoint, {
  method: 'POST',
  body: new FormData(DOM.form)
});
```

---

## 5. HTTP status

대표 구간:

| 범위 | 의미 |
| --- | --- |
| 2xx | 성공 |
| 3xx | 다른 위치로 이동 등의 처리 |
| 4xx | 요청 쪽 문제 |
| 5xx | 서버 쪽 문제 |

프로젝트에서 직접 구분하는 코드:

```js
if (response.status === 403)
```

403은 GitHub API의 인증 없는 요청 한도 문제 등에서 볼 수 있다.

---

## 6. Response 객체

```js
const response = await fetch(url);
```

여기서 `response`는 repository 배열이 아니다.

HTTP 응답 전체를 표현하는 **Response 객체**다.

대략:

```text
Response
├─ ok
├─ status
├─ headers
└─ body
```

그래서 먼저:

```js
response.ok
response.status
```

를 확인한다.

그 다음 body를 JSON으로 읽는다.

```js
const projects =
  await response.json();
```

전체 흐름:

```text
fetch()
↓
Response 객체
↓ response.ok 검사
response.json()
↓
JavaScript 배열/객체
```

---

## 7. 왜 404/500이 자동으로 catch가 아닐 수 있나?

`fetch()`는 서버에서 HTTP 응답 자체를 정상적으로 받았다면 Promise가 resolve될 수 있다.

즉:

```text
서버와 통신 성공
하지만 status=404
```

도 Response 객체를 받을 수 있다.

그래서:

```js
if (!response.ok) {
  throw new Error(...);
}
```

처럼 HTTP 성공 여부를 직접 검사한다.

반면 네트워크 자체가 끊기는 식의 실패는 fetch Promise가 reject되어 catch로 갈 수 있다.

---

## 8. JSON

GitHub API 응답 body는 JSON 형식이다.

JSON 예:

```json
[
  {
    "name": "codyssey_B1-1",
    "language": "JavaScript",
    "stargazers_count": 0
  }
]
```

`response.json()`은 이 JSON을 JavaScript 배열/객체로 읽어준다.

---

# B. GitHub Projects 요청 흐름

```text
fetchProjects()
↓
state.projects.status = 'loading'
↓
renderProjects()
↓
GET GitHub API
↓
Response
├─ !ok → error
└─ ok
    ↓
    response.json()
    ↓
    repository 배열
    ↓
    state.projects.items
    ↓
    success / empty
    ↓
    renderProjects()
```

### loading과 empty는 다르다

- loading: 아직 요청이 끝나지 않음
- empty: 요청은 정상 성공했지만 결과가 0개

이 둘을 같은 빈 화면으로 처리하면 사용자는 현재 무슨 일이 일어나는지 알 수 없다.

---

# C. Formspree

## 9. 왜 Formspree가 필요한가?

정적 웹페이지의 JavaScript는 브라우저에서 실행된다.

일반적으로 브라우저 코드에 이메일 계정 비밀번호를 넣고 직접 메일 서버에 로그인하는 방식은 사용하면 안 된다.

이 프로젝트는 서버 프로그램을 직접 만들지 않았기 때문에 Formspree를 사용한다.

```text
Contact form
↓
JavaScript
↓ POST
Formspree
↓
설정된 이메일로 전달
```

---

## 10. FormData

HTML:

```html
<input name="email">
<textarea name="message"></textarea>
```

JavaScript:

```js
new FormData(DOM.form)
```

form 안의 `name`을 key로 사용해 현재 입력값을 모은다.

그래서 `name` 속성이 중요하다.

---

## 11. Formspree fetch

```js
const response = await fetch(endpoint, {
  method: 'POST',
  body: new FormData(DOM.form),
  headers: {
    Accept: 'application/json'
  }
});
```

- method: POST
- body: 사용자가 입력한 form 데이터
- Accept header: JSON 형태 응답을 받고 싶다는 정보

이 프로젝트에서는 실제 배포 페이지에서 이메일 수신까지 확인했다.

---

# D. Error 처리

## 12. throw → catch 연결

```js
if (!response.ok) {
  throw new Error('SUBMIT_FAILED');
}
```

`new Error()`는 Error 객체를 만든다.

`throw`는 현재 정상 실행을 중단하고 가까운 `catch`로 이동시킨다.

```js
try {
  ...
} catch {
  renderFormStatus(
    '메시지를 전송하지 못했습니다.',
    'error'
  );
}
```

GitHub API에서는:

```js
throw new Error('RATE_LIMIT')
```

후:

```js
catch (error) {
  error.message
}
```

로 어떤 오류인지 구분한다.

---

# E. innerHTML과 escapeHtml

## 13. textContent와 innerHTML 차이

```js
element.textContent =
  '<strong>Hello</strong>';
```

화면에는 태그 문자열 그대로 보인다.

반면:

```js
element.innerHTML =
  '<strong>Hello</strong>';
```

브라우저가 HTML로 해석해서 굵은 Hello를 만든다.

Projects는 카드 구조 전체를 문자열로 만들기 때문에 `innerHTML`을 사용한다.

---

## 14. 외부 데이터를 innerHTML에 넣을 때의 문제

GitHub repository의 name/description은 외부에서 받은 문자열이다.

만약 외부 문자열에 HTML처럼 해석될 문자가 들어 있고 그대로 `innerHTML`에 넣으면 의도하지 않은 HTML이 생성될 수 있다.

더 심한 경우 공격자가 스크립트를 삽입하는 **XSS(Cross-Site Scripting)** 문제와 연결될 수 있다.

그래서 이 프로젝트에는:

```js
const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
```

가 있다.

예:

```text
원본: <b>Hello</b>

변환:
&lt;b&gt;Hello&lt;/b&gt;
```

브라우저는 이를 HTML 태그가 아니라 텍스트로 표시한다.

즉:

```text
외부 API 문자열
↓
escapeHtml()
↓
안전한 문자열
↓
innerHTML
```

순서로 넣는다.

---

# F. 웹 접근성

## 15. 웹 접근성이란?

웹 접근성은 마우스 사용이 어렵거나, 화면을 보기 어렵거나, 움직이는 화면이 불편한 사용자 등 다양한 환경에서도 웹을 사용할 수 있도록 만드는 것이다.

이 프로젝트에서는 거대한 접근성 시스템을 만든 것은 아니지만 기본적인 배려를 여러 곳에 적용했다.

---

## 16. alt

```html
<img
  src="images/profile.png"
  alt="Jiho의 프로필 사진">
```

이미지를 볼 수 없는 환경에서도 이미지의 의미를 전달한다.

---

## 17. label과 input 연결

```html
<label for="email">이메일</label>
<input id="email">
```

label 클릭 시 input으로 focus가 이동하고, 보조 기술도 어떤 설명이 어느 입력칸인지 알 수 있다.

---

## 18. aria-expanded

햄버거 버튼:

```text
aria-expanded=false
→ 닫힘

aria-expanded=true
→ 열림
```

JavaScript가 메뉴 상태와 함께 이 값도 갱신한다.

---

## 19. aria-pressed

테마 토글 버튼이 현재 눌린 상태인지 표현한다.

시각적인 버튼 글자만 바꾸는 것보다 상태 정보를 추가로 제공한다.

---

## 20. aria-busy

Projects 영역이 데이터를 불러오는 중인지 나타낸다.

```js
DOM.projectsGrid.setAttribute(
  'aria-busy',
  String(status === 'loading')
);
```

---

## 21. aria-live

페이지 전체가 새로 로드되지 않아도 JavaScript가 텍스트를 바꾸는 경우가 많다.

예:
- 프로젝트 로딩/오류
- form 제출 결과

`aria-live`는 이런 **동적으로 바뀐 메시지**를 보조 기술이 인식할 수 있게 돕는다.

---

## 22. aria-invalid와 aria-describedby

form 오류:

```text
input
├─ aria-invalid
└─ aria-describedby
       ↓
   error message
```

`aria-invalid=true`는 현재 입력값이 오류 상태임을 표현한다.

`aria-describedby="email-error"`는 어떤 요소가 이 input에 대한 추가 설명/오류인지 연결한다.

---

## 23. focus-visible

```css
.button:focus-visible
```

키보드로 이동할 때 focus 위치를 시각적으로 확인할 수 있게 하는 상태다.

마우스만 고려하지 않고 키보드 탐색도 고려한다.

---

## 24. prefers-reduced-motion

일부 사용자는 운영체제 설정에서 화면 움직임을 줄이도록 선택한다.

CSS:

```css
@media (
  prefers-reduced-motion: reduce
) {
  ...
}
```

JavaScript:

```js
window.matchMedia(
  '(prefers-reduced-motion: reduce)'
)
```

이 프로젝트는 해당 설정에서:
- 타이핑 효과를 바로 완성된 문장으로 표시
- transition/animation을 최소화

한다.

---

# G. 이 문서의 핵심

다음 연결을 이해하면 된다.

```text
GitHub API
GET → Response → JSON → state → 화면

Formspree
FormData → POST → Response → 성공/실패 화면

외부 문자열
escapeHtml → innerHTML

접근성
HTML 의미 + ARIA 상태 + reduced motion
```
