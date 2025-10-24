# 한국어 번역 가이드 (Korean Translation Guide)

**버전**: 4.0  
**커밋**: 829fcf5980c867e5d6d75d068f6c50c2dc9bf983  
**날짜**: 2025년 10월 24일

---

## 개요 (Overview)

QANDA 이미지 업로드 시스템이 한국 사용자(중고등학생)를 위해 완전히 한국어로 번역되었습니다.

---

## 번역된 UI 텍스트 (Translated UI Text)

### HTML (index.html)

| 영어 (English) | 한국어 (Korean) |
|----------------|----------------|
| Image Upload System | 이미지 업로드 시스템 |
| Upload your image to Google Sheets | 이미지를 Google 시트에 업로드하세요 |
| Email Address | 이메일 주소 |
| Select Image | 이미지 선택 |
| Click to upload or drag and drop | 클릭하거나 드래그하여 업로드 |
| PNG, JPG, JPEG up to 5MB | PNG, JPG, JPEG 최대 5MB |
| Submit | 제출 |
| Enter a valid email address | 유효한 이메일 주소를 입력하세요 |
| Preview of uploaded image | 업로드된 이미지 미리보기 |
| Upload image area | 이미지 업로드 영역 |
| File input for image upload | 이미지 업로드 파일 입력 |
| Submit image upload | 이미지 업로드 제출 |

### JavaScript (app.js)

| 영어 (English) | 한국어 (Korean) |
|----------------|----------------|
| Please select an image file | 이미지 파일을 선택해주세요 |
| File size must be less than 5MB | 파일 크기는 5MB 이하여야 합니다 |
| Uploading... | 업로드 중... |
| Please provide email and select an image | 이메일과 이미지를 모두 입력해주세요 |
| Image uploaded successfully! | 이미지가 성공적으로 업로드되었습니다! |
| Error: | 오류: |

---

## 접근성 레이블 (ARIA Labels)

### 번역된 ARIA 속성

```html
<!-- 이메일 입력 -->
aria-describedby="emailHint"
<span id="emailHint" class="sr-only">유효한 이메일 주소를 입력하세요</span>

<!-- 업로드 영역 -->
aria-label="이미지 업로드 영역. 클릭하거나 드래그하여 업로드하세요"
aria-describedby="uploadHint"

<!-- 파일 입력 -->
aria-label="이미지 업로드 파일 입력"

<!-- 이미지 미리보기 -->
alt="업로드된 이미지 미리보기"

<!-- 제출 버튼 -->
aria-label="이미지 업로드 제출"
```

---

## 사용자 메시지 (User Messages)

### 성공 메시지 (Success Messages)
```javascript
'✅ 이미지가 성공적으로 업로드되었습니다!'
```

### 오류 메시지 (Error Messages)
```javascript
'이미지 파일을 선택해주세요'
'파일 크기는 5MB 이하여야 합니다'
'이메일과 이미지를 모두 입력해주세요'
'오류: [에러 메시지]'
```

### 로딩 상태 (Loading State)
```javascript
'업로드 중...'
```

---

## 버튼 텍스트 (Button Text)

| 상태 (State) | 텍스트 (Text) |
|-------------|--------------|
| 기본 (Default) | 제출 |
| 업로드 중 (Uploading) | 업로드 중... |
| 비활성화 (Disabled) | 제출 |

---

## 메타데이터 (Metadata)

### HTML 메타 태그
```html
<html lang="ko">
<meta name="description" content="QANDA 이미지 업로드 시스템 - Google 시트에 이미지를 업로드하세요">
<title>이미지 업로드 시스템 | QANDA</title>
```

---

## 콘솔 로그 (Console Logs)

```javascript
console.log('🎨 Design System v4.0 loaded');
console.log('📋 Commit: 829fcf5980c867e5d6d75d068f6c50c2dc9bf983');
console.log('🌏 Language: Korean (한국어)');
```

---

## 번역 가이드라인 (Translation Guidelines)

### 톤 & 스타일 (Tone & Style)
- **대상**: 중고등학생
- **존댓말 사용**: "~하세요", "~해주세요"
- **명확하고 간결한 표현**
- **기술 용어는 원문 유지** (예: Google 시트, MB, PNG, JPG)

### 번역 원칙 (Translation Principles)

