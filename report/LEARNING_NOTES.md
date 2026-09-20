# B1-1 학습 및 평가 대비 노트

## 1. 요구사항 ↔ 코드 위치

| 요구사항 | 코드 위치 | 구현 방식 |
| --- | --- | --- |
| 시맨틱 HTML | `index.html` | `header/nav/main/section/article/footer` |
| label 연결 | `index.html` | `for`와 `id` 일치 |
| CSS 변수 / 다크모드 | `css/style.css` | `:root`, `[data-theme="dark"]` |
| Navigation Flexbox | `css/style.css` | `.nav-container { display: flex; }` |
| Projects Grid | `css/style.css` | `auto-fit`, `minmax()` |
| 반응형 | `css/style.css` | mobile-first + 768/1024px |
| DOM 선택 | `js/main.js` | `querySelector`, `querySelectorAll` |
| 이벤트 | `js/main.js` | `addEventListener` |
| class 조작 | `js/main.js` | `add/remove/toggle` |
| click/scroll/input/submit | `js/main.js` | 각 이벤트 핸들러 |
| 다크모드 유지 | `js/main.js` | `localStorage` |
| 스크롤 애니메이션 | `js/main.js` | `IntersectionObserver` |
| GitHub API | `js/main.js` | `fetch`, `async/await`, `try/catch` |
| 상태별 Projects UI | `js/main.js` | loading/success/error/empty |
| ES6+ | `js/main.js` | 화살표 함수, 구조분해, 템플릿 리터럴 |
| 배열 메서드 | `js/main.js` | `map`, `filter`, `forEach` |
| 폼 검증 | `js/main.js` | 빈 값 + 이메일 형식 |
| 프로젝트 필터 보너스 | `js/main.js` | `filter()` |
| 타이핑 보너스 | `js/main.js` | `setTimeout()` 반복 |
| 시스템 다크모드 보너스 | `js/main.js` | `prefers-color-scheme` |
| 실제 폼 전송 보너스 | `js/main.js` | Formspree `fetch()`; endpoint 설정 필요 |

## 2. 시맨틱 태그를 왜 사용하는가?

시맨틱 태그는 요소의 **역할과 의미를 HTML 자체에 표현**한다.

- `nav`: 주요 탐색 링크
- `main`: 페이지의 핵심 콘텐츠
- `section`: 하나의 주제를 가진 영역
- `article`: 독립적으로 이해 가능한 콘텐츠
- `footer`: 페이지 하단 정보

`div`만 사용해도 화면은 만들 수 있지만 문서 구조가 코드에 드러나지 않는다. 시맨틱 태그는 개발자가 구조를 파악하기 쉽고 브라우저와 보조 기술도 영역의 의미를 이해할 수 있다.

## 3. Flexbox와 Grid

### Flexbox

기본적으로 **한 축**의 배치에 적합하다. Navigation처럼 요소를 왼쪽에서 오른쪽으로 정렬하고 간격을 조절할 때 단순하다.

### Grid

**행과 열을 동시에 다루는 2차원 레이아웃**에 적합하다. 프로젝트 카드는 개수가 API 응답에 따라 달라지므로 다음 선언으로 카드 수와 화면 폭에 맞춰 열을 자동 생성한다.

```css
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

- `minmax(250px, 1fr)`: 카드가 최소 250px을 유지하면서 남은 공간을 나눠 가짐
- `auto-fit`: 컨테이너에 들어갈 수 있는 만큼 열을 자동 배치

## 4. DOM과 이벤트 흐름

DOM(Document Object Model)은 브라우저가 HTML 문서를 JavaScript에서 다룰 수 있는 객체 구조로 표현한 것이다.

```text
사용자가 버튼 클릭
→ addEventListener의 handler 실행
→ state 값 변경
→ render 함수 호출
→ textContent / innerHTML / classList로 DOM 변경
→ 브라우저가 변경된 화면 표시
```

예를 들어 다크모드는 다음 순서다.

```text
theme button click
→ state.theme 변경
→ renderTheme()
→ html의 data-theme 변경
→ CSS 변수 변경
→ 화면 전체 색상 변경
```

## 5. `onclick` 대신 `addEventListener`

`onclick` 속성을 HTML에 직접 작성하면 구조와 동작이 섞인다. `addEventListener`를 사용하면 HTML은 문서 구조, JavaScript는 동작이라는 책임이 분리된다. 하나의 요소에 여러 이벤트 리스너를 연결하기도 쉽다.

## 6. `map`, `filter`, `forEach`

- `map`: 기존 배열의 각 원소를 다른 값으로 **변환하여 새 배열 생성**
- `filter`: 조건을 만족하는 원소만 골라 **새 배열 생성**
- `forEach`: 각 원소에 작업을 수행하지만 결과 배열 자체가 목적은 아님

이 프로젝트에서는:

```text
GitHub repository[]
→ filter(): 선택 언어만 남김
→ map(): 각 repository를 project card HTML로 변환
→ join(''): HTML 문자열 하나로 합침
→ innerHTML에 렌더링
```

`forEach()`는 여러 링크에 이벤트를 연결하고 폼 필드를 순회할 때 사용한다.

## 7. 구조분해 할당과 템플릿 리터럴

GitHub API 객체에는 많은 속성이 있지만 카드에는 일부만 필요하다.

```js
const projectCard = ({ name, description, language }) => `...`;
```

구조분해 할당으로 필요한 값만 직접 이름으로 꺼낸다. 템플릿 리터럴은 여러 줄 HTML과 변수를 하나의 문자열로 표현할 때 사용한다.

## 8. 동기와 비동기

GitHub API 요청은 네트워크 응답 시간이 필요하다. 브라우저가 응답을 기다리는 동안 전체 JavaScript 실행을 멈추면 UI가 멈추므로 네트워크 처리는 비동기로 진행한다.

```js
const response = await fetch(url);
const projects = await response.json();
```

`await`는 Promise의 완료를 기다리지만 JavaScript 전체 스레드를 네트워크 응답 동안 막는 방식은 아니다. 해당 `async` 함수의 다음 단계가 보류되고 브라우저는 다른 작업을 처리할 수 있다.

## 9. `fetch()`와 HTTP 오류

중요한 점은 `fetch()`가 **HTTP 404나 500이라는 이유만으로 자동 reject되지 않는다는 것**이다. 따라서 다음 확인이 필요하다.

```js
if (!response.ok) {
  throw new Error('REQUEST_FAILED');
}
```

이 프로젝트에서는 403을 별도로 구분해 인증 없는 GitHub API rate limit 가능성을 사용자에게 알린다.

## 10. Projects 상태 관리

API는 항상 즉시 성공하지 않는다. 따라서 화면은 데이터 배열만이 아니라 요청 상태도 표현해야 한다.

```text
idle
 ↓
