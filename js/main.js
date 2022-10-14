// import * as d3 from d3

var fruits = 0
var ice_cream = 0
var drinks = 0
var misc = 0

const desk = {
    fruit_apple1: "R1 C2",
    // weight: "30 pounds",
    // color: "brown",
    // material: "wood"
  };


function billGeneration() {
    console.log('This will work now')

    document.getElementById('answer').innerHTML = `
    ${fruits} fruits were added : ${fruits*10}
    <br>
    ${ice_cream} ice_cream were added : ${ice_cream*10}
    <br>
    ${drinks} drinks were added : ${drinks*10}
    <br>
    ${misc}  misc were added : ${misc*10}

    `

    const button = document.getElementById('download_button')
    button.disabled = false

}

function closeFridge() {
    console.log('Me is not here')
    const elem = document.getElementById('door');
    elem.style.fill = 'black'
    elem.style['fill-opacity'] = 1;
    elem.style['fill-opacity'] = 1;

}


function rangeFunction(value, id) {
    console.log('Range worked')
    var object = id.split('_')
    const elem = document.getElementById(object[0]);
    elem.style.fill = 'red'
    elem.style['fill-opacity'] = 1;
}


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    updateBoxes(ev);
}

function updateBoxes(ev) {
    const children = (ev.currentTarget.children);
    if(ev.currentTarget.id == 'itemfinder') {
        // var a = ev.currentTarget.children[1].id
        // window.alert(desk[a])
        Draw();
    }

    if(ev.currentTarget.id == 'misc') {
        misc += 1;
        document.getElementById('answer').innerHTML = ev.currentTarget.id + ' items ' + misc
    }

    if(ev.currentTarget.id == 'drinks') {
        drinks += 1;
        //drink item added and then when click is pressed then we go to billing 
        //which displays all the items 
        document.getElementById('answer').innerHTML = ev.currentTarget.id + ' item added '

    }

    if(ev.currentTarget.id == 'ice_cream') {
        ice_cream += 1;
        //drink item added and then when click is pressed then we go to billing 
        //which displays all the items 
        document.getElementById('answer').innerHTML = ev.currentTarget.id + ' item added '

    }


    if(ev.currentTarget.id == 'fruits') {
        fruits += 1;
        //drink item added and then when click is pressed then we go to billing 
        //which displays all the items 
        document.getElementById('answer').innerHTML = `
        
        ${ev.currentTarget.id}  item added 
        `

    }
    // [].forEach.call(children, (note) => {
    //     console.log(note)
    // });
}

function excelProcessing(file) {
    console.log('reached')
    console.log(file)
}

function download(filename, text) {


    var element = document.createElement('a');
    var today = new Date();

    var text = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    + ' \n ' +document.getElementById('answer').innerText;

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }


// const myForm = document.getElementById("myForm");
// const csvFile = document.getElementById("csvFile");

// myForm.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const input = csvFile.files[0];
//   const reader = new FileReader();

//   // 👇 executed when a file is loaded
//   reader.onload = function (e) {
//     // 👇 get the text from CSV file
//     const text = e.target.result;

//     // 👇 parse it using D3.js
//     const data = d3.csvParse(text);

//     // 👇 write the output to the browser
//     // document.write(JSON.stringify(data));
//   };

//   // 👇 load the input file to the reader
//   reader.readAsText(input);
// });

