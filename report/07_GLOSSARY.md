# 07. 프론트엔드 용어 사전

| 용어 | 한 줄 설명 | 이 프로젝트 |
| --- | --- | --- |
| Browser | HTML/CSS/JS를 해석해 화면을 만드는 프로그램 | Chrome |
| Client | 서버에 요청하는 쪽 | 브라우저 |
| Server | 요청에 응답하는 쪽 | GitHub Pages/API, Formspree |
| HTTP | 웹 요청/응답 규칙 | fetch |
| URL | 자원의 주소 | Pages/API 주소 |
| API | 프로그램끼리 정해진 방식으로 데이터 교환 | GitHub API |
| REST API | HTTP 자원 중심 API 방식 | GitHub repos endpoint |
| JSON | 구조화된 텍스트 데이터 형식 | GitHub 응답 |
| HTML | 문서 구조/콘텐츠 | index.html |
| Element | HTML 요소 | button, section |
| Attribute | 요소의 추가 정보 | class, id, aria-* |
| Semantic HTML | 역할이 이름에 드러나는 태그 | nav, main, section |
| CSS | 표현/레이아웃 | style.css |
| Selector | CSS/JS에서 요소를 찾는 표현 | .button, #projects |
| class | 여러 요소가 공유 가능한 이름 | .project-card |
| id | 고유 식별자 | #contact |
| Cascade | 여러 CSS 규칙의 적용 결정 | style.css |
| Specificity | CSS 선택자의 우선순위 정도 | .button.primary |
| Box Model | content/padding/border/margin 구조 | 카드 |
| Viewport | 현재 브라우저 표시 영역 | 반응형 기준 |
| Media Query | 조건별 CSS 적용 | min-width |
| Breakpoint | 레이아웃이 바뀌는 기준 폭 | 768/1024px |
| Mobile First | 작은 화면 기본 후 큰 화면 확장 | CSS 구조 |
| Flexbox | 한 축 정렬 레이아웃 | Navigation |
| Grid | 행/열 2차원 레이아웃 | Projects |
| pseudo-class | 특정 상태 선택자 | :hover |
| CSS Variable | 재사용하는 CSS 값 | --bg |
| Transition | 상태 변화 사이를 부드럽게 | hover |
| Animation | keyframes 기반 변화 | reveal |
| JavaScript | 동작/상태 로직 | main.js |
| Variable | 값을 가리키는 이름 | const, let |
| Object | key-value 데이터 묶음 | state |
| Array | 순서 있는 데이터 묶음 | projects |
| Function | 재사용 가능한 작업 묶음 | renderTheme |
| Callback | 나중에 호출되도록 전달한 함수 | event handler |
| DOM | HTML의 브라우저 객체 표현 | document |
| Node | DOM 트리의 항목 | element/text |
| querySelector | selector로 첫 요소 찾기 | DOM 객체 생성 |
| Event | 브라우저에서 발생한 사건 | click |
| Event Handler | 이벤트 발생 시 실행 함수 | addEventListener callback |
| preventDefault | 기본 이벤트 행동 차단 | form/anchor |
| state | 현재 UI를 결정하는 데이터 | theme/projects/form |
| render | state를 화면에 반영 | renderProjects |
| innerHTML | 요소 내부 HTML 변경 | project cards |
| textContent | 텍스트 변경 | status/error |
| classList | class 조작 API | active/scrolled |
| map | 각 배열 원소 변환 | repo→card |
| filter | 조건으로 배열 선별 | language |
| forEach | 배열 각 원소 작업 | listener 등록 |
| Destructuring | 객체/배열 값 간단 추출 | {name, language} |
| Template Literal | 백틱 문자열 | projectCard |
| Set | 중복 없는 값 집합 | 언어 목록 |
| Synchronous | 앞 작업 완료 후 다음 작업 | 일반 코드 |
| Asynchronous | 완료를 기다리는 동안 다른 일 가능 | fetch |
| Promise | 미래 완료/실패를 나타내는 객체 | fetch 반환값 |
| async | Promise 기반 함수 표시 | fetchProjects |
| await | Promise 결과 대기 | await fetch |
| try/catch | 오류 처리 구조 | API/Form |
| finally | 성공/실패 후 공통 실행 | 버튼 복구 |
| fetch | HTTP 요청 브라우저 API | GitHub/Formspree |
| Response | fetch 응답 객체 | response.ok |
| localStorage | 브라우저 영구 문자열 저장 | theme |
| FormData | form 데이터를 전송 형태로 구성 | Formspree |
| IntersectionObserver | viewport 교차 관찰 | reveal |
| Event Delegation | 부모가 자식 이벤트 처리 | Retry/filter |
| ARIA | 접근성 상태/관계 속성 | aria-expanded |
| GitHub Pages | 정적 사이트 호스팅 | 배포 |
| Formspree | form 제출을 이메일로 전달하는 서비스 | Contact |
