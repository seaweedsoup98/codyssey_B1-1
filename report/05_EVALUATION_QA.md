# 05. 평가 대비 질문과 답변

이 문서는 **평가 직전 빠르게 복습**하는 용도다. 먼저 답을 가리고 자신의 말로 말한 뒤 확인한다.

---

## A. HTML / 구조

### Q1. HTML, CSS, JavaScript의 역할 차이는?

- HTML: 구조와 콘텐츠
- CSS: 표현과 레이아웃
- JavaScript: 동작과 상태 변화

우리 프로젝트에서 HTML은 section/form을 만들고, CSS는 반응형과 테마를 만들고, JS는 메뉴/테마/API/form 동작을 담당한다.

### Q2. 시맨틱 태그를 왜 썼나?

`header/nav/main/section/article/footer`처럼 태그 이름이 역할을 나타내므로 코드 구조가 명확해지고 보조 기술도 문서 영역의 의미를 파악하기 쉽다.

### Q3. class와 id 차이는?

class는 여러 요소가 공유하는 역할/스타일에 사용하고, id는 페이지에서 특정 요소를 고유하게 식별할 때 사용했다. 섹션 anchor와 form label 연결에 id가 필요하다.

### Q4. defer는 왜 썼나?

HTML 파싱을 막지 않고 JavaScript를 받아두었다가 DOM이 구성된 뒤 실행하기 위해 썼다. JS가 DOM 요소를 너무 일찍 찾는 문제를 막을 수 있다.

---

## B. CSS

### Q5. Flexbox와 Grid 차이는?

Flexbox는 한 축 중심 정렬에 적합하고 Grid는 행/열의 2차원 배치에 적합하다. 그래서 navigation은 Flexbox, Projects 카드는 Grid를 사용했다.

### Q6. auto-fit과 minmax는 무엇인가?

`repeat(auto-fit, minmax(250px, 1fr))`에서 minmax는 카드 최소 폭 250px과 확장 폭을 정하고, auto-fit은 현재 너비에 들어갈 수 있는 열 수를 브라우저가 자동 계산하게 한다.

### Q7. Mobile First란?

작은 화면 스타일을 기본으로 작성하고 768px, 1024px 이상의 미디어 쿼리에서 점진적으로 확장하는 방식이다.

### Q8. CSS 변수로 다크모드를 어떻게 구현했나?

기본 색상을 `:root`에 변수로 정의하고 `[data-theme="dark"]`에서는 같은 변수의 값만 바꿨다. JS가 html의 data-theme을 바꾸면 컴포넌트 CSS를 다시 작성하지 않아도 전체 색상이 바뀐다.

---

## C. JavaScript / DOM

### Q9. DOM이 무엇인가?

브라우저가 HTML을 JavaScript에서 조작할 수 있도록 객체 트리로 표현한 것이다. querySelector로 DOM 요소를 선택하고 textContent, innerHTML, classList 등으로 바꾼다.

### Q10. querySelector와 querySelectorAll 차이는?

querySelector는 첫 번째 하나, querySelectorAll은 조건에 맞는 여러 요소를 반환한다.

### Q11. onclick 대신 addEventListener를 쓴 이유는?

HTML 구조와 JavaScript 동작을 분리할 수 있고, 같은 요소에 여러 이벤트 리스너를 관리하기 쉽다. 미션 요구사항에도 addEventListener 사용이 명시되어 있다.

### Q12. event.preventDefault()는 무엇인가?

브라우저의 기본 이벤트 동작을 막는다. Anchor는 기본 점프 대신 smooth scroll을 수행하고, form은 기본 제출 대신 JavaScript 검증 후 fetch로 전송하기 위해 사용했다.

---

## D. 상태와 렌더링

### Q13. state는 왜 만들었나?

화면에 영향을 주는 현재 값을 한 곳에서 관리하기 위해 만들었다. theme, menuOpen, projects 상태/데이터/필터, form 오류 상태가 들어 있다.

### Q14. "이벤트 → 상태 → 렌더링" 예를 하나 설명해라.

다크모드:

```text
버튼 click
→ state.theme 변경
→ renderTheme()
→ html의 data-theme 변경
→ CSS 변수 변경
→ 화면 테마 변경
```

햄버거:

```text
버튼 click
→ state.menuOpen 변경
→ renderMenu()
→ active class 변경
→ CSS가 메뉴 표시/숨김
```

### Q15. React와 무슨 관계가 있나?

지금은 state를 직접 바꾸고 render 함수를 직접 호출하며 DOM도 직접 수정한다. React는 이런 상태 변화와 UI 갱신 과정을 컴포넌트와 렌더링 시스템으로 추상화한다. 이번 미션이 React 이전 기초인 이유다.

---

## E. ES6+ / 배열

### Q16. map, filter, forEach 차이는?

- map: 각 요소를 변환해 새 배열
- filter: 조건을 통과한 요소로 새 배열
- forEach: 각 요소에 작업 수행

Projects에서는 filter로 선택 언어를 추리고 map으로 repository를 카드 HTML로 변환한다.

### Q17. 구조분해 할당은 왜 썼나?

GitHub repository 객체의 많은 속성 중 필요한 name, description, language 등만 이름으로 바로 꺼내기 위해 사용했다.

