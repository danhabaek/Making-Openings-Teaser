(function () {
  const teaserContainer = document.getElementById("teaser");

  // ====== CONFIG ======
  const RELEASE_AT = new Date("2025-12-01T10:00:00+09:00");
  const DDAY_DATE = new Date(
    RELEASE_AT.getFullYear(),
    RELEASE_AT.getMonth(),
    RELEASE_AT.getDate()
  );

  const BACKGROUND_DURATION = 2200; // 🔹 핑크 유지 시간 2.2초
  const LOOP_DELAY = 1000; // 🔹 루프 사이 “멈춰 있는” 시간 (3초 예시, 숫자만 바꿔서 조절)

  // ====== STATE ======
  let teaserAnimation = null;
  let bgTimer = null;
  let loopTimer = null;

  document.addEventListener("DOMContentLoaded", () => {
    startTeaser();
  });

  // 🔹 배경: 핑크 → 2.2초 후 회색
  function flashPinkBackground() {
    const body = document.body;
    if (!body) return;

    // 이전 타이머 정리
    if (bgTimer) {
      clearTimeout(bgTimer);
      bgTimer = null;
    }

    // 루프 시작 시: 핑크
    body.style.backgroundColor = "#FF319C";

    // 2.2초 후: 회색(기본 배경)
    bgTimer = setTimeout(() => {
      body.style.backgroundColor = "var(--bg)";
    }, BACKGROUND_DURATION);
  }

  // 🔹 한 루프 시작 (배경 플래시 + 0프레임부터 재생)
  function startLoop() {
    if (!teaserAnimation) return;

    flashPinkBackground(); // 핑크 2.2초
    teaserAnimation.goToAndPlay(0); // 0프레임부터 다시 재생
  }

  // ====== 티저 설정 ======
  function startTeaser() {
    if (!teaserContainer) return;

    const lottieFile = "d-3.json";

    teaserAnimation = bodymovin.loadAnimation({
      container: teaserContainer,
      renderer: "svg",
      loop: false, // 너가 이미 바꿔둔 상태 유지
      autoplay: false,
      path: lottieFile,
      rendererSettings: {
        // 🔹 영상이 어떤 비율이든, 화면을 꽉 채우되 넘치는 부분은 잘라내기 (cover 효과)
        preserveAspectRatio: "xMidYMid slice",
      },
    });

    teaserAnimation.addEventListener("DOMLoaded", () => {
      startLoop(); // 너가 만든 루프 시작 함수
    });

    teaserAnimation.addEventListener("complete", () => {
      if (loopTimer) {
        clearTimeout(loopTimer);
        loopTimer = null;
      }

      loopTimer = setTimeout(() => {
        startLoop();
      }, LOOP_DELAY);
    });
  }
})();
