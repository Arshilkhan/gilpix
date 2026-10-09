// Placeholder photography engine — generates a distinct, defocused film frame per spec.
// Real photographs bypass this: give any photo spec a `src` and <Photo> uses it instead.

const PAL = {
  ivory:    {bg:['#f1e8db','#b39a7c'], blobs:['#f7f0e4','#e2cdb2','#c0a684','#ab8d6d'], sub:'#6f5540', light:'#fffaf0', vig:.40},
  haldi:    {bg:['#fbeec0','#dda93f'], blobs:['#fff6d6','#f0c45c','#c88a2a','#ffe9a6'], sub:'#7e551c', light:'#fff7d8', vig:.30},
  mehendi:  {bg:['#e3e8c8','#7d9059'], blobs:['#f1f3dc','#a9b97f','#5c7040','#d8e0b4'], sub:'#3a482a', light:'#f6f8e4', vig:.34},
  vermilion:{bg:['#eeba85','#993729'], blobs:['#f7d4a0','#c65c3c','#7c2419','#ffd9a8'], sub:'#48170f', light:'#ffcf94', vig:.42},
  dusk:     {bg:['#f7cba3','#6f5271'], blobs:['#ffdcb6','#e38a5c','#8e6b8f','#3f3449'], sub:'#332941', light:'#ffe4c4', vig:.40},
  night:    {bg:['#2e2b36','#121117'], blobs:['#514a60','#c9a46a','#6f6183','#2a2531'], sub:'#0c0b10', light:'#ffe3a8', vig:.50},
  linen:    {bg:['#ece3d4','#a89073'], blobs:['#f7f1e6','#cdb99a','#9d8570','#e0d2bd'], sub:'#6b5947', light:'#fffaf1', vig:.38},
  sage:     {bg:['#e6e6dc','#7f8877'], blobs:['#f3f2ea','#b4b9a6','#6f7767','#dcded1'], sub:'#4a5044', light:'#f8f8f1', vig:.38}
};

function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const ratioNum = r => {const[a,b]=String(r).split('/').map(Number);return b?a/b:(a||1.5)};

function figureShape(cx, topY, h, w, fill, op){
  const hr = w*.25, hc = topY+hr, bt = hc+hr*1.15;
  return `<ellipse cx="${cx.toFixed(1)}" cy="${hc.toFixed(1)}" rx="${(hr*.86).toFixed(1)}" ry="${hr.toFixed(1)}" fill="${fill}" opacity="${op}"/>`+
  `<path d="M${(cx-w/2).toFixed(1)} ${(topY+h).toFixed(1)} C ${(cx-w*.54).toFixed(1)} ${(bt+h*.3).toFixed(1)}, ${(cx-w*.44).toFixed(1)} ${bt.toFixed(1)}, ${cx.toFixed(1)} ${bt.toFixed(1)} C ${(cx+w*.44).toFixed(1)} ${bt.toFixed(1)}, ${(cx+w*.54).toFixed(1)} ${(bt+h*.3).toFixed(1)}, ${(cx+w/2).toFixed(1)} ${(topY+h).toFixed(1)} Z" fill="${fill}" opacity="${op}"/>`;
}