function Draw(){
    var img = document.getElementById("costco_map");
    var cnvs = document.getElementById("myCanvas");
    
    cnvs.style.position = "absolute";
    cnvs.style.left = img.offsetLeft + "px";
    cnvs.style.top = img.offsetTop + "px";
    
    var ctx = cnvs.getContext("2d");
    ctx.beginPath();
    ctx.arc(100*Math.random() + 100, 100*Math.random() + 100, 10, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }
// document.getElementById("freezerTemp").addEventListener("change", rangeFunction);



// ***********

// функция-конструктор объекта секундомера
function StopWatch() {
	// инициализируем переменные связанные с canvas
	var canvas = document.getElementById("stopWatchCanvas");
	var ctx = canvas.getContext("2d");

	// присваиваем координаты центра секундомера и его радиус соответствующим переменным
	var centerX = canvas.width / 2, 
		centerY = canvas.width / 2, 
		radius = canvas.width / 2 * 0.8;

	// инициализируем переменную для остановки секундомера 
	var timer;

	// инициализируем переменную для фиксации текущего времени секундомера
	var stopWatchTime;

	// вспомогательная функция рисования линии заданной толщины
	function drawLine(endX, endY, width) {
		width = width || 1;
		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		ctx.lineTo(endX, endY);
		ctx.lineWidth = width;
		ctx.lineCap = "round";
		ctx.stroke();
	}

	// функция рисования секундомера
	function drawStopWatch(time) {
		// стираем старое изображение
		ctx.clearRect(0, 0, canvas.width, canvas.width);

		// рисуем окружность
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
		ctx.lineWidth = 1;
		ctx.stroke();

		// вычисляем текущий угол секундной и минутной стрелки в градусах
		var secondHandDegree = time / 1000 * 6;
		var minuteHandDegree = time / 1000 / 60 * 6;

		/* Вычисляем текущий угол секундной и минутной стрелки в радианах.
		Корректируем его на -(PI/2) для отображения относительно 12:00 на циферблате 
		*/
		var secondHandRadian = secondHandDegree * (Math.PI / 180) - Math.PI / 2;
		var minuteHandRadian = minuteHandDegree * (Math.PI / 180) - Math.PI / 2;

		// рисуем новую секундную стрелку
		var secondX = centerX + (Math.cos(secondHandRadian) * radius * 0.9);
		var secondY = centerY + (Math.sin(secondHandRadian) * radius * 0.9);
		drawLine(secondX, secondY);

		// рисуем новую минутную стрелку
		var minuteX = centerX + (Math.cos(minuteHandRadian) * radius * 0.5);
		var minuteY = centerY + (Math.sin(minuteHandRadian) * radius * 0.5);
		drawLine(minuteX, minuteY, 3);
	}

	// определяем публичный метод запуска секундомера
	this.startStopWatch = function() {
		// фиксируем время запуска секундомера
		var startTime = new Date();

		// функция анимации стрелок секундомера с вызовом на месте
		(function animateStopWatch() {
			/* Для фиксации текущего времени секундомера сравниваем время запуска с текущим временем.
			Не используются setInterval() и setTimeout() из-за того, что данные методы могут давать погрешность,
			особенно когда текущая вкладка браузера теряет фокус и текущие таймеры замедляются.
			*/
			var currentTime = new Date();

			// фиксируем общее время работы секундомера
			stopWatchTime = currentTime - startTime;

			drawStopWatch(stopWatchTime);

			// Запускаем перерисовку стрелок раз в 100 миллисекунд
			timer = setTimeout(animateStopWatch, 100);
		})();
	}

	// определяем публичный метод паузы секундомера
	this.pauseStopWatch = function() {
		// вычисляем количество минут, секунд и милисекунд с момента запуска
		var minutes = Math.floor(stopWatchTime / 1000 / 60);
		var seconds = Math.floor(stopWatchTime / 1000 - minutes * 60);
		var milliseconds = Math.floor(stopWatchTime - minutes * 60 * 1000 - seconds * 1000);

		// выводим результат
		alert("You spent \n " + minutes +  " minutes  and " + seconds + " seconds shopping " );
        

		// останавливаем анимацию стрелок
		clearTimeout(timer);
	}
	drawStopWatch(0);
}

// создаем объект секундомера используя функцию-конструктор
var stopwatch = new StopWatch();

// присваиваем событиям click соответствующие публичные свойства объекта секундомера
var startBtn = document.getElementById("startStopWatch");
startBtn.addEventListener("click", stopwatch.startStopWatch);

var pauseBtn = document.getElementById("pauseStopWatch");
pauseBtn.addEventListener("click", stopwatch.pauseStopWatch);

document.getElementById('input-file')
  .addEventListener('change', getFile)

function getFile(event) {
	const input = event.target
  if ('files' in input && input.files.length > 0) {
	  placeFileContent(
      document.getElementById('content-target'),
      input.files[0])
  }
}

function placeFileContent(target, file) {
	readFileContent(file).then(content => {
  	target.value = content
  }).catch(error => console.log(error))
}

function readFileContent(file) {
	const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}

function autoBuyitems() {
    var items = document.getElementById('content-target').value
    var item_list = items.split('\n')
    item_list.forEach(myFunction)
}

var fruits = 0
var ice_cream = 0
var drinks = 0
var misc = 0

function myFunction(item) {
    if(item == 'Fruit') {
        fruits += 1
    }
    else if(item == 'Ice') {
        ice_cream += 1
    }
    else if(item == 'Drink') {
        drinks += 1
    }
    else {
        misc += 1
    }
    Draw()
    
    // console.log(p)
}