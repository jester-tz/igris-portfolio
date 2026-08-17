
const root=document.documentElement;
const savedTheme=localStorage.getItem("palette-theme");
if(savedTheme)root.dataset.theme=savedTheme;
const themeBtn=document.querySelector("[data-theme-toggle]");
function updateThemeIcon(){if(themeBtn)themeBtn.textContent=root.dataset.theme==="dark"?"☀":"☾"}
updateThemeIcon();
themeBtn?.addEventListener("click",()=>{
 const next=root.dataset.theme==="dark"?"light":"dark";
 root.dataset.theme=next;localStorage.setItem("palette-theme",next);updateThemeIcon();
});
const menuBtn=document.querySelector("[data-menu]");
const navLinks=document.querySelector(".nav-links");
menuBtn?.addEventListener("click",()=>navLinks?.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>navLinks?.classList.remove("open")));

const observer=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}
 });
},{threshold:.12});
document.querySelectorAll(".reveal,.reveal-img,.stagger").forEach(el=>observer.observe(el));

document.querySelectorAll("[data-share]").forEach(btn=>btn.addEventListener("click",async()=>{
 const data={title:"Palette Bistro",text:"Palette Bistro — Doha",url:location.href};
 if(navigator.share){try{await navigator.share(data)}catch(e){}}
 else{try{await navigator.clipboard.writeText(location.href);btn.textContent="Link copied";setTimeout(()=>btn.textContent="Share",1600)}catch(e){}}
}));
const saveBtn=document.querySelector("[data-save]");
if(saveBtn){
 const saved=localStorage.getItem("palette-saved")==="1";saveBtn.textContent=saved?"Saved":"Save";
 saveBtn.addEventListener("click",()=>{const next=localStorage.getItem("palette-saved")!=="1";localStorage.setItem("palette-saved",next?"1":"0");saveBtn.textContent=next?"Saved":"Save"});
}
