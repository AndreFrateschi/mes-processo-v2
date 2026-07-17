(function () {
  const SESSION_KEY = "mes-yamaha-demo-session";
  const page = document.body.dataset.page;
  const CONTENT_KEY = "mes-yamaha-content-v1";
  let data = window.MES_DATA;
  try { const draft = localStorage.getItem(CONTENT_KEY); if (draft) data = JSON.parse(draft); } catch (_) { localStorage.removeItem(CONTENT_KEY); }
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const mesText = text => String(text).replace(/MES/g, '<span class="mes-accent">MES</span>');
  const safe = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

  function isLogged() { return sessionStorage.getItem(SESSION_KEY) === "active"; }
  function guard() { if (!isLogged()) location.replace("./"); }
  function logout() { sessionStorage.removeItem(SESSION_KEY); location.replace("./"); }
  function statusLabel(status) { return { done: "Concluído", evolving: "Em evolução", planned: "Planejado", attention: "Atenção" }[status] || status; }
  function counts(objectives) {
    return objectives.reduce((acc, item) => { acc.total++; acc[item.status] = (acc[item.status] || 0) + 1; return acc; }, { total: 0, done: 0, evolving: 0, planned: 0, attention: 0 });
  }
  function animateNumber(el, target, suffix = "%") {
    const start = performance.now(), duration = 900;
    const tick = now => { const p = Math.min(1, (now - start) / duration); el.textContent = `${Math.round(target * (1 - Math.pow(1 - p, 3)))}${suffix}`; if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }

  if (page === "login") return;
  if (location.pathname.endsWith("login.html") || !page) {
    const form = $("#login-form");
    if (form) {
      if (isLogged()) location.replace("app.html");
      form.addEventListener("submit", event => {
        event.preventDefault();
        const ok = $("#username").value === "admin" && $("#password").value === "admin";
        if (ok) { sessionStorage.setItem(SESSION_KEY, "active"); location.replace("app.html"); }
        else { const error = $("#login-error"); error.textContent = "Credenciais inválidas. Verifique usuário e senha."; form.classList.remove("shake"); void form.offsetWidth; form.classList.add("shake"); }
      });
      form.addEventListener("keydown", event => {
        if (event.key === "Enter") { event.preventDefault(); form.requestSubmit(); }
      });
    }
    return;
  }

  guard();
  $$('[data-logout]').forEach(button => button.addEventListener("click", logout));

  if (page === "overview") {
    const stages = data.stages;
    let activeKey = "mes";
    $("#main-text").innerHTML = mesText(data.program.mainText.replace(/PCP/g, data.settings.planningLabel));
    $("#program-concept").textContent = data.program.concept;
    $("#program-message").textContent = data.program.message;

    const nodes = $("#diagram-nodes");
    Object.entries(stages).forEach(([key, stage]) => {
      const button = document.createElement("button");
      button.className = `${key === "mes" ? "mes-hub" : "diagram-node"} node-${key}${key === activeKey ? " active" : ""}`;
      button.dataset.stage = key;
      button.setAttribute("aria-pressed", key === activeKey);
      if (key === "mes") button.innerHTML = `<span class="hub-orbit orbit-one"></span><span class="hub-orbit orbit-two"></span><span class="hub-live"><i></i> EM EVOLUÇÃO</span><span class="hub-kicker">${stage.category}</span><strong class="mes-accent">MES</strong><small>${stage.subtitle}</small><span class="hub-functions"><i>GL</i><i>ABS</i><i>ANDON</i><i>Qualidade</i></span>`;
      else button.innerHTML = `<span class="node-index">0${stage.order}</span><span class="node-kicker">${stage.category}</span><strong>${stage.cardTitle}</strong><small>${stage.subtitle}</small><i class="node-status"></i>${key === "automation" ? '<span class="automation-pulses"><i></i><i></i><i></i></span>' : ""}`;
      button.addEventListener("click", () => { activeKey = key; $$("[data-stage]").forEach(n => { n.classList.toggle("active", n.dataset.stage === key); n.setAttribute("aria-pressed", n.dataset.stage === key); }); renderDrawer(); });
      nodes.appendChild(button);
    });

    function renderDrawer() {
      const stage = stages[activeKey];
      $("#detail-drawer").innerHTML = `<div class="detail-number">0${stage.order}</div><div class="detail-copy"><p>${stage.category}</p><h2>${mesText(stage.shortTitle)}</h2><span>${mesText(stage.purpose)}</span></div><div class="detail-progress"><b>${stage.progress}%</b><span><i style="width:${stage.progress}%"></i></span></div><a class="evolution-link" href="detalhe.html?etapa=${activeKey}">Ver evolução →</a>`;
    }
    renderDrawer();

    $$("[data-view]").forEach(button => button.addEventListener("click", () => { $$("[data-view]").forEach(b => b.classList.remove("active")); button.classList.add("active"); $(".macro-page").classList.toggle("view-roles", button.dataset.view === "roles"); }));
    const allObjectives = Object.values(stages).flatMap(stage => stage.objectives);
    const c = counts(allObjectives);
    $("#program-counts").innerHTML = `<span><b>${c.total}</b> objetivos</span><span><b>${c.done}</b> concluídos</span><span><b>${c.evolving}</b> em evolução</span><span><b>${c.planned}</b> planejados</span>`;
    animateNumber($("#program-percent"), data.settings.programProgress);
    requestAnimationFrame(() => $("#program-bar").style.width = `${data.settings.programProgress}%`);
    $("#timeline").innerHTML = data.program.timeline.map((item, i) => `<span><b>0${i + 1}</b>${item}</span>`).join("");
    $("#story-toggle").addEventListener("click", () => { const story = $("#program-story"); story.hidden = !story.hidden; $("#story-toggle").textContent = story.hidden ? "Ver jornada do programa" : "Ocultar jornada"; });
  }

  if (page === "detail") {
    const key = new URLSearchParams(location.search).get("etapa") || "mes";
    const stage = data.stages[key] || data.stages.mes;
    document.title = `${stage.shortTitle} · Programa MES Yamaha`;
    $("#detail-number").textContent = `0${stage.order}`;
    $("#detail-category").textContent = stage.category;
    $("#detail-name").innerHTML = mesText(stage.shortTitle);
    $("#purpose-title").innerHTML = mesText(stage.shortTitle);
    $("#purpose-text").innerHTML = mesText(stage.purpose);
    $("#mes-relation").innerHTML = mesText(stage.mesRelation);
    animateNumber($("#stage-percent"), stage.progress);
    requestAnimationFrame(() => { $("#stage-bar").style.width = `${stage.progress}%`; $("#progress-ring").style.setProperty("--progress", `${stage.progress * 3.6}deg`); });
    let currentFilter = "all";
    const editor = $("#objective-editor");
    function updateKpis() { const c = counts(stage.objectives); $("#stage-kpis").innerHTML = `<span><small>Total</small><b>${c.total}</b></span><span><small>Concluídos</small><b>${c.done}</b></span><span><small>Em evolução</small><b>${c.evolving}</b></span><span><small>Planejados</small><b>${c.planned}</b></span><span><small>Evolução geral</small><b>${stage.progress}%</b></span>`; }
    function persist() { localStorage.setItem(CONTENT_KEY, JSON.stringify(data)); updateKpis(); renderObjectives(currentFilter); }
    function renderObjectives(filter = currentFilter) {
      currentFilter = filter;
      const items = stage.objectives.filter(item => filter === "all" || item.status === filter);
      $("#objectives-grid").innerHTML = items.map(item => `<article class="objective-card status-${safe(item.status)}"><header><span>OBJETIVO ${String(item.id).padStart(2,"0")}</span><b class="status-badge"><i></i>${statusLabel(item.status)}</b></header><button class="edit-card" data-edit-id="${item.id}">Editar</button><h2>${safe(item.name)}</h2><p>${safe(item.description)}</p><div class="objective-progress"><span><i style="width:${Number(item.progress) || 0}%"></i></span><b>${Number(item.progress) || 0}%</b></div><div class="deliveries">${item.deliveries.map(d => `<span>${safe(d)}</span>`).join("")}</div><footer><div><small>PRÓXIMO PASSO</small><b>${safe(item.nextStep)}</b></div><div><small>RESPONSÁVEL</small><b>${safe(item.owner)}</b></div></footer>${item.preliminary ? '<em>Validar com PO</em>' : ""}</article>`).join("") || '<p class="empty-state">Nenhum objetivo neste filtro.</p>';
      $$('[data-edit-id]').forEach(button => button.addEventListener("click", () => openEditor(stage.objectives.find(item => item.id === Number(button.dataset.editId)))));
    }
    function openEditor(item) {
      const isNew = !item;
      const objective = item || { id: "", name: "", description: "", status: "planned", progress: 0, deliveries: [], nextStep: "", owner: "A definir", preliminary: true };
      $("#editor-stage").textContent = stage.shortTitle;
      $("#editor-title").textContent = isNew ? "Criar novo objetivo" : "Editar objetivo";
      $("#objective-id").value = objective.id;
      $("#objective-name").value = objective.name;
      $("#objective-description").value = objective.description;
      $("#objective-status").value = objective.status;
      $("#objective-progress").value = objective.progress;
      $("#objective-deliveries").value = objective.deliveries.join(", ");
      $("#objective-next-step").value = objective.nextStep;
      $("#objective-owner").value = objective.owner;
      $("#objective-preliminary").checked = objective.preliminary;
      $("#delete-objective").hidden = isNew;
      $("#duplicate-objective").hidden = isNew;
      $("#editor-message").textContent = "";
      editor.showModal();
    }
    function formObjective(id) { return { id, name: $("#objective-name").value.trim(), description: $("#objective-description").value.trim(), status: $("#objective-status").value, progress: Math.max(0, Math.min(100, Number($("#objective-progress").value) || 0)), deliveries: $("#objective-deliveries").value.split(",").map(v => v.trim()).filter(Boolean), nextStep: $("#objective-next-step").value.trim(), owner: $("#objective-owner").value.trim() || "A definir", preliminary: $("#objective-preliminary").checked }; }
    $("#objective-form").addEventListener("submit", event => { event.preventDefault(); const existingId = Number($("#objective-id").value); if (existingId) { const index = stage.objectives.findIndex(item => item.id === existingId); stage.objectives[index] = formObjective(existingId); } else { const id = Math.max(0, ...stage.objectives.map(item => item.id)) + 1; stage.objectives.push(formObjective(id)); } persist(); editor.close(); });
    $("#delete-objective").addEventListener("click", () => { const id = Number($("#objective-id").value); if (id && confirm("Excluir este objetivo?")) { stage.objectives = stage.objectives.filter(item => item.id !== id); persist(); editor.close(); } });
    $("#duplicate-objective").addEventListener("click", () => { const id = Math.max(0, ...stage.objectives.map(item => item.id)) + 1; const copy = formObjective(id); copy.name += " (cópia)"; stage.objectives.push(copy); persist(); editor.close(); });
    $("#close-editor").addEventListener("click", () => editor.close());
    $("#new-objective").addEventListener("click", () => openEditor());
    $("#export-data").addEventListener("click", () => { const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = "mes-yamaha-data.json"; link.click(); URL.revokeObjectURL(url); });
    $("#import-data").addEventListener("change", event => { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { try { const imported = JSON.parse(reader.result); if (!imported.stages) throw new Error(); localStorage.setItem(CONTENT_KEY, JSON.stringify(imported)); location.reload(); } catch (_) { alert("Arquivo inválido. Selecione um JSON exportado por esta página."); } }; reader.readAsText(file); });
    updateKpis(); renderObjectives();
    $$('[data-filter]').forEach(button => button.addEventListener("click", () => { $$('[data-filter]').forEach(b => b.classList.remove("active")); button.classList.add("active"); renderObjectives(button.dataset.filter); }));
  }
})();
