document.addEventListener('DOMContentLoaded', () => {
  const motos = [
    { id:1, marca:'Honda', modelo:'CB 500F', ano:2023, preco:34990, oferta:31990, img:'https://i0.statig.com.br/bancodeimagens/d8/p6/hn/d8p6hnxvywjfqp3w7sgkzxcp4.jpg', detalhes:"Motor 471cc, 47 cv, suspensão dianteira telescópica, freio ABS, tanque 17,1L, ótimo para cidade e estrada." },
    { id:2, marca:'Honda', modelo:'CBR 650R', ano:2024, preco:57990, oferta:53990, img:'https://images.medialinksonline.com/imagestream/19131/6338271x1024x0_FFFFFF_L_.jpg', detalhes:"Motor 649cc, 95 cv, carenagem esportiva, freio ABS, painel digital, ideal para esportivas e estrada." },
    { id:3, marca:'Yamaha', modelo:'MT-03', ano:2025, preco:33990, oferta:31990, img:'https://crmotos.com/wp-content/uploads/2021/05/yamaha-mt03-2022-2.jpg', detalhes:"Motor 321cc, 42 cv, naked esportiva, leve e ágil, freio ABS, tanque 14L, ótima para cidade." },
    { id:4, marca:'Yamaha', modelo:'R3', ano:2024, preco:32990, oferta:null, img:'https://images5.1000ps.net/images_bikekat/2024/4-Yamaha/7961-YZF_R3/008-638354659130741641-yamaha-yzf-r3.jpg', detalhes:"Motor 321cc, 42 cv, esportiva leve, carenagem aerodinâmica, freios ABS, painel digital, tanque 14L." },
    { id:5, marca:'Kawasaki', modelo:'Ninja 400', ano:2024, preco:38990, oferta:36990, img:'https://motonewsbrasil.com/wp-content/uploads/2023/02/2024-kawasaki-Ninja-ZX-4RR-studio-front-right.jpg', detalhes:"Motor 399cc, 47 cv, carenagem esportiva, freios ABS, painel digital, tanque 14L, perfeita para iniciantes e estrada." },
    { id:6, marca:'Kawasaki', modelo:'Z900', ano:2022, preco:66990, oferta:62990, img:'https://motociclismoonline.com.br/wp-content/uploads/2021/09/z900se-2022-1.jpg', detalhes:"Motor 948cc, 125 cv, naked potente, suspensão ajustável, freios ABS, tanque 17L, ideal para estrada e performance." },
    { id:7, marca:'BMW', modelo:'G 310 R', ano:2023, preco:38900, oferta:35900, img:'https://motonewsbrasil.com/wp-content/uploads/2022/07/bmw-g-310-r-2023-Style-Passion-Racing-red-frontal-direita.jpg', detalhes:"Motor 313cc, 34 cv, naked leve, freio ABS, painel digital, tanque 11L, perfeita para cidade." },
    { id:8, marca:'BMW', modelo:'S 1000 RR', ano:2021, preco:119900, oferta:114900, img:'https://portallubes.com.br/wp-content/uploads/2021/02/BMW-S-1000-RR-2021-1.jpg', detalhes:"Motor 999cc, 205 cv, superbike, carenagem completa, freios ABS, controle de tração, painel digital TFT, tanque 16,5L, para velocidade máxima." },
    { id:9, marca:'Ducati', modelo:'Monster+', ano:2024, preco:94900, oferta:null, img:'https://cdpcdn.dx1app.com/products/USA/DU/2024/MC/SPORT/MONSTER_30TH_ANNIVERSARIO/50/TBD/2000000001.jpg', detalhes:"Motor 937cc, 111 cv, naked italiana, freios ABS, suspensão premium, tanque 16L, estilo único e performance urbana/estrada." },
    { id:10, marca:'Ducati', modelo:'Panigale V2', ano:2022, preco:114900, oferta:109900, img:'https://images5.1000ps.net/images_bikekat/2025/5-Ducati/9917-Panigale_V2/001-638666497849750500-ducati-panigale-v2.jpg', detalhes:"Motor 955cc, 155 cv, superbike esportiva, carenagem aerodinâmica, freios ABS, painel TFT, tanque 16L, ideal para pista e estrada." },
  ];

  const catalog = document.getElementById('catalog');
  const filterMarca = document.getElementById('filterMarca');
  const sortPreco = document.getElementById('sortPreco');
  const searchInput = document.getElementById('searchInput');
  const tempDisplay = document.getElementById('tempDisplay');
  const chat = document.getElementById('chat');

  let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');

  // Preencher filtro de marcas
  [...new Set(motos.map(m => m.marca))].forEach(m => {
    const opt = document.createElement('option');
    opt.value = m; opt.textContent = m;
    filterMarca.appendChild(opt);
  });

  function formatPrice(value) {
    if (value == null) return '—';
    return Number(value).toLocaleString('pt-BR');
  }

  // Render catálogo
  function renderCatalog(list) {
    catalog.innerHTML = '';
    list.forEach(moto => {
      const card = document.createElement('div');
      card.className = 'card';
      const ofertaHtml = moto.oferta ? `<div class="oferta">Oferta: R$ ${formatPrice(moto.oferta)}</div>` : '';
      const precoDisplay = `R$ ${formatPrice(moto.preco)}`;

      card.innerHTML = `
        ${ofertaHtml}
        <span class="favorito ${favoritos.includes(moto.id) ? 'fav' : ''}" data-id="${moto.id}">&#10084;</span>
        <img src="${moto.img}" alt="${moto.modelo}" class="card-img">
        <h3>${moto.marca} ${moto.modelo}</h3>
        <p>${moto.ano} - ${precoDisplay}</p>
        <button class="detalhesBtn">Detalhes</button>
        <button class="compraBtn">Quero esta</button>
      `;

      catalog.appendChild(card);

      // favorito
      const favEl = card.querySelector('.favorito');
      favEl.addEventListener('click', () => {
        const id = moto.id;
        if (favoritos.includes(id)) favoritos = favoritos.filter(f => f !== id);
        else favoritos.push(id);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        updateCatalog();
      });

      // abrir imagem no modal
      const imgEl = card.querySelector('img');
      imgEl.addEventListener('click', () => openModal('imgModal', moto.img));

      // detalhes
      card.querySelector('.detalhesBtn').addEventListener('click', () => {
        document.getElementById('detalhesContent').innerHTML = `
          <h2>${moto.marca} ${moto.modelo}</h2>
          <p><b>Ano:</b> ${moto.ano}</p>
          <p><b>Preço:</b> R$ ${formatPrice(moto.preco)}</p>
          <p><b>Oferta:</b> ${moto.oferta ? 'R$ ' + formatPrice(moto.oferta) : 'Sem oferta'}</p>
          <p><b>Detalhes:</b> ${moto.detalhes}</p>
          <img src="${moto.img}" alt="${moto.modelo}">
        `;
        openModal('detalhesModal');
      });

      // compra
      card.querySelector('.compraBtn').addEventListener('click', () => {
        const preco = moto.oferta ?? moto.preco;
        const parcelas = 12;
        const valorParcela = (preco / parcelas).toFixed(2);
        document.getElementById('compraContent').innerHTML = `
          <h2>Compra - ${moto.marca} ${moto.modelo}</h2>
          <p>Preço: R$ ${formatPrice(preco)}</p>
          <p>Parcelas: ${parcelas}x de R$ ${Number(valorParcela).toLocaleString('pt-BR')}</p>
          <p>Retire em nossas lojas: SP, RJ, MG</p>
          <a href="https://www.exemplo.com/compra-em-processo" target="_blank">
            <button>Ir para compra</button>
          </a>
        `;
        openModal('compraModal');
      });
    });
  }

  // abrir modal (imagem ou outros)
  function openModal(modalId, imgSrc = null) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    if (modalId === 'imgModal' && imgSrc) {
      const modalImg = document.getElementById('modalImg');
      if (modalImg) modalImg.src = imgSrc;
    }
    modal.style.display = 'flex';
  }

  // fechar modais
  document.querySelectorAll('.close').forEach(btn => {
    btn.addEventListener('click', e => {
      const modal = e.target.closest('.modal');
      if (modal) modal.style.display = 'none';
    });
  });
  document.querySelectorAll('.modal').forEach(modalEl => {
    modalEl.addEventListener('click', e => {
      if (e.target === modalEl) modalEl.style.display = 'none';
    });
  });

  // render inicial
  renderCatalog(motos);

  // filtros e pesquisa
  function updateCatalog() {
    let list = [...motos];
    const marca = filterMarca.value;
    if (marca && marca !== 'Todas') list = list.filter(m => m.marca === marca);

    const search = (searchInput.value || '').trim().toLowerCase();
    if (search) list = list.filter(m => m.marca.toLowerCase().includes(search) || m.modelo.toLowerCase().includes(search));

    const sort = sortPreco.value;
    if (sort === 'asc') list.sort((a, b) => (a.oferta ?? a.preco) - (b.oferta ?? b.preco));
    if (sort === 'desc') list.sort((a, b) => (b.oferta ?? b.preco) - (a.oferta ?? a.preco));

    renderCatalog(list);
  }

  filterMarca.addEventListener('change', updateCatalog);
  sortPreco.addEventListener('change', updateCatalog);
  searchInput.addEventListener('input', updateCatalog);

  // Chat assistente
  document.getElementById('chat-toggle').addEventListener('click', () => chat.style.display = 'flex');
  document.getElementById('closeChat').addEventListener('click', () => chat.style.display = 'none');

  function sendMessage() {
    const input = document.getElementById('userMessage');
    if (!input || !input.value.trim()) return;
    const chatMessages = document.getElementById('chat-messages');

    const userDiv = document.createElement('div');
    userDiv.className = 'message user-msg';
    userDiv.textContent = input.value.trim();
    chatMessages.appendChild(userDiv);
    input.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      const respDiv = document.createElement('div');
      respDiv.className = 'message bot-msg';
      const text = userDiv.textContent.toLowerCase();
      const modelo = motos.find(m => text.includes(m.modelo.toLowerCase()));
      const marca = motos.find(m => text.includes(m.marca.toLowerCase()));
      if (modelo) respDiv.textContent = `Ótima escolha! A ${modelo.marca} ${modelo.modelo} é potente e elegante. Quer ver detalhes ou comprar? 😉`;
      else if (marca) respDiv.textContent = `A marca ${marca.marca} é top! Temos várias motos dessa marca. Quer que eu mostre?`;
      else {
        const respostas = [
          "Essa moto é incrível! Quer ver os detalhes ou ofertas?",
          "Temos várias cores e opções de parcelamento. Quer que eu mostre?",
          "Essa moto é perfeita para estrada ou cidade. Posso te enviar mais informações?"
        ];
        respDiv.textContent = respostas[Math.floor(Math.random() * respostas.length)];
      }
      chatMessages.appendChild(respDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 800);
  }

  document.getElementById('sendMessage').addEventListener('click', sendMessage);
  document.getElementById('userMessage').addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });

  // Temperatura (OpenWeather)
  const apiKey = 'SUA_API_KEY_AQUI'; // substitua pela sua chave válida
  async function getTemp() {
    if (!apiKey || apiKey.includes('SUA_API_KEY')) {
      tempDisplay.textContent = '🌡️ 24°C';
      return;
    }
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Jundiaí,BR&units=metric&lang=pt_br&appid=${apiKey}`);
      if (!res.ok) throw new Error('Resposta da API não OK');
      const data = await res.json();
      const temp = data?.main?.temp;
      tempDisplay.textContent = (typeof temp === 'number') ? `🌡️ ${Math.round(temp)}°C` : '🌡️ --°C';
    } catch (err) {
      console.error('Erro ao buscar temperatura:', err);
      tempDisplay.textContent = '🌡️ 24°C';
    }
  }
  getTemp();
  setInterval(getTemp, 60000);
});
