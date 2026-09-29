# B1-1 학습 문서 안내

이 디렉터리는 **프론트엔드 경험이 전혀 없는 상태에서 이 프로젝트를 다시 따라가고, 코드를 설명할 수 있도록** 구성한 학습 자료입니다.

## 추천 학습 순서

| 순서 | 문서 | 목적 |
| --- | --- | --- |
| 1 | [00_START_HERE.md](00_START_HERE.md) | 프로젝트 전체 그림, 파일 구조, 공부 순서 |
| 2 | [01_WEB_FOUNDATIONS.md](01_WEB_FOUNDATIONS.md) | 브라우저, HTML, CSS, 반응형 웹의 기초 |
| 3 | [02_JAVASCRIPT_DOM.md](02_JAVASCRIPT_DOM.md) | JavaScript 문법, DOM, 이벤트, 상태, 비동기 |
| 4 | [03_IMPLEMENTATION_MAP.md](03_IMPLEMENTATION_MAP.md) | 미션 요구사항이 실제 코드 어디에 구현되어 있는지 확인 |
| 5 | [04_CODE_WALKTHROUGH.md](04_CODE_WALKTHROUGH.md) | 페이지 시작부터 각 기능이 동작하는 과정을 코드 순서대로 추적 |
| 6 | [05_EVALUATION_QA.md](05_EVALUATION_QA.md) | 개념별 예상 질문과 답변 |\n| 7 | [06_EVALUATION_RUBRIC.md](06_EVALUATION_RUBRIC.md) | **실제 평가표 문항 순서대로 바로 답변하는 평가 전용 문서** |

처음에는 모든 코드를 외우지 말고 아래 세 문장부터 기억한다.

1. **HTML은 구조와 콘텐츠를 만든다.**
2. **CSS는 그 구조를 어떻게 보이게 할지 정한다.**
3. **JavaScript는 이벤트를 받아 상태를 바꾸고 DOM을 갱신한다.**

이 프로젝트의 가장 중요한 흐름은 다음이다.

```text
사용자 행동 또는 API 응답
        ↓
JavaScript 이벤트/비동기 코드
        ↓
state 변경
        ↓
render 함수
        ↓
DOM 변경
        ↓
CSS가 적용된 새 화면
```

README는 프로젝트 소개와 실행 방법을 위한 문서이고, **실제 공부는 이 report 디렉터리에서 시작**하면 된다.


## 평가 당일에는 무엇을 열어둘까?

실제 평가표에 바로 대응하려면 [06_EVALUATION_RUBRIC.md](06_EVALUATION_RUBRIC.md)를 열어두는 것이 가장 좋다.

학습 문서는 개념을 이해하기 위한 자료이고, `06_EVALUATION_RUBRIC.md`는 평가표 문항마다 **답변 → 코드 위치 → 시연 방법 → 꼬리질문** 순으로 바로 확인할 수 있게 작성되어 있다.
