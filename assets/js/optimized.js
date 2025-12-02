// optimized.js - lightweight, robust interactions for the conversion landing
(function(){
  'use strict';

  // ========== CONFIG ==========
  const CHECKOUT_URL = 'https://pay.kiwify.com.br/XYXtV6d'; // substitute if needed
  const STICKY_THRESHOLD = 220; // px to show sticky CTA on mobile

  // ========== Helpers ==========
  function qs(sel){ return document.querySelector(sel); }
  function qsa(sel){ return Array.from(document.querySelectorAll(sel)); }
  function addUTM(url){
    try{
      const params = new URLSearchParams(location.search);
      if(!params.toString()) return url;
      return url + (url.includes('?')? '&' : '?') + params.toString();
    }catch(e){return url}
  }

  // ========== Smooth scroll for internal anchors (keeps native behavior for external links) ========
  qsa('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(!href || href === '#') return;
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 18;
        window.scrollTo({top,behavior:'smooth'});
      }
    });
  });

  // ========== Menu hamburger ==========
  const menuBtn = qs('#menu-hamburger');
  const mainNav = qs('#main-nav');
  if(menuBtn && mainNav){
    menuBtn.addEventListener('click',()=>{
      mainNav.classList.toggle('open');
      menuBtn.classList.toggle('active');
    });
  }

  // ========== Testimonials modal handling (single responsibility) ==========
  const modal = qs('.testimonial-modal');
  const modalImg = modal? modal.querySelector('img') : null;
  qsa('.testimonial-click').forEach(card=>{
    card.addEventListener('click', ()=>{
      const img = card.dataset.img;
      if(img && modal && modalImg){
        modalImg.src = img;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    });
  });
  // close modal
  qsa('.testimonial-modal-close').forEach(btn=>btn.addEventListener('click', closeModal));
  if(modal){
    modal.addEventListener('click', function(e){if(e.target === modal) closeModal();});
  }
  function closeModal(){ if(modal){ modal.style.display='none'; document.body.style.overflow=''; } }

  // ========== Details polyfill minimal (for older browsers) ==========
  if(!('open' in document.createElement('details'))){
    qsa('details').forEach(d=>{
      const s = d.querySelector('summary');
      if(s){ s.style.cursor='pointer'; s.addEventListener('click', ()=> d.classList.toggle('open')); }
    });
  }

  // ========== Sticky CTA on mobile ==========
  const stickyTemplate = `\n  <div class="sticky-cta" id="stickyCta">\n    <div class="row">\n      <div style=\"font-weight:800;color:#fff\">Receitas de Ouro</div>\n    </div>\n    <div style=\"display:flex;gap:8px;align-items:center\">\n      <div class=\"price\" style=\"color:#fff;font-weight:800\">R$16,90</div>\n      <a id=\"stickyBuyBtn\" class=\"btn\" style=\"background:transparent;color:#fff;border:0;font-weight:800\">COMPRAR</a>\n    </div>\n  </div>\n`;
  function ensureSticky(){ if(!qs('#stickyCta')){ document.body.insertAdjacentHTML('beforeend', stickyTemplate); const b = qs('#stickyBuyBtn'); if(b) b.addEventListener('click', ()=> gotoCheckout()); } }
  function toggleSticky(){ if(window.innerWidth <= 720 && window.scrollY > STICKY_THRESHOLD) ensureSticky(); else{ const s = qs('#stickyCta'); if(s) s.remove(); } }
  window.addEventListener('scroll', throttle(toggleSticky,120));
  window.addEventListener('resize', throttle(toggleSticky,300));
  toggleSticky();

  // ========== Checkout forwarding for CTAs (appends UTM params) ==========
  function gotoCheckout(){ window.location.href = addUTM(CHECKOUT_URL); }
  qsa('a[href*="kiwify"], .btn-primary').forEach(el=>{
    // if element is anchor to external Kiwify, keep native, but ensure UTMs
    if(el.tagName.toLowerCase() === 'a'){
      const href = el.getAttribute('href') || '';
      if(href.includes('kiwify')){
        el.setAttribute('href', addUTM(href));
      } else {
        // convert to checkout redirect for consistency
        el.addEventListener('click', function(e){ e.preventDefault(); gotoCheckout(); });
      }
    } else {
      el.addEventListener('click', gotoCheckout);
    }
  });

  // throttle helper
  function throttle(fn, wait){ let last=0; return function(){ const now = Date.now(); if(now - last >= wait){ last = now; fn.apply(this, arguments); } }; }

})();
