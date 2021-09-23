

let sliders = ['slide-1', 'slide-2', 'slide-3', 'slide-4', 'slide-5', 'slide-6']
let audios_sond = ['Audio1', 'paralelogramo1', 'paralelogramo2', 'paralelogramo3', 'paralelogramo4']

let respuestasInputs=[
	{
		'base':5,//base
		'altura':3,//altura,
		'multiplicacion':[5,3],//input-base * input-altura
		'resultado':15,//resultado
	}
]

let presentacion_slide = 0
let audio;
let audioOvers;
let audiosBotonesOver;
let path_sound = './assets/sounds/'
let videoEscena1 = document.getElementById('videoescena1')
let videoEscena2 = document.getElementById('videoescena2')
let videoEscena3 = document.getElementById('videoescena3')
let videoEscena4 = document.getElementById('videoescena4')

let videoEscenas = [videoEscena1, videoEscena2, videoEscena3, videoEscena4]

let numerador = false;
let denominador = false;
let operacion1 = false;
let operacion2 = false;
let camposValidos = false;



function init() {
	document.body.addEventListener('keyup', presentacionteclado, false)
	document.getElementById('siguiente').addEventListener('mouseover', btnSoundOver, false)
	document.getElementById('siguiente').addEventListener('mouseout', btnSoundOut, false)
	document.getElementById('atras').addEventListener('mouseover', btnSoundOver, false)
	document.getElementById('atras').addEventListener('mouseout', btnSoundOut, false)
	/* document.getElementById('repetir2').addEventListener('mouseover', btnSoundOver, false)
	document.getElementById('repetir2').addEventListener('mouseout', btnSoundOut, false)
	document.getElementById('btnComprobar').addEventListener('mouseover', btnSoundOver, false)
	document.getElementById('btnComprobar').addEventListener('mouseout', btnSoundOut, false) */
	cargarAudio();
}



function btnSoundOver() {
	audioOvers = new Audio(`${path_sound}61.mp3`);
	audioOvers.play();
}

function btnSoundOut() {
	audioOvers.pause();
}

function presentacionteclado(e) {


	if (e.keyCode == 39) {

		siguiente()
	}

	if (e.keyCode == 37) {
		if (getCurrentSlider() == 0 || getCurrentSlider() == 2) {

		} else {
			atras()
		}

	}


	if (e.keyCode == 13 && presentacion_slide == sliders.length - 1) {
		comprobar()
	}


}

function cargarAudio(loop = false) {
	if (audios_sond[presentacion_slide] != null || audios_sond[presentacion_slide] != undefined) {
		audio = new Audio(`${path_sound}${audios_sond[presentacion_slide]}.mp3`);
		audio.loop = loop
		audio.play();
		audio.onloadeddata = function () {


		};
		audio.addEventListener('ended', function () {

		});
	}

}

function changeSound(new_sond) {
	audio.src = `${path_sound}${new_sond}.mp3`;
	audio.pause();
	audio.load();
	audio.play();
	audio.addEventListener('canplaythrough', function () {
		/* document.getElementById('contenedor-explicacion-paralelogramo') */
		videoEscenas[getCurrentSlider() - 1].play()
	});
}


function presentacion() {
	if (presentacion_slide == 0) {
		document.getElementById('siguiente').style.display = "inline-block"
		document.getElementById('atras').style.visibility = "hidden"
		//document.getElementById('visubility').style.display = "inline-block"

	} else if (presentacion_slide == sliders.length - 1) {
		document.getElementById('siguiente').style.display = "none"
		//document.getElementById('atras').style.display = "none"
		document.getElementById('atras').style.display = "inline-block"
		document.getElementById('atras').style.visibility = "visible"
		document.getElementById('siguiente').style.display = "none"

	} else {
		document.getElementById('siguiente').style.display = "inline-block"
		document.getElementById('atras').style.visibility = "visible"
		document.getElementById('siguiente').style.visibility = "visible"

		/* document.getElementById('actividad').style.display = "none" */

	}
	/* console.log(`slide-${presentacion_slide}`);*/
}


function siguiente() {
	if (presentacion_slide == sliders.length - 1) {
	} else {
		presentacion_slide++
		document.getElementById(sliders[presentacion_slide - 1]).style.display = "none"
		document.getElementById(sliders[presentacion_slide]).style.display = "block"
		audioOvers = new Audio(`${path_sound}60.mp3`);
		audioOvers.play();
		reproducirvideosEscenas()
		changeSound(audios_sond[presentacion_slide])
		presentacion()
	}
}

function atras() {
	presentacion_slide--
	document.getElementById(sliders[presentacion_slide + 1]).style.display = "none"
	document.getElementById(sliders[presentacion_slide]).style.display = "block"
	audioOvers = new Audio(`${path_sound}60.mp3`);
	audioOvers.play();
	reproducirvideosEscenas()
	changeSound(audios_sond[presentacion_slide])
	presentacion()
}

function getCurrentSlider() {
	return presentacion_slide
}

function cortar(posicion) {
	switch (posicion) {
		case 1:
			gsap.to('#figura1B', {
				duration: 3,
				x:129,
				ease:Back.easeOut,
				onComplete() {
					document.getElementById('cortar-ejercicio1').style.display='none'
					document.getElementById('comprobar-ejercicio1').style.display='block'
					console.log('whole tween done');
					document.getElementById('inputs-b-h').style.display='block'
					document.getElementById('contenedor-inputs-actividad1').style.display='block'
					
					
				  },
			  })
			break;
		case 2:
			
			gsap.to('#figura2A', {
				duration: 3,
				x:240,
				ease:Back.easeOut
			  })
			break;
		case 3:
			
			
			gsap.to('#figura3A', {
				duration: 3,
				x: 213,
				ease:Back.easeOut
			  })
			break;
		case 4:
			
			gsap.to('#figura4A', {
				duration: 3,
				x: 190,
				ease:Back.easeOut
			  })
			
			break;

		default:
			break;
	}

}

function reproducirvideosEscenas() {
	stopAllVideos()
	//videoEscenas[getCurrentSlider()-1].play() 
}

function stopAllVideos() {
	videoEscenas.forEach(element => {
		element.pause()
	});
}

function actividadValidacion(posicion){
	//Capturamos los valores ingresados
	let base=document.getElementById('input-b')
	let altura=document.getElementById('input-h')
	let inputMulb=document.getElementById('input-b-m')
	let inputMulh=document.getElementById('input-h-m')
	let resultado=document.getElementById('resultado')

	//validamos base
	if(base.value!=respuestasInputs[0].base || altura.value!=respuestasInputs[0].altura){
		alert('error base o la altura')
		/* base.style.borderColor='red' */
	}else{
		if(inputMulb.value!=respuestasInputs[0].multiplicacion[0] || inputMulh.value!=respuestasInputs[0].multiplicacion[1]){
			alert('error multiplicacion')
		}else{
			if(resultado.value!=respuestasInputs[0].resultado){
				alert('error resultado')
			}else{
				alert('todo ok')
			}
		}
	}


	console.log(respuestasInputs[0].base);
	console.log(respuestasInputs[0].altura);
	console.log(respuestasInputs[0].multiplicacion);
	console.log(respuestasInputs[0].resultado);
}