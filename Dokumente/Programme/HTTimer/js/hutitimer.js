﻿window.modules.timer=true;

var uwrs,colors,uwrholders,cube,rshtml,rohtml,remainingInspectionTime,optionbreaks,optiontexts;

//IDs
const SCRAMBLE="scramble";
const SCRAMBLER="scrambler";
const SCRAMBLEIMAGE="scrambleImage";
const SESSIONS="sessions";
const TIME="time";
const TIMES="times";
const TIMELIST="timelist";

remainingInspectionTime=0;
rshtml='<small><span style="color:red;float:right;" title="Random state"><i>RS</i>&nbsp;</span></small>';
rohtml='<small><span style="color:red;float:right;" title="Random orientation"><i>RO</i>&nbsp;</span></small>';
cube=generatealgjscube(alg_jison);
uwrs=[];
colors=[];
uwrholders=[];
uwrs["barrel"]=11.636;
uwrs["ghost"]=33.25;
colors["W"]="#FFFFFF";
colors["R"]="#FF0000";
colors["O"]="#FFA500";
colors["S"]="#000000";
colors["G"]="#FFFF00";
colors["U"]="#FF00FF";
colors["B"]="#0000FF";
colors["A"]="#A0A0A0";

(function(){
	var parts;
	var s=window.location.search.substring(1).split('&');
	if(!s.length)return; 
	window.$_GET={};
	for(var i=0;i<s.length;++i){
		parts = s[i].split('=');
		window.$_GET[unescape(parts[0])] = unescape(parts[1]);
	}
}());

document.getElementByClass=function(a){
	return document.getElementsByClassName(a)[0];
}

rotationReducer={
	keys:[["x y x'","z"],["x' y x","z'"],["y x y'","z'"],["y x' y'","z"]],
	reduce:function(rots){
		rots=rots.toLowerCase();
		for(var i=0;i<rotationReducer.keys.length;++i){
			if(rotationReducer.keys[i][0]==rots){
				rots=rotationReducer.keys[i][1];
			}
		}
		return rots;
	}
}

rotationReducer2={
	reduce:function(rots){
		return rotationReducer2.reduce(rots);
		/*var out,curState,curState2;
		out="",
		curState=[0,1,2,3,4,5];//RUFDBL 012345 R0 U1 F2 D3 B4 L5
		curState2=curState;
		rots=rots.split(" ");
		for(var i=0;i<rots.length;++i){
			//if(rots[i].match(/[xyz]{1}['2]?/)){
			if(true){
				var rep=1;
				if(rots[i][1]=="2")rep=2;
				if(rots[i][1]=="'")rep=3;
				for(var j=0;j<rep;++j){
					if(rots[i][0]=="x"){
						curState2[1]=curState[2];
						curState2[2]=curState[3];
						curState2[3]=curState[4];
						curState2[4]=curState[1];
					}else if(rots[i][0]=="y"){
						curState2[0]=curState[2];
						curState2[2]=curState[3];
						curState2[5]=curState[4];
						curState2[4]=curState[0];
					}else if(rots[i][0]=="z"){
						curState2[1]=curState[0];
						curState2[0]=curState[3];
						curState2[3]=curState[5];
						curState2[5]=curState[1];
					}else{
						return false;
					}
					curState=curState2;
					curState2=[0,1,2,3,4,5];
				}
			}
		}
		out=curState;
		return out;*/
	}
}

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
Array.prototype.min = function() {
  return Math.min.apply(null, this);
};
String.prototype.replaceAll = function(search,replacement) {
	var target = this;
	return target.replace(new RegExp(search,'g'),replacement);
};
var isUndefined=function(x){return (function(a,undefined){return a==undefined;})(x)};
var isUndefinedFast=function(x){return x===void 0;};

var digits = function f(a,b){return"\n_ |"[b%4&&b%2+-~a]||"ცᕦဨဢᒦႂႊᅦႪႦ".charCodeAt(a).toString(2).replace(/./g,f)}

function buildArchitecture(){
	window.timer=timer={
		config:{
			results:[],
			aktualisierungsrate:17
		},
		running:false,
		zeit:0,
		scramble:"",
		penalty:"",
		type:"3x3",
		timingMode:1,
		blockTime:2e2,
		blockTimeReturn:3e3,
		sessions:[],
		currentSession:0,
		defaultScrambler:"3x3",
		colorScheme:["R","W","U","G","B","O"],
		relayCommand:"2x2 2x2bld",
		version:"2.1.7",
		customAvg:100,
		tool:0,
		precision:true,
		relayWarn:true,
		exportDesign:0,
		displayGoalUnderTime:false,
		scrambleTypes:["1x1","2x2","3x3","4x4","5x5","6x6","7x7","pyra","mega","square-1","skewb","clock","FMC",
							"2x2opt","4x4sh","5x5sh","2x2bld","3x3bld","4x4bld","5x5bld","3x3co","3x3hco","3x3ru","3x3ruf","3x3rul","3x3lse","4x4sign","4x4rruu","5x5sign",
							"1x2x2","1x2x3","3x3x2","3x3x4","3x3x5","2x2x3",
							"barrel","ghost","3x3co",
							"heli","helij","curvy","curvyj","curvyp","curvypj","curvypfj","mixup3x3","mixup4x4","mpyra","giga","pyracrystal","sq224","dreidellim","square-2",
							"relay"],
		scrambleNames:["1x1x1","2x2x2","3x3x3","4x4x4","5x5x5","6x6x6","7x7x7","Pyraminx","Megaminx","Square-1","Skewb","Clock","Fewest Moves",
							"2x2x2 kurz","4x4x4 kurz","5x5x5 kurz","2x2x2 Blind","3x3x3 Blind","4x4x4 Blind","5x5x5 Blind","3x3x3 Center Orientation","3x3x3 half center orientation","3x3x3 &lt;RU&gt;","3x3x3 &lt;RUF&gt;","3x3x3 &lt;RUL&gt;","3x3x3 LSE","4x4x4 SiGN","4x4x4 &lt;RrUu&gt;","5x5x5 SiGN",
							"1x2x2","1x2x3","3x3x2","3x3x4","3x3x5","2x2x3",
							"Barrel Cube","Ghost Cube","Fisher Cube",
							"Helicopter Cube","Jumbled Helicopter Cube","Curvy Copter","Jumbled Curvy Copter","Curvy Copter Plus","Jumbled Curvy Copter Plus","Fully Jumbled Curvy Copter Plus","Mixup 3x3","Mixup 4x4","Master Pyraminx","Gigaminx","Pyraminx Crystal","Square 2x2x4","Dreidel LimCube","Square-2",
							"Relays"],
		displayTimeWhenSolving:true
	}
}
buildArchitecture();

