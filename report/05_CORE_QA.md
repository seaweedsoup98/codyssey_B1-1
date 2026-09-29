# 05. 핵심 개념 설명 연습

이 문서는 **처음 배우는 설명서가 아니라 복습용 질문집**이다.  
먼저 00~04와 08을 읽고, 질문만 보고 자신의 말로 답한 뒤 아래 답을 확인한다.

## 1. HTML, CSS, JavaScript의 역할 차이는?

**답:** HTML은 페이지의 구조와 콘텐츠를 정의하고, CSS는 그 구조의 색상·크기·배치를 정하며, JavaScript는 클릭·입력·스크롤 같은 사건에 반응해 화면과 데이터를 바꾼다.

이 프로젝트에서는:
- HTML → section, form, button
- CSS → 반응형, Grid, dark theme
- JS → 메뉴, API, validation

---

## 2. HTML 파일과 DOM의 차이는?

**답:** HTML 파일은 저장소에 저장된 원본 텍스트이고, DOM은 브라우저가 그 HTML을 읽어 메모리에 만든 객체 구조다. JavaScript는 원본 파일이 아니라 현재 브라우저의 DOM을 바꾼다.

---

## 3. class와 id 차이는?

**답:** class는 여러 요소가 공유할 수 있고, id는 페이지에서 특정 요소를 고유하게 식별하는 데 사용한다. CSS/JS selector에서는 class에 `.`, id에 `#`을 붙인다.

---

## 4. 시맨틱 태그를 왜 쓰는가?

**답:** `header`, `nav`, `main`, `section`, `footer`처럼 이름 자체가 역할을 나타내므로 코드 구조가 명확하고 보조 기술에도 문서 의미를 전달하기 좋다.

---

## 5. defer는 왜 쓰는가?

**답:** JavaScript 파일을 HTML 파싱과 병행해 다운로드하되, DOM 구성이 끝난 뒤 실행하도록 한다. 그래서 JS가 아직 존재하지 않는 HTML 요소를 너무 일찍 찾는 문제를 줄인다.

---

## 6. data-*와 dataset의 관계는?

**답:** HTML의 사용자 정의 데이터 속성을 JavaScript에서 읽는 방법이다.

```text
data-language="Python"
↔
element.dataset.language
```

---

## 7. CSS selector란?

**답:** 어떤 HTML 요소에 CSS 규칙을 적용할지 지정하는 표현이다. `.button`은 class=button, `#projects`는 id=projects를 선택한다. `querySelector()`도 같은 selector 문법을 사용한다.

---

## 8. Flexbox와 Grid 차이는?

**답:** Flexbox는 한 축 중심 배치에 적합하고 Grid는 행과 열을 함께 다루는 2차원 배치에 적합하다. Navigation은 Flexbox, Projects는 Grid를 사용했다.

---

## 9. auto-fit / minmax는 왜 사용했나?

**답:** 카드 하나의 최소 폭을 유지하면서 현재 컨테이너 폭에 들어갈 수 있는 열 수를 브라우저가 자동 계산하게 하기 위해서다.

```css
repeat(auto-fit, minmax(250px, 1fr))
```

---

## 10. Mobile First란?

**답:** 작은 화면 스타일을 기본으로 작성하고 `min-width` media query로 큰 화면에서 필요한 규칙을 추가하는 방식이다. 이 프로젝트는 기본이 모바일이고 768px, 1024px에서 확장한다.

---

## 11. CSS 변수의 장점은?

**답:** 반복되는 디자인 값을 한 곳에서 관리할 수 있고, 다크모드처럼 같은 컴포넌트에서 변수 값만 교체해 전체 테마를 바꾸기 쉽다.

---

## 12. DOM이 무엇인가?

**답:** 브라우저가 HTML 문서를 JavaScript에서 조작할 수 있도록 객체 트리로 표현한 것이다.

---

## 13. window와 document 차이는?

**답:** `window`는 현재 브라우저 창/탭의 가장 바깥 객체이고, `document`는 그 안의 현재 HTML 문서를 나타내는 객체다.

---

