# Requirements Document

## Introduction

Woochive 개인 아카이브 웹사이트의 Intro 섹션 콘텐츠 및 디자인 업데이트. 기존 Home 페이지를 새로운 콘텐츠 구조와 색상 시스템으로 재구성한다.

## Glossary

- **Intro_Page**: 사이트의 메인 랜딩 페이지 (`/` 경로), 자기소개와 기본 정보를 표시하는 섹션
- **Title_Gradient**: 타이틀 텍스트에 적용되는 좌→우 방향의 두 색상 그라디언트 효과
- **Bio_Block**: 3줄로 구성된 자기소개 텍스트 블록
- **Info_Card**: 소속, 이메일, 외부 링크를 포함하는 하단 정보 카드 컴포넌트
- **Highlight_Color_Gray**: #717E87 색상
- **Highlight_Color_Purple**: #D57FF4 색상
- **Subtitle_Highlight**: 서브타이틀 내 핵심 단어에 적용되는 색상 강조 효과

## Requirements

### Requirement 1: 타이틀 그라디언트 업데이트

**User Story:** As a site visitor, I want to see the site title with a balanced gradient effect, so that the brand identity feels visually harmonious.

#### Acceptance Criteria

1. THE Intro_Page SHALL display the title "Woochive" with a visible gradient visual effect transitioning from Highlight_Color_Gray (#717E87) to Highlight_Color_Purple (#D57FF4) in a left-to-right direction, regardless of the specific CSS technique used.
2. THE Title_Gradient SHALL apply a smooth transition between Highlight_Color_Gray and Highlight_Color_Purple at a 5:5 ratio.
3. THE Intro_Page SHALL render the title text using CSS `background-clip: text` to apply the gradient as a text fill.

### Requirement 2: 서브타이틀 핵심 단어 색상 강조

**User Story:** As a site visitor, I want to see key phrases in the subtitle highlighted with distinct colors, so that the site's focus areas are immediately visible.

#### Acceptance Criteria

1. THE Intro_Page SHALL display the subtitle text "A personal archive for music data research, mathematical foundations, and creative works."
2. WHEN rendering the subtitle, THE Intro_Page SHALL apply a gradient effect (identical to Title_Gradient) to the phrase "music data research".
3. WHEN rendering the subtitle, THE Intro_Page SHALL apply Highlight_Color_Gray (#717E87) to the phrase "mathematical foundations".
4. WHEN rendering the subtitle, THE Intro_Page SHALL apply Highlight_Color_Purple (#D57FF4) to the phrase "creative works".
5. THE Intro_Page SHALL render non-highlighted subtitle text in the default muted text color (ink-soft).

### Requirement 3: 바이오 블록 콘텐츠 및 스타일링

**User Story:** As a site visitor, I want to read a concise 3-line bio with highlighted keywords, so that I can quickly understand the site owner's identity and interests.

#### Acceptance Criteria

1. THE Bio_Block SHALL display three lines of text within a single block element with line breaks between each line.
2. THE Bio_Block SHALL display the first line as "I study Applied Mathematics." with "Applied Mathematics" highlighted in Highlight_Color_Gray.
3. THE Bio_Block SHALL display the second line as "I research Music Information Retrieval, DSP, TDA, and Image Processing." with "Music Information Retrieval" highlighted in Highlight_Color_Purple and "DSP", "TDA", and "Image Processing" highlighted in Highlight_Color_Gray.
4. THE Bio_Block SHALL display the third line as "I listen to live music, make music, and archive the sounds that shape my world." with "live music", "music", and "sounds" highlighted in Highlight_Color_Purple.
5. THE Bio_Block SHALL render non-highlighted text in the default muted text color.
6. THE Bio_Block SHALL use the sans-serif font family consistent with the current site design.

### Requirement 4: Info 카드 컴포넌트

**User Story:** As a site visitor, I want to see the site owner's affiliation and contact links in a clean card layout, so that I can easily find relevant information.

#### Acceptance Criteria

1. THE Info_Card SHALL be positioned below the Bio_Block with visible vertical spacing separating the two elements.
2. THE Info_Card SHALL have a background color and border consistent with the existing card style (paper-2 background, soft border).
3. THE Info_Card SHALL display "Undergraduate Researcher at Korea University, Sejong" as the first line.
4. THE Info_Card SHALL display "sonluos1013@gmail.com" as plain text on the second line.
5. THE Info_Card SHALL display "GitHub" and "LinkedIn" as clickable text links on the same line.
6. THE Info_Card SHALL render the "GitHub" link (https://github.com/sonluos) and "LinkedIn" link (https://www.linkedin.com/in/woojin-son-541705267) with `target="_blank"` attribute so that both links open in a new browser tab from the moment they are rendered.
7. WHEN a visitor clicks the "GitHub" link, THE Info_Card SHALL navigate to https://github.com/sonluos in the new tab.
8. WHEN a visitor clicks the "LinkedIn" link, THE Info_Card SHALL navigate to https://www.linkedin.com/in/woojin-son-541705267 in the new tab.
9. THE Info_Card SHALL render external links with `rel="noopener noreferrer"` for security.

### Requirement 5: 키워드 태그 섹션 제거

**User Story:** As a site owner, I want to remove the keyword tags from the Intro page, so that the page is cleaner and research keywords are consolidated in the Research section.

#### Acceptance Criteria

1. THE Intro_Page SHALL NOT display the "Research Keywords" section heading.
2. THE Intro_Page SHALL NOT display the TagList component with keyword tags.
3. THE Intro_Page SHALL keep all specified sections (title, subtitle, bio, info card) visible and without layout disruption after keyword removal.

### Requirement 6: 전체 Intro 페이지 레이아웃

**User Story:** As a site visitor, I want the Intro page to have a clean, well-structured layout, so that the content is easy to scan and visually appealing.

#### Acceptance Criteria

1. THE Intro_Page SHALL display content in the following vertical order: title, subtitle, bio block, info card.
2. THE Intro_Page SHALL center-align the title and subtitle sections.
3. THE Intro_Page SHALL maintain responsive layout across desktop and mobile viewports.
4. IF the viewport width is less than 768px, THEN THE Intro_Page SHALL adjust spacing and font sizes to remain readable on mobile devices.
