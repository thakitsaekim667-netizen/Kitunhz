const galleryCards=[...document.querySelectorAll('.gallery-card')];
const galleryFilters=[...document.querySelectorAll('[data-gallery-filter]')];
const galleryCount=document.querySelector('.gallery-count');
const photoDialog=document.querySelector('#photo-dialog');
const photoImage=document.querySelector('#photo-image');
let currentPhoto=0;
let visiblePhotos=galleryCards;
function renderPhoto(index){
 currentPhoto=(index+visiblePhotos.length)%visiblePhotos.length;
 const card=visiblePhotos[currentPhoto];
 photoImage.src=card.dataset.full;
 photoImage.alt=card.querySelector('img').alt;
 photoImage.width=Number(card.dataset.width);
 photoImage.height=Number(card.dataset.height);
 document.querySelector('#photo-title').textContent=card.querySelector('.gallery-title').textContent;
 document.querySelector('#photo-caption').textContent=card.querySelector('.gallery-caption').textContent;
 document.querySelector('#photo-position').textContent=`${currentPhoto+1} / ${visiblePhotos.length} · THANAKIT SAEKIM`;
}
galleryCards.forEach(card=>card.addEventListener('click',()=>{renderPhoto(visiblePhotos.indexOf(card));photoDialog.showModal()}));
galleryFilters.forEach(button=>button.addEventListener('click',()=>{
 const category=button.dataset.galleryFilter;
 galleryFilters.forEach(filter=>filter.setAttribute('aria-pressed',String(filter===button)));
 galleryCards.forEach(card=>{card.hidden=category!=='all'&&card.dataset.category!==category});
 visiblePhotos=galleryCards.filter(card=>!card.hidden);
 galleryCount.textContent=`${visiblePhotos.length} ภาพ`;
}));
document.querySelector('.photo-close').addEventListener('click',()=>photoDialog.close());
document.querySelector('#photo-prev').addEventListener('click',()=>renderPhoto(currentPhoto-1));
document.querySelector('#photo-next').addEventListener('click',()=>renderPhoto(currentPhoto+1));
photoDialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();renderPhoto(currentPhoto-1)}else if(event.key==='ArrowRight'){event.preventDefault();renderPhoto(currentPhoto+1)}});
photoDialog.addEventListener('click',event=>{if(event.target===photoDialog){const r=photoDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)photoDialog.close()}});
