(function(){
var b=document.querySelector('.burger'),n=document.getElementById('nav');
if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');b.setAttribute('aria-label',o?'Close menu':'Open menu');});
function $(i){return document.getElementById(i);}
var f=$('cform');
if(f)f.addEventListener('submit',function(e){e.preventDefault();var fm=$('fm');
 if($('website').value)return;
 if(!f.checkValidity()){fm.hidden=false;fm.textContent='Please fill in your name, a valid email and a message, and tick the agreement box.';return;}
 var body='Name: '+$('name').value+'\nEmail: '+$('email').value+'\nTopic: '+$('topic').value+'\n\n'+$('message').value;
 location.href='mailto:'+f.getAttribute('data-to')+'?subject='+encodeURIComponent(f.getAttribute('data-brand')+': '+$('topic').value)+'&body='+encodeURIComponent(body);
 fm.hidden=false;fm.textContent='Your email app should open with the message ready to send. If nothing happens, write to us directly at '+f.getAttribute('data-to')+'.';});
var c=$('cookie'),k=null;try{k=localStorage.getItem('ck_'+location.hostname);}catch(e){}
if(c&&!k)c.classList.add('show');
if(c)c.querySelectorAll('button').forEach(function(bt){bt.addEventListener('click',function(){try{localStorage.setItem('ck_'+location.hostname,bt.getAttribute('data-cookie'));}catch(e){}c.classList.remove('show');});});
var y=$('year');if(y)y.textContent=new Date().getFullYear();
})();

