// Shared motion controls and light scroll feedback; no animation render loop.
const pageMotion=document.querySelector('#page-motion');
function syncMotion(paused){
 document.body.classList.toggle('motion-paused',paused);
 document.querySelector('.tech-universe').classList.toggle('tech-paused',paused);
 pageMotion.setAttribute('aria-pressed',String(paused));
 pageMotion.setAttribute('aria-label',paused?'เล่นเอฟเฟกต์การเคลื่อนไหวต่อ':'หยุดเอฟเฟกต์การเคลื่อนไหว');
 pageMotion.innerHTML=paused?'<span aria-hidden="true">▷</span>':'<span aria-hidden="true">Ⅱ</span>';
 motionToggle.setAttribute('aria-pressed',String(paused));
 motionToggle.innerHTML=paused?'เล่นเอฟเฟกต์ต่อ <span aria-hidden="true">▷</span>':'หยุดเอฟเฟกต์ชั่วคราว <span aria-hidden="true">Ⅱ</span>';
}
pageMotion.addEventListener('click',()=>syncMotion(!document.body.classList.contains('motion-paused')));
motionToggle.addEventListener('click',()=>syncMotion(document.querySelector('.tech-universe').classList.contains('tech-paused')));
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
if(reducedMotion.matches)syncMotion(true);
reducedMotion.addEventListener('change',e=>syncMotion(e.matches));
const progress=document.querySelector('.reading-progress i');
const siteHeader=document.querySelector('header');
const navLinks=[...document.querySelectorAll('nav a[href^="#"]')];
const navSections=navLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
let scrollScheduled=false;
function updateScroll(){
 const max=document.documentElement.scrollHeight-innerHeight;
 progress.style.transform=`scaleX(${max>0?Math.min(1,scrollY/max):0})`;
 siteHeader.classList.toggle('scrolled',scrollY>20);
 let current='';
 for(const section of navSections){if(section.getBoundingClientRect().top<=190)current=section.id;}
 for(const link of navLinks){const active=link.hash==='#'+current;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}
 scrollScheduled=false;
}
addEventListener('scroll',()=>{if(!scrollScheduled){scrollScheduled=true;requestAnimationFrame(updateScroll)}},{passive:true});
addEventListener('resize',updateScroll);
updateScroll();
if('IntersectionObserver' in window){
 const reveal=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('section-enter');reveal.unobserve(entry.target)}}},{threshold:.08});
 document.querySelectorAll('.about,.section-head,.featured,.work-row,.tech-universe,.skills-grid,.experience-intro,.timeline article,.leadership,.gallery-section .section-head,.contact-grid').forEach(el=>reveal.observe(el));
}