const photoCache = new Map();
export function makePhoto({seed=1, pal='ivory', kind='portrait', r='3/2', label=''}){
  const key = seed+'|'+pal+'|'+kind+'|'+r+'|'+label;
  if(photoCache.has(key)) return photoCache.get(key);
  const P = PAL[pal] || PAL.ivory;
  const W = 1100, H = Math.round(W/ratioNum(r));
  const rnd = mulberry32((seed*97+kind.length*31+pal.length*13)>>>0);
  const pick = a => a[Math.floor(rnd()*a.length)];

  let blobs = '';
  const n = 7 + Math.floor(rnd()*4);
  for(let i=0;i<n;i++){
    const cx = rnd()*W, cy = H*(.1+rnd()*.9), rx = W*(.16+rnd()*.34), ry = rx*(.55+rnd()*.8);
    blobs += `<ellipse cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" rx="${rx.toFixed(0)}" ry="${ry.toFixed(0)}" fill="${pick(P.blobs)}" opacity="${(.3+rnd()*.5).toFixed(2)}"/>`;
  }

  let bokeh = '';
  const bn = (kind==='night'||pal==='night'||pal==='dusk') ? 20 : (kind==='detail'?10:7);
  for(let i=0;i<bn;i++){
    const cx = rnd()*W, cy = H*(.05+rnd()*.75), rr = W*(.008+rnd()*.045);
    bokeh += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${rr.toFixed(0)}" fill="${P.light}" opacity="${(.14+rnd()*.5).toFixed(2)}"/>`;
  }

  let subj = '';
  if(kind==='portrait'){
    const cx = W*(.3+rnd()*.4); subj = figureShape(cx, H*.15, H*.95, W*.3, P.sub, .55);
  } else if(kind==='couple'){
    const o = (rnd()-.5)*.16;
    subj = figureShape(W*(.4+o), H*.18, H*.9, W*.27, P.sub, .54) + figureShape(W*(.61+o), H*.23, H*.86, W*.26, P.sub, .48);
  } else if(kind==='wide'){
    const c = 9+Math.floor(rnd()*4);
    for(let i=0;i<c;i++){
      const cx = W*(.05+ (i/(c-1))*.9 + (rnd()-.5)*.05);
      subj += figureShape(cx, H*(.5+rnd()*.06), H*.5, W*.085, P.sub, .38+rnd()*.22);
    }
  } else if(kind==='dance'){
    for(let i=0;i<4;i++){
      const cx = W*(.18+i*.22+(rnd()-.5)*.06);
      subj += `<g transform="rotate(${(rnd()*14-7).toFixed(1)} ${cx.toFixed(0)} ${(H*.6).toFixed(0)})">`+
        figureShape(cx, H*(.25+rnd()*.12), H*.74, W*.15, P.sub, .45)+`</g>`;
    }
  } // 'detail' and 'decor' stay abstract

  let fore = '';
  for(let i=0;i<3;i++){
    const cx = rnd()*W, cy = H*(.15+rnd()*.95), rx = W*(.22+rnd()*.4);
    fore += `<ellipse cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" rx="${rx.toFixed(0)}" ry="${(rx*(.5+rnd()*.7)).toFixed(0)}" fill="${pick(P.blobs)}" opacity="${(.22+rnd()*.24).toFixed(2)}"/>`;
  }
  const blurBig = (W*.055).toFixed(0), blurSm = (W*.013).toFixed(0), blurSub = kind==='wide'?(W*.028).toFixed(0):(W*.026).toFixed(0);
  const svg =
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="g" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stop-color="${P.bg[0]}"/><stop offset="1" stop-color="${P.bg[1]}"/></linearGradient>
<linearGradient id="lt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P.light}" stop-opacity=".55"/><stop offset=".55" stop-color="${P.light}" stop-opacity="0"/></linearGradient>
<radialGradient id="v" cx="50%" cy="46%" r="76%"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#1a1208" stop-opacity="${P.vig}"/></radialGradient>
<filter id="fb" x="-35%" y="-35%" width="170%" height="170%"><feGaussianBlur stdDeviation="${blurBig}"/></filter>
<filter id="fs" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="${blurSm}"/></filter>
<filter id="fu" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="${blurSub}"/></filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#g)"/>
<g filter="url(#fb)">${blobs}</g>
<g filter="url(#fs)">${bokeh}</g>
<g filter="url(#fu)">${subj}</g>
<g filter="url(#fb)">${fore}</g>
<rect width="${W}" height="${H}" fill="url(#lt)"/>
<rect width="${W}" height="${H}" fill="url(#v)"/>
${label?`<text x="26" y="${H-24}" font-family="Inter,Helvetica,Arial,sans-serif" font-size="17" letter-spacing="3.4" fill="#fff" opacity=".3">${label.toUpperCase()}</text>`:''}
</svg>`;
  const uri = 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg.replace(/\n/g,''));
  photoCache.set(key, uri);
  return uri;
}

