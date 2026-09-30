(function () {
  "use strict";

  // Local previews must not contribute to the public counters.
  var hostname = window.location.hostname;
  if (!/^https?:$/.test(window.location.protocol) ||
      /^(localhost|127(?:\.\d+){3}|0\.0\.0\.0|\[::1\])$/.test(hostname) ||
      /\.(localhost|local)$/.test(hostname)) return;

  if (document.getElementById("busuanzi-script")) return;

  // The provider reveals the counters only after receiving their values.
  var script = document.createElement("script");
  script.id = "busuanzi-script";
  script.async = true;
  script.src = "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
  document.head.appendChild(script);
})();