## 14. querySelector와 querySelectorAll 차이는?

**답:** querySelector는 selector와 일치하는 첫 요소 하나를, querySelectorAll은 일치하는 여러 요소를 반환한다.

---

## 15. property와 method 차이는?

**답:** property는 객체가 가진 값이고, method는 객체에 붙어 있는 함수다.

예:
- `element.textContent` → property
- `element.setAttribute()` → method

---

## 16. parameter와 argument 차이는?

**답:** parameter는 함수 정의에서 받을 값의 자리이고, argument는 실제 호출 시 넘기는 값이다.

```js
const f = (name) => ...
f('email')
```

- name → parameter
- 'email' → argument

---

## 17. return은 무엇인가?

**답:** 함수 실행을 끝내고 값을 호출한 곳으로 돌려줄 수 있다. 값 없이 `return;`하면 그 자리에서 함수만 종료한다.

---

## 18. callback이 무엇인가?

**답:** 다른 함수에 전달해서 나중에 실행하도록 맡기는 함수다. click listener에 전달한 함수가 대표 callback이다.

```text
renderMenu   함수 자체
renderMenu() 지금 실행
```

차이를 기억한다.

---

## 19. addEventListener를 왜 쓰는가?

**답:** 특정 요소에서 특정 이벤트가 발생했을 때 실행할 callback을 연결하기 위해 사용한다. HTML에 inline onclick을 넣지 않아 구조와 동작을 분리할 수 있다.

---

## 20. preventDefault는 무엇인가?

**답:** 브라우저가 원래 하려던 기본 행동을 막는다. 내부 링크의 즉시 이동을 막고 smooth scroll을 사용하거나, form 기본 제출을 막고 JS 검증 후 fetch로 보내는 데 사용한다.

---

## 21. truthy/falsy가 무엇인가?

**답:** JavaScript가 boolean이 아닌 값도 조건식에서 true/false처럼 판단하는 규칙이다. 빈 문자열은 falsy, 비어 있지 않은 문자열은 truthy다.

---

## 22. map / filter / forEach 차이는?

**답:**
- map → 각 값을 변환해 새 배열
- filter → 조건을 통과한 값만 새 배열
- forEach → 각 값에 작업 실행

Projects에서 repository를 카드로 만드는 것은 map, 언어 조건 선별은 filter다.

---

## 23. 구조분해 할당은 왜 쓰는가?

**답:** 객체의 필요한 속성을 짧게 꺼내 쓰기 위해서다.

```js
const { items, selectedLanguage } =
  state.projects;
```

---

## 24. spread와 Set은 왜 쓰는가?

**답:** Set으로 중복 language를 제거하고, spread `...`로 Set의 값을 다시 일반 배열에 펼친다.

---

## 25. filter(Boolean)은 무엇인가?

**답:** 각 값을 Boolean으로 바꿨을 때 true인 값만 남긴다. null이나 빈 문자열처럼 값이 없는 language를 제거하는 짧은 표현이다.

---

## 26. state는 왜 만들었나?

**답:** 현재 UI를 결정하는 여러 값을 한 곳에서 기능별로 관리하기 위해서다. 개별 변수로도 가능하지만 theme/menu/projects/form 상태가 흩어지는 것을 줄이고 흐름을 추적하기 쉽다.

---

## 27. state를 바꾸면 화면이 자동으로 바뀌나?

**답:** 아니다. 이 프로젝트는 Vanilla JS이므로 state 변경 뒤 `renderTheme()`, `renderMenu()`, `renderProjects()` 같은 함수를 직접 호출해 DOM을 갱신한다.

---

## 28. 이벤트 → 상태 → 렌더링 예시는?

**답:** Dark 버튼 click → `state.theme` 변경 → `renderTheme()` → html의 data-theme 변경 → CSS 변수 변경 → 새 화면 순서다.

---

## 29. Promise는 무엇인가?

**답:** 지금 결과가 없지만 나중에 성공하거나 실패가 결정될 비동기 작업을 나타내는 객체다. fetch는 Promise를 반환한다.

---

## 30. async/await는 왜 쓰나?

