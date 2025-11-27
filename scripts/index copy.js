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
  const LOOP_DELAY = 1000; // 🔹 루프 사이 “멈춰 있는” 시간

  // ✅ 여기: 영상 교체 기준 시간 (한국시간 11/29 00:00)
  const SWITCH_AT = new Date("2025-11-29T00:40:00+09:00");

  // ====== STATE ======
  let teaserAnimation = null;
  let bgTimer = null;
  let loopTimer = null;

  document.addEventListener("DOMContentLoaded", () => {
    startTeaser();
  });

  // ✅ 현재 시각 기준으로 어떤 파일을 쓸지 결정
  function getTeaserFile() {
    const now = new Date();
    // now가 11/29 00:00 이후면 d-2.json 사용
    if (now >= SWITCH_AT) {
      return "d-2.json";
    }
    // 그 전에는 d-3.json
    return "d-2.json";
  }

  // 🔹 배경: 핑크 → 2.2초 후 회색
  function flashPinkBackground() {
    const body = document.body;
    if (!body) return;

    if (bgTimer) {
      clearTimeout(bgTimer);
      bgTimer = null;
    }

    body.style.backgroundColor = "#FF319C";

    bgTimer = setTimeout(() => {
      body.style.backgroundColor = "var(--bg)";
    }, BACKGROUND_DURATION);
  }

  // 🔹 한 루프 시작 (배경 플래시 + 0프레임부터 재생)
  function startLoop() {
    if (!teaserAnimation) return;

    flashPinkBackground();
    teaserAnimation.goToAndPlay(0);
  }

  // ====== 티저 설정 ======
  function startTeaser() {
    if (!teaserContainer) return;

    // ✅ 여기서 자동으로 파일 결정
    const lottieFile = getTeaserFile();

    teaserAnimation = bodymovin.loadAnimation({
      container: teaserContainer,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: lottieFile,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    });

    teaserAnimation.addEventListener("DOMLoaded", () => {
      startLoop();
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