loading
 ├─ success → 카드 표시
 ├─ empty   → 빈 상태 메시지
 └─ error   → 오류 + 다시 시도
```

이 구조의 장점은 현재 상태가 무엇인지 코드에서 명확하며, 상태마다 UI를 한 함수(`renderProjects`)에서 관리할 수 있다는 것이다.

## 11. LocalStorage와 시스템 다크모드

`localStorage`는 브라우저에 문자열 값을 저장하며 새로고침 뒤에도 남는다.

우선순위는 다음과 같다.

```text
사용자가 저장한 테마가 있음 → 저장값 사용
저장값 없음 → prefers-color-scheme 확인
```

사용자가 직접 테마를 선택했다면 이후 운영체제 테마가 바뀌더라도 사용자의 명시적 선택을 우선한다.

## 12. Intersection Observer

스크롤 이벤트마다 요소 위치를 직접 계산하는 대신 브라우저가 관찰 대상과 viewport의 교차 상태를 알려준다.

현재 threshold는 `0.2`이므로 요소의 약 20%가 viewport에 들어오면 `.visible` 클래스를 추가한다. 한 번 표시된 요소는 `unobserve()`하여 더 이상 관찰하지 않는다.

## 13. 폼 검증

### input

입력할 때 해당 필드만 다시 검사하여 오류를 즉시 갱신한다.

### submit

1. `event.preventDefault()`로 기본 제출 중지
2. 모든 필드 검사
3. 오류가 있으면 제출 중지
4. 오류가 없고 Formspree endpoint가 있으면 `fetch()` 전송
5. 성공/실패 상태 메시지 표시

클라이언트 검증은 사용자 경험을 개선하지만 서버가 있는 실제 서비스에서는 서버 측 검증도 별도로 필요하다.

## 14. 예상 질문

### Q. 상태를 꼭 객체로 모아야 하나?

작은 프로그램에서는 개별 변수도 가능하다. 이번 미션에서는 화면을 결정하는 값들을 한 위치에 두면 **이벤트 → 상태 → 렌더링** 흐름을 추적하기 쉬워서 객체를 사용했다.

### Q. 왜 모든 화면을 매번 다시 그리지 않았나?

Vanilla JavaScript에서는 필요한 부분만 갱신하는 편이 단순하다. 테마, 메뉴, 프로젝트, 폼을 각각의 render 함수로 나누어 해당 상태가 바뀔 때 관련 DOM만 수정했다.

### Q. React와 어떤 관계가 있나?

현재 코드는 상태를 직접 바꾸고 render 함수를 직접 호출하며 DOM도 직접 수정한다. React는 상태 변화에 따른 UI 갱신을 컴포넌트와 렌더링 시스템으로 추상화한다. 따라서 이번 미션의 흐름을 이해하면 React의 state와 event handler가 왜 필요한지 이해하기 쉽다.

### Q. API 오류를 왜 UI로 보여줘야 하나?

네트워크 요청은 실패할 수 있다. 오류 상태를 처리하지 않으면 사용자는 빈 화면만 보고 원인을 알 수 없다. 로딩/성공/실패/빈 상태를 분리하면 비동기 작업의 현재 상태를 사용자에게 명확히 전달할 수 있다.

## 15. 구현의 범위와 한계

- GitHub API는 인증하지 않으므로 요청 한도의 영향을 받는다.
- Formspree endpoint는 개인 계정에서 발급해야 하므로 저장소에는 임의 값을 넣지 않았다.
- 최신 Chrome을 기준으로 구현했다.
- React, Vue, jQuery, Bootstrap, Tailwind 등 외부 라이브러리를 사용하지 않았다.