**답:** Promise 기반 비동기 코드를 위에서 아래로 읽기 쉽게 작성하기 위해 쓴다. await 동안 현재 async 함수는 보류되지만 브라우저 전체가 멈추지는 않는다.

---

## 31. fetch 결과의 response는 데이터 자체인가?

**답:** 아니다. HTTP 상태와 body 등을 가진 Response 객체다. 실제 JSON 데이터는 `await response.json()`으로 body를 읽은 뒤 얻는다.

---

## 32. 왜 response.ok를 확인하나?

**답:** fetch는 HTTP 404/500 응답을 받아도 무조건 catch로 가는 것이 아니기 때문이다. HTTP 성공 여부를 직접 확인한다.

---

## 33. try/catch/finally는 각각 무엇인가?

**답:**
- try → 실패할 수 있는 코드
- catch → 오류가 발생했을 때
- finally → 성공/실패 관계없이 마지막에 실행

---

## 34. throw new Error는 무엇인가?

**답:** Error 객체를 만들고 정상 실행 흐름을 중단해 catch로 보낸다. GitHub API에서 RATE_LIMIT과 일반 실패를 구분할 때 사용한다.

---

## 35. loading / success / empty / error는 왜 나누나?

**답:** 아직 요청 중인 상태, 정상 데이터가 있는 상태, 정상 요청이지만 결과가 없는 상태, 요청 자체가 실패한 상태는 서로 다르기 때문이다. 사용자가 현재 상황을 알 수 있게 각각 다른 UI를 표시한다.

---

## 36. 이벤트 bubbling과 delegation은 무엇인가?

**답:** 자식에서 발생한 이벤트가 부모 쪽으로 전달되는 현상이 bubbling이다. 이 특성을 이용해 부모에 listener 하나를 두고 동적으로 생기는 자식 버튼을 처리하는 방식이 delegation이다.

---

## 37. localStorage는 왜 쓰나?

**답:** 사용자가 선택한 theme을 새로고침 뒤에도 유지하기 위해 브라우저에 문자열 형태로 저장한다.

---

## 38. IntersectionObserver는 왜 쓰나?

**답:** 요소가 viewport에 들어왔는지를 브라우저가 관찰하도록 해서 reveal animation을 실행하기 위해 사용한다. 직접 scroll마다 좌표를 계산하는 것보다 목적이 분명하다.

---

## 39. innerHTML과 textContent 차이는?

**답:** textContent는 문자열을 텍스트 그대로 넣고, innerHTML은 문자열을 HTML 구조로 해석한다.

---

## 40. escapeHtml은 왜 필요한가?

**답:** GitHub API에서 받은 외부 문자열을 innerHTML에 넣기 전에 HTML 특수문자를 텍스트로 바꿔 의도하지 않은 HTML 해석과 XSS 위험을 줄이기 위해 사용한다.

---

## 41. FormData는 무엇인가?

**답:** form 안의 `name=value` 쌍을 HTTP 요청 body로 보낼 수 있는 형태로 모아 주는 브라우저 API다.

---

## 42. input 때 검증하는데 submit 때 왜 또 검증하나?

**답:** 사용자가 field를 한 번도 건드리지 않고 바로 submit할 수 있기 때문이다. submit 시 모든 필드를 최종 검사한다.

---

## 43. aria-live는 왜 쓰나?

**답:** 페이지 전체 새로고침 없이 JavaScript가 바꾼 로딩/오류/전송 결과 같은 메시지를 보조 기술이 인식하도록 돕는다.

---

## 44. prefers-reduced-motion은 무엇인가?

**답:** 사용자가 시스템에서 움직임 감소를 선호한다고 설정했는지 확인하는 기능이다. 이 프로젝트는 해당 설정에서 타이핑과 animation을 최소화한다.

---

## 45. Projects 카드가 index.html에 없는 이유는?

**답:** index.html에는 빈 container만 두고, GitHub API 결과를 받은 뒤 JavaScript가 repository 객체를 카드 HTML로 변환해 `innerHTML`에 넣기 때문이다.
