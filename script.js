// ----------------- LOGIN -----------------
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeLogin = document.getElementById("closeLogin");
const loginSubmit = document.getElementById("loginSubmit");
const userStatus = document.getElementById("userStatus");

loginBtn.onclick = () => {
  loginModal.style.display = "flex";
};

closeLogin.onclick = () => {
  loginModal.style.display = "none";
};

loginSubmit.onclick = () => {
  const email = document.getElementById("loginEmail").value;
  const phone = document.getElementById("loginPhone").value;
  const pass = document.getElementById("loginPassword").value;

  if (!email || !email.includes("@gmail.com")) {
    alert("Use um Gmail válido.");
    return;
  }
  if (!phone || phone.length < 8) {
    alert("Insira um número de telefone válido.");
    return;
  }
  if (!pass || pass.length < 4) {
    alert("Senha muito curta.");
    return;
  }

  const user = { email, phone };
  localStorage.setItem("userMoto", JSON.stringify(user));

  userStatus.innerText = "Logado como: " + email;
  loginModal.style.display = "none";
};

// Checar login ao carregar
window.onload = () => {
  const u = localStorage.getItem("userMoto");
  if (u) {
    const user = JSON.parse(u);
    userStatus.innerText = "Logado como: " + user.email;
  }
};


// ----------------- CATÁLOGO DE MOTOS (exemplo simples) -----------------

const motos = [
  { marca: "Honda", modelo: "CB 500F", preco: 32000, img: "https://i.ibb.co/3FmVQpC/moto1.jpg" },
  { marca: "Yamaha", modelo: "MT-03", preco: 28000, img: "https://i.ibb.co/cc3vh6V/moto2.jpg" },
  { marca: "BMW", modelo: "G 310R", preco: 35000, img: "https://i.ibb.co/NTfT9Bj/moto3.jpg" }
];

const catalog = document.getElementById("catalog");
const filterMarca = document.getElementById("filterMarca");
const sortPreco = document.getElementById("sortPreco");
const searchInput = document.getElementById("searchInput");

// Preencher marcas
let marcas = [...new Set(motos.map(m => m.marca))];
marcas.forEach(m => {
  const op = document.createElement("option");
  op.value = m;
  op.innerText = m;
  filterMarca.appendChild(op);
});

// Renderizar catálogo
function renderMotos() {
  catalog.innerHTML = "";

  let lista = [...motos];

  // Filtro marca
  if (filterMarca.value !== "Todas") {
    lista = lista.filter(m => m.marca === filterMarca.value);
  }

  // Busca
  const termo = searchInput.value.toLowerCase();
  lista = lista.filter(m =>
    m.marca.toLowerCase().includes(termo) ||
    m.modelo.toLowerCase().includes(termo)
  );

  // Ordenar preço
  if (sortPreco.value === "asc") lista.sort((a,b)=>a.preco - b.preco);
  if (sortPreco.value === "desc") lista.sort((a,b)=>b.preco - a.preco);

  lista.forEach(moto => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${moto.img}">
      <h3>${moto.marca} ${moto.modelo}</h3>
      <p>Preço: R$ ${moto.preco}</p>
    `;
    catalog.appendChild(card);
  });
}

searchInput.oninput = renderMotos;
filterMarca.onchange = renderMotos;
sortPreco.onchange = renderMotos;

renderMotos();
