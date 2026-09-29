# 05. 핵심 개념 설명 연습

먼저 질문만 보고 자신의 말로 답해본 뒤 아래 답을 확인한다.

## 1. HTML / CSS / JavaScript 차이
**답:** HTML은 구조/콘텐츠, CSS는 표현/레이아웃, JavaScript는 동작/상태/API를 담당한다.

## 2. 시맨틱 태그를 왜 쓰나?
**답:** 태그 이름 자체가 역할을 표현해 문서 구조를 읽기 쉽고 보조 기술에도 의미를 전달한다.

## 3. class와 id 차이
**답:** class는 여러 요소가 공유할 수 있고, id는 페이지 안에서 고유 식별에 사용한다.

## 4. defer
**답:** HTML 파싱을 막지 않고 JS를 다운로드하고, DOM 구성이 끝난 뒤 실행하도록 한다.

## 5. Flexbox vs Grid
**답:** Flexbox는 한 축 중심, Grid는 행/열의 2차원 레이아웃에 적합하다. Navigation은 Flex, Projects는 Grid.

## 6. Mobile First
**답:** 작은 화면을 기본 CSS로 만들고 min-width 미디어 쿼리로 큰 화면을 확장하는 방식.

## 7. CSS 변수 장점
**답:** 반복값 중앙 관리, 일관성, 수정 편의성, 다크모드 같은 테마 교체가 쉬움.

## 8. DOM
**답:** 브라우저가 HTML을 JavaScript에서 다룰 수 있는 객체 트리로 표현한 것.

## 9. querySelector vs querySelectorAll
**답:** 첫 번째 하나의 요소를 찾는 것과 조건에 맞는 여러 요소를 찾는 것의 차이.

## 10. addEventListener
**답:** 이벤트와 callback을 연결한다. HTML inline onclick보다 구조와 동작을 분리하기 좋다.

## 11. preventDefault
**답:** 브라우저 기본 행동을 막는다. 내부 링크와 form에서 사용한다.

## 12. state
**답:** 현재 화면을 결정하는 데이터. theme/menu/projects/form 상태를 한 곳에 모았다.

## 13. render
**답:** state를 읽어 DOM에 반영하는 함수.

## 14. 이벤트 → 상태 → 렌더링
**답:** 예를 들어 theme click → state.theme → renderTheme → data-theme → CSS 변수 → 화면 변경.

## 15. map
**답:** 각 배열 요소를 변환한 새 배열 생성. repository → 카드 HTML.

## 16. filter
**답:** 조건에 맞는 요소만 새 배열로 반환. 선택 언어 repository만 남김.

## 17. forEach
**답:** 각 요소에 작업을 반복. listener 등록 등에 사용.

## 18. 구조분해 할당
**답:** 객체/배열에서 필요한 값을 이름으로 바로 꺼내는 문법.

## 19. 템플릿 리터럴
**답:** 백틱 문자열로 여러 줄 작성과 `${값}` 삽입이 쉽다.

## 20. Promise
**답:** 아직 결과가 없지만 미래에 성공/실패가 정해질 비동기 작업 객체.

## 21. async/await
**답:** Promise 기반 비동기 코드를 순차 코드처럼 읽기 쉽게 작성한다.

## 22. fetch
**답:** HTTP 요청을 보내는 브라우저 API. Promise를 반환한다.

## 23. response.ok
**답:** HTTP status가 성공 범위인지 확인한다. fetch는 404/500이라고 자동 catch가 아닐 수 있어 직접 검사한다.

## 24. loading/success/error/empty
**답:** API 요청의 서로 다른 화면 상태. 사용자에게 현재 상황을 정확히 알려준다.

## 25. try/catch/finally
**답:** 실패 가능한 코드 / 오류 처리 / 성공·실패 공통 마무리.

## 26. localStorage
**답:** 브라우저에 문자열을 저장하며 새로고침 후에도 유지. 테마 저장에 사용.

## 27. prefers-color-scheme
**답:** 사용자의 시스템 색상 선호를 확인하는 media query.

## 28. IntersectionObserver
**답:** 요소가 viewport에 들어오는지 브라우저가 관찰. reveal animation에 사용.

## 29. FormData
**답:** form의 name/value 쌍을 전송 가능한 형태로 모은다.

## 30. 이벤트 위임
**답:** 자식마다 listener를 달지 않고 부모가 이벤트를 받아 target을 확인. 동적으로 생성되는 버튼에 유용.

## 31. Projects 카드가 index.html에 왜 없나?
**답:** index.html에는 빈 container만 있고 API 성공 뒤 JS가 innerHTML로 카드를 만든다.

## 32. 다크모드 색상은 어디 있나?
**답:** JavaScript가 아니라 CSS의 `:root` / `[data-theme="dark"]`. JS는 data-theme 상태만 바꾼다.

## 33. state 객체가 꼭 필요한가?
**답:** 필수는 아니지만 관련 상태를 한 곳에 묶어 흐름을 추적하기 쉽고 이벤트→상태→렌더 구조가 명확해진다.

## 34. 왜 Form 제출도 다시 검증하나?
**답:** input 이벤트를 한 번도 발생시키지 않고 바로 submit할 수 있기 때문에 전체 필드를 최종 검사한다.

## 35. Formspree는 무엇을 대신하나?
**답:** 직접 메일 서버를 만들지 않고 form POST를 받아 지정 이메일로 전달하는 외부 서비스.
