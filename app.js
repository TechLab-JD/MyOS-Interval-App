const root=document.getElementById('IntervalApp');
if(root){const $=id=>root.querySelector('#'+id);
  let ac=null,timer=null,phase='ready',left=0,round=1,work=30,rest=15,rounds=8;
  function beep(f,d){try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();if(ac.state==='suspended')ac.resume();const o=ac.createOscillator(),g=ac.createGain();o.frequency.value=f;o.connect(g);g.connect(ac.destination);const t=ac.currentTime;g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(0.3,t+0.01);g.gain.exponentialRampToValueAtTime(0.0001,t+d);o.start(t);o.stop(t+d+0.02);}catch(e){}}
  const fmt=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
  function show(){$('iv-time').textContent=fmt(Math.max(0,left));$('iv-phase').className='iv-phase'+(phase==='work'?' work':phase==='rest'?' rest':phase==='done'?' done':'');
    $('iv-phase').textContent=phase==='work'?'WORK':phase==='rest'?'REST':phase==='done'?'DONE!':'Ready';
    $('iv-round').textContent=phase==='done'?'':('Round '+round+' of '+rounds);}
  function tick(){left--;if(left<=0){if(phase==='work'){if(rest>0){phase='rest';left=rest;beep(440,0.15);}else{nextRound();}}else if(phase==='rest'){nextRound();}show();}else{if(left<=3)beep(660,0.08);show();}}
  function nextRound(){if(round>=rounds){stop();phase='done';beep(880,0.4);show();return;}round++;phase='work';left=work;beep(880,0.2);}
  function start(){if(timer)return;work=Math.max(5,parseInt($('iv-work').value)||30);rest=Math.max(0,parseInt($('iv-rest').value)||0);rounds=Math.max(1,parseInt($('iv-rounds').value)||1);
    if(phase==='ready'||phase==='done'){round=1;phase='work';left=work;beep(880,0.2);}show();timer=setInterval(tick,1000);$('iv-start').textContent='Pause';}
  function stop(){if(timer){clearInterval(timer);timer=null;}$('iv-start').textContent='Start';}
  function reset(){stop();phase='ready';round=1;left=parseInt($('iv-work').value)||30;show();}
  $('iv-start').onclick=()=>{if(timer)stop();else start();};
  $('iv-reset').onclick=reset;
  root.addEventListener('myos:close',()=>{stop();try{if(ac&&ac.state!=='closed')ac.suspend();}catch(e){}});
  reset();
}