setTimeout('timer.scrambleTypes=["1x1","2x2","3x3","4x4","5x5","6x6","7x7","pyra","mega","square-1","skewb","clock","FMC",							"2x2opt","4x4sh","5x5sh","2x2bld","3x3bld","4x4bld","5x5bld","3x3co","3x3hco","3x3ru","3x3ruf","3x3rul","3x3lse","void","4x4sign","4x4rruu","5x5sign","1x2x2","2x2x1","1x2x3","3x3x2","3x3x4","3x3x5","2x2x3","barrel","ghost","3x3co","heli","helij","curvy","curvyj","curvyp","curvypj","curvypfj","mixup3x3","mixup4x4","mpyra","giga","pyracrystal","sq224","dreidellim","square-2","relay"];timer.scrambleNames=["1x1x1","2x2x2","3x3x3","4x4x4","5x5x5","6x6x6","7x7x7","Pyraminx","Megaminx","Square-1","Skewb","Clock","Fewest Moves",							"2x2x2 kurz","4x4x4 kurz","5x5x5 kurz","2x2x2 Blind","3x3x3 Blind","4x4x4 Blind","5x5x5 Blind","3x3x3 Center Orientation","3x3x3 half center orientation","3x3x3 &lt;RU&gt;","3x3x3 &lt;RUF&gt;","3x3x3 &lt;RUL&gt;","3x3x3 LSE","Void Cube","4x4x4 SiGN","4x4x4 &lt;RrUu&gt;","5x5x5 SiGN","1x2x2","RandomState 2x2x1","1x2x3","3x3x2","3x3x4","3x3x5","2x2x3","Barrel Cube","Ghost Cube","Fisher Cube","Helicopter Cube","Jumbled Helicopter Cube","Curvy Copter","Jumbled Curvy Copter","Curvy Copter Plus","Jumbled Curvy Copter Plus","Fully Jumbled Curvy Copter Plus","Mixup 3x3","Mixup 4x4","Master Pyraminx","Gigaminx","Pyraminx Crystal","Square 2x2x4","Dreidel LimCube","Square-2","Relays"];displayScrambler();',200);

function start(){
	if(!timer.running){
		timer.running=true;
		timer.zeit=+new Date();
		setTimeout(time,timer.aktualisierungsrate/2);
		document.getElementById(SCRAMBLEIMAGE).innerHTML="";
	}
}

function time(){
	var tmw;
	if(timer.running){
		tmw=format((+new Date())-timer.zeit);
		if(!timer.displayTimeWhenSolving)tmw="solving";
		document.getElementById(TIME).innerHTML=tmw;
		document.getElementByClass(TIME).innerHTML=tmw;
		setTimeout(time,timer.aktualisierungsrate);
	}
}

function displayScramble(){
	var Tscramble;
	timer.scramble=Tscramble=getScrambles(timer.type,1)||"Error.",
	document.getElementById(SCRAMBLE).innerHTML=Tscramble;
	document.getElementByClass(SCRAMBLE).innerHTML=Tscramble;
	drawTool();
}

function stop(){
	var result,zeit;
	time();
	zeit=+new Date()-timer.zeit;
	
	if(zeit-80<0)zeit+=80;
	if(zeit<80)zeit=80;
	
	document.getElementById(TIME).innerHTML=format(zeit-80);
	document.getElementByClass(TIME).innerHTML=format(zeit-80);
	
	timer.running=false;
	result={
		zeit:zeit-80,
		scramble:document.getElementById(SCRAMBLE).innerHTML.split("<")[0],
		penalty:timer.penalty,
		datum:+new Date(),
		kommentar:""
	};
	timer.config.results.push(result);
	displayScramble();
	if(timer.displayGoalUnderTime){
		document.getElementByClass("goal-time").style.visibility="visible";
		document.getElementByClass("goal-time").innerHTML="load err";
		var text;
		while(ziel.ziele.length<timer.sessions.length){
			ziel.ziele.push([0,0,0,0,0,0]);
		}
		var best,bestao5,besto12;
		best=format(timer.config.results[timer.config.results.length-1].zeit),
		bestao5=format(currentaox(timer.config.results,5)),
		besto12=format(currentaox(timer.config.results,12));
		if(typeof ziel.ziele[timer.currentSession]=="undefined")ziel.ziele[timer.currentSession]=[0,0,0,0,0,0];
		for(var i=0;i<ziel.ziele[timer.currentSession].length;++i){
			if(ziel.ziele[timer.currentSession][i]<0)ziel.ziele[timer.currentSession][i]=0;
		}
		document.getElementByClass("goal-time").innerHTML="<h4>Current Goals:</h4>Single:"+ziel.format(ziel.ziele[timer.currentSession][0],best)+BR+"Ao5:"+ziel.format(ziel.ziele[timer.currentSession][1],bestao5)+BR+"Ao12:"+ziel.format(ziel.ziele[timer.currentSession][2],besto12);
	}
	ziel.check(0,timer.type,zeit)
	timer.zeit=timer.scramble=timer.penalty=0;
	displayTimes();
	drawTool();
	document.getElementById(TIMELIST).scrollBy(250,250);
}

function startInspection(){
	timer.running||(remainingInspectionTime=+new Date,timeInspection());
}

function timeInspection(){
	if(!timer.running){
		var tmw=+new Date()-remainingInspectionTime;
		var color="green";
		if(tmw>8e3-1)color="orange",document.getElementById(SCRAMBLEIMAGE).innerHTML="<span style='font-size:40pt;'>8!</span>";
		if(tmw>12e3-1)color="red",document.getElementById(SCRAMBLEIMAGE).innerHTML="<span style='font-size:40pt;'>12!</span>";
		if(tmw>14e3-1)document.getElementById(SCRAMBLEIMAGE).innerHTML="<span style='font-size:40pt;'>Go!</span>";
		tmw="<span style='color:"+color+"'>"+format(tmw)+"</span>";
		document.getElementById(TIME).innerHTML="Inspect: "+tmw;
		setTimeout(timeInspection,100);
	}
}

function deletetime(id){
	timer.config.results.splice(id,1);
	displayTimes();
	drawTool();
}

function format(s) {
	var ms,secs,mins,hrs;
	
	if(isNaN(s))return "DNF";
	if(!s)s=timer.zeit;
	
	function addZ(n) {
		return (n<10?'0':'')+n;
	}
	function addH(n){
		if(n<100){
		  if(n<10){
			  return '00'+n;
		  }else{
			  return '0'+n;
		  }
		}else{
		  return n;
		}
	}
	function subLastDigit(str){
		return str.substring(0, str.length - 1);
	}
	function sld(str){
		return subLastDigit(str);
	}

  ms = s % 1e3;
  s = (s - ms) / 1e3;
  secs = s % 60;
  s = (s - secs) / 60;
  mins = s % 60;
  hrs = (s - mins) / 60;
	if(timer.precision){
		if(hrs==0){
			if(mins==0){
				return secs + '.' + addH(ms);
			}else{
				return mins + ':' + addZ(secs) + '.' + addH(ms);
			}
		}else{
			return hrs + ':' + addZ(mins) + ':' + addZ(secs) + '.' + addH(ms);
		}
	}else{
		if(hrs==0){
			if(mins==0){
				return secs + '.' + sld(addH(ms));
			}else{
				return mins + ':' + addZ(secs) + '.' + sld(addH(ms));
			}
		}else{
			return hrs + ':' + addZ(mins) + ':' + addZ(secs) + '.' + sld(addH(ms));
		}
	}
}

