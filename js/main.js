// Sharon Makeovers — main JS
(function(){
  // Scroll progress
  const bar = document.querySelector('.scroll-progress');
  const nav = document.querySelector('.navbar-soft');
  const top = document.querySelector('.back-top');
  window.addEventListener('scroll',()=>{
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    if(bar) bar.style.width = pct + '%';
    if(nav) nav.classList.toggle('scrolled', window.scrollY > 30);
    if(top) top.classList.toggle('show', window.scrollY > 500);
  });
  if(top) top.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  // Reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Gallery filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(b=>b.addEventListener('click',()=>{
    filterBtns.forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    const cat = b.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(it=>{
      it.style.display = (cat==='all' || it.dataset.cat===cat) ? '' : 'none';
    });
  }));

  // Lightbox
  const lb = document.querySelector('.lightbox');
  if(lb){
    const lbImg = lb.querySelector('img');
    document.querySelectorAll('.gallery-item img').forEach(img=>{
      img.addEventListener('click',()=>{ lbImg.src = img.src; lb.classList.add('open'); });
    });
    lb.addEventListener('click',(e)=>{ if(e.target===lb || e.target.classList.contains('close')) lb.classList.remove('open'); });
  }

  // Contact form -> Google Forms (placeholder action URL — update with real Form IDs)
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', async function(e){
      e.preventDefault();
      const data = new FormData(form);
      // Replace this URL + entry IDs with the real Google Form when ready.
      const GOOGLE_FORM_URL = form.dataset.googleForm || 'https://docs.google.com/forms/d/e/REPLACE_WITH_FORM_ID/formResponse';
      try{
        await fetch(GOOGLE_FORM_URL, { method:'POST', mode:'no-cors', body:data });
      }catch(err){ /* no-cors: silent */ }
      // Show success modal then redirect
      const modalEl = document.getElementById('successModal');
      if(modalEl && window.bootstrap){
        const m = new bootstrap.Modal(modalEl); m.show();
        setTimeout(()=>{ window.location.href='/thank-you.html'; }, 1800);
      } else {
        window.location.href='/thank-you.html';
      }
    });
  }

  // Active nav link
  const path = location.pathname.split('/').pop() || 'home.html';
  document.querySelectorAll('.navbar-soft .nav-link').forEach(l=>{
    const href = l.getAttribute('href');
    if(href && href.endsWith(path)) l.classList.add('active');
  });
})();
