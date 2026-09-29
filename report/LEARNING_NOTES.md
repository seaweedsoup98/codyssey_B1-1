# B1-1 학습 가이드

이 디렉터리는 프론트엔드와 JavaScript를 처음 보는 사람이 이 프로젝트를 실제 코드와 함께 따라가며 이해하도록 만든 자료다.

## 목표

1. 화면의 기능이 HTML / CSS / JavaScript 어디에 구현되어 있는지 찾기
2. 코드를 위에서 아래로 읽으며 왜 동작하는지 설명하기
3. 생소한 문법을 만나면 어떤 개념을 찾아야 하는지 알기

## 먼저 기억할 큰 그림

```text
HTML        페이지에 무엇이 있는가
CSS         그것을 어떻게 보이게 할 것인가
JavaScript  사용자의 행동에 어떻게 반응할 것인가
```

이 프로젝트에서는 다음 흐름이 반복된다.

```text
사용자 행동 또는 API 응답
→ JavaScript 함수 실행
→ state 값 변경
→ render 함수 실행
→ DOM의 text / class / attribute / HTML 변경
→ CSS가 적용된 새 화면
```

## 추천 학습 순서

| 순서 | 문서 | 목적 |
| --- | --- | --- |
| 1 | [00_START_HERE.md](00_START_HERE.md) | 브라우저와 프로젝트 전체 구조 |
| 2 | [01_WEB_FOUNDATIONS.md](01_WEB_FOUNDATIONS.md) | HTML/CSS 문법과 실제 style.css 읽는 법 |
| 3 | [02_JAVASCRIPT_DOM.md](02_JAVASCRIPT_DOM.md) | main.js를 읽는 데 필요한 JS 문법과 DOM |
| 4 | [08_HTTP_API_ACCESSIBILITY.md](08_HTTP_API_ACCESSIBILITY.md) | HTTP, GitHub API, Formspree, 접근성, 안전한 HTML 출력 |
| 5 | [03_IMPLEMENTATION_MAP.md](03_IMPLEMENTATION_MAP.md) | 기능별 파일/함수/selector 위치 |
| 6 | [04_CODE_WALKTHROUGH.md](04_CODE_WALKTHROUGH.md) | 실제 실행 순서 |
| 7 | [05_CORE_QA.md](05_CORE_QA.md) | 핵심 개념 설명 연습 |
| 8 | [06_QUICK_REFERENCE.md](06_QUICK_REFERENCE.md) | 빠른 복습 |
| 9 | [07_GLOSSARY.md](07_GLOSSARY.md) | 용어 검색 |

## 문서 역할

- 00~02: 처음 배우는 설명
- 03: 코드 위치 찾기
- 04: 실행 흐름
- 05: 설명 연습
- 06: 짧은 복습
- 07: 용어 사전
- 08: 네트워크/API/접근성

05와 06은 처음 배우는 문서가 아니라 복습용이다. 먼저 00~04를 보는 편이 좋다.

## 코드가 막힐 때

예를 들어 아래 코드가 어렵다고 하자.

```js
state.projects.items.filter(({ language }) => language === selectedLanguage)
```

한 번에 보지 말고 다음처럼 분리한다.

```text
state.projects.items   객체 속성 접근
.filter(...)           배열 메서드 호출
({ language })         구조분해 매개변수
=>                     화살표 함수
===                    엄격 비교
```

이런 문법은 02 문서에서 실제 프로젝트 코드와 함께 설명한다.

## 기능을 이해하는 기본 순서

예: 다크모드

```text
index.html
→ 어떤 버튼인가?

css/style.css
→ 어떤 selector와 변수로 색이 바뀌나?

js/main.js
→ 어떤 이벤트가 어떤 함수를 실행하나?

03_IMPLEMENTATION_MAP.md
→ 전체 연결 확인

04_CODE_WALKTHROUGH.md
→ 실행 순서 확인
```

코드를 외우는 것이 목표가 아니다. 화면의 기능이 HTML/CSS/JS 사이에서 어떻게 연결되는지 설명할 수 있으면 된다.
