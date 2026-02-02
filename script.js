(() => {
  const RATE = 2;
  let hit = [];

  try {
    const v0 = document.querySelector("video");
    if (v0) {
      v0.playbackRate = RATE;
      v0.addEventListener("play", () => (v0.playbackRate = RATE));
      v0.addEventListener("loadedmetadata", () => (v0.playbackRate = RATE));

      hit.push({
        where: "main",
        id: v0.id || "(no id)",
        src: v0.currentSrc || v0.src
      });
    }
  } catch (e) {}

  try {
    const frames = document.querySelectorAll("iframe");

    for (let i = 0; i < frames.length; i++) {
      try {
        const d = frames[i].contentDocument;
        if (!d) continue;

        const v1 = d.querySelector("video");
        if (!v1) continue;

        v1.playbackRate = RATE;
        v1.addEventListener("play", () => (v1.playbackRate = RATE));
        v1.addEventListener("loadedmetadata", () => (v1.playbackRate = RATE));

        hit.push({
          where: "iframe[" + i + "]",
          id: v1.id || "(no id)",
          src: v1.currentSrc || v1.src
        });

      } catch (e) {}
    }
  } catch (e) {}

  if (hit.length) {
    console.table(hit);
    console.log("✅ speed set =", RATE);
  } else {
    console.log("❌ no accessible video found");
  }
})();
