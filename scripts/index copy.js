(function () {
  const teaserContainer = document.getElementById("teaser");

  // ====== CONFIG ======
  const RELEASE_AT = new Date("2025-12-01T10:00:00+09:00");
  const DDAY_DATE = new Date(
    RELEASE_AT.getFullYear(),
    RELEASE_AT.getMonth(),
    RELEASE_AT.getDate()
  );

  const BACKGROUND_DURATION = 2200;
  const LOOP_DELAY = 1000;

  // 🔹 교체 기준 시간들
  const SWITCH_D2_AT = new Date("2025-11-29T00:40:00+09:00");
  const SWITCH_D1_AT = new Date("2025-11-30T00:00:00+09:00");

  // ====== STATE ======
  let teaserAnimation = null;
  let bgTimer = null;
  let loopTimer = null;

  document.addEventListener("DOMContentLoaded", () => {
    startTeaser();
  });

  // ============================
  // 🔥 날짜 기준으로 파일 선택
  // ============================
  function getTeaserFile() {
    const now = new Date();

    if (now >= SWITCH_D1_AT) {
      return "d-1(fk).json"; // ⭐ 11/30 00:00 이후
    }
    if (now >= SWITCH_D2_AT) {
      return "d-2.json"; // ⭐ 11/29 00:40 이후
    }
    return "d-3.json"; // ⭐ 그 전
  }

  // 🔹 배경 핑크 → 회색 전환
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

  // 🔹 루프 시작
  function startLoop() {
    if (!teaserAnimation) return;
    flashPinkBackground();
    teaserAnimation.goToAndPlay(0);
  }

  // ============================
  // 🔥 티저 애니메이션 시작
  // ============================
  function startTeaser() {
    if (!teaserContainer) return;

    const lottieFile = getTeaserFile(); // 시간에 따라 자동 선택

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
