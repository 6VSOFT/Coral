const categories = {
  marine: {label:'MARINE & CORAL',title:'一方鱼缸，<br>一片缤纷海洋。',description:'探索海水观赏鱼、珊瑚与海水缸相关器材。为心中的海底风景，寻找适合的搭配。',tags:['海水观赏鱼','珊瑚','海水缸器材'],image:'assets/store-reef.png',alt:'珊瑚水族门店实拍：海水珊瑚缸'},
  freshwater: {label:'FRESHWATER AQUARIUM',title:'一抹灵动，<br>让日常多点生机。',description:'从淡水观赏鱼到鱼缸与日常养护用品，探索适合你的水族组合。准备好鱼缸尺寸和饲养想法，来店里寻找灵感。',tags:['淡水观赏鱼','鱼缸与配件','饲料与养护用品'],image:'assets/aquarium.jpg',alt:'淡水观赏鱼主题示意图'},
  tackle: {label:'FISHING & TACKLE',title:'带上装备，<br>赴一场与水的约。',description:'探索鱼竿、钓具与垂钓配件。告诉门店你的垂钓方式、目标鱼种与预算，了解适合下一次出行的装备。',tags:['鱼竿','钓具','垂钓配件'],image:'assets/fishing.jpg',alt:'钓者在户外水边抛竿的主题示意图'}
};
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectCategory(key, focus = false) {
  const category = categories[key];
  if (!category) return;
  tabs.forEach(tab => { const selected = tab.dataset.category === key; tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1; if(selected && focus) tab.focus(); });
  document.querySelector('#product-panel').setAttribute('aria-labelledby','tab-' + key);
  document.querySelector('#product-label').textContent = category.label;
  document.querySelector('#product-title').innerHTML = category.title;
  document.querySelector('#product-description').textContent = category.description;
  const photo = document.querySelector('#product-photo'); photo.src = category.image; photo.alt = category.alt;
  document.querySelector('#product-photo-label').textContent = key === 'marine' ? '门店实拍' : '灵感示意图片';
  document.querySelector('#product-tags').replaceChildren(...category.tags.map(tag => {const li = document.createElement('li'); li.textContent = tag; return li;}));
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectCategory(tab.dataset.category));
  tab.addEventListener('keydown', event => {
    let next;
    if(event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if(event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if(event.key === 'Home') next = 0;
    if(event.key === 'End') next = tabs.length - 1;
    if(next !== undefined) {event.preventDefault(); selectCategory(tabs[next].dataset.category, true);}
  });
});
document.querySelector('[data-open-tackle]').addEventListener('click', () => selectCategory('tackle'));
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','展开导航'); nav.classList.remove('is-open');}
menu.addEventListener('click', () => {const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded',String(open)); menu.setAttribute('aria-label', open ? '收起导航' : '展开导航'); nav.classList.toggle('is-open',open);});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
document.addEventListener('keydown', event => {if(event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true'){closeMenu();menu.focus();}});
document.addEventListener('click', event => {if(!event.target.closest('.header')) closeMenu();});
document.querySelector('#copy-address').addEventListener('click', async () => {
  const address = '181, Jalan Pahlawan 1, Taman Ungku Tun Aminah, 81300 Johor Bahru, Johor, Malaysia';
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText(address); status.textContent = '地址已复制'; }
  catch { status.textContent = '请选取上方地址复制'; }
  setTimeout(() => {status.textContent = '';}, 5000);
});
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('a[href="#source-note"]').addEventListener('click', () => {document.querySelector('#source-note').open = true;});

const photoDialog = document.querySelector('.photo-dialog');
let photoTrigger;
document.querySelectorAll('[data-photo]').forEach(button => {
  button.addEventListener('click', () => {
    photoTrigger = button;
    const image = document.querySelector('#full-photo');
    image.src = button.dataset.photo;
    image.alt = button.querySelector('img').alt;
    document.querySelector('#photo-dialog-title').textContent = button.dataset.caption;
    photoDialog.showModal();
    document.body.classList.add('photo-open');
  });
});
document.querySelector('.photo-close').addEventListener('click', () => photoDialog.close());
photoDialog.addEventListener('click', event => {if(event.target === photoDialog) photoDialog.close();});
photoDialog.addEventListener('close', () => {document.body.classList.remove('photo-open'); photoTrigger?.focus();});
