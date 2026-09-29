# 07. 프론트엔드 용어 사전

이 문서는 다른 자료를 읽다가 생소한 단어가 나왔을 때 빠르게 찾는 용도다. 정의 안에서 또 다른 어려운 용어를 최대한 쓰지 않았다.

| 용어 | 쉬운 설명 | 이 프로젝트 예 |
| --- | --- | --- |
| 브라우저 | HTML/CSS/JS를 읽어 웹 화면을 만드는 프로그램 | Chrome |
| 클라이언트 | 서버에 요청을 보내는 프로그램 | 브라우저 |
| 서버 | 요청을 받고 파일/데이터를 돌려주는 컴퓨터/프로그램 | GitHub Pages, GitHub API, Formspree |
| URL | 웹에서 파일/데이터의 위치를 나타내는 주소 | Pages 주소, API 주소 |
| HTTP | 브라우저와 서버가 요청/응답을 주고받는 규칙 | fetch |
| GET | 서버에서 데이터를 가져오려는 HTTP 요청 | GitHub API |
| POST | 서버에 데이터를 보내려는 HTTP 요청 | Formspree |
| Status Code | HTTP 요청 결과를 나타내는 숫자 | 200, 403 |
| Header | HTTP 요청/응답에 붙는 추가 정보 | Accept |
| Body | HTTP로 실제 주고받는 내용 | JSON, FormData |
| API | 프로그램이 다른 프로그램의 기능/데이터를 사용하도록 제공되는 접점 | GitHub repositories API |
| JSON | 객체/배열 형태의 데이터를 글자로 표현한 형식 | GitHub API 응답 |
| HTML | 웹페이지의 구조와 콘텐츠를 적는 언어 | index.html |
| Tag | HTML 문법의 시작/끝 표시 | `<section>` |
| Element | 태그와 그 안의 내용까지 포함한 하나의 HTML 구성요소 | `<p>Text</p>` |
| Attribute | HTML 요소에 추가 정보를 붙이는 문법 | class, id, data-* |
| Semantic HTML | 태그 이름만 봐도 역할을 알 수 있게 HTML을 작성하는 방식 | nav, main, section |
| head | 페이지 설정/메타데이터가 들어가는 HTML 영역 | title, meta, link |
| body | 실제 화면 콘텐츠가 들어가는 HTML 영역 | Hero~Footer |
| CSS | HTML 요소의 색상/크기/배치를 정하는 언어 | style.css |
| Selector | 어떤 HTML 요소를 선택할지 표현하는 CSS 문법 | .button, #projects |
| class | 여러 요소가 같은 이름을 공유할 수 있는 속성 | project-card |
| id | 페이지에서 특정 요소를 고유하게 식별하는 속성 | contact |
| Cascade | 여러 CSS 규칙이 겹칠 때 어떤 값이 적용될지 결정되는 규칙 | style.css |
| Specificity | CSS selector가 얼마나 구체적인지 나타내는 우선순위 개념 | .button.primary |
| Box Model | 요소를 content/padding/border/margin의 상자로 보는 개념 | 카드 |
| Viewport | 현재 브라우저에서 웹페이지가 보이는 영역 | 반응형 기준 |
| Media Query | 화면 조건 등에 따라 CSS를 다르게 적용하는 문법 | min-width |
| Breakpoint | 레이아웃 규칙이 바뀌는 화면 폭 기준 | 768px, 1024px |
| Mobile First | 모바일 스타일을 기본으로 만들고 큰 화면에서 규칙을 추가하는 방식 | media query |
| Flexbox | 요소를 주로 한 방향으로 정렬하기 쉬운 CSS 배치 방식 | Navigation |
| Grid | 행과 열을 함께 구성하기 좋은 CSS 배치 방식 | Projects |
| pseudo-class | 요소의 특정 상태를 선택하는 CSS 문법 | :hover |
| pseudo-element | HTML에 실제 요소를 추가하지 않고 가상의 일부를 스타일하는 문법 | ::after |
| CSS Variable | CSS 값을 이름으로 저장해 재사용하는 기능 | --bg |
| Transition | 한 CSS 상태에서 다른 상태로 바뀌는 과정을 부드럽게 연결 | hover |
| Animation | keyframes에 정의한 순서대로 CSS 변화를 실행 | reveal |
| JavaScript | 웹페이지의 동작과 데이터를 처리하는 프로그래밍 언어 | main.js |
| 변수 | 값을 가리키는 이름 | state, index |
| const | 변수 자체를 다른 값으로 다시 대입하지 않도록 선언 | CONFIG |
| let | 나중에 다른 값을 다시 대입할 수 있는 변수 선언 | index |
| String | 글자 데이터 | 'dark' |
| Number | 숫자 데이터 | 300 |
| Boolean | true/false 값 | menuOpen |
| Object | 이름과 값을 묶어 저장하는 데이터 | state |
| Property | 객체가 가진 이름 있는 값 | state.theme |
| Array | 여러 값을 순서대로 저장하는 데이터 | projects |
| Index | 배열의 위치 번호. 0부터 시작 | FORM_FIELDS[0] |
| Function | 특정 작업을 묶어서 이름 붙인 코드 | renderTheme |
| Parameter | 함수 정의에서 값을 받을 자리 | (name, value) |
| Argument | 함수를 호출할 때 실제로 넘기는 값 | ('email', value) |
| Return | 함수 실행을 끝내고 값을 돌려주는 문법 | return storedTheme |
| Method | 객체에 붙어 있는 함수 | array.map(), text.trim() |
| Callback | 다른 함수에 전달해 나중에 실행하도록 맡긴 함수 | click handler |
| Truthy/Falsy | boolean이 아닌 값을 조건문에서 true/false처럼 판단하는 규칙 | if (!trimmed) |
| DOM | 브라우저가 HTML을 JavaScript에서 조작할 수 있는 객체 구조로 만든 것 | document |
| window | 현재 브라우저 창/탭을 나타내는 전역 객체 | window.scrollY |
| document | 현재 HTML 문서를 나타내는 DOM 객체 | document.querySelector |
| Element | DOM에서 하나의 HTML 요소를 나타내는 객체 | themeButton |
| querySelector | CSS selector로 첫 DOM 요소를 찾는 method | .theme-toggle |
| querySelectorAll | selector와 맞는 여러 DOM 요소를 찾는 method | 내부 anchor |
| textContent | DOM 요소의 텍스트를 읽거나 바꾸는 property | 오류 메시지 |
| innerHTML | 문자열을 HTML로 해석해 요소 내부 구조를 바꾸는 property | Project cards |
| classList | DOM 요소의 class를 추가/삭제/토글하는 API | active |
| dataset | HTML의 data-* 속성을 JS에서 읽는 property | dataset.language |
| Event | 클릭/입력/스크롤처럼 브라우저에서 발생한 사건 | click |
| Event Handler | 이벤트가 발생했을 때 실행되는 함수 | addEventListener callback |
| Event Bubbling | 자식에서 발생한 이벤트가 부모 방향으로 전달되는 현상 | Retry click |
| Event Delegation | 부모 listener 하나로 자식 이벤트를 처리하는 방식 | project filter, Retry |
| preventDefault | 브라우저가 원래 하려던 기본 행동을 취소하는 method | form, anchor |
| state | 현재 화면 모습을 결정하는 데이터 | theme, projects |
| render | state를 DOM에 반영하는 작업 | renderProjects |
| map | 배열 각 원소를 다른 값으로 바꿔 새 배열을 만드는 method | repo → card |
| filter | 조건을 통과한 원소만 새 배열로 만드는 method | language |
| forEach | 배열 각 원소에 같은 작업을 실행하는 method | listener 등록 |
| some | 배열에서 조건을 만족하는 값이 하나라도 있는지 확인 | form errors |
| Object.values | 객체의 값들만 배열로 꺼내는 method | errors |
| Destructuring | 객체/배열에서 필요한 값을 짧게 꺼내는 문법 | { name, language } |
| Template Literal | 백틱을 사용해 여러 줄 문자열과 값 삽입을 쉽게 하는 문법 | projectCard |
| Spread | 배열/집합 안의 값을 바깥으로 펼치는 ... 문법 | [...new Set()] |
| Set | 중복 값을 허용하지 않는 값 모음 | language 중복 제거 |
| Method Chaining | 한 method 결과에 바로 다음 method를 이어 호출하는 작성 방식 | map().filter().sort() |
| Promise | 나중에 성공/실패 결과가 정해질 비동기 작업 객체 | fetch 결과 |
| async | 함수 안에서 await를 사용할 수 있게 하는 선언 | fetchProjects |
| await | Promise 결과가 준비될 때까지 현재 async 함수의 다음 줄을 보류 | await fetch |
| fetch | HTTP 요청을 보내는 브라우저 함수 | GitHub/Formspree |
| Response | fetch가 돌려주는 HTTP 응답 객체 | response.ok |
| response.ok | HTTP 상태가 성공 범위인지 알려주는 boolean | API 오류 검사 |
| try | 실패할 수 있는 코드를 실행하는 영역 | fetch |
| catch | try 안에서 오류가 발생했을 때 실행되는 영역 | error UI |
| finally | 성공/실패 관계없이 마지막에 실행되는 영역 | 버튼 복구 |
| Error | 오류 정보를 담는 JavaScript 객체 | new Error('RATE_LIMIT') |
| throw | 정상 실행을 중단하고 오류를 바깥으로 보내는 문법 | API 분기 |
| localStorage | 브라우저에 문자열 데이터를 저장하고 새로고침 뒤에도 유지하는 저장소 | theme |
| matchMedia | CSS media query 조건이 현재 맞는지 JS에서 확인 | dark/reduced motion |
| IntersectionObserver | 요소가 화면 영역에 들어오는지 브라우저가 관찰하는 기능 | reveal |
| FormData | form의 name/value를 전송 가능한 데이터로 모으는 객체 | Formspree |
| Regular Expression | 문자열 패턴을 검사하는 표현식 | email 형식 |
| XSS | 외부 문자열이 악성 HTML/스크립트로 해석되어 실행될 수 있는 웹 보안 문제 | escapeHtml로 위험 완화 |
| escapeHtml | HTML 특수문자를 텍스트 표현으로 바꾸는 이 프로젝트의 함수 | Project API 데이터 |
| 접근성 | 다양한 신체/환경 조건의 사용자가 웹을 이용할 수 있게 고려하는 것 | alt, ARIA |
| ARIA | 화면에 직접 보이지 않는 상태/관계를 보조 기술에 알려주는 HTML 속성 체계 | aria-expanded |
| aria-live | 동적으로 바뀐 메시지를 보조 기술이 인식하도록 돕는 속성 | status message |
| prefers-reduced-motion | 사용자가 화면 움직임 감소를 선호하는지 나타내는 시스템 설정 | animation 제한 |
| GitHub Pages | 저장소의 정적 파일을 웹사이트로 제공하는 GitHub 기능 | 배포 |
| Formspree | form 데이터를 받아 지정된 이메일로 전달하는 외부 서비스 | Contact |