function displayTimes(){
	var text;
	text="<table><tr><td colspan='3'>Times</td></tr>";
	for(var i=0;i<timer.config.results.length;++i){
		zeit=timer.config.results[i].zeit,
		scramble=timer.config.results[i].scramble,
		penalty=timer.config.results[i].penalty;
		text+="<tr>"
		     +"<td>"+(i+1)+".:</td><td onclick='javascript:showTime("+i+");'>";
		if(penalty!=="DNF"){
			text+=format(zeit);
			if(penalty==="+2"){
				text+="+";
			}else if(penalty==="+4"){
				text+="++";
			}
		}else{
			text+="DNF";
		}
	
		text+="</td><td><select>";
		text+="<option onclick='javascript:setPenalty("+i+",\"\");'>OK</option>";
		text+="<option onclick='javascript:setPenalty("+i+",\"+2\");'>+2</option>";
		text+="<option onclick='javascript:setPenalty("+i+",\"+4\");'>+4</option>";
		text+="<option onclick='javascript:setPenalty("+i+",\"DNF\");'>DNF</option>";
		text+="<option onclick='javascript:deletetime("+i+");'>Delete</option>";
		text+="</select></td></tr>";
	}
	text+="</table>";
	document.getElementById(TIMES).innerHTML=text;
	document.getElementByClass(TIMES).innerHTML=text;
}

function showTime(i){
	var text,zeit,scramble,penalty,datum,kommentar,fake;
	text="",
	zeit=timer.config.results[i].zeit,
	scramble=timer.config.results[i].scramble,
	penalty=timer.config.results[i].penalty||"N",
	datum=timer.config.results[i].datum;
	fake=zeit<3000?"J":"N";
	zeit=penalty=="DNF"?"DNF("+zeit+")":zeit;
	kommentar=timer.config.results[i].kommentar;
	show('timeDetails');
	function dodate(time){
		var b=new Date(time);
		return b.getDate()+"."+(b.getMonth()+1)+"."+b.getFullYear()+" "+b.getHours()+":"+b.getMinutes()+":"+b.getSeconds()+"."+b.getMilliseconds();
	}
	text+="<h3>Solve information</h3>"+BR+"Zeit: "+zeit+BR+"Formatierte Zeit: "+format(zeit)+BR+"Scramble: "+scramble+BR+"Penalty: "+penalty+BR+"Datum: "+datum+BR+"Formatiertes Datum: "+dodate(datum)+BR+"Kommentar: '"+kommentar+"'"+BR+"Fake: "+fake+BR+BR+"<button onclick='javascript:hide(\"timeDetails\");'>"+language.back+"</button>";
	document.getElementById("timeDetails").innerHTML=text;
}

document.onkeyup = function(event) {
	event.preventDefault();
	if ((event.keyCode===86||event.keyCode===32||event.keyCode===66||event.keyCode===78) && timer.timingMode===0){
		event.cancelBubble = true;
		checkKeyAction();
	}else if(event.keyCode===32&&timer.timingMode===1){
		event.cancelBubble = true;
		checkKeyAction();
	}else if(event.keyCode===17&&timer.timingMode===2){
		event.cancelBubble = true;
		checkKeyAction();
	}else if(event.keyCode===79&&!(timer.config.disableKeysRunning&&timer.running)){//O
		show('options');
	}else if(event.keyCode===69&&!(timer.config.disableKeysRunning&&timer.running)){//E
		exportCode();
	}else if(event.keyCode===73&&!(timer.config.disableKeysRunning&&timer.running)){//I
		//timer.importCode();
	}else if(event.keyCode===88&&!(timer.config.disableKeysRunning&&timer.running)){//X
		timer.exportCode(1);
	}else if(event.keyCode===78&&!(timer.config.disableKeysRunning&&timer.running)){//N //Conflict with timingMode 1
		//createSession();
	}else if(event.keyCode===83&&!(timer.config.disableKeysRunning&&timer.running)){//S
		timer.saveSession(timer.config.currentSession);
	}
	return false;
}

function checkKeyAction(){
	if(timer.running){
		stop();
	}else{
		if(!timer.block){
			start();
			timer.block=true;
			setTimeout(function(){timer.block=false},timer.blockTime);
		}else{
			//document.getElementById(TIMELIST).innerHTML="Timer blockiert! Warten sie "+timer.blockTime/1000+" Sekunden. <button onclick='javascript:timer.timeListDisplay();'>"+language.back+" (Auto in "+timer.blockTimeReturn/1000+" Sekunden)</button>";
			setTimeout(timeListDisplay,timer.blockTimeReturn);
		}
	}
}

function avg(times){//aox
	var min,max,minindex,maxindex,sum;
	
	min=+Infinity;
	max=-Infinity;
	sum=0;
	for(var j=0;j<times.length;++j){
		if(times[j].zeit<min){
			min=times[j].zeit;
			minindex=j;
		}
		if(times[j].zeit>max){
			max=times[j].zeit;
			maxindex=j;
		}
	}

	for(var i=0;i<times.length;++i){
		if(i!==minindex&&i!==maxindex){
			sum+=times[i].zeit;
		}
	}

	return sum/(times.length-2);
}

function average(times){//mox
	var sum;
	sum=0;

	for(var i=0;i<times.length;++i){
		sum+=times[i].zeit;	
	}

	return sum/times.length;
}

function minMaxTime(times){
	var min,minindex,max,maxindex;
	min=+Infinity;
	max=-Infinity;
	
	for(var j=0;j<times.length;++j){
		if(times[j].zeit<min){
			min=times[j].zeit;
			minindex=j;
		}
		if(times[j].zeit>max){
			max=times[j].zeit;
			maxindex=j;
		}
	}
	return {minindex:minindex,min:min,maxindex:maxindex,max:max};
}

function bestaox(times,x){
	if(times.length<x){
		return "DNF";
	}
	if(times.length==x){
		return Math.round(avg(times));
	}

	var arr,min,minavg;
	arr=[];
	min=+Infinity;
	
	for(var i=0;i<times.length-x;++i){
		arr=[];
		for(var j=0;j<x;++j){
			arr.push(times[i+j]);
		}
		minavg=avg(arr);
		if(minavg<min){
			min=minavg;
		}
	}
	return Math.round(min);
}
function currentaox(times,x){
	if(times.length<x){
		return "DNF";
	}
	if(times.length==x){
		return Math.round(avg(times));
	}

	var arr,minavg,i;
	arr=[];
	
	i=times.length-x;
	arr=[];
	for(var j=0;j<x;++j){
		arr.push(times[i+j]);
	}
	minavg=avg(arr);
	
	return Math.round(minavg);
}

