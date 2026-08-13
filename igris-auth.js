
window.IGRIS_SUPABASE_URL='https://kjimyrewcnbpwzmoxxpv.supabase.co';
window.IGRIS_SUPABASE_KEY='sb_publishable_ZVinjwmrApsFIt6YQ6Vb_w_DsrQPSYo';
(function(){
 const load=s=>new Promise((ok,bad)=>{const x=document.createElement('script');x.src=s;x.onload=ok;x.onerror=bad;document.head.appendChild(x)});
 function start(){
  if(document.getElementById('project-account')) return;
  const css=document.createElement('style');css.id='project-account-css';css.textContent=`
#project-account{position:fixed;left:22px;bottom:22px;z-index:99990;font-family:inherit}
#project-account button{appearance:none;border:1px solid rgba(255,255,255,.16);background:rgba(12,9,18,.72);color:#fff;border-radius:999px;padding:11px 17px;font:inherit;font-size:13px;font-weight:600;letter-spacing:.01em;cursor:pointer;box-shadow:0 12px 35px rgba(0,0,0,.24);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);transition:transform .25s ease,border-color .25s ease,background .25s ease}
#project-account button:hover{transform:translateY(-2px);border-color:rgba(255,70,100,.45);background:rgba(22,15,31,.86)}
#project-auth{position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;padding:20px;background:rgba(4,3,8,.62);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);font-family:inherit}
#project-auth.open{display:flex}
.pa-card{position:relative;width:min(430px,100%);padding:30px;border:1px solid rgba(255,255,255,.13);border-radius:26px;background:linear-gradient(145deg,rgba(24,18,29,.94),rgba(15,10,22,.94));box-shadow:0 30px 100px rgba(0,0,0,.45);color:#fff}
.pa-card h2{margin:0 0 7px;font-size:28px;letter-spacing:-.035em}
.pa-card .pa-sub{margin:0 0 20px;opacity:.58;font-size:13px;line-height:1.5}
.pa-close{position:absolute;right:17px;top:15px;border:0;background:transparent;color:#fff;opacity:.65;font-size:25px;cursor:pointer}
.pa-field{margin:10px 0}
.pa-field label{display:block;font-size:11px;opacity:.58;margin:0 0 6px}
.pa-field input{width:100%;box-sizing:border-box;padding:13px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.23);color:#fff;outline:none;font:inherit}
.pa-field input:focus{border-color:rgba(255,75,110,.6);box-shadow:0 0 0 3px rgba(255,49,88,.08)}
.pa-row{display:flex;gap:9px;margin-top:12px}
.pa-row button{flex:1;padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.06);color:#fff;font:inherit;font-size:13px;cursor:pointer}
.pa-row .pa-primary{border:0;background:linear-gradient(135deg,#ff3158,#7d4cff)}
.pa-link{border:0!important;background:transparent!important;padding:10px 4px!important;opacity:.7;font-size:12px!important}
#pa-message{min-height:20px;margin-top:13px;font-size:12px;line-height:1.45;opacity:.76}
@media(max-width:600px){#project-account{left:14px;bottom:14px}.pa-card{padding:24px}}
`;
  document.head.appendChild(css);
  const root=document.createElement('div');root.id='project-account';root.innerHTML='<button type="button" id="pa-open">Project Account</button>';document.body.appendChild(root);
  const modal=document.createElement('div');modal.id='project-auth';modal.innerHTML=`
   <section class="pa-card" role="dialog" aria-modal="true">
    <button class="pa-close" id="pa-close" type="button">×</button>
    <h2 id="pa-title">Project Account</h2>
    <p class="pa-sub" id="pa-sub">Sign in to manage your projects, saved work and profile.</p>
    <div class="pa-field" id="pa-name-wrap" style="display:none"><label>NAME</label><input id="pa-name" autocomplete="name" placeholder="Your name"></div>
    <div class="pa-field" id="pa-phone-wrap" style="display:none"><label>PHONE <span style="opacity:.6">(optional)</span></label><input id="pa-phone" type="tel" autocomplete="tel" placeholder="Phone number"></div>
    <div class="pa-field"><label>EMAIL</label><input id="pa-email" type="email" autocomplete="email" placeholder="you@example.com"></div>
    <div class="pa-field"><label>PASSWORD</label><input id="pa-password" type="password" autocomplete="current-password" placeholder="Your password"></div>
    <div class="pa-row"><button id="pa-signin" class="pa-primary" type="button">Sign in</button><button id="pa-register" type="button">Create account</button></div>
    <div class="pa-row"><button id="pa-forgot" class="pa-link" type="button">Forgot password?</button><button id="pa-account" class="pa-link" type="button">My account</button></div>
    <div id="pa-message"></div>
   </section>`;
  document.body.appendChild(modal);
  const $=id=>document.getElementById(id), say=t=>$('pa-message').textContent=t;
  let mode='signin';
  function setMode(m){
   mode=m;$('pa-name-wrap').style.display=m==='register'?'block':'none';$('pa-phone-wrap').style.display=m==='register'?'block':'none';
   $('pa-title').textContent=m==='register'?'Create your Project Account':'Project Account';
   $('pa-sub').textContent=m==='register'?'Create an account to submit projects, save work and manage your profile.':'Sign in to manage your projects, saved work and profile.';
   $('pa-signin').style.display=m==='register'?'none':'block';$('pa-register').style.display=m==='register'?'none':'block';say('');
  }
  $('pa-open').onclick=()=>modal.classList.add('open');$('pa-close').onclick=()=>modal.classList.remove('open');modal.onclick=e=>{if(e.target===modal)modal.classList.remove('open')};
  $('pa-register').onclick=()=>setMode('register');$('pa-signin').onclick=async()=>{
   const {data,error}=await igrisSupabase.auth.signInWithPassword({email:$('pa-email').value.trim(),password:$('pa-password').value});
   if(error)return say(error.message);say('Signed in successfully.');update(data.user);setTimeout(()=>modal.classList.remove('open'),500);
  };
  $('pa-forgot').onclick=async()=>{
   const email=$('pa-email').value.trim();if(!email)return say('Enter your email first.');
   const {error}=await igrisSupabase.auth.resetPasswordForEmail(email,{redirectTo:location.href});
   say(error?error.message:'Password reset email sent. Check your inbox.');
  };
  $('pa-account').onclick=async()=>{
   const {data}=await igrisSupabase.auth.getUser();
   if(data.user) location.href='account.html'; else {setMode('signin');modal.classList.add('open');say('Please sign in first.')}
  };
  $('pa-register').addEventListener('click',async()=>{
   if(mode!=='register')return;
   const email=$('pa-email').value.trim(),password=$('pa-password').value,name=$('pa-name').value.trim(),phone=$('pa-phone').value.trim();
   if(!email||!password)return say('Email and password are required.');if(password.length<6)return say('Password must be at least 6 characters.');
   const {data,error}=await igrisSupabase.auth.signUp({email,password,options:{data:{display_name:name,phone:phone||null}}});
   if(error)return say(error.message);
   if(data.user) await igrisSupabase.from('profiles').upsert({id:data.user.id,display_name:name,phone:phone||null,updated_at:new Date().toISOString()});
   say(data.session?'Account created successfully.':'Account created. Check your email to verify it.');
   if(data.session){update(data.user);setTimeout(()=>modal.classList.remove('open'),700)}
  });
  function update(user){ $('pa-open').textContent=user?'Project Account':'Project Account'; }
  window.igrisUpdateAuthButton=update;
 }
 async function boot(){try{await load('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');window.igrisSupabase=window.supabase.createClient(window.IGRIS_SUPABASE_URL,window.IGRIS_SUPABASE_KEY);start();const {data}=await igrisSupabase.auth.getUser();window.igrisUpdateAuthButton(data.user);igrisSupabase.auth.onAuthStateChange((e,s)=>window.igrisUpdateAuthButton(s?.user||null));}catch(e){console.error('Project Account failed',e)}}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
