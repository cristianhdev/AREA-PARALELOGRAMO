

let sliders = ['slide-1', 'slide-2', 'slide-3', 'slide-4', 'slide-5', 'slide-6']
let audios_sond = ['Audio1', 'paralelogramo1', 'paralelogramo2', 'paralelogramo3', 'paralelogramo4']
let figurasEjercicios = ['ejercicio-1', 'ejercicio-2', 'ejercicio-3', 'ejercicio-4']
let posicionCorteFigura = 0;
let respuestasInputs = [
	{
		'base': 5,//base
		'altura': 3,//altura,
		'multiplicacion': [5, 3],//input-base * input-altura
		'resultado': 15,//resultado
	},
	{
		'base': 8,//base
		'altura': 3,//altura,
		'multiplicacion': [8, 3],//input-base * input-altura
		'resultado': 24,//resultado
	},
	{
		'base': 9,//base
		'altura': 4,//altura,
		'multiplicacion': [9, 4],//input-base * input-altura
		'resultado': 36,//resultado
	},
	{
		'base': 7,//base
		'altura': 2,//altura,
		'multiplicacion': [7, 2],//input-base * input-altura
		'resultado': 14,//resultado
	}
]

let posicionxOf1=document.getElementById('figura1B').x
let posicionyOf1=document.getElementById('figura1B').y
/* document.getElementById('figura2A').x
document.getElementById('figura2A').y
document.getElementById('figura3A').x
document.getElementById('figura3A').y
document.getElementById('figura4A').x
document.getElementById('figura4A').y */

let repeatAnimation;

			
			
			

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