(function(){
function $(i){return document.getElementById(i);}
function n(i){var v=parseFloat($(i).value);return isNaN(v)?0:v;}
function strapOut(){var w=n('sWrist'),c=n('sCase'),t=$('sType').value,o=$('sStrap');
 if(!(w>0&&c>0)){o.innerHTML='<h4>Enter both numbers</h4><p>Measure your wrist with a tape where the watch sits, and read the case width from the specification.</p>';return;}
 var lug=Math.round(c*0.55/2)*2;lug=Math.max(16,Math.min(24,lug));
 var ratio=c/w*100;
 var verdict=ratio<17?'Small on you':ratio<20?'Classic proportion':ratio<23?'Modern proportion':ratio<26?'Large and noticeable':'Oversized for this wrist';
 var short=Math.round(w*0.45),long=Math.round(w*0.62);
 var ends={leather:'Leather stretches a little in the first month, so a slightly snug fit settles well.',
  steel:'A steel bracelet should sit so the case stays on top of the wrist when your arm hangs down. Have links removed rather than living with it loose.',
  fabric:'Fabric straps pass under the case, which adds about a millimetre of height but spreads the weight nicely.',
  rubber:'Rubber grips skin and does not breathe, so leave one notch more room than you would in leather.'}[t];
 o.innerHTML='<h4>'+verdict+'</h4><dl class="dl"><dt>Case to wrist</dt><dd>'+ratio.toFixed(0)+'%</dd><dt>Likely lug width</dt><dd>'+lug+' mm</dd><dt>Strap lengths</dt><dd>'+short+' / '+long+' mm (short / long side)</dd></dl><div class="gauge"><i style="left:0;width:'+Math.min(100,ratio*3.4)+'%"></i><u style="left:'+(20*3.4)+'%"></u></div><div class="gl"><span>Small</span><span>Classic</span><span>Oversized</span></div><ul><li>'+ends+'</li><li>Lug width is stamped between the lugs on many watches; measure with a ruler if it is not.</li><li>Case thickness matters as much as width. Over 13 mm catches on a cuff whatever the diameter says.</li></ul>';}
['sWrist','sCase','sType'].forEach(function(i){var e=$(i);if(e)e.addEventListener('input',strapOut);});
if($('sWrist'))strapOut();
function accOut(){var d=n('aDays'),sec=n('aSec'),kind=$('aKind').value,o=$('aOut');
 if(!(d>0)){o.innerHTML='<h4>Enter the number of days</h4><p>Set the watch against a reliable time source, wait a few days, then measure the difference in seconds.</p>';return;}
 var rate=sec/d;
 var std={mech:[-10,20,'A good mechanical watch'],chrono:[-4,6,'A chronometer-certified movement'],quartz:[-0.5,0.5,'A standard quartz movement'],hiq:[-0.03,0.03,'A high-accuracy quartz movement']}[kind];
 var ok=rate>=std[0]&&rate<=std[1];
 var yr=Math.round(rate*365);
 o.innerHTML='<h4>'+(rate>=0?'+':'')+rate.toFixed(2)+' sec / day</h4><dl class="dl"><dt>Over a year</dt><dd>'+(yr>=0?'+':'')+yr+' seconds ('+Math.abs(Math.round(yr/60))+' min)</dd><dt>Expected range</dt><dd>'+std[0]+' to +'+std[1]+' sec/day</dd><dt>Verdict</dt><dd>'+(ok?'Within specification':'Outside the usual range')+'</dd></dl><ul>'+(ok?'<li>'+std[2]+' at this rate is behaving normally. A steady gain or loss is easy to live with; an unpredictable one is not.</li>':'<li>'+std[2]+' should normally stay inside its range. A sudden change often means magnetism, which a repairer can undo in minutes.</li>')+'<li>Measure over at least five days. A single day tells you almost nothing because position affects the rate.</li><li>How you store it overnight changes the result. Crown up, dial up and dial down all run differently.</li></ul>';}
['aDays','aSec','aKind'].forEach(function(i){var e=$(i);if(e)e.addEventListener('input',accOut);});
if($('aDays'))accOut();
var WR={none:['Not rated','No water resistance at all. Keep it dry.',[],['Washing hands','Rain','Showering','Swimming','Diving']],
'30':['3 ATM / 30 m','Splash resistance only, despite the depth printed on the back.',['Rain and splashes','Washing hands quickly'],['Showering','Swimming','Snorkelling','Diving']],
'50':['5 ATM / 50 m','Fine around water, not for swimming laps.',['Rain and splashes','Washing hands','Brief contact with water'],['Showering regularly','Swimming','Snorkelling','Diving']],
'100':['10 ATM / 100 m','Genuinely swim-safe for most people.',['Rain and splashes','Washing and showering','Swimming at the surface','Snorkelling'],['Scuba diving','High-pressure jets']],
'200':['20 ATM / 200 m','Suitable for recreational diving when the crown screws down.',['Everything above','Snorkelling','Recreational scuba diving'],['Saturation diving']],
'300':['30 ATM / 300 m','A true dive specification with a screw-down crown and tested seals.',['Everything above','Recreational and technical diving'],[]]};
function wrOut(){var d=WR[$('wRate').value],age=$('wAge').value,o=$('wOut');
 var y=d[2].map(function(x){return '<li>'+x+'</li>';}).join('');
 var n2=d[3].map(function(x){return '<li class="no">'+x+'</li>';}).join('');
 var note=age==='old'?'Gaskets harden with age. On a watch that has not been pressure-tested in the last two years, treat the rating as about one step lower than printed.':age==='mid'?'Have the seals pressure-tested at the next service; it costs little and is the only way to know the rating still holds.':'A recent pressure test is the only thing that makes a printed rating meaningful. Ask for one whenever the back has been opened.';
 o.innerHTML='<h4>'+d[0]+'</h4><p>'+d[1]+'</p><ul class="yn">'+y+n2+'</ul><p style="margin:.8em 0 0"><b>Age of the seals:</b> '+note+'</p><p style="margin:.6em 0 0;font-size:.9rem">Hot water and steam are harder on gaskets than depth is. A shower damages more watches than a swimming pool.</p>';}
['wRate','wAge'].forEach(function(i){var e=$(i);if(e)e.addEventListener('change',wrOut);});
if($('wRate'))wrOut();
})();
