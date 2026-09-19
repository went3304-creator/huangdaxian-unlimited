(() => {
  const images = { 上上: '001.png', 上吉: '002.png', 中吉: '003.png', 中平: '004.png', 下下: '005.png' };
  const numerals = ['零','一','二','三','四','五','六','七','八','九','十'];
  let drawing = false, lastMotion = 0;
  const show = id => document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === id));
  const chinese = n => n === 100 ? '一百' : n <= 10 ? numerals[n] : n < 20 ? `十${n % 10 ? numerals[n % 10] : ''}` : `${numerals[Math.floor(n / 10)]}十${n % 10 ? numerals[n % 10] : ''}`;
  const poemLines = poem => (String(poem).match(/[^。！？；!?;\n]+[。！？；!?;]?/g) || [poem]).map(line => line.trim()).filter(Boolean).join('\n');
  document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => show(button.dataset.go)));
  function reveal(fortune) {
    document.querySelector('#fortune-number').textContent = `第 ${chinese(fortune.number)} 签`;
    document.querySelector('#fortune-grade').textContent = fortune.grade;
    document.querySelector('#fortune-title').textContent = fortune.title;
    document.querySelector('#fortune-poem').textContent = poemLines(fortune.poem);
    const image = document.querySelector('#grade-image');
    image.src = `签图/${images[fortune.grade] || '003.png'}`;
    image.alt = `${fortune.grade}签等级图`;
    show('result'); window.scrollTo(0, 0);
  }
  function start() {
    if (drawing || !Array.isArray(window.FORTUNES) || window.FORTUNES.length !== 100) return;
    drawing = true;
    const altar = document.querySelector('#altar'), message = document.querySelector('#draw-message'), button = document.querySelector('#start-draw');
    altar.classList.add('shaking'); message.textContent = '签筒轻摇 · 静候灵签'; button.disabled = true;
    setTimeout(() => { altar.classList.remove('shaking'); altar.classList.add('release'); message.textContent = '好运正在路上……'; }, 2400);
    setTimeout(() => {
      altar.classList.remove('shaking', 'release'); message.innerHTML = '心中默念所问之事<br>准备好后，点击开始求签'; button.disabled = false; drawing = false;
      reveal(window.FORTUNES[Math.floor(Math.random() * window.FORTUNES.length)]);
    }, 4100);
  }
  document.querySelector('#start-draw').addEventListener('click', () => {
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') DeviceMotionEvent.requestPermission().catch(() => {});
    start();
  });
  window.addEventListener('devicemotion', event => {
    if (!document.querySelector('#draw').classList.contains('active') || drawing) return;
    const a = event.accelerationIncludingGravity; if (!a) return;
    if (Math.abs(a.x || 0) + Math.abs(a.y || 0) + Math.abs(a.z || 0) > 32 && Date.now() - lastMotion > 1600) { lastMotion = Date.now(); start(); }
  });
})();
