// App glue for split pages: shared state, modal, museo, and generation flow
(function () {
  const MUSEO_KEY = "mambaq_museo_v1";
  const PENDING_KEY = "mambaq_pending";
  const RESULT_KEY = "mambaq_result";
  const PHOTO_KEY = "mambaq_photo_dataurl";
  const INSTALL_BANNER_DISMISSED_KEY = "mambaq_install_banner_dismissed_v1";

  const defaultObras = () => [
    { emoji: "🐘", name: "Party Elephant", border: "gold", line: "gold" },
    { emoji: "🍕🚀", name: "Pizza espacial", border: "teal", line: "teal" },
    { emoji: "🐉", name: "Dragón arcoiris", border: "gold", line: "gold" },
    { emoji: "🐱🧁", name: "GaCupcake", border: "teal", line: "teal" },
    { emoji: "🌀", name: "Oceano Neón", border: "gold", line: "gold" },
    { emoji: "🍦🏰", name: "Castillo dulce", border: "teal", line: "teal" },
  ];

  let museoObras =
    JSON.parse(localStorage.getItem(MUSEO_KEY)) || defaultObras();

  function saveMuseo() {
    localStorage.setItem(MUSEO_KEY, JSON.stringify(museoObras));
  }

  function renderMuseo() {
    const grid = document.getElementById("museo-grid");
    if (!grid) return;
    grid.innerHTML = museoObras
      .map(
        (o, i) => `
      <div class="museo-card ${o.border}-border" data-index="${i}">
        <div class="museo-card-img">${o.emoji}</div>
        <div class="museo-card-name">${o.name}</div>
        <div class="museo-card-line ${o.line}-line"></div>
      </div>
    `,
      )
      .join("");
    grid.querySelectorAll(".museo-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        const i = Number(card.dataset.index);
        const o = museoObras[i];
        openModal(o.emoji, o.name, "", "", "");
      });
    });
  }

  function injectModal() {
    if (document.getElementById("modal-overlay")) return;
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="modal-overlay" id="modal-overlay">
        <div class="modal-content">
          <div class="modal-img" id="modal-emoji">🦕</div>
          <div class="modal-body">
            <h3 id="modal-nombre">Titulo</h3>
            <p id="modal-info">Info</p>
            <p id="modal-fecha" style="margin-top:4px;font-size:12px"></p>
            <button class="modal-close" id="modal-close">Cerrar</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(div.firstElementChild);
    const overlay = document.getElementById("modal-overlay");
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.classList.remove("open");
    });
    document
      .getElementById("modal-close")
      .addEventListener("click", () => overlay.classList.remove("open"));
  }

  function openModal(emoji, nombre, artista, estilo, fecha) {
    injectModal();
    const overlay = document.getElementById("modal-overlay");
    document.getElementById("modal-emoji").textContent = emoji || "";
    document.getElementById("modal-nombre").textContent = nombre || "";
    document.getElementById("modal-info").textContent = artista
      ? `Artista: ${artista} · Estilo: ${estilo}`
      : "";
    document.getElementById("modal-fecha").textContent = fecha || "";
    overlay.classList.add("open");
  }

  function guardarEnMuseo() {
    // try to read result from DOM first, fallback to localStorage
    const nombreEl = document.getElementById("res-nombre");
    const nombre = nombreEl
      ? nombreEl.textContent
      : (JSON.parse(localStorage.getItem(RESULT_KEY)) || {}).nombre;
    const emoji =
      document.getElementById("result-emoji-big")?.textContent ||
      (JSON.parse(localStorage.getItem(RESULT_KEY)) || {}).emoji ||
      "🎨";
    const borders = ["gold", "teal"];
    const b = borders[museoObras.length % 2];
    museoObras.unshift({ emoji, name: nombre || "Obra", border: b, line: b });
    saveMuseo();
    // go to museo
    location.href = "museo.html";
  }

  // expose some functions globally for inline handlers
  window.openModal = openModal;
  window.guardarEnMuseo = guardarEnMuseo;
  window.navTo = (id) => {
    location.href = id + ".html";
  };

  // Generation flow: datos -> carga -> resultado
  function startGeneratingFlow() {
    const obra =
      document.getElementById("input-obra")?.value.trim() || "Obra mágica";
    const artista =
      document.getElementById("input-artista")?.value.trim() || "Artista";
    const estilo =
      document.getElementById("input-estilo")?.value.trim() || "Libre";
    const foto = localStorage.getItem(PHOTO_KEY) || "";
    if (!foto) {
      localStorage.removeItem(PHOTO_KEY);
    }
    localStorage.setItem(
      PENDING_KEY,
      JSON.stringify({ obra, artista, estilo, foto }),
    );
    location.href = "IA.html";
  }
  window.startGenerating = startGeneratingFlow;

  function initPhotoCapture() {
    const cameraInput = document.getElementById("input-foto-camara");
    const galleryInput = document.getElementById("input-foto-galeria");
    const cameraTrigger = document.getElementById("btn-captura");
    const galleryTrigger = document.getElementById("btn-galeria");
    const preview = document.getElementById("preview-foto");
    const placeholder = document.getElementById("preview-placeholder");
    const status = document.getElementById("foto-status");

    if (
      !cameraInput ||
      !galleryInput ||
      !cameraTrigger ||
      !galleryTrigger ||
      !preview
    )
      return;

    const updatePreview = (dataUrl, sourceLabel) => {
      preview.src = dataUrl;
      preview.classList.add("show");
      if (placeholder) placeholder.classList.add("is-hidden");
      if (status) {
        status.textContent = sourceLabel
          ? `${sourceLabel} agregada. Ya puedes continuar.`
          : "Imagen cargada. Ya puedes continuar.";
      }
    };

    const savedPhoto = localStorage.getItem(PHOTO_KEY);
    if (savedPhoto) updatePreview(savedPhoto, "Imagen anterior");

    const openCameraPicker = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
          });
          stream.getTracks().forEach((track) => track.stop());
        } catch (e) {
          // Continue with file picker if direct camera permission fails.
        }
      }
      cameraInput.click();
    };

    const openGalleryPicker = () => {
      galleryInput.click();
    };

    cameraTrigger.addEventListener("click", openCameraPicker);
    galleryTrigger.addEventListener("click", openGalleryPicker);

    const handleFileChange = (input, sourceLabel) => {
      const file = input.files && input.files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        if (status)
          status.textContent = "Selecciona un archivo de imagen valido.";
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          localStorage.setItem(PHOTO_KEY, result);
          updatePreview(result, sourceLabel);
        }
      };
      reader.readAsDataURL(file);
      input.value = "";
    };

    cameraInput.addEventListener("change", () =>
      handleFileChange(cameraInput, "Foto tomada"),
    );
    galleryInput.addEventListener("change", () =>
      handleFileChange(galleryInput, "Imagen elegida"),
    );
  }

  function runLoadingAndProduce() {
    const fill = document.getElementById("prog-fill");
    if (!fill) return goToResultImmediate();
    let prog = 0;
    const emojisResultado = [
      "🐉",
      "🦄",
      "🌟",
      "🚀",
      "🦊",
      "🐙",
      "🦋",
      "🌈",
      "🏰",
      "🐬",
    ];
    const iv = setInterval(() => {
      prog = Math.min(prog + Math.random() * 8, 95);
      fill.style.width = prog + "%";
    }, 200);
    setTimeout(() => {
      clearInterval(iv);
      fill.style.width = "100%";
      setTimeout(() => {
        const pending = JSON.parse(localStorage.getItem(PENDING_KEY) || "{}");
        const randomEmoji =
          emojisResultado[Math.floor(Math.random() * emojisResultado.length)];
        const result = {
          emoji: randomEmoji,
          nombre: pending.obra || "Obra mágica",
          artista: pending.artista || "Artista",
          estilo: pending.estilo || "Libre",
          fecha: new Date().toLocaleDateString("es-CO", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        };
        localStorage.setItem(RESULT_KEY, JSON.stringify(result));
        location.href = "resultado.html";
      }, 400);
    }, 3500);
  }

  function goToResultImmediate() {
    // fallback quick path
    const pending = JSON.parse(localStorage.getItem(PENDING_KEY) || "{}");
    const result = {
      emoji: "🐉",
      nombre: pending.obra || "Obra",
      artista: pending.artista || "Artista",
      estilo: pending.estilo || "Libre",
      fecha: new Date().toLocaleDateString("es-CO"),
    };
    localStorage.setItem(RESULT_KEY, JSON.stringify(result));
    location.href = "resultado.html";
  }

  function populateResultado() {
    const res = JSON.parse(localStorage.getItem(RESULT_KEY) || "{}");
    if (!res || !res.nombre) return;
    const elEmoji = document.getElementById("result-emoji-big");
    if (elEmoji) elEmoji.textContent = res.emoji || "";
    const elNombre = document.getElementById("res-nombre");
    if (elNombre) elNombre.textContent = res.nombre || "";
    const elArt = document.getElementById("res-artista");
    if (elArt) elArt.textContent = res.artista || "";
    const elEst = document.getElementById("res-estilo");
    if (elEst) elEst.textContent = res.estilo || "";
    const elFe = document.getElementById("res-fecha");
    if (elFe) elFe.textContent = res.fecha || "";
  }

  // Install banner + service worker
  let deferredPrompt = null;
  function wasInstallBannerDismissed() {
    return localStorage.getItem(INSTALL_BANNER_DISMISSED_KEY) === "1";
  }

  function rememberInstallBannerDismissed() {
    localStorage.setItem(INSTALL_BANNER_DISMISSED_KEY, "1");
  }

  function injectInstallBanner() {
    if (wasInstallBannerDismissed()) return;
    if (document.getElementById("install-banner")) return;
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="install-banner" id="install-banner">
        <div class="install-banner-row">
          <p>¡Instala MAIMBAQ!</p>
          <button class="install-btn-no" id="install-no">✕</button>
        </div>
        <small>Agrega la app a tu pantalla de inicio para usarla sin internet</small>
        <button class="install-btn-yes" id="install-yes">Instalar ahora</button>
      </div>
    `;
    document.body.appendChild(div.firstElementChild);
    document
      .getElementById("install-no")
      .addEventListener("click", () => dismissInstall({ remember: true }));
    document.getElementById("install-yes").addEventListener("click", doInstall);
  }

  function doInstall() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      deferredPrompt = null;
      dismissInstall();
    });
  }
  function dismissInstall(options) {
    const remember = !!options?.remember;
    if (remember) {
      rememberInstallBannerDismissed();
    }
    const b = document.getElementById("install-banner");
    if (b) b.classList.remove("show");
  }

  window.doInstall = doInstall;
  window.dismissInstall = dismissInstall;

  // Wire up events on load
  document.addEventListener("DOMContentLoaded", () => {
    injectModal();
    injectInstallBanner();
    renderMuseo();
    initPhotoCapture();

    // Make logo clickable to go to index
    const logo = document.querySelector(".logo");
    if (logo) {
      logo.addEventListener("click", () => {
        location.href = "../index.html";
      });
    }

    // if on datos page attach form submit
    if (document.querySelector(".vamos-btn")) {
      document.querySelectorAll(".vamos-btn").forEach((btn) => {
        btn.addEventListener("click", function (e) {
          // if it's an anchor, prevent default
          if (this.tagName.toLowerCase() === "a") e.preventDefault();
          startGeneratingFlow();
        });
      });
    }
    // if on IA page, run loading
    if (location.pathname.endsWith("IA.html")) {
      runLoadingAndProduce();
    }
    // if on resultado page, populate
    if (location.pathname.endsWith("resultado.html")) {
      populateResultado();
      // attach guardar button
      document
        .querySelectorAll(".guardar-btn")
        .forEach((b) => b.addEventListener("click", () => guardarEnMuseo()));
    }

    // highlight nav active based on current page
    document.querySelectorAll(".nav-item").forEach((a) => {
      try {
        const href = a.getAttribute("href");
        if (href && location.pathname.endsWith(href)) a.classList.add("active");
      } catch (e) {}
    });

    // Auto-hide bottom nav on scroll
    let lastScrollY = window.scrollY || 0;
    let scrollThreshold = 40;
    let direction = 0;
    let movedInDirection = 0;
    const nav = document.querySelector(".bottom-nav");
    if (nav) {
      const canScrollPage = () => {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        return scrollable > 2;
      };

      window.addEventListener(
        "scroll",
        () => {
          if (!canScrollPage()) {
            nav.classList.remove("hide");
            lastScrollY = 0;
            return;
          }

          const currentScrollY = window.scrollY;
          const delta = currentScrollY - lastScrollY;
          const newDirection = delta === 0 ? 0 : delta > 0 ? 1 : -1;

          if (newDirection !== 0) {
            if (newDirection === direction) {
              movedInDirection += Math.abs(delta);
            } else {
              direction = newDirection;
              movedInDirection = Math.abs(delta);
            }

            if (movedInDirection >= scrollThreshold) {
              if (direction > 0) {
                // scrolling down
                nav.classList.add("hide");
              } else {
                // scrolling up
                nav.classList.remove("hide");
              }
              movedInDirection = 0;
            }
          }

          lastScrollY = currentScrollY;
        },
        { passive: true },
      );

      window.addEventListener("resize", () => {
        if (!canScrollPage()) {
          nav.classList.remove("hide");
          lastScrollY = 0;
          direction = 0;
          movedInDirection = 0;
        }
      });
    }
  });

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    if (wasInstallBannerDismissed()) return;
    deferredPrompt = e;
    setTimeout(() => {
      const b = document.getElementById("install-banner");
      if (b) b.classList.add("show");
    }, 1000);
  });

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    const swUrl = "../sw.js";

    // Register in both local and production HTTP(S) environments.
    fetch(swUrl, { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          return navigator.serviceWorker.register(swUrl);
        }
        return null;
      })
      .catch(() => {});
  }
})();
