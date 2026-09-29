# B1-1 학습 가이드

이 디렉터리는 **HTML/CSS/JavaScript를 처음 접하는 사람이 완성된 코드를 보면서 빠르게 구조를 이해하도록** 만든 자료다.

## 가장 빠른 학습 순서

### 20분 코스
1. [00_START_HERE.md](00_START_HERE.md) — 전체 구조
2. [06_QUICK_REFERENCE.md](06_QUICK_REFERENCE.md) — 핵심 기능 설명 카드
3. [03_IMPLEMENTATION_MAP.md](03_IMPLEMENTATION_MAP.md) — 코드 위치 찾기

### 60분 코스
1. [00_START_HERE.md](00_START_HERE.md)
2. [01_WEB_FOUNDATIONS.md](01_WEB_FOUNDATIONS.md)
3. [02_JAVASCRIPT_DOM.md](02_JAVASCRIPT_DOM.md)
4. [04_CODE_WALKTHROUGH.md](04_CODE_WALKTHROUGH.md)
5. [06_QUICK_REFERENCE.md](06_QUICK_REFERENCE.md)

### 처음부터 제대로 보는 코스
| 순서 | 문서 | 목적 |
| --- | --- | --- |
| 1 | [00_START_HERE.md](00_START_HERE.md) | 웹페이지와 저장소 전체 그림 |
| 2 | [01_WEB_FOUNDATIONS.md](01_WEB_FOUNDATIONS.md) | HTML/CSS/브라우저 기초 |
| 3 | [02_JAVASCRIPT_DOM.md](02_JAVASCRIPT_DOM.md) | JS 문법, DOM, 이벤트, 상태, 비동기 |
| 4 | [03_IMPLEMENTATION_MAP.md](03_IMPLEMENTATION_MAP.md) | 기능이 실제 어느 파일/함수에 있는지 찾기 |
| 5 | [04_CODE_WALKTHROUGH.md](04_CODE_WALKTHROUGH.md) | 페이지 로드부터 기능별 실행 흐름 추적 |
| 6 | [05_CORE_QA.md](05_CORE_QA.md) | 자신의 말로 설명하는 연습 |
| 7 | [06_QUICK_REFERENCE.md](06_QUICK_REFERENCE.md) | 핵심 기능 설명 카드 |
| 8 | [07_GLOSSARY.md](07_GLOSSARY.md) | 용어 빠른 검색 |

## 먼저 기억할 세 문장

1. **HTML = 무엇이 있는지**
2. **CSS = 어떻게 보이는지**
3. **JavaScript = 어떻게 동작하는지**

그리고 이 프로젝트의 핵심 패턴은 이것이다.

```text
사용자 행동 / API 응답
        ↓
JavaScript
        ↓
state 변경
        ↓
render 함수
        ↓
DOM 변경
        ↓
새 화면
```

## 코드가 막힐 때 보는 순서

예를 들어 다크모드가 궁금하다면:

```text
index.html      → 어떤 버튼인가?
style.css       → 어떤 CSS가 바뀌나?
main.js         → 클릭하면 어떤 함수가 실행되나?
03_IMPLEMENTATION_MAP.md → 관련 코드 이름 한 번에 확인
04_CODE_WALKTHROUGH.md   → 실행 순서 확인
```

코드를 전부 외우는 것이 목적이 아니다.
**"화면의 이 기능이 HTML/CSS/JS 어디에서 연결되는가?"를 설명할 수 있으면 된다.**
