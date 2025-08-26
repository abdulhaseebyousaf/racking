  // animations effect
  ScrollReveal({
  distance: '80px',
  duration: 2000,
  reset: false,
});

ScrollReveal().reveal('#firstCard',  { origin: 'left', delay: 0   });
ScrollReveal().reveal('#secondCard', { origin: 'left', delay: 400 });
ScrollReveal().reveal('#thirdCard',  { origin: 'left', delay: 800 });
ScrollReveal().reveal('#forthCard',  { origin: 'left', delay: 1000 });
ScrollReveal().reveal('.table-section',{ origin: 'bottom', delay: 1200 });
 // Change this to your API URL when you deploy to your server/domain.
  // For local testing, use the HTTP port you saw in Visual Studio (e.g., 5232).
  const API_BASE = "https://racking.designdevise.com.au";
  async function calculate() {
    const loading = document.getElementById("loading");
    if (loading) loading.style.display = "block";

    try {
      // 1) Gather inputs (all inputs/selects with data-cell attribute)
      const payload = {};
      document.querySelectorAll('input[data-cell], select[data-cell]').forEach(el => {
        const addr = el.getAttribute('data-cell');
        let val = el.value;
        if (el.type === 'number' && val !== '') val = Number(val);
        payload[addr] = val;
      });

      // 2) POST to our API
      const res = await fetch(`${API_BASE}/calc`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const txt = await res.text();
        alert('Error from server: ' + txt);
        return;
      }

      const data = await res.json();
      // 3) Fill outputs (elements with data-cell but not inputs)
      document.querySelectorAll('[data-cell]').forEach(el => {
        const addr = el.getAttribute('data-cell');
        if (el.tagName === 'INPUT' || el.tagName === 'SELECT') return;
        if (addr in data) el.textContent = (data[addr] ?? '').toString();
      });

    } catch (e) {
      alert('Request failed: ' + e.message);
    } finally {
      if (loading) loading.style.display = "none";
    }
  }
  
// for input hover and click to show the data 
   const tooltip = document.getElementById('tooltip');
  const sideInfo = document.querySelector('.live-tips-side p');

  document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('mouseover', (e) => {
      const tip = e.target.getAttribute('data-tip');
      if (tip) {
        sideInfo.innerText = tip;
        tooltip.innerText = tip;
        tooltip.style.display = 'block';
        tooltip.style.left = e.pageX + 10 + 'px';
        tooltip.style.top = e.pageY + 10 + 'px';
      }
    });
    el.addEventListener('mouseout', () => {
      sideInfo.innerText = "This panel can contain notes, links, help text, etc.";
      tooltip.style.display = 'none';
    });
  });

 const calcQz     = document.getElementById('calcQz');
  const customQz   = document.getElementById('customQz');
  const toggle     = document.getElementById('customQzToggle');
  function syncCustomToCalculated() {
    if (!toggle.checked) {
      customQz.value = calcQz.value;
    }
  }
  toggle.checked = false;
  customQz.disabled = true;
  syncCustomToCalculated();

  calcQz.addEventListener('input', syncCustomToCalculated);

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      // enable custom editing; keep current value (no overwrite)
      customQz.disabled = false;
      // optional: if empty, start from calculated
      if (!customQz.value) customQz.value = calcQz.value;
    } else {
      // disable and resync to calculated
      customQz.disabled = true;
      syncCustomToCalculated();
    }
  });
//   id user choose the option C || D then user add the data
const installType = document.getElementById("installType");
  const shading = document.getElementById("shading");
  const tilt = document.getElementById("tiltAngle");
  const applay = document.getElementById("applay");
  const panelsGroup = document.getElementById("panelsGroup");
  
  function toggleFields() {
    if (installType.value.startsWith("C") || installType.value.startsWith("D")) {
      shading.disabled = false;
      applay.disabled = false;
      tilt.disabled = false;
      panelsGroup.disabled = false;
    } else {
      shading.disabled = true;
      tilt.disabled = true;
      panelsGroup.disabled = true;
      applay.disabled = true;
    }
  }
  // initial run
  toggleFields();

  // update on change
  installType.addEventListener("change", toggleFields);