function toolTimes(){
	var globalAVerage,best,worst,bestao5,uwr,fake,p;
	globalAverage=format(Math.floor(average(timer.config.results))),
	best=format(minMaxTime(timer.config.results).min),
	worst=format(minMaxTime(timer.config.results).max),
	bestao5=format(bestaox(timer.config.results,5));
	
	(best<uwrs[timer.type])?uwr=true:uwr=false;
	(best<0.3)?fake=true:fake=false;
	p=language.globalAverage+": " + globalAverage +BR+language.best+": " + best;
	if(uwr&&!fake){
		p+=" <b>UWR!</b>";
	}else if(fake&&!uwr){
		p+=" <b>FAKE! :(</b>";
	}else if(fake&&uwr){
		p+=" <b>FAKED UWR! :(</b>";
	}
	p+=BR+language.worst+": " + worst + BR+language.best+" Ao5: " + bestao5 + "";
	ziel.check(1,timer.type,bestao5);
	if(timer.config.results.length>11){
		p+=BR+language.best+" Ao12: "+format(bestaox(timer.config.results,12));
		if(timer.config.results.length>49){
			p+=BR+language.best+" Ao50: "+format(bestaox(timer.config.results,50));
		}
	}
	if(timer.config.results.length>timer.customAvg-1){
		p+=BR+language.best+" Ao"+timer.customAvg+": "+format(bestaox(timer.config.results,timer.customAvg));
	}
	return p+BR+"<button class='btn-lg' onclick='generateExport();'>Export</button>";
}

function toolTimeDistribution(){
	return true;
}

function toolDrawScramble(){
	var type=timer.type,scramble=timer.scramble,msg=false;
	switch(type){
		case "2x2":case "2x2sh":case "2x2opt":case "2x24":case "2x2bld":msg=generateCube(executeAlg(timer.scramble,SOLVED_POCKET_CUBE(),2));break;
		case "3x3":case "3x3bld":case "3x3co":case "3x3hco":case "3x3ru":case "3x3ruf":case "lse":case "barrel":     break;
		case "skewb":     break;
		case "pyra":     break;
		default:msg="Scrambles malen ist f&uuml;r diesen Typen leider nicht verf&uuml;gbar.";break;
	}
	if(msg)return msg;
}

function toolTimeRatio(){
	var globalAverage,best,worst,bestao5,text;
	globalAverage=format(average(timer.config.results)),
	best=format(minMaxTime(timer.config.results).min),
	worst=format(minMaxTime(timer.config.results).max),
	bestao5=format(bestaox(timer.config.results,5)),
	
	text="<table>";
	text+="<tr><td><b>A</b></td><td><b>zu B</b></td><td><b>Verh&auml;ltnis</b></td></tr>";
	text+="<tr><td>Best</td><td>Worst</td><td>"+Math.floor(best/worst*100)/100+"</td></tr>";
	text+="<tr><td>Single</td><td>Ao5</td><td>"+Math.floor(best/bestao5*100)/100+"</td></tr>";
	if(timer.config.results.length>11){
		text+="<tr><td>Single</td><td>Ao12</td><td>"+Math.floor(best/format(bestaox(timer.config.results,12))*100)/100+"</td></tr>";
		text+="<tr><td>Ao5</td><td>Ao12</td><td>"+Math.floor(bestao5/format(bestaox(timer.config.results,12))*100)/100+"</td></tr>";
		if(timer.config.results.length>49){
			text+="<tr><td>Single</td><td>Ao50</td><td>"+Math.floor(best/format(bestaox(timer.config.results,50))*100)/100+"</td></tr>";
			text+="<tr><td>Ao5</td><td>Ao50</td><td>"+Math.floor(bestao5/format(bestaox(timer.config.results,50))*100)/100+"</td></tr>";
			text+="<tr><td>Single</td><td>Ao12</td><td>"+Math.floor(format(bestaox(timer.config.results,12))/format(bestaox(timer.config.results,50))*100)/100+"</td></tr>";
		}
	}
	if(timer.config.results.length>timer.customAvg-1){
		text+="<tr><td>Single</td><td>Ao"+timer.customAvg+"</td><td>"+Math.floor(best/format(bestaox(timer.config.results,timer.customAvg))*100)/100+"</td></tr>";
	}
	return text;
}

function toolTimeHistory(){
	document.getElementById("summ").innerHTML="<canvas id='pbcanvas' width='200' height='150'></canvas>";
	var canvas = document.getElementById('pbcanvas'),
	ctx = canvas.getContext('2d'),
	height=150,
	width=200;
	ctx.moveTo(0,height-1);
	ctx.lineTo(width,height-1);
	ctx.stroke();
	ctx.font = "10px Arial";
	
	times=JSON.parse(JSON.stringify(timer.config.results));
	var min=0,j,max=minMaxTime(timer.config.results).max,time;
	for(var j=0;j<times.length;++j){
		time=times[j].zeit;
		ctx.moveTo((j/times.length)*width,height+min-1);
		ctx.lineTo((j/times.length)*width,height-((time/max)*height)+1);
	}
	ctx.stroke();
}

function drawTool(){
	/*var a=false;
	switch(timer.tool){
		case 0:a=toolTimes();break;
		case 1:a=toolTimeDistribution();break;
		case 2:a=toolDrawScramble();break;
		case 3:a=toolTimeRatio();break;
		case 4:a=toolTimeHistory();break;
		case 5:a=ziel.vergleich();break;
	}
	if(a&&!a){
		document.getElementById("summ").innerHTML=a;
	}*/
	var globalAverage,best,worst,bestao5,uwr,fake,p,bestcurrent;
	globalAverage=format(Math.floor(average(timer.config.results))),
	best=format(minMaxTime(timer.config.results).min),
	worst=format(minMaxTime(timer.config.results).max),
	bestao5=format(bestaox(timer.config.results,5)),
	bestcurrent=timer.config.results.length>0?format(timer.config.results[timer.config.results.length-1].zeit||"DNF"):"DNF";
	
	(best<uwrs[timer.type])?uwr=true:uwr=false;
	(best<0.3)?fake=true:fake=false;
	p="<table><tr><td>Type</td><td>Current</td><td>Best</td></tr><tr><td colspan='3'><hr/></td></tr><tr><td>Session Mo"+timer.config.results.length+"</td><td>--</td><td>"+ globalAverage+"</td></tr>";
	p+="<tr><td>Single</td><td>"+bestcurrent+"</td><td>"+best+"</td></tr>";
	p+="<tr><td>Ao5</td><td>"+format(currentaox(timer.config.results,5))+"</td><td>"+bestao5+"</td></tr>";
	ziel.check(1,timer.type,bestao5);
	if(timer.config.results.length>11){
		p+="<tr><td>Ao12</td><td>"+format(currentaox(timer.config.results,12))+"</td><td>"+format(bestaox(timer.config.results,12))+"</td></tr>";
		if(timer.config.results.length>49){
			p+="<tr><td>Ao50</td><td>"+format(currentaox(timer.config.results,50))+"</td><td>"+format(bestaox(timer.config.results,50))+"</td></tr>";
			if(timer.config.results.length>99){
				p+="<tr><td>Ao100</td><td>"+format(currentaox(timer.config.results,100))+"</td><td>"+format(bestaox(timer.config.results,100))+"</td></tr>";
				if(timer.config.results.length>999){
					p+="<tr><td>Ao1000</td><td>"+format(currentaox(timer.config.results,1000))+"</td><td>"+format(bestaox(timer.config.results,1000))+"</td></tr>";
				}
			}
		}
	}
	if(timer.config.results.length>timer.customAvg-1){
		p+="<tr><td>"+timer.customAvg+"</td><td>--</td><td>"+format(bestaox(timer.config.results,timer.customAvg))+"</td></tr>";
	}
	//return p+BR+"<button class='btn-lg' onclick='generateExport();'>Export</button>";
	document.getElementByClass("sessionavg").innerHTML=p+"</table>";
}

