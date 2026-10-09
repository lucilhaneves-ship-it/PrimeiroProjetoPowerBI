/* ===== CONFIGURAÇÃO ===== */
// Cole aqui o link de incorporação do Power BI para carregar o dashboard automaticamente.
const URL_DO_RELATORIO = "";

// Valores dos indicadores. Atualize manualmente ou conecte a sua fonte de dados.
const INDICADORES = [
  { rotulo: "Faturamento",      valor: 49755.50, tipo: "moeda" },
  { rotulo: "Itens vendidos",   valor: 81,       tipo: "numero" },
  { rotulo: "Pedidos",          valor: 10,       tipo: "numero" },
  { rotulo: "Ticket médio",     valor: 4975.55,  tipo: "moeda" }
];

/* ===== INDICADORES ===== */
const fmt = {
  moeda:  v => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
  numero: v => v.toLocaleString("pt-BR")
};
document.getElementById("kpis").innerHTML = INDICADORES.map(i =>
  `<div class="kpi"><span>${i.rotulo}</span><strong>${fmt[i.tipo](i.valor)}</strong></div>`
).join("");

/* ===== DASHBOARD ===== */
const quadro = document.getElementById("quadro");
const vazio  = document.getElementById("vazio");
const erro   = document.getElementById("erro");
const btnAba = document.getElementById("btnAba");

function carregar(url){
  let u;
  try { u = new URL(url); } catch { return "Link inválido. Cole o endereço completo, começando com https://."; }
  if (u.protocol !== "https:") return "Use um link seguro, começando com https://.";
  if (!/powerbi\.com$/.test(u.hostname) && !/\.powerbi\.com$/.test(u.hostname) && !/\.microsoft\.com$/.test(u.hostname))
    return "O link precisa ser do Power BI (powerbi.com).";
  const f = document.createElement("iframe");
  f.title = "Dashboard de vendas e entregas";
  f.src = u.href;
  f.allowFullscreen = true;
  f.loading = "lazy";
  vazio.hidden = true;
  quadro.appendChild(f);
  btnAba.href = u.href;
  btnAba.hidden = false;
  return "";
}

document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  erro.textContent = carregar(document.getElementById("url").value.trim());
});
if (URL_DO_RELATORIO) carregar(URL_DO_RELATORIO);

/* Tela cheia */
document.getElementById("btnTela").addEventListener("click", () => {
  if (document.fullscreenElement) document.exitFullscreen();
  else if (quadro.requestFullscreen) quadro.requestFullscreen();
  else if (quadro.webkitRequestFullscreen) quadro.webkitRequestFullscreen();
});

/* Menu no celular */
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  menuBtn.setAttribute("aria-expanded", aberto);
});
menu.addEventListener("click", e => {
  if (e.target.tagName === "A") { menu.classList.remove("aberto"); menuBtn.setAttribute("aria-expanded", "false"); }
});