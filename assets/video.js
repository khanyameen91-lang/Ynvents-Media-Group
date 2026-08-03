document.addEventListener("DOMContentLoaded", function () {
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".video-frame").forEach(function (frame) {
    var video = frame.querySelector("video");
    var toggle = frame.querySelector(".video-toggle");
    if (!video) return;

    var started = false;

    function setState(s) {
      if (!toggle) return;
      toggle.setAttribute("data-state", s);
      toggle.setAttribute("aria-label", s === "playing" ? "Pause the platform loop" : "Play the platform loop");
    }

    function start() {
      if (started) return;
      started = true;
      video.preload = "auto";
      video.load();
      var p = video.play();
      if (p && p.catch) { p.catch(function () { setState("paused"); }); }
    }

    video.addEventListener("play", function () { setState("playing"); });
    video.addEventListener("pause", function () { setState("paused"); });
    setState("paused");

    if (toggle) {
      toggle.addEventListener("click", function () {
        if (video.paused) { started ? video.play() : start(); } else { video.pause(); }
      });
    }

    // Reduced-motion users get a still frame and the control - never an autoplaying loop.
    if (reduceMotion) { video.preload = "metadata"; video.load(); return; }

    // Do not fetch the file until the frame is actually near the viewport.
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { start(); io.disconnect(); }
        });
      }, { rootMargin: "200px" });
      io.observe(frame);
    } else {
      start();
    }
  });
});
