# 활동2 파동 그림 — GitHub / Netlify 배포용

이 폴더는 기존 단일 HTML을 정적 웹사이트 구조로 분리한 버전입니다.

## 구조

- `index.html` — 화면 마크업
- `css/style.css` — 전체 스타일
- `js/app.js` — 파동 그림, 문제, Web Audio 재생 로직
- `assets/images/favicon.svg` — 파비콘
- `assets/images/waveforms/` — 피아노·아코디언 파형 PNG 32개
- `netlify.toml` — Netlify 정적 배포 설정

## GitHub + Netlify

1. 이 폴더 안의 파일과 폴더를 GitHub 저장소 루트에 그대로 업로드합니다.
2. Netlify에서 해당 GitHub 저장소를 연결합니다.
3. Build command는 비워 둡니다.
4. Publish directory는 `.`(저장소 루트)로 사용합니다. `netlify.toml`이 포함되어 있어 기본 배포 설정으로도 동작합니다.

## 참고

원본의 소리는 별도 MP3/WAV가 아니라 Web Audio API로 실시간 합성됩니다. 따라서 음원 파일 폴더는 없고, 재생 로직은 `js/app.js`에 그대로 유지되어 있습니다.
