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

/* Igris cookie & privacy notice */
(function(){
  if (window.__igrisCookieNotice) return;
  window.__igrisCookieNotice = true;

  const KEY='igris_cookie_notice_v1';
  if(localStorage.getItem(KEY)==='accepted') return;

  const style=document.createElement('style');
  style.textContent=`
    .igris-cookie-notice{
      position:fixed;left:18px;bottom:18px;z-index:99990;
      width:min(355px,calc(100vw - 36px));padding:18px 18px 16px;
      border:1px solid rgba(0,0,0,.11);border-radius:20px;
      background:rgba(255,255,255,.96);color:#151217;
      box-shadow:0 18px 55px rgba(18,10,24,.16);
      backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
      font-family:inherit;transition:background .28s ease,color .28s ease,
      border-color .28s ease,box-shadow .28s ease;
      animation:igrisCookieIn .38s cubic-bezier(.2,.8,.2,1)
    }
    [data-theme="dark"] .igris-cookie-notice{
      background:rgba(18,15,21,.96);color:#fff;
      border-color:rgba(255,255,255,.11);
      box-shadow:0 18px 55px rgba(0,0,0,.38)
    }
    .igris-cookie-top{display:flex;gap:12px;align-items:flex-start}
    .igris-cookie-icon{
      flex:0 0 34px;width:34px;height:34px;border-radius:11px;
      display:grid;place-items:center;background:#151217;color:#fff;
      font-size:15px;transition:background .22s ease,color .22s ease
    }
    [data-theme="dark"] .igris-cookie-icon{background:#e1062f;color:#fff}
    .igris-cookie-title{margin:1px 0 5px;font-size:13px;font-weight:750}
    .igris-cookie-text{margin:0;font-size:11.5px;line-height:1.58;opacity:.64}
    .igris-cookie-text a{
      color:inherit;font-weight:700;text-decoration:underline;
      text-decoration-color:rgba(225,6,47,.55);text-underline-offset:2px
    }
    .igris-cookie-actions{display:flex;gap:8px;margin-top:15px}
    .igris-cookie-btn{
      min-height:35px;border-radius:10px;padding:9px 14px;
      font:inherit;font-size:11px;font-weight:750;cursor:pointer;
      transition:background .18s ease,color .18s ease,border-color .18s ease,
      transform .18s ease
    }
    .igris-cookie-btn:hover{transform:translateY(-1px)}

    /* Light: black, hover red */
    .igris-cookie-accept{border:1px solid #151217;color:#fff;background:#151217}
    .igris-cookie-accept:hover,.igris-cookie-accept:focus-visible{
      border-color:#e1062f;background:#e1062f;color:#fff
    }

    /* Dark: red, hover black */
    [data-theme="dark"] .igris-cookie-accept{
      border-color:#e1062f;background:#e1062f;color:#fff
    }
    [data-theme="dark"] .igris-cookie-accept:hover,
    [data-theme="dark"] .igris-cookie-accept:focus-visible{
      border-color:#151217;background:#151217;color:#fff
    }

    .igris-cookie-policy{
      border:1px solid rgba(0,0,0,.12);color:inherit;background:transparent
    }
    .igris-cookie-policy:hover,.igris-cookie-policy:focus-visible{
      border-color:#e1062f;color:#e1062f
    }
    [data-theme="dark"] .igris-cookie-policy{border-color:rgba(255,255,255,.14)}
    [data-theme="dark"] .igris-cookie-policy:hover,
    [data-theme="dark"] .igris-cookie-policy:focus-visible{
      border-color:#151217;color:#fff;background:#151217
    }

    @keyframes igrisCookieIn{
      from{opacity:0;transform:translateY(14px)}
      to{opacity:1;transform:translateY(0)}
    }
    @media(max-width:520px){
      .igris-cookie-notice{left:12px;bottom:12px;width:calc(100vw - 24px);
      padding:16px;border-radius:18px}
    }
  `;
  document.head.appendChild(style);

  const box=document.createElement('aside');
  box.className='igris-cookie-notice';
  box.setAttribute('aria-label','Cookie and privacy notice');
  box.innerHTML=`
    <div class="igris-cookie-top">
      <div class="igris-cookie-icon" aria-hidden="true">◌</div>
      <div>
        <div class="igris-cookie-title">A quick privacy note</div>
        <p class="igris-cookie-text">
          Igris uses essential cookies and local storage to remember things like your theme and this notice.
          <a href="privacy.html">Privacy & Security</a>
        </p>
      </div>
    </div>
    <div class="igris-cookie-actions">
      <button class="igris-cookie-btn igris-cookie-accept" type="button">Got it</button>
      <button class="igris-cookie-btn igris-cookie-policy" type="button">Privacy</button>
    </div>`;
  document.body.appendChild(box);

  const accept=()=>{
    localStorage.setItem(KEY,'accepted');
    box.style.opacity='0';box.style.transform='translateY(10px)';
    box.style.transition='opacity .2s ease,transform .2s ease';
    setTimeout(()=>box.remove(),210);
  };
  box.querySelector('.igris-cookie-accept').addEventListener('click',accept);
  box.querySelector('.igris-cookie-policy').addEventListener('click',()=>location.href='privacy.html');
})();