function givePenalty(id,penalty){
	if(timer.config.results[id].penalty===""&&penalty==="+2"){
		timer.config.results[id].penalty="+2";
		timer.config.results[id].zeit+=2e3;
	}
	else if(timer.config.results[id].penalty===""&&penalty==="+4"){
		timer.config.results[id].penalty="+4";
		timer.config.results[id].zeit+=4e3;
	}
	else if(timer.config.results[id].penalty==="+2"&&penalty==="+2"){
		timer.config.results[id].penalty="+4";
		timer.config.results[id].zeit+=2e3;
	}
	else if(timer.config.results[id].penalty==="+2"&&penalty==="-2"){
		timer.config.results[id].penalty="";
		timer.config.results[id].zeit-=2e3;
	}
	else if(timer.config.results[id].penalty==="+4"&&penalty==="-2"){
		timer.config.results[id].penalty="+2";
		timer.config.results[id].zeit-=2e3;
	}
	else if(timer.config.results[id].penalty==="+4"&&penalty==="-4"){
		timer.config.results[id].penalty="";
		timer.config.results[id].zeit-=4e3;
	}
	else if(penalty==="DNF"){
		timer.config.results[id].penalty="DNF";
	}
	else if(timer.config.results[id].penalty==="DNF"&&penalty==="-DNF"){
		timer.config.results[id].penalty="";
	}
	else{
		timer.config.results[id].penalty="";
	}

	displayTimes();
	drawTool();
}

function setPenalty(id,penalty){
	if(timer.config.results[id].penalty===""&&penalty==="+2"){
		timer.config.results[id].penalty="+2";
		timer.config.results[id].zeit+=2e3;
	}
	else if(timer.config.results[id].penalty===""&&penalty==="+4"){
		timer.config.results[id].penalty="+4";
		timer.config.results[id].zeit+=4e3;
	}
	else if(timer.config.results[id].penalty==="+2"&&penalty==="+4"){
		timer.config.results[id].penalty="+4";
		timer.config.results[id].zeit+=2e3;
	}
	else if(penalty==="DNF"){
		setPenalty(id,"");
		timer.config.results[id].penalty="DNF";
	}
	else if(timer.config.results[id].penalty==="DNF"&&penalty===""){
		timer.config.results[id].penalty="";
	}
	if(timer.config.results[id].penalty==="+2"&&penalty===""){
		timer.config.results[id].penalty="";
		timer.config.results[id].zeit-=2e3;
	}
	else if(timer.config.results[id].penalty==="+4"&&penalty===""){
		timer.config.results[id].penalty="";
		timer.config.results[id].zeit-=4e3;
	}
	
	displayTimes();
	drawTool();
}

function switchSession(id){
	timer.sessions[timer.currentSession].results=JSON.parse(JSON.stringify(timer.config.results));
	timer.currentSession=id;
	timer.type=timer.sessions[timer.currentSession].scrambler;
	timer.config.results=JSON.parse(JSON.stringify(timer.sessions[timer.currentSession].results));
	displayTimes();
}

function deleteSession(id){
	if(confirm("Session wirklich resetten?")&&confirm("Alle Ihre Zeiten aus der Session werden gel�scht. Ganz sicher?")){
		timer.sessions[id].results=[];
	}
}

function createSession(){
	session={
		scrambler:timer.defaultScrambler,
		results:[],
	}
	timer.sessions.push(session);
	displaySessions();
}

function displaySessions(){
	var text;
	text="<select>";
	for(var i=0;i<timer.sessions.length;++i){
		text+="<option onclick='javascript:switchSession("+i+")'>Session "+(i+1)+"</option>";
	}
	text+="<option onclick='javascript:createSession();'>Add Session</option>";
	text+="<option onclick='javascript:deleteSession(timer.currentSession);'>Reset Session</option>";
	document.getElementById(SESSIONS).innerHTML=text+"</select>";
	document.getElementByClass("sessionlist").innerHTML=text+"</select>";
	displayScrambler();
}


function switchScrambler(typ){
	timer.sessions[timer.currentSession].scrambler=timer.type=typ;
	displayScramble();
}

