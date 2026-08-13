
window.IGRIS_SUPABASE_URL = "https://kjimyrewcnbpwzmoxxpv.supabase.co";
window.IGRIS_SUPABASE_KEY = "sb_publishable_ZVinjwmrApsFIt6YQ6Vb_w_DsrQPSYo";
(function(){
  const load=src=>new Promise((ok,bad)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=bad;document.head.appendChild(s)});
  function ui(){
    if(document.getElementById('igris-account-ui'))return;
    const st=document.createElement('style');st.textContent=`
#igris-account-ui{position:fixed;top:18px;right:18px;z-index:99999}#igris-account-btn{border:1px solid rgba(255,255,255,.18);background:rgba(18,10,28,.75);color:#fff;padding:10px 15px;border-radius:999px;backdrop-filter:blur(16px);cursor:pointer}
#igris-auth{position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:rgba(3,2,8,.7);backdrop-filter:blur(12px);z-index:100000;padding:20px}#igris-auth.open{display:flex}.ia{width:min(430px,100%);border:1px solid rgba(255,255,255,.16);border-radius:28px;padding:28px;background:linear-gradient(135deg,rgba(255,255,255,.1),rgba(139,92,246,.08));box-shadow:0 30px 90px rgba(0,0,0,.4)}.ia h3{margin:0 0 7px;font-size:28px}.ia p{opacity:.65}.ia input{width:100%;box-sizing:border-box;margin:7px 0;padding:13px;border-radius:13px;border:1px solid rgba(255,255,255,.14);background:rgba(0,0,0,.25);color:#fff}.ia button{padding:12px;border-radius:13px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.08);color:#fff;cursor:pointer}.ia .primary{background:linear-gradient(135deg,#ff3158,#8b5cf6);border:0}.ia .row{display:flex;gap:9px;margin-top:10px}.ia .row button{flex:1}.ia #close{float:right;background:none;border:0;font-size:22px}
`;
    document.head.appendChild(st);
    const b=document.createElement('div');b.id='igris-account-ui';b.innerHTML='<button id="igris-account-btn">Sign in</button>';document.body.appendChild(b);
    const m=document.createElement('div');m.id='igris-auth';m.innerHTML=`<div class="ia"><button id="close">×</button><h3>Welcome to Igris</h3><p>Manage projects, saved work and your profile.</p><input id="iname" placeholder="Display name" style="display:none"><input id="iemail" type="email" placeholder="Email"><input id="ipass" type="password" placeholder="Password"><div class="row"><button id="signin" class="primary">Sign in</button><button id="register">Create account</button></div><div class="row"><button id="forgot">Forgot password?</button><button id="account">My account</button></div><div id="imsg" style="margin-top:12px;opacity:.75"></div></div>`;document.body.appendChild(m);
    const $=x=>document.getElementById(x),msg=x=>$('imsg').textContent=x;
    $('igris-account-btn').onclick=()=>m.classList.add('open');$('close').onclick=()=>m.classList.remove('open');m.onclick=e=>{if(e.target===m)m.classList.remove('open')};
    $('signin').onclick=async()=>{let r=await igrisSupabase.auth.signInWithPassword({email:$('iemail').value.trim(),password:$('ipass').value});if(r.error)msg(r.error.message);else{msg('Signed in.');setTimeout(()=>m.classList.remove('open'),500);update(r.data.user)}};
    $('register').onclick=async()=>{let e=$('iemail').value.trim(),p=$('ipass').value;if(p.length<6)return msg('Password must be at least 6 characters.');let r=await igrisSupabase.auth.signUp({email:e,password:p});if(r.error)msg(r.error.message);else msg(r.data.session?'Account created.':'Check your email to verify your account.')};
    $('forgot').onclick=async()=>{let e=$('iemail').value.trim();if(!e)return msg('Enter your email first.');let r=await igrisSupabase.auth.resetPasswordForEmail(e,{redirectTo:location.origin+'/account.html'});msg(r.error?r.error.message:'Reset email sent.')};
    $('account').onclick=()=>location.href='account.html';
    function update(u){$('igris-account-btn').textContent=u?'My account':'Sign in';$('igris-account-btn').onclick=()=>u?location.href='account.html':m.classList.add('open')}
    window.igrisUpdateAuthButton=update;
  }
  async function boot(){try{await load('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');window.igrisSupabase=window.supabase.createClient(window.IGRIS_SUPABASE_URL,window.IGRIS_SUPABASE_KEY);ui();let r=await igrisSupabase.auth.getUser();igrisUpdateAuthButton(r.data.user);igrisSupabase.auth.onAuthStateChange((e,s)=>igrisUpdateAuthButton(s?.user||null))}catch(e){console.error(e)}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