//   for arrow rotation and choose option tu to show in box 
  function toggleFields() {
    if (installType.value.startsWith("C") || installType.value.startsWith("D")) {
      shading.disabled = false;
      applay.disabled = false;
      tilt.disabled = false;
      panelsGroup.disabled = false;
    } else {
      shading.disabled = true;
      tilt.disabled = true;
      panelsGroup.disabled = true;
      applay.disabled = true;
    }
  }

  // initial run
  toggleFields();

  // update on change
  installType.addEventListener("change", toggleFields);
     // for arrow and inut dropdown 
    (function () {
      document.querySelectorAll('.select-wrapper').forEach((wrapper) => {
        const select = wrapper.querySelector('select');
        const arrow  = wrapper.querySelector('.arrow');
        const panel = document.createElement('div');
        panel.className = 'custom-options';
        function buildOptions() {
          panel.innerHTML = '';
          Array.from(select.options).forEach((opt, idx) => {
            const row = document.createElement('div');
            row.className = 'custom-option';
            row.textContent = opt.textContent;
            if (opt.selected) row.classList.add('is-selected');
            row.addEventListener('click', () => {
              select.selectedIndex = idx;
              select.dispatchEvent(new Event('change', { bubbles: true }));
              closePanel();
            });
            panel.appendChild(row);
          });
        }

        function openPanel() {
          buildOptions();
          panel.style.display = 'block';
          if (arrow) arrow.style.transform = 'translateY(-50%) rotate(180deg)';
          setTimeout(() => document.addEventListener('click', outsideClose));
        }

        function closePanel() {
          panel.style.display = 'none';
          if (arrow) arrow.style.transform = 'translateY(-50%) rotate(0deg)';
          document.removeEventListener('click', outsideClose);
        }

        function outsideClose(e) {
          if (!wrapper.contains(e.target)) closePanel();
        }

        select.addEventListener('mousedown', (e) => {
          e.preventDefault();
          (panel.style.display === 'block') ? closePanel() : openPanel();
        });

        wrapper.addEventListener('click', (e) => {
          if (e.target.classList.contains('arrow')) {
            (panel.style.display === 'block') ? closePanel() : openPanel();
          }
        });

        select.addEventListener('change', () => {
          if (panel.style.display === 'block') {
            Array.from(panel.children).forEach((row, i) => {
              row.classList.toggle('is-selected', i === select.selectedIndex);
            });
          }
        });

        wrapper.appendChild(panel);
      });
    })();
      // if user choose Concrete option then user not select 
  const substrate = document.getElementById("input11");
  const battens   = document.getElementById("input12");

  function toggleBattens() {
    if (substrate.value === "Concrete") {
      battens.disabled = true;   // greyed out
    } else {
      battens.disabled = false; 
    }
  }

  toggleBattens();

  substrate.addEventListener("change", toggleBattens);
//   for footer 
const WRAP_SELECTOR = '.live-tips-side';   
const PANEL_SELECTOR = '.live-scroll';     
const TITLE_SELECTOR = '.live-scroll h5';  