### Q18. 템플릿 리터럴이 무엇인가?

백틱 문자열로 여러 줄 문자열과 변수 삽입을 쉽게 한다. 동적인 Project 카드 HTML 생성에 사용했다.

### Q19. const와 let 차이는?

재대입이 필요 없으면 const, 값 자체를 다시 대입해야 하면 let을 사용한다. 객체를 const로 선언해도 객체 속성은 바꿀 수 있다.

---

## F. API / 비동기

### Q20. 왜 async/await가 필요한가?

네트워크 요청은 즉시 끝나지 않는다. 비동기로 요청하고 응답이 준비되면 이어서 처리하기 위해 사용한다.

### Q21. fetch가 404/500에서 항상 catch로 가나?

아니다. HTTP 오류 응답을 받아도 fetch Promise 자체는 resolve될 수 있다. 그래서 `response.ok`를 직접 확인한다.

### Q22. 왜 loading/success/error/empty를 구분했나?

네트워크 요청에는 여러 상태가 있으며 사용자가 현재 상황을 알아야 하기 때문이다. 데이터가 아직 없는 loading과 요청 실패 error와 정상 응답인데 결과가 0개인 empty는 서로 다른 상태다.

### Q23. GitHub API 403은 어떻게 처리했나?

`response.status === 403`이면 RATE_LIMIT 오류로 구분하고 요청 한도를 초과했다는 전용 메시지를 보여준다.

### Q24. Retry는 어떻게 동작하나?

error UI의 동적으로 생성된 Retry 버튼을 Projects 부모 container의 click listener가 이벤트 위임으로 감지하고 `fetchProjects()`를 다시 호출한다.

---

## G. 브라우저 기능

### Q25. localStorage는 왜 사용했나?

사용자가 선택한 theme을 새로고침 이후에도 유지하기 위해 사용했다.

### Q26. prefers-color-scheme은?

저장된 사용자 선택이 없을 때 운영체제의 라이트/다크 선호 설정을 초기 테마로 사용한다.

### Q27. IntersectionObserver를 왜 썼나?

스크롤마다 직접 요소 좌표를 계산하는 대신 브라우저에게 viewport 교차 여부를 관찰하게 하고, threshold 0.2에서 reveal animation을 실행하기 위해 사용했다.

---

## H. Form

### Q28. form 검증은 어떻게 하나?

input 이벤트 때 각 필드를 검증하고, submit 때 모든 필드를 다시 검사한다. 빈 값은 거부하고 email은 기본 정규표현식으로 형식을 확인한다.

### Q29. Formspree 전송 과정은?

유효성 검사 통과 → FormData 생성 → Formspree endpoint로 POST fetch → response.ok 확인 → 성공이면 폼 초기화와 성공 메시지, 실패면 에러 메시지를 표시한다.

### Q30. 클라이언트 검증만 하면 완전히 안전한가?

아니다. 브라우저 JavaScript는 사용자가 우회할 수 있으므로 실제 서비스에서는 서버 측 검증도 필요하다. 이번 프로젝트의 Formspree 서비스는 별도 서버 역할을 맡는다.

---

# I. 코드 위치를 묻는 질문

### Q31. 프로젝트 카드가 index.html에 없는데 어떻게 보이나?

index.html에는 빈 `.projects-grid`만 있다. main.js가 GitHub API 데이터를 받아 `projectCard()`와 `map()`으로 HTML 문자열을 생성하고 `innerHTML`에 넣는다.

### Q32. 다크모드 색상은 JS 어디에 정의되어 있나?

색상은 JS가 아니라 `css/style.css`의 `:root`와 `[data-theme="dark"]`에 있다. JS는 data-theme 상태만 바꾼다.

### Q33. 60px과 300px 기준은 어디 있나?

`js/main.js` 맨 위 `CONFIG`의:

- `navScrollThreshold: 60`
- `scrollTopThreshold: 300`

에 있다.

### Q34. 768px과 1024px은 어디 있나?

`css/style.css`의 media query에 있다.

### Q35. Formspree endpoint는 어디 있나?

`index.html`의 `#contact-form`에 `data-endpoint`로 저장되어 있고, `submitForm()`이 DOM dataset으로 읽어 사용한다.

---

# J. 1분 설명 연습

> "이 프로젝트는 순수 HTML, CSS, JavaScript로 만든 반응형 포트폴리오입니다. HTML에서는 시맨틱 태그로 Hero부터 Contact까지 구조를 만들고, CSS에서는 변수와 미디어 쿼리, Flexbox와 Grid로 다크모드와 반응형 레이아웃을 구현했습니다. JavaScript에서는 theme, menu, projects, form 상태를 state 객체에 두고 사용자 이벤트가 상태를 변경하면 render 함수가 DOM을 갱신하도록 만들었습니다. Projects는 GitHub API를 fetch와 async/await로 호출해 loading/success/error/empty 상태를 처리하고, map과 filter로 카드 생성과 언어 필터를 구현했습니다. Contact는 입력 검증 후 Formspree에 POST하며 실제 이메일 수신까지 확인했습니다."

이 설명을 막힘없이 할 수 있다면 전체 프로젝트 구조는 충분히 이해한 것이다.