let cambiotexto = false


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
	audio.addEventListener("timeupdate", function () {
		console.log(Math.floor(Math.round(audio.currentTime)));
		if (Math.floor(Math.round(audio.currentTime)) == 23 && presentacion_slide == 1) {
			let posicionvideo = document.getElementById('texto-explicacion-1')
			if (!cambiotexto) {
				posicionvideo.innerHTML = 'Lados paralelos dos a dos.'
				cambiotexto = true;
			}

		}
		if (Math.floor(Math.round(audio.currentTime)) == 45 && presentacion_slide == 2) {
			let posicionvideo = document.getElementById('texto-explicacion-2')
			if (!cambiotexto) {
				posicionvideo.innerHTML = '16 unidades cuadradas de ??rea.'
				cambiotexto = true;
			}

		}
		if (Math.floor(Math.round(audio.currentTime)) == 64 && presentacion_slide == 4) {
			let posicionvideo = document.getElementById('texto-explicacion-4')
			if (!cambiotexto) {
				posicionvideo.innerHTML = '16 unidades cuadradas de ??rea.'
				cambiotexto = true;
			}

		}
	}, false);
	audio.addEventListener('canplaythrough', function () {
		/* document.getElementById('contenedor-explicacion-paralelogramo') */
		videoEscenas[getCurrentSlider() - 1].play()
	}, false);
	audio.addEventListener('ended', function () {
		cambiotexto = false
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
		document.getElementById('atras').style.display = "none"
		//document.getElementById('atras').style.visibility = "visible"
		/* document.getElementById('atras').style.display = "inline-block"
		document.getElementById('atras').style.visibility = "visible" */

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

function cortar() {

	posicionCorteFigura++
	switch (posicionCorteFigura) {
		case 1:
			gsap.fromTo("#figura1B", {x: 0}, {x: 127, duration: 3,ease:Back.easeOut,onComplete:finAnimacion});
			break;
		case 2:
			let tamanob2=document.getElementById('figura2B').offsetWidth 
		
			gsap.fromTo('#figura2A',{x: 0}, {x: tamanob2,duration: 3,ease:Back.easeOut,onComplete:finAnimacion});
			break;
		case 3:
			let tamanob3=document.getElementById('figura3B').offsetWidth 
			gsap.fromTo('#figura3A', {x: 0},{x: tamanob3,duration: 3,ease:Back.easeOut,onComplete:finAnimacion});
			break;
		case 4:
			let tamanob4=document.getElementById('figura4B').offsetWidth 
			gsap.fromTo('#figura4A', {x: 0},{x: tamanob4,duration: 3,ease:Back.easeOut,onComplete:finAnimacion});
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

function finAnimacion() {
	document.getElementById('cortar-ejercicio1').style.display = 'none'
	//document.getElementById('comprobar-ejercicio1').style.display = 'block'
	document.getElementById('comprobar-ejercicio1').classList.remove("enebled-boton")
	console.log('whole tween done');
	document.getElementById('inputs-b-h').style.display = 'flex'
	document.getElementById('contenedor-inputs-actividad1').style.display = 'flex'
}

function actividadValidacion(posicion) {
	//Capturamos los valores ingresados

	let base = document.getElementById('input-b')
	let altura = document.getElementById('input-h')
	let inputMulb = document.getElementById('input-b-m')
	let inputMulh = document.getElementById('input-h-m')
	let resultado = document.getElementById('resultado')

	let validadorInputs = [base.value, altura.value, inputMulb.value, inputMulh.value, resultado.value]

	let inputsValidos = validadorInputs.includes("")


	if (!inputsValidos) {
		//Ocultamos el mensaje.
		document.getElementById('mensajeActividad').style.visibility="hidden"
		//validamos base
		if (base.value != respuestasInputs[posicionCorteFigura - 1].base || altura.value != respuestasInputs[posicionCorteFigura - 1].altura) {
			//alert('error base o la altura')
			document.getElementById('imagen-correcta-b-h').style.display = 'none'
			document.getElementById('imagen-incorrecta-b-h').style.display = 'inline-flex'
			/* base.style.borderColor='red' */
		} else {
			document.getElementById('imagen-correcta-b-h').style.display = 'inline-flex'
			document.getElementById('imagen-incorrecta-b-h').style.display = 'none'
			if (inputMulb.value != respuestasInputs[posicionCorteFigura - 1].multiplicacion[0] || inputMulh.value != respuestasInputs[posicionCorteFigura - 1].multiplicacion[1]) {
				//alert('error multiplicacion')
				document.getElementById('imagen-correcta-resultado').style.display = 'none'
				document.getElementById('imagen-incorrecta-resultado').style.display = 'inline-flex'
			} else {
				document.getElementById('imagen-incorrecta-resultado').style.display = 'none'
				document.getElementById('imagen-correcta-resultado').style.display = 'inline-flex'
				if (resultado.value != respuestasInputs[posicionCorteFigura - 1].resultado) {
					//alert('error resultado')
					document.getElementById('imagen-correcta-resultado').style.display = 'none'
					document.getElementById('imagen-incorrecta-resultado').style.display = 'inline-flex'
				} else {
					
					document.getElementById('comprobar-ejercicio1').classList.add("enebled-boton")
					document.getElementById('siguiente_ejercicio').classList.remove("enebled-boton")
					document.getElementById('imagen-incorrecta-resultado').style.display = 'none'
					document.getElementById('imagen-correcta-resultado').style.display = 'inline-flex'
				}
			}
		}
	}else{
		document.getElementById('mensajeActividad').style.visibility="visible"
	}

}

function siguiente_ejercicio() {
	if (posicionCorteFigura > 3) {
		posicionCorteFigura = 0
		//Restaurando la fguras de posicion
		document.getElementById('figura1B').removeAttribute('style')
		document.getElementById('figura2A').removeAttribute('style')
		document.getElementById('figura3A').removeAttribute('style')
		document.getElementById('figura4A').removeAttribute('style')
		document.getElementById(figurasEjercicios[3]).style.display = 'none';
		document.getElementById(figurasEjercicios[posicionCorteFigura]).style.display = 'flex'
	} else {
		document.getElementById(figurasEjercicios[posicionCorteFigura - 1]).style.display = 'none';
		document.getElementById(figurasEjercicios[posicionCorteFigura]).style.display = 'flex'
	}
	document.getElementById('siguiente_ejercicio').classList.add("enebled-boton")
	document.getElementById('comprobar-ejercicio1').classList.add("enebled-boton")
	document.getElementById('imagen-incorrecta-resultado').style.display = 'none'
	document.getElementById('imagen-correcta-resultado').style.display = 'none'
	document.getElementById('cortar-ejercicio1').style.display = 'block'
	document.getElementById('imagen-correcta-b-h').style.display = 'none'
	document.getElementById('imagen-incorrecta-b-h').style.display = 'none'
	//Limpiamos las cajas de la actividad.
	document.getElementById('input-b').value = ""
	document.getElementById('input-h').value = ""
	document.getElementById('input-b-m').value = ""
	document.getElementById('input-h-m').value = ""
	document.getElementById('resultado').value = ""


	document.getElementById('contenedor-inputs-actividad1').style.display = 'none';
	document.getElementById('inputs-b-h').style.display = 'none';

}