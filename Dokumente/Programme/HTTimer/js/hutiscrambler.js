window.modules.scrambler=true;

const BR="<br/>";

function generateScramble(r,a){var e,n,t,o="",f="",h=[];for(h.U="D",h.D="U",h.L="R",h.R="L",h.F="B",h.B="F",t=0;a>t;t++)e=o,o=r[Math.floor(Math.random()*r.length)],e==o||e[0]==o[0]||h[e[0]]==o[0]?t--:n=o,f+=n+" ",n="";return f;}

function relayScramble(command){
	var out,cmd;
	out="";
	cmd=command.split(" ");
	for(var i=0;i<cmd.length;i++){
		if(cmd[i]!=="relay")out+=getScrambles(cmd[i],0)+BR;
	}
	return out;
}

function getScrambles(type,relay){
	var scramble="",
	scrambler=[],
	state1=["R2","B2","U","D'"],
	state2="U R2 F2 D U' D' U2 D2".split(" "),
	state3="U1+ U2+ U3+ U4+ U5+ U6+ U1- U2- U3- U4- U5- U6- D1+ D2+ D3+ D4+ D5+ D6+ D1- D2- D3- D4- D5- D6- R2 F2".split(" "),
	state4="R R' R2 U' U U2 F F' F2 B B' B2 L' L L2 D D' D2 UFR+ UFR- UFL+ UFL- UDR+ UDR- UDL+ UDL- UBR+ UBR- UBL+ UBL- BDR+ BDR- BDL+ BDL-".split(" "),
	state5="UFR+ UFR- UFL+ UFL- UDR+ UDR- UDL+ UDL- UBR+ UBR- UBL+ UBL- BDR+ BDR- BDL+ BDL-".split(" "),
	zwei="R R' R2 U' U U2 F F' F2".split(" "),
	drei="R R' R2 U' U U2 F F' F2 B B' B2 L' L L2 D D' D2".split(" "),
	viersign="R R' R2 U' U U2 F F' F2 B B' B2 L' L L2 D D' D2 r r' r2 u' u u2 f f' f2 b b' b2 l' l l2 d d' d2".split(" "),
	vier="R R' R2 U' U U2 F F' F2 B B' B2 L' L L2 D D' D2 Rw Rw' Rw2 Uw' Uw Uw2 Fw Fw' Fw2".split(" "),
	funf="R R' R2 U' U U2 F F' F2 B B' B2 L' L L2 D D' D2 Rw Rw' Rw2 Uw' Uw Uw2 Fw Fw' Fw2 Bw Bw' Bw2 Lw' Lw Lw2 Dw Dw' Dw2".split(" "),
	sieben="R R' R2 U' U U2 F F' F2 B B' B2 L' L L2 D D' D2 Rw Rw' Rw2 Uw' Uw Uw2 Fw Fw' Fw2 Bw Bw' Bw2 Lw' Lw Lw2 Dw Dw' Dw2 3R 3R' 3R2 3U' 3U 3U2 3F 3F' 3F2 3B 3B' 3B2 3L' 3L 3L2 3D 3D' 3D2".split(" "),
	vierrruu="R R' R2 U U' U2 r r' r2 u u' u2".split(" "),
	pyramix="R R' U U' L L' B B'".split(" "),
	pyramixTip="r r' u u' l l' b b'".split(" "),
	mpyramix="R R' U U' L L' B B' r r' u u' l l' b b'".split(" "),
	megaAll="r++ r-- u++ u-- R++ R-- U-- R++".split(" "),
	gigaBetween="U U' U2 u u' u2".split(" "),
	mega=["R++","R--","U++","U--"],
	eins="x x' x2 y y' y2 z z2 z'".split(" "),
	rouxlse="M M' M2 U U' U2".split(" "),
	ru="R R' R2 U U' U2".split(" "),
	rul="R R' R2 U U' U2 L L' L2".split(" "),
	bld="Uw Uw' Uw'2 Uw2 Rw Rw' Rw'2 Rw2 Fw Fw' Fw'2 Fw2".split(" "),
	floppy="R2 U2 F2 L2 U U' D D' U2 D2".split(" "),
	nplus=["R2","U2"],
	nplusplus=["R2","U2","D2"],
	mixup="R R' R2 U' U U2 F F' F2 B B' B2 L' L L2 D D' D2 M+ M- E+ E- S+ S- M3+ M3- E3+ E3- S3+ S3-".split(" "),
	mixupvier="R R' R2 U' U U2 F F' F2 B B' B2 L' L L2 D D' D2 r r' r2 u' u u2 f f' f2 b b' b2 l' l l2 d d' d2 M+ M- E+ E- S+ S- M3+ M3- E3+ E3- S3+ S3- u+ u- u3+ u3- r+ r- r3+ r3- f+ f- f3+ f3-".split(" "),
	ghostu=["U+","U-","U2+","U2-"],
	ghostd=["D+","D-","D2+","D2-"],
	heli="UF UR UB UL DF DR DB DL FR FL BR BL".split(" "),
	helij="UF UR UB UL DF DR DB DL FR FL BR BL JR JL".split(" "),
	helifj="UF UR UB UL DF DR DB DL FR FL BR BL JR JL UR+ UR- UF+ UF- y z' x' z2".split(" "),
	squan="/1234567890".split(""),
	skewb="U R B L U' R' B' L'".split(" "),
	barrelstage1="R R' R2 L L' L2 F F' F2 B B' B2".split(" "),
	zweizweieins=["R2","U2","R2 U2","U2 R2","R2 U2 R2"];

	scramble+=generateScramble(state1,3);
	scramble+=generateScramble(state2,5);
	scramble+=generateScramble(state3,32);
	scramble+=generateScramble(zwei,11);
	scrambler["sq224"]=scramble;
	scramble=generateScramble(drei,4);
	scramble+=generateScramble(state4,8);
	scramble+=generateScramble(zwei,3);
	scramble+=generateScramble(state4,14);
	scramble+=generateScramble(drei,5);
	scramble+=generateScramble(state5,2);
	scramble+=generateScramble(state4,22);
	scramble+=generateScramble(drei,2);
	scramble+=generateScramble(zwei,3);
	scrambler["dreidellim"]=scramble;
	scramble=generateScramble(mega,12);
	scramble+="U ";
	scramble+=generateScramble(mega,12);
	scramble+="U' ";
	scramble+=generateScramble(mega,12);
	scramble+="U ";
	scramble+=generateScramble(mega,12);
	scramble+="U' ";
	scramble+=generateScramble(mega,12);
	scrambler["mega"]=scramble;
	scrambler["pyracrystal"]=scrambler["mega"]+generateScramble(["U","D"],1);
	scramble=generateScramble(megaAll,11);
	scramble+=generateScramble(gigaBetween,1);
	scramble+=generateScramble(megaAll,9);
	scramble+=generateScramble(gigaBetween,1);
	scramble+=generateScramble(megaAll,10);
	scramble+=generateScramble(gigaBetween,1);
	scramble+=generateScramble(megaAll,10);
	scramble+=generateScramble(gigaBetween,1);
	scramble+=generateScramble(megaAll,9);
	scramble+=generateScramble(gigaBetween,1);
	scramble+=generateScramble(megaAll,11);
	scrambler["giga"]=scramble;
	scrambler["3x3x5"]=generateScramble(floppy,32)+generateScramble(drei,10);
	scrambler["3x3x4"]=generateScramble(floppy,35);
	scrambler["3x3x2"]=generateScramble(floppy,17);
	scrambler["2x2x3"]=generateScramble(floppy,12);
	scrambler["barrel"]=generateScramble(barrelstage1,2)+generateScramble(["R2","U2","L2","B2"],1)+generateScramble(floppy,11)+generateScramble(drei,10);
	scrambler["1x2x2"]=generateScramble(nplus,2);
	scrambler["1x2x3"]=generateScramble(nplusplus,7);
	scrambler["pyra"]=genScramblePyra(20);
	scrambler["mpyra"]=generateScramble(mpyramix,37)+generateScramble(pyramixTip,3);
	scrambler["1x1"]=generateScramble(eins,10);
	//scrambler["2x2"]=generateScramble(zwei,10);
	scrambler["2x2"]=scramblers["222"].getRandomScramble().scramble_string;
	scrambler["2x2opt"]=generateScramble(zwei,8);
	scrambler["2x2bld"]=generateScramble(zwei,9)+rotationReducer.reduce(generateScramble(eins,3));
	scrambler["2x24"]=generateScramble(zwei,4);
	//scrambler["3x3"]=generateScramble(drei,22);
	scrambler["3x3"]=scramblers["333"].getRandomScramble().scramble_string;
	scrambler["void"]=generateScramble(drei,21);
	scrambler["FMC"]="R' U' F "+generateScramble(drei,23)+"R' U' F";
	scrambler["3x3bld"]=generateScramble(drei,22)+generateScramble(bld,2);
	scrambler["3x3lse"]=generateScramble(rouxlse,17);
	scrambler["3x3ru"]=generateScramble(ru,16);
	scrambler["3x3rul"]=generateScramble(rul,18);
	scrambler["3x3ruf"]=generateScramble(zwei,17);
	scrambler["3x3co"]=generateScramble(drei,25);
	scrambler["3x3hco"]=generateScramble(drei,24);
	scrambler["4x4"]=generateScramble(vier,60);
	scrambler["4x4sign"]=generateScramble(viersign,55);
	scrambler["4x4bld"]=generateScramble(vier,48)+generateScramble(bld,2);
	scrambler["4x4sh"]=generateScramble(vier,42);
	scrambler["4x4rruu"]=generateScramble(vierrruu,42);
	scrambler["5x5"]=generateScramble(funf,99);
	scrambler["5x5bld"]=generateScramble(funf,87)+generateScramble(bld,2);
	scrambler["5x5sh"]=generateScramble(funf,73);
	scrambler["5x5sign"]=generateScramble(viersign,63);
	scrambler["6x6"]=generateScramble(sieben,75);
	scrambler["7x7"]=generateScramble(sieben,99);
	scrambler["mixup3x3"]=generateScramble(mixup,34);
	scrambler["mixup4x4"]=generateScramble(mixupvier,73);
	scrambler["ghost"]=generateScramble(ghostu,1)+generateScramble(ghostd,1)+generateScramble(drei,22);
	scrambler["heli"]=generateScramble(heli,32);
	scrambler["curvy"]=generateScramble(heli,36);
	scrambler["helij"]=generateScramble(helij,38);
	scrambler["curvyj"]=generateScramble(helij,43);
	scrambler["curvyp"]=generateScramble(heli,43);
	scrambler["curvypj"]=generateScramble(helij,47);
	scrambler["curvypfj"]=generateScramble(helifj,58);
	scrambler["square-2"]=generateScramble(squan,34);
	scrambler["square-1"]=genScrambleSq1(42);
	scrambler["skewb"]=generateScramble(skewb,12);
	scrambler["clock"]="Scrambler type is not available yet.";
	scrambler["2x2x1"]=generateScramble(zweizweieins,1);
	
	for(var i=0;i<scrambler.length;++i)scrambler[i]=cube.cube.simplify(scrambler[i])||scrambler[i];
	
	if(!!~(relay-1)){
		scrambler["relay"]=relayScramble(timer.relayCommand);
	}
	return scrambler[type];
}

function getScramble(r,e){for(var t="",a=1;e+1>a;a++)t+=a+".: "+getScrambles(r,1)+BR;return t}
function getScrambleLarge(e,t,r,g){g+=r+".: "+getScrambles(e,1)+BR,t>r?setTimeout(getScrambleLarge(e,t,++r,g),100):document.getElementById("output").innerHTML=g}