1. **사용자 친화적**
   - 일상적인 한국어 표현 사용
   - 복잡한 기술 용어 대신 쉬운 설명

2. **일관성**
   - "업로드" (upload) 용어 통일
   - "이미지" (image) 용어 통일
   - "제출" (submit) 용어 통일

3. **문화적 적합성**
   - 한국 학생들이 이해하기 쉬운 표현
   - 존댓말 사용으로 정중함 유지

4. **접근성**
   - 스크린 리더를 위한 한국어 ARIA 레이블
   - 명확한 오류 메시지

---

## 파일별 변경 사항 (Changes by File)

### index.html
- ✅ 모든 사용자 대면 텍스트 한국어로 번역
- ✅ ARIA 레이블 한국어로 번역
- ✅ 메타데이터 한국어로 업데이트
- ✅ lang 속성 "ko"로 설정

### app.js
- ✅ 모든 오류 메시지 한국어로 번역
- ✅ 성공 메시지 한국어로 번역
- ✅ 버튼 텍스트 한국어로 번역
- ✅ 로딩 상태 텍스트 한국어로 번역
- ✅ 콘솔 로그에 언어 정보 추가

### styles.css
- ℹ️ CSS는 변경하지 않음 (언어 독립적)
- ℹ️ 디자인 시스템 토큰 유지

---

## 테스트 체크리스트 (Testing Checklist)

### 시각적 테스트
- [ ] 모든 한국어 텍스트가 올바르게 표시됨
- [ ] 한글 폰트(Pretendard)가 제대로 로드됨
- [ ] 긴 한글 텍스트가 레이아웃을 깨뜨리지 않음
- [ ] 버튼 텍스트가 버튼 내부에 잘 맞음

### 기능 테스트
- [ ] 이메일 입력 플레이스홀더 작동
- [ ] 파일 업로드 영역 한글 안내 표시
- [ ] 오류 메시지 한글로 표시
- [ ] 성공 메시지 한글로 표시
- [ ] 업로드 중 상태 한글로 표시

### 접근성 테스트
- [ ] 스크린 리더가 한글 레이블 읽음
- [ ] ARIA 힌트 텍스트가 한글로 전달됨
- [ ] 키보드 내비게이션 작동
- [ ] 포커스 상태 명확함

---

## 향후 번역 작업 (Future Translation Work)

### 추가 번역 필요 항목

1. **README.md** (선택사항)
   - 한국어 버전 README 생성
   - 설치 가이드 한국어 번역
   - 사용 방법 한국어 설명

2. **오류 메시지 확장**
   - Google Apps Script 오류
   - 네트워크 오류
   - 브라우저 호환성 메시지

3. **도움말 텍스트**
   - 툴팁 추가 (선택사항)
   - 사용법 안내 추가 (선택사항)

---

## 언어 전환 (Language Switching)

현재 버전은 한국어 전용입니다. 다국어 지원이 필요한 경우:

### 권장 구조
```javascript
const i18n = {
  ko: {
    title: '이미지 업로드 시스템',
    submit: '제출',
    uploading: '업로드 중...',
    // ...
  },
  en: {
    title: 'Image Upload System',
    submit: 'Submit',
    uploading: 'Uploading...',
    // ...
  }
};

// 사용 예시
const currentLang = 'ko';
document.querySelector('h1').textContent = i18n[currentLang].title;
```

---

## 문의사항 (Contact)

번역 관련 문의:
- **팀**: QANDA Development Team
- **이메일**: design-system@company.com
- **문서**: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

---

## 변경 이력 (Changelog)

### v4.0-ko (2025년 10월 24일)
- ✅ 모든 UI 텍스트 한국어 번역 완료
- ✅ ARIA 레이블 한국어 번역 완료
- ✅ 오류/성공 메시지 한국어 번역 완료
- ✅ 메타데이터 한국어 업데이트
- ✅ 중고등학생 대상 존댓말 톤 적용
- ✅ 접근성 유지하며 번역 완료

---

**현재 커밋**: 829fcf5980c867e5d6d75d068f6c50c2dc9bf983  
**디자인 시스템 버전**: 4.0  
**언어**: 한국어 (Korean)  
**마지막 업데이트**: 2025년 10월 24일

---

*이 번역은 QANDA 디자인 시스템을 준수하며 한국 중고등학생을 대상으로 최적화되었습니다.*