(function () {
  const wrap = document.querySelector(WRAP_SELECTOR);
  const panel = document.querySelector(PANEL_SELECTOR);
  if (!wrap || !panel) return;
  const tableSections = document.querySelectorAll('.table-section');
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.setAttribute('aria-expanded', 'true');
  btn.setAttribute('aria-controls', 'tipsPanel');
  btn.style.cssText = `
    position:absolute; right:20px; top:13px;
    display:inline-flex; align-items:center; gap:8px;
    background:black; border:1px solid rgba(0,0,0,.12);
    padding:6px 10px; border-radius:10px; cursor:pointer;
    box-shadow:0 1px 2px rgba(0,0,0,.06);font-weight:600; color:white; 
  `;
btn.style.transition = 'background .5s ease, color .5s ease';

btn.addEventListener('mouseenter', () => {
  btn.style.background = '#fff';
  btn.style.color = '#000';
});

btn.addEventListener('mouseleave', () => {
  btn.style.background = 'black';
  btn.style.color = 'white';
});
  const label = document.createElement('span');
  label.textContent = 'Hide';
  // Chevron SVG
  const svgNS = 'http://www.w3.org/2000/svg';
  const chevron = document.createElementNS(svgNS, 'svg');
  chevron.setAttribute('width','16');
  chevron.setAttribute('height','16');
  chevron.setAttribute('viewBox','0 0 24 24');
  chevron.style.transition = 'transform .25s ease';
  const path = document.createElementNS(svgNS, 'path');
  path.setAttribute('d','M6 9l6 6 6-6');
  path.setAttribute('fill','none');
  path.setAttribute('stroke','currentColor');
  path.setAttribute('stroke-width','2');
  path.setAttribute('stroke-linecap','round');
  path.setAttribute('stroke-linejoin','round');
  chevron.appendChild(path);

  btn.appendChild(label);
  btn.appendChild(chevron);

  const prevPos = getComputedStyle(wrap).position;
  if (prevPos === 'static' || !prevPos) wrap.style.position = 'relative';

  wrap.appendChild(btn);
  panel.id = 'tipsPanel';
  panel.style.transition = 'max-height .35s ease';
  const ORIGINAL_FIXED_HEIGHT = parseInt(getComputedStyle(panel).height, 10) || 130;

  function setExpandedHeight() {

    const prev = panel.style.maxHeight;
    panel.style.maxHeight = 'none';
    const full = panel.scrollHeight;

    panel.style.maxHeight = (full || ORIGINAL_FIXED_HEIGHT) + 'px';
    return full;
  }

  function setTableMarginCollapsed() {
    tableSections.forEach(sec => { sec.style.marginBottom = '64px'; });
  }
  function setTableMarginDefault() {
    tableSections.forEach(sec => { sec.style.removeProperty('margin-bottom'); });
  }

  requestAnimationFrame(() => {
    setExpandedHeight();
    setTableMarginDefault(); 
  });

  const ro = new ResizeObserver(() => {
    if (btn.getAttribute('aria-expanded') === 'true') setExpandedHeight();
  });
  ro.observe(panel);

  function collapse() {
    btn.setAttribute('aria-expanded','false');
    label.textContent = 'Show';
    panel.style.maxHeight = '0px';
    chevron.style.transform = 'rotate(-90deg)';
    setTableMarginCollapsed(); 
  }
  function expand() {
    btn.setAttribute('aria-expanded','true');
    label.textContent = 'Hide';
    setExpandedHeight();
    chevron.style.transform = 'rotate(0deg)';
    setTableMarginDefault();   
  }

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    if (isOpen) collapse(); else expand();
  });

  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') collapse();
  });

  const titleEl = document.querySelector(TITLE_SELECTOR);
  if (titleEl && titleEl.textContent.trim()) {
    btn.setAttribute('aria-label', `Toggle ${titleEl.textContent.trim()} panel`);
  }

  panel.addEventListener('transitionend', (e) => {
    if (e.propertyName !== 'max-height') return;
    if (btn.getAttribute('aria-expanded') !== 'true') return; 
    const target = document.querySelector('.table-section');
    if (!target) return;

    const scroller = getScrollParent(target);
    if (scroller) {
      scroller.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
    } else {
      const y = target.getBoundingClientRect().top + window.pageYOffset - 10;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });

  function getScrollParent(el) {
    let p = el.parentElement;
    while (p) {
      const s = getComputedStyle(p);
      const oy = s.overflowY;
      const canScroll = (oy === 'auto' || oy === 'scroll') && p.scrollHeight > p.clientHeight;
      if (canScroll) return p;
      p = p.parentElement;
    }
    return null; 
  }
})();