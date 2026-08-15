(function(){
const SUPABASE_URL='https://kjimyrewcnbpwzmoxxpv.supabase.co';
const SUPABASE_KEY='sb_publishable_ZVinjwmrApsFIt6YQ6Vb_w_DsrQPSYo';
const CDN='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
function load(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)})}
function injectStyles(){
 if(document.getElementById('igris-account-styles'))return;
 const s=document.createElement('style');s.id='igris-account-styles';s.textContent=`
#igris-account-float{position:fixed;right:22px;bottom:22px;z-index:99990;font-family:inherit}
#igris-account-float button{border:1px solid rgba(255,255,255,.15);background:rgba(20,16,22,.82);color:inherit;border-radius:999px;padding:11px 18px;font:inherit;font-size:13px;font-weight:600;cursor:pointer;box-shadow:0 12px 35px rgba(0,0,0,.24);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);transition:transform .22s ease,border-color .22s ease,box-shadow .22s ease}
#igris-account-float button:hover{transform:translateY(-2px);border-color:rgba(225,6,47,.58);box-shadow:0 15px 42px rgba(0,0,0,.3)}
#igris-account-modal{position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;padding:18px;background:rgba(5,4,7,.62);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
#igris-account-modal.open{display:flex}
.igris-auth-card{position:relative;width:min(455px,100%);max-height:90vh;overflow:auto;padding:30px;border:1px solid rgba(255,255,255,.13);border-radius:26px;background:var(--card-bg,#17141a);color:var(--text,#171717);box-shadow:0 30px 100px rgba(0,0,0,.38)}
.igris-auth-card h2{margin:0 0 7px;font-size:27px;letter-spacing:-.035em}
.igris-auth-card .auth-sub{margin:0 0 20px;opacity:.64;font-size:13px;line-height:1.55}
.igris-auth-close{position:absolute;right:15px;top:11px;border:0;background:none;color:inherit;font-size:25px;opacity:.55;cursor:pointer}
.igris-auth-field{margin:11px 0}.igris-auth-field label{display:block;font-size:10px;letter-spacing:.07em;opacity:.6;margin-bottom:6px}
.igris-auth-field input{width:100%;box-sizing:border-box;padding:12px 13px;border-radius:11px;border:1px solid rgba(0,0,0,.13);background:rgba(255,255,255,.5);color:inherit;outline:none;font:inherit}
[data-theme="dark"] .igris-auth-field input{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.12);color:#fff}
.igris-auth-row{display:flex;gap:9px;margin-top:12px}.igris-auth-row button{flex:1;padding:12px;border-radius:11px;border:1px solid rgba(0,0,0,.12);background:rgba(255,255,255,.35);color:inherit;font:inherit;font-size:13px;cursor:pointer}
[data-theme="dark"] .igris-auth-row button{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.12);color:#fff}
.igris-auth-row .primary{border:0;background:linear-gradient(135deg,#e1062f,#6939e8);color:#fff}
.igris-auth-link{border:0!important;background:none!important;opacity:.7;font-size:12px!important;padding:9px 3px!important}
.igris-auth-google{width:100%;margin-top:10px;padding:12px;border-radius:11px;border:1px solid rgba(0,0,0,.12);background:transparent;color:inherit;font:inherit;cursor:pointer}
[data-theme="dark"] .igris-auth-google{border-color:rgba(255,255,255,.13);color:#fff}
.igris-auth-divider{display:flex;align-items:center;gap:10px;margin:16px 0;font-size:10px;opacity:.42}.igris-auth-divider:before,.igris-auth-divider:after{content:"";height:1px;flex:1;background:currentColor}
.igris-auth-check{display:flex;gap:9px;align-items:flex-start;margin:13px 0;font-size:11px;line-height:1.5;opacity:.76}.igris-auth-check input{margin-top:3px;accent-color:#e1062f}
.igris-auth-check a{color:inherit;text-decoration:underline}
#igris-auth-msg{min-height:20px;margin-top:13px;font-size:12px;line-height:1.5;opacity:.78}
.igris-auth-success{text-align:center;padding:12px 3px}.igris-auth-success .ok{font-size:38px;margin-bottom:8px}
@media(max-width:600px){#igris-account-float{right:14px;bottom:14px}.igris-auth-card{padding:24px;border-radius:22px}}

/* Igris Project Account theme bridge */
#igris-account-modal .igris-auth-card{
  background:var(--igris-account-bg,#ffffff);
  color:var(--igris-account-text,#16131a);
  border-color:var(--igris-account-border,rgba(20,15,25,.12));
}
#igris-account-modal .igris-auth-field input{
  background:var(--igris-account-input,#f5f3f6);
  color:var(--igris-account-text,#16131a);
  border-color:var(--igris-account-border,rgba(20,15,25,.14));
}
#igris-account-modal .igris-auth-row button{
  background:var(--igris-account-button,rgba(20,15,25,.05));
  color:var(--igris-account-text,#16131a);
  border-color:var(--igris-account-border,rgba(20,15,25,.12));
}
#igris-account-modal .igris-auth-row .primary{
  background:linear-gradient(135deg,#e1062f,#6939e8)!important;color:#fff!important;border:0!important;
}
#igris-account-modal .igris-auth-link{color:var(--igris-account-text,#16131a)!important}
[data-theme="dark"] #igris-account-modal .igris-auth-card{
  --igris-account-bg:#17141a;--igris-account-text:#fff;--igris-account-border:rgba(255,255,255,.13);--igris-account-input:rgba(255,255,255,.06);--igris-account-button:rgba(255,255,255,.07);
}
[data-theme="light"] #igris-account-modal .igris-auth-card{
  --igris-account-bg:#fff;--igris-account-text:#17131a;--igris-account-border:rgba(20,15,25,.12);--igris-account-input:#f6f3f7;--igris-account-button:#f4f1f5;
}
@media (prefers-color-scheme:dark){
  #igris-account-modal .igris-auth-card:not([data-force-light]){
    --igris-account-bg:#17141a;--igris-account-text:#fff;--igris-account-border:rgba(255,255,255,.13);--igris-account-input:rgba(255,255,255,.06);--igris-account-button:rgba(255,255,255,.07);
  }
}
\n `;
document.head.appendChild(s);
}
function openModal(){document.getElementById('igris-account-modal')?.classList.add('open')}
function closeModal(){document.getElementById('igris-account-modal')?.classList.remove('open')}
function message(t){const e=document.getElementById('igris-auth-msg');if(e)e.textContent=t}
function loginView(){
 const c=document.getElementById('igris-auth-content');if(!c)return;
 c.innerHTML=`<h2>Project Account</h2><p class="auth-sub">Sign in to manage your projects, saved work and profile.</p>
 <div class="igris-auth-field"><label>EMAIL</label><input id="ia-email" type="email" autocomplete="email" placeholder="you@example.com"></div>
 <div class="igris-auth-field"><label>PASSWORD</label><input id="ia-password" type="password" autocomplete="current-password" placeholder="Your password"></div>
 <div class="igris-auth-row"><button class="primary" id="ia-login">Sign in</button><button id="ia-register">Create account</button></div>
 <div class="igris-auth-row"><button class="igris-auth-link" id="ia-forgot">Forgot password?</button><button class="igris-auth-link" id="ia-account">My account</button></div>
 <div id="igris-auth-msg"></div>`;
 document.getElementById('ia-login').onclick=async()=>{const r=await window.igrisSupabase.auth.signInWithPassword({email:document.getElementById('ia-email').value.trim(),password:document.getElementById('ia-password').value});if(r.error)return message(r.error.message);location.href='account.html'};
 document.getElementById('ia-register').onclick=registerView;
 document.getElementById('ia-forgot').onclick=async()=>{const e=document.getElementById('ia-email').value.trim();if(!e)return message('Enter your email first.');const r=await window.igrisSupabase.auth.resetPasswordForEmail(e,{redirectTo:new URL('update-password.html',location.href).href});message(r.error?r.error.message:'Password reset email sent. Check your inbox.')};
 document.getElementById('ia-account').onclick=async()=>{const r=await window.igrisSupabase.auth.getUser();if(r.data.user)location.href='account.html';else message('Please sign in first.')};
}
function registerView(){
 const c=document.getElementById('igris-auth-content');if(!c)return;
 c.innerHTML=`<h2>Create account</h2><p class="auth-sub">Create your Project Account. Your username must be unique. Phone is optional.</p>
 <div class="igris-auth-field"><label>NAME</label><input id="ia-name" autocomplete="name" placeholder="Your name"></div>
 <div class="igris-auth-field"><label>USERNAME</label><input id="ia-username" autocomplete="username" placeholder="Choose a unique username"></div>
 <div class="igris-auth-field"><label>PHONE <span style="opacity:.5">(OPTIONAL)</span></label><input id="ia-phone" type="tel" autocomplete="tel" placeholder="Phone number"></div>
 <div class="igris-auth-field"><label>EMAIL</label><input id="ia-email" type="email" autocomplete="email" placeholder="you@example.com"></div>
 <div class="igris-auth-field"><label>PASSWORD</label><input id="ia-password" type="password" autocomplete="new-password" placeholder="At least 6 characters"></div>
 <label class="igris-auth-check"><input id="ia-privacy" type="checkbox"><span>I agree to the <a href="privacy.html" target="_blank" rel="noopener">Privacy & Security</a> policy.</span></label>
 <label class="igris-auth-check"><input id="ia-terms" type="checkbox"><span>By continuing, you agree to our <a href="privacy.html#terms" target="_blank" rel="noopener">Terms & Conditions</a>.</span></label>
 <div class="igris-auth-row"><button class="primary" id="ia-create-submit">Create account</button><button id="ia-back">Back to sign in</button></div><div id="igris-auth-msg"></div>`;
 document.getElementById('ia-back').onclick=loginView;
 document.getElementById('ia-create-submit').onclick=async()=>{
   const name=document.getElementById('ia-name').value.trim(),username=document.getElementById('ia-username').value.trim().toLowerCase(),phone=document.getElementById('ia-phone').value.trim(),email=document.getElementById('ia-email').value.trim(),password=document.getElementById('ia-password').value,privacy=document.getElementById('ia-privacy').checked,terms=document.getElementById('ia-terms').checked;
   if(!name||!username||!email||!password)return message('Name, username, email and password are required.');
   if(!/^[a-z0-9_](?:[a-z0-9._-]{1,28}[a-z0-9_])?$/.test(username))return message('Username: 3–30 characters using letters, numbers, dot, dash or underscore.');
   if(password.length<6)return message('Password must be at least 6 characters.');
   if(!privacy)return message('You must agree to the Privacy & Security policy before registering.'); if(!terms)return message('You must agree to the Terms & Conditions before registering.');
   const b=document.getElementById('ia-create-submit');b.disabled=true;b.textContent='Creating…';
   const r=await window.igrisSupabase.auth.signUp({email,password,options:{data:{display_name:name,username,phone:phone||null}}});
   if(r.error){b.disabled=false;b.textContent='Create account';return message(r.error.message)}
   if(r.data.session){location.href='account.html';return}
   c.innerHTML=`<div class="igris-auth-success"><div class="ok">✓</div><h2>Account created successfully</h2><p class="auth-sub">A verification email has been sent to <b>${email}</b>. Verify your email, then return here and use <b>Sign in</b> to access your account.</p><button class="igris-auth-row primary" id="ia-back-login" style="width:100%">Go back to sign in</button></div>`;
   document.getElementById('ia-back-login').onclick=loginView;
 };
}
function build(){
 injectStyles();
 const f=document.createElement('div');f.id='igris-account-float';f.innerHTML='<button id="igris-account-button">Sign in / Register</button>';document.body.appendChild(f);
 const m=document.createElement('div');m.id='igris-account-modal';m.innerHTML='<section class="igris-auth-card" role="dialog" aria-modal="true"><button class="igris-auth-close" id="igris-auth-close">×</button><div id="igris-auth-content"></div></section>';document.body.appendChild(m);
 document.getElementById('igris-account-button').onclick=async()=>{const r=await window.igrisSupabase.auth.getUser();if(r.data.user)location.href='account.html';else{loginView();openModal()}};
 document.getElementById('igris-auth-close').onclick=closeModal;m.onclick=e=>{if(e.target===m)closeModal()};
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
 window.igrisSupabase.auth.onAuthStateChange((_event,session)=>{const b=document.getElementById('igris-account-button');if(b)b.textContent=session?.user?'Account':'Sign in / Register';});
 window.igrisSupabase.auth.getUser().then(r=>{const b=document.getElementById('igris-account-button');if(b)b.textContent=r.data.user?'Account':'Sign in / Register';});
}
async function boot(){try{await load(CDN);window.igrisSupabase=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);build()}catch(e){console.error('Project Account failed to load',e)}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
(function(){
  function syncAccountTheme(){
    const modal=document.getElementById('igris-account-modal');
    const card=modal?.querySelector('.igris-auth-card');
    if(!card)return;
    const theme=document.documentElement.getAttribute('data-theme') || document.body.getAttribute('data-theme');
    if(theme==='light') card.setAttribute('data-force-light','true'); else card.removeAttribute('data-force-light');
  }
  new MutationObserver(syncAccountTheme).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  document.addEventListener('click',()=>setTimeout(syncAccountTheme,0));
  syncAccountTheme();
})();
