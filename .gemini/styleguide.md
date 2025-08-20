Next.js 프론트엔드 스타일 가이드 (App Router 기반)

1. 코드 구조 및 명명 규칙
   파일 구조: Next.js App Router의 파일 시스템 라우팅을 따릅니다.

app/: 라우팅 관련 컴포넌트 및 페이지 (App Router의 핵심)

components/: 재사용 가능한 UI 컴포넌트

lib/: 서버 측 로직 또는 유틸리티 함수 (API 호출, 데이터 처리 등)

hooks/: 커스텀 React Hooks (클라이언트 컴포넌트용)

styles/: 전역 스타일, CSS 변수 등

public/: 이미지, 폰트 등 정적 파일

컴포넌트 명명: 컴포넌트 파일 이름과 컴포넌트명은 PascalCase를 사용합니다.

예: components/Header.jsx, components/UserProfile.tsx, app/dashboard/page.tsx

파일명과 컴포넌트 이름: PascalCase로 작성하여 통일성을 유지합니다. (예: MyComponent.tsx)

디렉토리명: 소문자 및 복수형으로 작성합니다. (예: components, users, posts)

변수: camelCase를 사용합니다. (예: userName, fetchUserData)

상수: 대문자 및 SNAKE_CASE를 사용합니다. (예: API_KEY, MAX_ITEM_COUNT)

함수: camelCase를 사용하며, '동작'의 의미가 잘 표현되도록 동사로 시작합니다. (예: getUserProfile, calculateTotal)

이벤트 핸들러: 'handle' + 동작 + 대상 컴포넌트명 또는 'handle' + 동작 형태로 명명합니다. (예: handleClickButton, handleChangeInput)

이미지 및 정적 파일: Kebab Case로 작성하며 파일 특성에 따라 특성-이름으로 지정합니다.

예: icon-pencil-white.png, background-main.png, product-thumbnail-1.jpg

2. 컴포넌트 작성 규칙
   단일 책임 원칙(SRP): 컴포넌트는 하나의 기능만 수행하도록 작성합니다. UI를 담당하는 Presentational Components와 로직을 담당하는 Container Components를 분리하는 것을 권장합니다.

Server Components vs. Client Components:

기본적으로 Server Components를 우선적으로 고려합니다.

클라이언트 측 상호작용(이벤트 핸들러, useState, useEffect 등)이 필요한 경우에만 'use client' 지시어를 사용하여 Client Components로 만듭니다.

Client Components는 트리의 가장 말단에 위치시키는 것을 지향합니다.

Props: props는 명확하게 이름을 짓고, 타입스크립트 사용 시 타입을 명시합니다.

컴포넌트 props type: 컴포넌트명 + Props 네이밍을 사용합니다.

예: SearchContainer.tsx → interface SearchContainerProps { /_ ... _/ }

Props가 많아지면 객체로 묶어서 전달하는 것을 고려합니다.

조건부 렌더링: JSX 내에서 삼항 연산자 또는 논리 연산자(&&)를 사용합니다. 복잡한 조건은 컴포넌트 외부에서 변수로 처리합니다.

한 줄짜리 블록에도 {}: 가독성을 위해 if, for, while 등의 한 줄짜리 블록에도 항상 중괄호 {}를 사용합니다.

3. 스타일링
   주요 스타일링 방법: Tailwind CSS를 기본으로 사용합니다. 이는 일관된 디자인 시스템을 구축하고 스타일 충돌을 줄이는 데 효과적입니다.

CSS 모듈: Tailwind로 해결하기 어려운 특정 컴포넌트 스타일은 CSS 모듈을 사용합니다. 컴포넌트와 스타일 파일은 같은 폴더에 위치시킵니다.

예: components/Button/index.tsx와 components/Button/Button.module.css

CSS 변수: 브랜드 컬러, 폰트 사이즈 등 전역에서 재사용되는 값들은 CSS 변수로 정의하고, tailwind.config.js에서 확장하여 사용합니다.

globals.css 파일에 :root를 사용하여 변수를 정의합니다.

예: --color-primary: #5731F0;

4. 코드 품질
   ESLint & Prettier: 모든 프로젝트는 ESLint와 Prettier를 설정하여 코드 포맷팅과 문법 오류를 자동으로 교정합니다. 커밋 전에 포맷팅 오류가 없는지 확인합니다. .eslintrc.json과 .prettierrc 파일을 공유하여 팀원 모두 동일한 규칙을 따르도록 합니다.

타입스크립트: 가능한 모든 컴포넌트와 함수에 타입을 명시합니다. 이는 개발 과정에서 버그를 줄이고 코드의 가독성을 높입니다. any 타입 사용을 최소화합니다.

주석: 복잡한 로직이나 의도에 대한 설명이 필요한 경우에만 주석을 추가합니다. 코드 자체로 의미를 전달하는 것을 우선시합니다.

예: // 이 함수는 사용자 인증 토큰을 갱신합니다.

비동기 처리: 가능한 async-await 문법을 사용하여 비동기 코드를 보다 읽기 쉽고 관리하기 쉽게 만듭니다.

5. 성능 최적화
   useMemo, useCallback 적극 활용: 불필요한 계산이나 함수 재생성을 방지하여 렌더링 성능을 최적화합니다. 특히 큰 컴포넌트나 자주 렌더링되는 컴포넌트에서 효과적입니다.

불필요한 리렌더링 방지: React DevTools를 활용하여 컴포넌트의 불필요한 리렌더링을 찾아내고 최적화합니다. React.memo 사용도 고려합니다.

Lazy Loading 고려: next/dynamic을 사용하여 큰 컴포넌트나 페이지를 필요할 때만 로드하여 초기 로딩 시간을 단축합니다. 이미지와 비디오는 next/image, next/video 컴포넌트를 활용합니다.

컴포넌트단에서 더 나은 설계, 다양한 구현 방식을 검토: 특정 기능을 구현할 때 항상 여러 가지 방법을 고려하고, 성능 및 유지보수 측면에서 가장 효율적인 설계를 선택합니다.

6. 접근성 및 SEO
   의미있는 alt 속성 필수: 모든 이미지에 시각적으로 전달하는 정보를 명확하게 설명하는 alt 속성을 추가합니다. 이는 시각 장애인 사용자에게 정보를 제공하고 SEO에도 기여합니다.

Semantic HTML 태그 사용: div 남용을 지양하고, header, nav, main, footer, section, article, aside 등의 의미론적 HTML5 태그를 적절히 사용하여 문서 구조를 명확히 합니다.

ARIA 레이블 적절히 활용: 복잡한 UI 요소(예: 커스텀 버튼, 슬라이더)에는 ARIA(Accessible Rich Internet Applications) 속성을 사용하여 스크린 리더 사용자에게 추가적인 컨텍스트와 기능을 제공합니다.

7. Git 커밋 메시지
   Conventional Commits 규칙을 따릅니다.

feat: 새로운 기능 추가

fix: 버그 수정

refactor: 기능 변경 없는 코드 리팩토링

docs: 문서 수정

style: 코드 포맷팅, 세미콜론 등 (로직 변경 없음)

chore: 빌드 프로세스 또는 보조 도구 변경, 패키지 업데이트 등

커밋 메시지 형식: <type>(<scope>): <subject>

예: feat(auth): add google login functionality

예: fix(layout): correct sidebar responsiveness on mobile
