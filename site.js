(function(){
  const root=document.documentElement;
  const saved=localStorage.getItem('igris-theme');
  root.dataset.theme=saved==='dark'?'dark':'light';

  const toggle=document.getElementById('themeToggle');
  function updateTheme(){
    const dark=root.dataset.theme==='dark';
    if(toggle){
      toggle.textContent=dark?'☼':'☾';
      toggle.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');
      toggle.setAttribute('aria-pressed',dark?'true':'false');
      toggle.title=dark?'Switch to light theme':'Switch to dark theme';
    }
  }
  updateTheme();
  if(toggle) toggle.addEventListener('click',()=>{
    root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';
    localStorage.setItem('igris-theme',root.dataset.theme);
    updateTheme();
  });

  const btn=document.getElementById('menuBtn'), menu=document.getElementById('mobileMenu');
  if(btn&&menu){
    btn.addEventListener('click',()=>{
      const open=menu.classList.toggle('open');
      btn.setAttribute('aria-expanded',open);
      btn.textContent=open?'×':'☰';
    });
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      menu.classList.remove('open'); btn.textContent='☰'; btn.setAttribute('aria-expanded','false');
    }));
  }

  if('IntersectionObserver' in window){
    const obs=new IntersectionObserver(es=>es.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target);}
    }),{threshold:.12});
    document.querySelectorAll('.reveal').forEach(e=>obs.observe(e));
  } else document.querySelectorAll('.reveal').forEach(e=>e.classList.add('in'));

  const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();

  // Full-screen Work image viewer.
  const lb=document.getElementById('lightbox');
  if(lb){
    const img=lb.querySelector('#lbImg'), cap=lb.querySelector('#lbCap');
    const close=()=>{lb.classList.remove('open');document.body.style.overflow='';if(img)img.removeAttribute('src');};
    const open=(im,caption)=>{
      img.src=im.currentSrc||im.src; img.alt=im.alt||''; if(cap)cap.textContent=caption||im.alt||'';
      lb.classList.add('open');document.body.style.overflow='hidden';
    };
    document.querySelectorAll('[data-lightbox]').forEach(el=>{
      const im=el.querySelector('img'); if(!im)return;
      el.addEventListener('click',e=>{if(e.target.closest('a,button'))return;e.preventDefault();open(im,el.dataset.caption);});
      el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(im,el.dataset.caption);}});
      if(!el.hasAttribute('tabindex'))el.setAttribute('tabindex','0');
    });
    const c=document.getElementById('lbClose');if(c)c.addEventListener('click',close);
    lb.addEventListener('click',e=>{if(e.target===lb)close();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&lb.classList.contains('open'))close();});
  }


  // Also support plain images on Work page without changing their surrounding links.
  document.querySelectorAll('main img[data-lightbox-img]').forEach(im=>{
    im.style.cursor='zoom-in';
    im.addEventListener('click',e=>{
      e.preventDefault(); e.stopPropagation();
      if(!lb)return;
      const box=lb.querySelector('#lbImg'), cap=lb.querySelector('#lbCap');
      if(box){box.src=im.currentSrc||im.src;box.alt=im.alt||'';}
      if(cap)cap.textContent=im.alt||'';
      lb.classList.add('open');document.body.style.overflow='hidden';
    });
  });

  // Pixel & Proof floating live-work viewer. Uses embedded templates so it works
  // without requiring external project hosting.
  const modal=document.getElementById('previewModal');
  const frame=document.getElementById('modalFrame');
  const label=document.getElementById('previewLabel');
  if(modal&&frame){
    function preview(card){
      const id=card.getAttribute('data-site');
      const tpl=document.getElementById('site'+id+'HTML');
      if(!tpl)return;
      frame.srcdoc='<!doctype html>'+tpl.innerHTML.trim();
      if(label)label.textContent=(card.querySelector('.proof-name')||card.querySelector('h3'))?.textContent+' — Live Web-Work' || 'Live Web-Work';
      modal.classList.add('open');document.body.style.overflow='hidden';
    }
    function close(){modal.classList.remove('open');frame.srcdoc='';document.body.style.overflow='';}
    document.querySelectorAll('.proof-card[data-site]').forEach(card=>{
      card.addEventListener('click',()=>preview(card));
      card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();preview(card);}});
      card.setAttribute('tabindex','0');
      card.setAttribute('role','button');
    });
    const c=document.getElementById('previewModalClose');if(c)c.addEventListener('click',close);
    modal.addEventListener('click',e=>{if(e.target===modal)close();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))close();});
  }
})();