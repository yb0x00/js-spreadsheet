# JavaScript 기반 스프레드시트 앱

📑 목차
1. [배포 주소](https://github.com/yb0x00/js-spreadsheet/edit/main/README.md#1-%EB%B0%B0%ED%8F%AC-%EC%A3%BC%EC%86%8C)
2. [실행 방법](https://github.com/yb0x00/js-spreadsheet/edit/main/README.md#2-%EC%8B%A4%ED%96%89-%EB%B0%A9%EB%B2%95)
3. [결과물 스크린샷](https://github.com/yb0x00/js-spreadsheet/edit/main/README.md#3-%EA%B2%B0%EA%B3%BC%EB%AC%BC-%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7)
4. [기능 목록](https://github.com/yb0x00/js-spreadsheet/edit/main/README.md#4-%EA%B8%B0%EB%8A%A5-%EB%AA%A9%EB%A1%9D)
5. [피드백 받고 싶은 부분](https://github.com/yb0x00/js-spreadsheet/edit/main/README.md#5-%ED%94%BC%EB%93%9C%EB%B0%B1-%EB%B0%9B%EA%B3%A0-%EC%8B%B6%EC%9D%80-%EB%B6%80%EB%B6%84)
6. [아쉬운 부분](https://github.com/yb0x00/js-spreadsheet/edit/main/README.md#6-%EC%95%84%EC%89%AC%EC%9A%B4-%EB%B6%80%EB%B6%84)

## 1. 배포 주소
https://yb0x00.github.io/js-spreadsheet/

## 2. 실행 방법
1) 저장소를 클론하거나 위의 배포 주소에 접속합니다.
2) 셀을 클릭하여 텍스트를 입력합니다.
3) ```Export Spreadsheet``` 버튼을 클릭하면 ```.csv```파일로 다운로드 할 수 있습니다.

## 3. 결과물 스크린샷
- 아래와 같은 형태의 스프레드시트 UI입니다.
![결과 캡처 이미지_1](https://github.com/user-attachments/assets/7f2e3a92-7e9e-459d-82d2-e23d81953376)
![결과 캡처 이미지_2](https://github.com/user-attachments/assets/6c4e5f41-154d-4991-b332-870ad3ff6f77)
![결과 캡처 이미지_3](https://github.com/user-attachments/assets/7e144aee-7b0e-4a22-827c-eda60154479c)

## 4. 기능 목록
### UI
- [x] "Export Spreadsheet" 버튼
- [x] "Cell: " 라벨
    - 현재 선택된 셀의 주소 표시 (예: C2)
- [x] 스프레드시트 그리드
    - 9*9 셀 영역
    - 열 헤더: A ~ I
    - 행 헤더: 1 ~ 9
      
### 기능1 - 셀 선택 및 활성화
- [x] 사용자가 마우스 클릭으로 특정 셀을 선택할 수 있다.
- [x] "Cell: "라벨에 현재 선택된 셀의 주소를 표시한다.
- [x] 선택된 셀이 속한 행 헤더, 열 헤더의 배경색과 글씨 색을 변경하여 선택된 영역을 시각화한다.

### 기능2 - 셀 데이터 입력
- [x] 사용자가 특정 셀을 클릭했을 때, 해당 셀은 편집 가능한 상태로 전환된다.
- [x] 사용자는 편집 모드에서 문자, 숫자, 특수 기호 등 텍스트 데이터를 자유롭게 입력할 수 있다.
- [x] 다른 셀을 클릭하면 편집 중이던 셀의 편집 모드가 종료된다.

### 기능3 - 데이터 내보내기
- [x] "Export Spreasheet" 버튼 클릭 시, 현재 스프레드시트의 모든 셀 데이터는 CSV 형식의 텍스트 문자열로 변환된다.
- [x] 변환된 CSV 데이터를 사용자 컴퓨터에 .csv 확장자를 가진 파일로 다운로드 할 수 있도록 한다.
- [x] 다운로드된 .csv 파일이 Google Spreadsheet에서 정상적으로 임포트되고, 내용이 표시되어야 한다.

## 5. 피드백 받고 싶은 부분
- 본 과제의 출제 의도가 궁금합니다. 어떤 기능을 구현하는 것 또는 CS적 지식이 중요했는지 알고 싶습니다.
- 스프레드시트 구현 시 가장 중요하게 고려해야 할 설계 원칙이나 과제를 무엇이라고 생각하시는지 여쭙고 싶습니다.
- 모듈 단위로 역할을 나누는 것을 시도했습니다. 더 나은 구조가 있는지, 유지보수를 위해 역할을 더 잘게 쪼갠다면 어떻게 구현 가능한지 피드백 부탁드립니다.
- 이벤트 핸들링과 상태 동기화(예: 셀 편집 종료 후 값 반영 타이밍 처리)에 대한 개선 여지가 있다면 알려주세요.
- 현재 구조가 확장성 측면에서 적절한지 궁금합니다. 예를 들어 수식 계산 기능이나 셀 병합 등 고급 기능을 추가하려면 어떤 점들을 고려해야 할까요?
- 컴포넌트나 모듈 테스트를 작성한다면 어떤 단위로 나누고 어떤 방식으로 접근하면 좋을까요?

## 6. 아쉬운 부분
- UX 측면에서 다양한 사용자 인터랙션(예:셀 이동)에 대응하지 못합니다.
- 테스트 코드 작성을 하지 못했습니다.
- 상태 관리가 분산되어 있어 복잡한 기능을 추가할수록 관리가 어려워질 가능성이 있습니다.
