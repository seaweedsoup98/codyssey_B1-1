# Codyssey B1-1 | 나를 소개하는 웹페이지 처음부터 만들기

외부 프레임워크 없이 HTML, CSS, JavaScript만으로 구현한 반응형 포트폴리오입니다. DOM 이벤트, 상태 변경, 화면 렌더링의 연결과 GitHub API 비동기 처리를 직접 구현하는 데 초점을 두었습니다.

## 주요 기능

- Hero, About, Skills, Projects, Contact, Footer 시맨틱 구조
- 모바일 퍼스트 반응형 레이아웃 (`768px`, `1024px`)
- 모바일 햄버거 메뉴와 부드러운 섹션 이동
- `60px` 스크롤 이후 헤더 스타일 변경
- `300px` 스크롤 이후 Scroll Top 버튼 표시
- 라이트/다크 테마 전환 및 `localStorage` 유지
- `prefers-color-scheme` 기반 시스템 다크 모드 감지
- Intersection Observer 기반 스크롤 등장 애니메이션 (`threshold: 0.2`)
- Hero 타이핑 효과
- GitHub API 저장소 목록 동적 렌더링
- API loading / success / error / empty 상태와 재시도 버튼
- 저장소 언어별 프로젝트 필터
- 이름/이메일/메시지 폼 유효성 검사
- Formspree 실제 전송 코드

## 프로젝트 구조

```text
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   └── profile.svg
├── report/
│   └── LEARNING_NOTES.md
├── .github/workflows/
│   └── pages.yml
└── README.md
```

## 실행 방법

VS Code의 Live Server를 사용하거나 프로젝트 루트에서 다음 명령을 실행합니다.

```bash
python3 -m http.server 8000
```

이후 브라우저에서 `http://localhost:8000`으로 접속합니다.

## 핵심 구현

### Semantic HTML

`header`, `nav`, `main`, `section`, `article`, `footer`를 각 콘텐츠의 의미에 맞게 사용했습니다. 폼의 모든 입력 요소는 `label`의 `for`와 입력 요소의 `id`를 일치시켰고, 프로필 이미지에 의미 있는 `alt`를 지정했습니다.

### Flexbox와 Grid

- Navigation: 한 방향으로 로고, 버튼, 메뉴를 배치하므로 Flexbox 사용
- Projects: 카드의 행과 열을 화면 너비에 따라 자동 구성하므로 Grid 사용

```css
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

### 상태 → 렌더링

`js/main.js`의 `state` 객체에 화면에 영향을 주는 값을 모았습니다.

| 사용자 동작 | 상태 변경 | 화면 업데이트 |
| --- | --- | --- |
| 테마 버튼 클릭 | `state.theme` | `renderTheme()` |
| 햄버거 버튼 클릭 | `state.menuOpen` | `renderMenu()` |
| GitHub API 호출 | `state.projects.status/items` | `renderProjects()` |
| 언어 필터 클릭 | `selectedLanguage` | `renderProjectFilters()`, `renderProjects()` |
| 폼 입력/제출 | `state.form.errors` | 필드 오류 및 제출 상태 표시 |

이 흐름은 React의 상태 변경 → 렌더링 개념을 Vanilla JavaScript로 직접 연습하기 위한 구조입니다.

## GitHub API

호출 주소:

```text
https://api.github.com/users/seaweedsoup98/repos?sort=updated&per_page=100
```

`fetch`와 `async/await`를 사용하며 다음 상태를 구분합니다.

- `loading`: 프로젝트 로딩 중
- `success`: 저장소 카드 렌더링
- `empty`: 표시할 저장소 없음
- `error`: 오류 메시지와 다시 시도 버튼
- HTTP `403`: GitHub API 요청 한도 초과 메시지

저장소 배열은 `map()`으로 카드 HTML로 변환하고, 보너스 기능인 언어 필터는 `filter()`로 구현했습니다.

## Contact Form

빈 값과 이메일 형식을 검사하며 오류 메시지를 입력 필드 가까이에 표시합니다. 제출 시 `event.preventDefault()`로 기본 제출 동작을 막습니다.

실제 이메일 전송은 Formspree endpoint `https://formspree.io/f/myezkwbk`를 사용합니다. `index.html`의 `data-endpoint`에 설정되어 있으며, 유효성 검사를 통과한 폼은 `fetch()`로 전송됩니다.

```html
<form id="contact-form" data-endpoint="https://formspree.io/f/myezkwbk" novalidate>
```

endpoint가 설정되어 있으므로 정상 입력 시 Formspree로 실제 전송을 시도합니다.

## 기준값

| 항목 | 값 |
| --- | ---: |
| Navigation 스타일 변경 | `60px` |
| Scroll Top 표시 | `300px` |
| Intersection Observer | `0.2` |
| Tablet breakpoint | `768px` |
| Desktop breakpoint | `1024px` |

## GitHub Pages

공식 GitHub Pages Actions workflow(`.github/workflows/pages.yml`)를 포함합니다.

배포 주소:

```text
https://seaweedsoup98.github.io/codyssey_B1-1/
```

저장소의 **Settings → Pages → Build and deployment → Source**는 **GitHub Actions**로 설정되어 있습니다.

## 검증 방법

1. 모바일 폭에서 햄버거 메뉴를 두 번 눌러 열림/닫힘 확인
2. 네비게이션 링크 클릭 후 부드러운 이동 확인
3. 60px 이상 스크롤 후 헤더 스타일 변경 확인
4. 300px 이상 스크롤 후 ↑ 버튼 표시 및 맨 위 이동 확인
5. 다크 모드 전환 후 새로고침하여 설정 유지 확인
6. Projects에서 로딩 후 GitHub 저장소 카드와 언어 필터 확인
7. API 오류 상황에서 오류 메시지와 다시 시도 버튼 확인
8. 빈 폼 제출, 잘못된 이메일 제출, 정상 입력 순서로 유효성 검사 확인
9. 390px / 768px / 1024px 이상에서 반응형 레이아웃 확인

## 제출 전 사용자 환경에서 필요한 작업

- Formspree 실제 이메일 수신 확인
- 배포 URL에서 전체 기능 최종 확인
- 최신 Chrome에서 데스크톱 / 모바일 / 다크모드 스크린샷 촬영

구현 원리와 평가 대비 내용은 [`report/LEARNING_NOTES.md`](report/LEARNING_NOTES.md)에 정리했습니다.
