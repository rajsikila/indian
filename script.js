const ART_DATA = [
  {
    id: 'kalamkari',
    title: 'Kalamkari',
    place: 'Andhra Pradesh',
    coords: { x: 220, y: 200 },
    description: 'Kalamkari is a hand-painted textile art using natural dyes.',
    img: 'https://via.placeholder.com/200x150?text=Kalamkari',
    tags: ['Textile','Painting']
  },
  {
    id: 'madhubani',
    title: 'Madhubani',
    place: 'Bihar',
    coords: { x: 570, y: 280 },
    description: 'Madhubani paintings are known for intricate patterns.',
    img: 'https://via.placeholder.com/200x150?text=Madhubani',
    tags: ['Painting','Folk']
  }
];

const markersLayer = document.getElementById('markers');
const tooltip = document.getElementById('tooltip');
const listContainer = document.getElementById('listings');
const filterGroup = document.getElementById('filterGroup');
const searchInput = document.getElementById('search');
const resetBtn = document.getElementById('reset');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');

let activeFilter = null;

/* Build filter chips */
function renderChips(){
  filterGroup.innerHTML = '';
  const anyChip = document.createElement('button');
  anyChip.className='chip active';
  anyChip.textContent = 'All';
  anyChip.onclick = ()=>{ activeFilter=null; renderChips(); renderListings(); renderMarkers(); }
  filterGroup.appendChild(anyChip);
  const tags = [...new Set(ART_DATA.flatMap(a => a.tags))];
  tags.forEach(tag=>{
    const b = document.createElement('button');
    b.className='chip' + (activeFilter===tag? ' active':'');
    b.textContent = tag;
    b.onclick = ()=>{ activeFilter = (activeFilter===tag? null: tag); renderChips(); renderListings(); renderMarkers(); }
    filterGroup.appendChild(b);
  })
}

/* Create marker */
function createMarker(d){
  const g = document.createElementNS('http://www.w3.org/2000/svg','g');
  g.setAttribute('class','marker');
  g.setAttribute('transform',`translate(${d.coords.x}, ${d.coords.y})`);

  const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
  circle.setAttribute('r',8);
  circle.setAttribute('fill','#b35414');
  g.appendChild(circle);

  g.addEventListener('mouseenter', ()=>{
    tooltip.style.display='block';
    tooltip.textContent = `${d.title} — ${d.place}`;
  });
  g.addEventListener('mouseleave', ()=> tooltip.style.display='none');
  g.addEventListener('mousemove', (ev)=>{
    const wrap = document.getElementById('mapWrap').getBoundingClientRect();
    tooltip.style.left = (ev.clientX - wrap.left)+'px';
    tooltip.style.top = (ev.clientY - wrap.top)+'px';
  });
  g.addEventListener('click', ()=> openDetail(d));

  return g;
}

/* Render markers */
function renderMarkers(){
  markersLayer.innerHTML = '';
  ART_DATA.forEach(d=>{
    if(activeFilter && !d.tags.includes(activeFilter)) return;
    markersLayer.appendChild(createMarker(d));
  });
}

/* Render listing */
function renderListings(){
  listContainer.innerHTML='';
  ART_DATA.filter(d=>{
    if(activeFilter && !d.tags.includes(activeFilter)) return false;
    const q = searchInput.value.trim().toLowerCase();
    if(!q) return true;
    return (d.title + d.place + d.description).toLowerCase().includes(q);
  }).forEach(d=>{
    const card = document.createElement('div');
    card.className='art-card';
    card.innerHTML = `
      <img src="${d.img}" alt="${d.title}">
      <div class="art-info">
        <h4>${d.title}</h4>
        <p>${d.place}</p>
        <p>${d.description}</p>
        <button>Open</button>
      </div>`;
    card.querySelector('button').onclick = ()=> openDetail(d);
    listContainer.appendChild(card);
  });
}

/* Modal */
function openDetail(d){
  modalBody.innerHTML = `
    <h2>${d.title}</h2>
    <div>${d.place}</div>
    <img src="${d.img}" alt="${d.title}">
    <p>${d.description}</p>
    <div><strong>Tags:</strong> ${d.tags.join(', ')}</div>
  `;
  modal.style.display='flex';
}
closeModal.onclick = ()=> modal.style.display='none';

/* Search & Reset */
searchInput.addEventListener('input', ()=>{ renderListings(); renderMarkers(); });
resetBtn.addEventListener('click', ()=>{
  searchInput.value=''; activeFilter=null;
  renderChips(); renderListings(); renderMarkers();
});

/* Init */
renderChips();
renderListings();
renderMarkers();