optionbreaks=[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
optiontexts=["WCA",0,0,0,0,0,0,0,0,0,0,0,0,"Special NxNxN",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"Cuboids",0,0,0,0,0,0,"Shapemods",0,0,"Sonstige",0,0,0,0,0,0,0,0,0,0,0,0,0,0,"Relays"];

function displayScrambler(a){
	var text;
	text="";
	/*
	for(var i=0;i<timer.scrambleTypes.length;++i){
		if(optionbreaks[i]==1)text+="<h3>"+optiontexts[i]+"</h3>";
		text+="<div class='scrambler-div' onclick='switchScrambler(\""+timer.scrambleTypes[i]+"\")'>"+timer.scrambleNames[i]+"</div>";
	}
	document.getElementById(SCRAMBLER).innerHTML=text+"<div class='scrambler-div'>Auswahl in Men&uuml;/Optionen/Sonstiges/Relays</div><div onclick='javascript:hide(\"scrambler\");'>back</div>";
	a&&(document.getElementById(a.replace("#","")).innerHTML=text);*/
}

function generateExport(){
	var globalAverage,best,worst,bestao5,exportDesign,p,d,i;
	
	globalAverage=format(average(timer.config.results)),
	best=format(minMaxTime(timer.config.results).min),
	worst=format(minMaxTime(timer.config.results).max),
	bestao5=format(bestaox(timer.config.results,5)),
	exportDesign=timer.exportDesign||0,

	p="<h2>Export</h2>"+language.globalAverage+": " + globalAverage + BR+language.best+"e: " + best + BR+language.worst+": " + worst + BR+language.best+" Ao5: " + bestao5 + BR;
	if(timer.config.results.length>11){
		p+=BR+language.best+" Ao12: "+format(bestaox(timer.config.results,12));
		if(timer.config.results.length>49){
			p+=BR+language.best+" Ao50: "+format(bestaox(timer.config.results,50));
		}
	}
	if(timer.config.results.length>timer.customAvg-1){
		p+=BR+language.best+" Ao"+timer.customAvg+": "+format(bestaox(timer.config.results,timer.customAvg));
	}

	p+=BR;
	
	for(var i=0;i<timer.config.results.length;++i){
		if(exportDesign==0){
			p+=BR+(i+1)+".: ";
			p+=format(timer.config.results[i].zeit)+" "+timer.config.results[i].scramble+BR;
		}else if(exportDesign==1){
			p+=format(timer.config.results[i].zeit)+",";
		}else if(exportDesign==2){
			p+=format(timer.config.results[i].zeit)+BR;
		}else if(exportDesign==3){
			p+=(i+1)+".: "+format(timer.config.results[i].zeit)+BR;
		}
	}
	d = new Date();
	d=d.toDateString();
	i=Math.round((i/256)+.5);
	p+=BR+"Export wurde am "+d+" in "+i+"ms generiert.";
	p+=BR+"<button onclick='hide(\"export\");'>"+language.back+"</button>";
	show('export');
	document.getElementById('export').innerHTML=p;

	displayTimes();
	drawTool();
}

function exportCode(){
	var code="timer="+JSON.stringify(timer,null,1)+";algsets.sets="+JSON.stringify(algsets.sets,null,1);
	localStorage.HTexport=code;
	alert ("Code wurde in localStorage verschoben und wird bei Neuladen automatisch geladen werden!");
	document.getElementById(SCRAMBLEIMAGE).innerHTML=code+"<button onclick='hideExportCode()'>OK</button>";
	return code;
}

function hideExportCode(){
	document.getElementById(SCRAMBLEIMAGE).innerHTML="";
}

function importCode(){
	var a,b;
	a=timer.version||false;
	eval(prompt(language.entercode));
	displayTimes();
	displaySessions();
	b=timer.version||false;
	if(b!=a){
		alert ("Der Export wurde mit Version "+a+" erstellt. Diese Version ist veraltet. Die fehlenden Variablen wurden ergänzt. Manche Scramblertypen k�nnen ver�ndert sein. Der n�chste Export wird Dateien der aktuellen Version generieren; diese sind meistens r�ckw�rtskompatibel.");
	}
}

ziel={
	ziele:[[0,0,0,0,0,0]],
	done:[],
	doneAvg:[],
	display:function(){
		var text;
		while(ziel.ziele.length<timer.sessions.length){
			ziel.ziele.push([0,0,0,0,0,0]);
		}
		text="<h2>"+language.goals+"</h2>";
		show('ziele');
		var
		globalAverage=format(average(timer.config.results)),
		best=format(minMaxTime(timer.config.results).min),
		worst=format(minMaxTime(timer.config.results).max),
		bestao5=format(bestaox(timer.config.results,5)),
		besto12=format(bestaox(timer.config.results,12)),
		bestao50=format(bestaox(timer.config.results,50)),
		bestocustom=format(bestaox(timer.config.results,timer.customAvg));
		if(typeof ziel.ziele[timer.currentSession]=="undefined")ziel.ziele[timer.currentSession]=[0,0,0,0,0,0];
		for(var i=0;i<ziel.ziele[timer.currentSession].length;++i){
			if(ziel.ziele[timer.currentSession][i]<0)ziel.ziele[timer.currentSession][i]=0;
		}
		text+="<table style='color:black;'><tr><td>Type</td><td>Goal</td><td>Set</td></tr>"
		+"<tr><td>Single</td><td>"+ziel.format(ziel.ziele[timer.currentSession][0],best)+"</td><td><button onclick='ziel.ziele[timer.currentSession][0]=prompt(\"Type in new goal.\");ziel.display();'>Set</button></td></tr>"
		+"<tr><td>Ao5</td><td>"+ziel.format(ziel.ziele[timer.currentSession][1],bestao5)+"</td><td><button onclick='ziel.ziele[timer.currentSession][1]=prompt(\"Type in new goal.\");ziel.display();'>Set</button></td></tr>"
		+"<tr><td>Ao12</td><td>"+ziel.format(ziel.ziele[timer.currentSession][2],besto12)+"</td><td><button onclick='ziel.ziele[timer.currentSession][2]=prompt(\"Type in new goal.\");ziel.display();'>Set</button></td></tr>"
		+"<tr><td>Ao50</td><td>"+ziel.format(ziel.ziele[timer.currentSession][3],bestao50)+"</td><td><button onclick='ziel.ziele[timer.currentSession][3]=prompt(\"Type in new goal.\");ziel.display();'>Set</button></td></tr>"
		+"<tr><td>Custom Aox</td><td>"+ziel.format(ziel.ziele[timer.currentSession][4],bestocustom)+"</td><td><button onclick='ziel.ziele[timer.currentSession][4]=prompt(\"Type in new goal.\");ziel.display();'>Set</button></td></tr>";
		text+="</table>"+BR+"<div onclick='hide(\"ziele\")'>"+language.back+"</div>";
		document.getElementById("ziele").innerHTML=text;
	},
	format:function(ziel,current){
		var color;
		(ziel/current>1)?color="green":color="red";
		return "<span style='background-color:"+color+"'>"+Math.round(ziel/current*100)+"% ("+language.goal+": "+ziel+" "+language.seconds+")</span>";
	},
	check:function(singleAverage,event,time){
		var times=timer.config.results;
	},
	vergleich:function(){
		var
		globalAverage=format(average(timer.config.results)),
		best=minMaxTime(timer.config.results).min,
		bestao5=bestaox(timer.config.results,5)
		bestao12=bestaox(timer.config.results,12),
		bestao12=bestaox(timer.config.results,12),
		bestao50=bestaox(timer.config.results,50),
		bestocustom=bestaox(timer.config.results,timer.customAvg),
		currentValues=[best,bestao5,bestao12,bestao50,bestocustom];
		text="Aktueller Single/Ao5/Ao12/Ao50/AoCustom Rankvergleich:<table>",
		maxtime=minMaxTime(timer.config.results).min*1.1;
		startvalues=[maxtime,maxtime*1.1,maxtime*1.2*1.1,maxtime*1.3*1.2*1.1,maxtime*1.4*1.3*1.2*1.1,maxtime*1.4*1.3*1.2*1.1*1.5],
		currentValue=0;
		for(var j=0;j<5;++j){
			text+="<tr>";
			currentValue=startvalues[j];
			for(var i=0;i<20;++i){
				text+="<td>";
				for(var k=0;k<i;k++)currentValue*=.97;
				if(currentValue>currentValues[j])text+="<span style='background-color:green'>"+Math.round(currentValue)/1e3+"</span></td>";
				if(currentValue<currentValues[j])text+="<span style='background-color:red'>"+Math.round(currentValue)/1e3+"</span></td>";
				if(currentValue==currentValues[j])text+="<span style='background-color:yellow'>"+Math.round(currentValue)/1e3+"</span></td>";
			}
			text+="</tr>";
		}
		return text+"</table>";
	}
}

algsets={
	sets:[],
	setnames:[],
	//registeredSets:{"PLL":["x (R' U R') D2 (R U' R') D2 R2","x' (R U' R) D2 (R' U R) D2 R2","R U' R U R U R U' R' U' R2","R2 U R U R' U' (R' U')(R' U R')","M2 U M2 U2 M2 U M2","R U R' U' R' F R2 U' R' U' R U R' F'","R U R' F' R U R' U' R' F R2 U' R' U'","F R U' R' U' R U R' F' R U R' U' R' F R F'","R' U2 R U2 R' F R U R' U' R' F' R2 U'","L U2' L' U2' L F' L' U' L U L F L2' U","R' U R' d' R' F' R2 U' R' U R' F R F","R' U2 R' d' R' F' R2 U' R' U R' F R U' F","R U R' y' R2 u' R U' R' U R' u R2","R' U' R y R2 u R' U R U' R u' R2","R2 u' R U' R U R' u R2 y R U' R'","R2 u R' U R' U' R u' R2 y' R' U R","M2 U M2 U M' U2 M2 U2 M' U2","R' U L' U2 R U' R' U2 R L U'","x' (R U' R') D (R U R') D' (R U R') D (R U' R') D'","(R' U L') U2 (R U' L)(R' U L') U2 (R U' L) U'","(L U' R) U2 (L' U R')(L U' R) U2 (L' U R') U"]},
	registeredSets:{},
	display:function(){
		var text,cstate;
		show('algSets');
		/*
		text="<h2>Algorithmen</h2>";
		text+="Es sind "+algsets.sets.length+" Sets eingetragen."+BR+"<button onclick='javascript:algsets.addSet()'>+</button>"+BR;
		for(var i=0;i<algsets.sets.length;++i){
			text+=algsets.setnames[i]+":<button onclick='javascript:algsets.addAlg("+i+")'>+</button>"+BR;
			for(var j=0;j<algsets.sets[i].length;++j){
				text+=(j+1)+".: "+algsets.formatAlg(algsets.sets[i][j])+"<button onclick='javascript:algsets.sets["+i+"]["+j+"]=algsets.turnAlg(algsets.sets["+i+"]["+j+"]);algsets.display();'>Invert</button><button onclick='javascript:algsets.sets["+i+"]["+j+"]=algsets.mirrorM(algsets.sets["+i+"]["+j+"]);algsets.display();'>Mirror M</button><button onclick='javascript:algsets.sets["+i+"]["+j+"]=algsets.mirrorS(algsets.sets["+i+"]["+j+"]);algsets.display();'>Mirror S</button><button onclick='javascript:algsets.sets["+i+"]["+j+"]=algsets.simplify(algsets.sets["+i+"]["+j+"]);algsets.display();'>Simplify</button><button onclick='javascript:algsets.sets["+i+"]["+j+"]=algsets.viewExecution(algsets.sets["+i+"]["+j+"]);'>View Execution</button><button onclick='javascript:algsets.edit("+i+","+j+");'>Edit</button>"+BR;
			}
		}*/
		text="";
		text="<h2>Algorithms</h2>";
		text+="Number of Sets: "+algsets.sets.length+"."+BR+"<img onclick='javascript:algsets.addSet()' src='icon/icon_+.png' alt='+'/>"+BR;
		
		for(var i=0;i<algsets.sets.length;++i){
			text+=algsets.setnames[i]+":<img onclick='javascript:algsets.addAlg("+i+")' src='icon/icon_+.png' alt='+'/>"+BR;
			for(var j=0;j<algsets.sets[i].length;++j){
				cstate=(function(alg,undefined){
					var cube,a,b;
					cube=new Cube();
					cube.move(alg);
					a=cube.asString();
					b=[];
					b.push(["X"  ,a[47],a[46],a[45],"X"  ]);
					b.push([a[36],a[0] ,a[1] ,a[2] ,a[11]]);
					b.push([a[37],a[3] ,a[4] ,a[5] ,a[10]]);
					b.push([a[38],a[6] ,a[7] ,a[8] , a[9]]);
					b.push(["X"  ,a[18],a[19],a[20],"X"  ]);
					return b;
				}(algsets.invert(algsets.sets[i][j])));
				text+="<div class='case'>"+algsets.sets[i][j]+algsets.cubeimage(cstate)
				+"<button onclick='javascript:algsets.sets["+i+"]["+j+"]=algsets.turnAlg(algsets.sets["+i+"]["+j+"]);algsets.display();'>Invert</button>"
				+"<button onclick='javascript:algsets.sets["+i+"]["+j+"]=algsets.mirrorM(algsets.sets["+i+"]["+j+"]);algsets.display();'>Mirror M</button>"
				+"<button onclick='javascript:algsets.sets["+i+"]["+j+"]=algsets.mirrorS(algsets.sets["+i+"]["+j+"]);algsets.display();'>Mirror S</button>"
				+"<button onclick='javascript:algsets.sets["+i+"]["+j+"]=algsets.simplify(algsets.sets["+i+"]["+j+"]);algsets.display();'>Simplify</button>"
				+"<button onclick='javascript:algsets.sets["+i+"]["+j+"]=algsets.viewExecution(algsets.sets["+i+"]["+j+"]);'>View Execution</button>"
				+"<button onclick='javascript:algsets.edit("+i+","+j+");'>Edit</button></div>";

			}
		}
		text+=BR+"<div onclick='hide(\"algSets\")'>"+language.back+"</div>";
		document.getElementById("algSets").innerHTML=text;
	},
	invert:function(){
		var alg,out;
		alg=arguments[0].split(" ");
		out=[];
		
		for(var i=0;i<alg.length;++i){
			if(alg[i].length===0)break;
			if(alg[i].length===1)out.push(alg[i]+"'");
			if(alg[i].length===2){
				if(alg[i][1]==="2")out.push(alg[i]);
				if(alg[i][1]==="'")out.push(alg[i][0]);
			}
			if(alg[i].length>2)break;
		}
		return out.reverse().join(" ");
	},
	cubeimage:function (state){
		var text,color;
		text="<div class='cube'>";
		for(var i=0;i<state.length;++i){
			for(var j=0;j<state[i].length;++j){
				color=algsets.stickerColors[state[i][j]]||"white";
				text+="<div class='sticker "+color+"'>&nbsp;</div>";
			}
		}
		return text+"</div>";
	},
	stickerColors:{
		"U":"black",
		"F":"green",
		"L":"orange",
		"R":"red",
		"B":"blue",
		"D":"yellow",
		"X":"white"
	},
	addSet:function(){
		if(a=prompt("Geben Sie Ihren AlgSetNamen hier ein.")){
			algsets.setnames.push(a);
			if(typeof algsets.registeredSets[a.toUpperCase()]!=="undefined"){
				if(confirm("This AlgSet is already defined. Do you want to overwrite the current definition (OK) or use it for your AlgSet (Cancel)?")){
					algsets.sets.push(algsets.registeredSets[a.toUpperCase()]);
				}else{
					algsets.sets.push([]);
				}
			}else{
				algsets.sets.push([]);
			}
			algsets.display();
		}
	},
	addAlg:function(setid){
		algsets.sets[setid].push(prompt("Enter your Algorithm hiere. Allowed moves: R,U,F,D,B,L,R',U',F',D',B',L',R2,U2,F2,D2,B2,L2"));
		algsets.display();
	},
	formatAlg:function(alg){
		return alg;
	},
	turnAlg:function(alg){
		return cube.cube.invert(alg);
	},
	mirrorS:function(alg){
		return cube.cube.mirrorAcrossS(alg);
	},
	mirrorM:function(alg){
		return cube.cube.mirrorAcrossM(alg);
	},
	simplify:function(alg){
		return cube.cube.simplify(alg);
	},
	viewExecution:function(alg){
		document.getElementById("algSets").innerHTML='<iframe src="https://alg.cubing.net/?alg='+cube.cube.simplify(alg)+'&setup='+cube.cube.invert(alg)+'&view=fullscreen" width="800" height="550"></iframe><div onclick="algsets.display()">'+language.back+'</div>';
		return alg;
	},
	edit:function(i,j){
		algsets.sets[i][j]=prompt("Put it your new Algorithm here. Allowed moves: R,U,F,D,B,L,R',U',F',D',B',L',R2,U2,F2,D2,B2,L2",algsets.sets[i][j]);
		algsets.display();
	}
}

var relayNumbers;
relayNumbers=[];

function displayRelayOption(){
	var text;
	text="<button onclick='relayNumbers[1]=relayNumbers[5]=relayNumbers[16]=1;displayRelayOption();'>2x2-4x4</button>"+BR+"<button onclick='relayNumbers[1]=relayNumbers[5]=relayNumbers[16]=relayNumbers[17]=1;displayRelayOption();'>2x2-5x5</button>"+BR+BR;
	for(var i=0;i<timer.scrambleTypes.length;++i){
		if(typeof relayNumbers[i]==="undefined")relayNumbers[i]=0;
		text+=(i+1)+".: "+timer.scrambleNames[i]+"&nbsp;";
		if(relayNumbers[i]<1<<8){
			text+="<img onclick='relayNumbers["+i+"]++;displayRelayOption();' src='icon/icon_+.png' alt='+'/>"
		}else{
			if(timer.relayWarn)text+=language.relayWarnText;
		}
		text+="&nbsp;"+relayNumbers[i]+"&nbsp;";
		if(relayNumbers[i]>0){
			text+="<img onclick='relayNumbers["+i+"]--;displayRelayOption();' src='icon/icon_-.png' alt='-'/>";
		}
		text+=BR;
	}
	document.getElementById("relays").innerHTML=text+BR+"<button onclick='generateRelayCode();hide(\"relays\");'>Finish</button>";
}

function generateRelayCode(){
	timer.relayCommand="";
	for(var i=0;i<relayNumbers.length;++i){
		if(relayNumbers[i]>0){
			for(var j=0;j<relayNumbers[i];++j){
				timer.relayCommand+=timer.scrambleTypes[i]+" ";
			}
		}
	}
}

function importCstimer(code){
	timer={
		running:false,
		zeit:0,
		penalty:'',
		type:"",
		timingMode:1,
		blockTime:1e3,
		blockTimeReturn:3000,
		currentSession:0,
		relayCommand:'2x2 2x2bld',
		version:'2.1.7',
		customAvg:3,
		relayWarn:true,
		sessions:[],
		config:{
			aktualisierungsrate:17,
			results:[]
		}
	};
	eval("cstimer="+code);
	eval("csproperties="+cstimer.properties);
	timer.type=csproperties.scrType;
	for(var i=1;i<csproperties.sessionN;++i){
		timer.sessions[i]={"scrambler":csproperties.scrType,"results":[]};
		for(var j=0,obj;j<eval("cstimer.session"+i).length;++i){
			obj={"zeit":eval("cstimer.session"+i)[j][0][1],"scramble":eval("cstimer.session"+i)[j][1],"penalty":'',"datum":0}
			timer.sessions[i].results.push(obj);
		}
	}
}

musik={
	server:{
		load:function(){
			var src,type,src2,src3;
			src=prompt("Put in the URL here."),
			type=false;
			src3=src.split(".");
			src2=src3[src3.length-1];
			switch(src2){
				case "mp3":
				type="audio/mpeg";
				break;
				case "ogg":
				type="audio/ogg";
				break;
				case "wav":
				type="audio/wav";
				break;
			}
			if(type){
				document.getElementById("musik0").html+="<audio controls autoplay loop><source src='"+src+"' type='"+type+"'/></audio>";
			}else{
				document.getElementById("musik0").innerHTML+="Nicht unterst&uuml;tzter Dateityp!";
			}
		}
	},
	youtube:{
		idlist:[],
		load:function(){
			var id;
			id=prompt("Youtubevideoid hier eingeben:");
			musik.youtube.idlist.push(id);
			musik.youtube.display();	
		},
		loadlist:function(){
			var id,list;
			id=prompt("Youtubevideoid hier eingeben:");
			list=prompt("Youtubevideolistenid hier eingeben:");
			document.getElementById("musik2").innerHTML+='<iframe id="ytplayer" type="text/html" width="640" height="390" src="http://www.youtube.com/embed/'+id+'?autoplay=1&fs=0&disablekb=1&loop=1&autohide=0&list='+list+'" frameborder="0"/>';
		},
		display:function(){
			for(var i=0;i<musik.youtube.idlist.length;++i){
				document.getElementById("youtubeonevideoload").innerHTML+='<iframe id="ytplayer" type="text/html" width="640" height="390" src="http://www.youtube.com/embed/'+musik.youtube.idlist[i]+'?autoplay=1&fs=0&disablekb=1&loop=1&autohide=0" frameborder="0"/>';
			}
		}
	}
}

function takeabreak(){
	var time;
	show('takeabreak');
	time=prompt("How long? (milliseconds)");
	setTimeout("hide('takeabreak');",time);
	document.getElementById("takeabreak").innerHTML="<h1>Taking a break right now!</h1>"+BR+"For "+time+" seconds.";
}

function show(id){
	document.getElementById(id).style.visibility="visible";
}

function hide(id){
	document.getElementById(id).style.visibility="hidden";
}

{var mozilla=document.getElementById&&!document.all,ie=document.all,contextisvisible=0;function iebody(){return document.compatMode&&"BackCompat"!=document.compatMode?document.documentElement:document.body}
function displaymenu(a){el=document.getElementById("context_menu");contextisvisible=1;if(mozilla)return el.style.left=pageXOffset+a.clientX+"px",el.style.top=pageYOffset+a.clientY+"px",el.style.visibility="visible",a.preventDefault(),!1;if(ie)return el.style.left=iebody().scrollLeft+event.clientX,el.style.top=iebody().scrollTop+event.clientY,el.style.visibility="visible",!1}function hidemenu(){"undefined"!=typeof el&&contextisvisible&&(el.style.visibility="hidden",contextisvisible=0)}
mozilla?(document.addEventListener("contextmenu",displaymenu,!0),document.addEventListener("click",hidemenu,!0)):ie&&(document.attachEvent("oncontextmenu",displaymenu),document.attachEvent("onclick",hidemenu));}

(function(){
	var a=console;
	Object.defineProperty(window,"console",{
		get:function(){
			if (a._commandLineAPI) {
				throw "Sorry, Can't execute scripts!";
			}
			return a;
		},
		set:function(b){
			a=b;
		}
	});
})();

window['start']=start;
window['stop']=stop;
window['timer']=timer;
window['format']=format;
window['displayScramble']=displayScramble;
window['displayScrambler']=displayScrambler;
window['displaySessions']=displaySessions;
window['displayTimes']=displayTimes;
window['show']=show;
window['hide']=hide;
window['export']=exportCode;
window['import']=importCode;
window['musik']=musik;
window['algsets']=algsets;
window['ziel']=ziel;
window['showTime']=showTime;
window['switchScrambler']=switchScrambler;