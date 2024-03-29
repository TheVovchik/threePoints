
//'use strict'

const buttonAbout = document.getElementById('author__info');
const aboutMe = document.querySelector('.about__me');
const aboutMeClose = document.querySelector('.about__me__close')


buttonAbout.addEventListener("click", function (event) {
	event.preventDefault();
	aboutMe.style.display = 'block';
	aboutMeClose.addEventListener("click", function () {
		aboutMe.style.display = 'none';
	});
});

const newPoint = [];
const playSpace = document.querySelector('.play__space');


for (let i = 0; i <= 3; i++) {
	newPoint[i] = document.createElement('div')
}
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

// making points 
function draw(x, y, radius, strokStyle) {
	if (canvas.getContext) {
		ctx.beginPath();
		let startAngle = 0;
		let endAngle = 2 * Math.PI;
		let anticlockwise = true;
		ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
		ctx.strokeStyle = strokStyle;
		ctx.fillStyle = strokStyle;
		ctx.stroke();
	}
}
// ---------------------------------- //

// drawing lines
function drawing(finishDotsCoord, fourthPointX, fourthPointY, strokStyle) {
	// first line
	ctx.beginPath();
	ctx.strokeStyle = strokStyle;
	ctx.moveTo(finishDotsCoord[0], finishDotsCoord[1]);
	ctx.lineTo(finishDotsCoord[4], finishDotsCoord[5]);
	ctx.stroke();

	// Second line
	ctx.beginPath();
	ctx.strokeStyle = strokStyle;
	ctx.moveTo(finishDotsCoord[2], finishDotsCoord[3]);
	ctx.lineTo(finishDotsCoord[4], finishDotsCoord[5]);
	ctx.stroke();

	// Third line
	ctx.beginPath();
	ctx.strokeStyle = strokStyle;
	ctx.moveTo(finishDotsCoord[0], finishDotsCoord[1]);
	ctx.lineTo(fourthPointX, fourthPointY);
	ctx.stroke();

	// Fourth line
	ctx.beginPath();
	ctx.strokeStyle = strokStyle;
	ctx.moveTo(finishDotsCoord[2], finishDotsCoord[3]);
	ctx.lineTo(fourthPointX, fourthPointY);
	ctx.stroke();
}

// -------------------------------------------------- // 

// calculating 4 point 
function calc(i) {
	let allDots = document.querySelectorAll('.point');
	let dotsX = [];
	let dotsY = [];
	let startDotsCoord = [];
	let finishDotsCoord = [];
	let xMax, yMax;

	for (let j = 0; j < allDots.length; j++) {
		dotsX.push(parseInt(allDots[j].style.left.replace(/[px]/, '')))
		dotsY.push(parseInt(allDots[j].style.top.replace(/[px]/, '')))
		startDotsCoord.push(dotsX[j], dotsY[j]);
		draw(dotsX[j], dotsY[j], 5.5, 'red');
	}

	// display result 

	const resultTable = document.createElement('table');
	let resultColumn = [];
	let resultRow = [];

	const resultContainer = document.createElement('div');
	resultContainer.setAttribute('class', 'result__container');
	resultContainer.setAttribute('id', `demo`);
	playSpace.append(resultContainer);

	resultContainer.append(resultTable);


	for (let k = 0; k < 4; k++) {
		resultColumn[k] = document.createElement('tr');
		resultTable.append(resultColumn[k]);
		for (let l = 0; l < 3; l++) {
			resultRow[l] = document.createElement('th');
			resultColumn[k].append(resultRow[l])
			if (k === 0) {
				switch (l) {
					case 0: resultRow[l].innerText = 'Point name';
						break;
					case 1: resultRow[l].innerText = 'Point X';
						break;
					case 2: resultRow[l].innerText = 'Point Y';
						break;
				}
			}
			else if (k === 1 && l === 0) {
				resultRow[l].innerText = 'A';
			}
			else if (k === 2 && l === 0) {
				resultRow[l].innerText = 'B';
			}
			else if (k === 3 && l === 0) {
				resultRow[l].innerText = 'C';
			}
			else if (k === 1 && l === 1) {
				resultRow[l].innerText = `${dotsX[0]}px`;
			}
			else if (k === 1 && l === 2) {
				resultRow[l].innerText = `${dotsY[0]}px`;
			}
			else if (k === 2 && l === 1) {
				resultRow[l].innerText = `${dotsX[1]}px`;
			}
			else if (k === 2 && l === 2) {
				resultRow[l].innerText = `${dotsY[1]}px`;
			}
			else if (k === 3 && l === 1) {
				resultRow[l].innerText = `${dotsX[2]}px`;
			}
			else if (k === 3 && l === 2) {
				resultRow[l].innerText = `${dotsY[2]}px`;
			}
		}
	}



	xMax = dotsX[0];
	yMax = dotsY[0];
	for (let j = 1; j < dotsX.length; j++) {
		if (xMax > dotsX[j]) {
			xMax = dotsX[j]
		}
		if (yMax > dotsY[j]) {
			yMax = dotsY[j]
		}
	}
	for (let j = 1, k = 0; j < startDotsCoord.length; j += 2) {
		if (startDotsCoord[j] !== yMax) {
			finishDotsCoord.push(startDotsCoord[j - 1], startDotsCoord[j])
		}
		else {
			k = j
		}
		if (j === 5 && finishDotsCoord.length === 4) {
			finishDotsCoord.push(startDotsCoord[k - 1], startDotsCoord[k])
		}
	}
	let fourthPointX = Math.abs(finishDotsCoord[0] + finishDotsCoord[2]) - finishDotsCoord[4]
	let fourthPointY = Math.abs(finishDotsCoord[1] + finishDotsCoord[3]) - finishDotsCoord[5]

	let massCenterX = Math.abs(finishDotsCoord[0] + finishDotsCoord[2]) / 2
	let massCenterY = Math.abs(finishDotsCoord[1] + finishDotsCoord[3]) / 2

	playSpace.append(newPoint[i]);
	newPoint[i].innerText = 'D';
	newPoint[i].setAttribute('class', 'point');
	newPoint[i].style.left = `${fourthPointX}px`;
	newPoint[i].style.top = `${fourthPointY}px`;

	resultColumn[4] = document.createElement('tr');
	resultTable.append(resultColumn[4]);
	resultRow[0] = document.createElement('th');
	resultColumn[4].append(resultRow[0])
	resultRow[0].innerText = 'D';
	resultRow[1] = document.createElement('th');
	resultColumn[4].append(resultRow[1])
	resultRow[1].innerText = `${fourthPointX}px`;
	resultRow[2] = document.createElement('th');
	resultColumn[4].append(resultRow[2])
	resultRow[2].innerText = `${fourthPointY}px`;


	draw(fourthPointX, fourthPointY, 5.5, 'red'); // drawing fourth point
	drawing(finishDotsCoord, fourthPointX, fourthPointY, 'blue'); // drawing rectangle

	let legA = Math.sqrt(Math.pow(finishDotsCoord[0] - finishDotsCoord[4], 2) + Math.pow(finishDotsCoord[1] - finishDotsCoord[5], 2))
	let legB = Math.sqrt(Math.pow(finishDotsCoord[2] - finishDotsCoord[4], 2) + Math.pow(finishDotsCoord[3] - finishDotsCoord[5], 2))
	let square = legA * legB;
	let radius = Math.sqrt(square / Math.PI)
	draw(massCenterX, massCenterY, radius, 'Yellow')

	resultColumn[5] = document.createElement('tr');
	resultTable.append(resultColumn[5]);
	resultRow[0] = document.createElement('th');
	resultColumn[5].append(resultRow[0])
	resultRow[0].innerText = 'S of circle';
	resultRow[1] = document.createElement('th');
	resultColumn[5].append(resultRow[1])
	resultRow[1].innerText = `${(square / 1000).toFixed(2)}`;
	resultRow[2] = document.createElement('th');
	resultColumn[5].append(resultRow[2])
	resultRow[2].innerText = `тис. px²`;

}

// ------------------------------------------------- // 
const closeOpen = document.createElement('div');
closeOpen.setAttribute('class', 'close__open');
closeOpen.setAttribute('id', `open__close`);
playSpace.append(closeOpen);
closeOpen.innerHTML = '>';

let i = 0;
// getting 3 point 
function showCoords(evt) {
	if ((evt.clientX > 400 || evt.clientY > 65) && i !== 3) {
		playSpace.append(newPoint[i]);

		newPoint[i].setAttribute('class', 'point');
		newPoint[i].setAttribute('id', `newPoint${i}`);
		newPoint[i].style.left = `${evt.clientX}px`;
		newPoint[i].style.top = `${evt.clientY}px`;
		draw(evt.clientX, evt.clientY, 5.5, 'red');
		switch (i) {
			case 0: newPoint[i].innerText = 'A';
				break;
			case 1: newPoint[i].innerText = 'B';
				break;
			default: newPoint[i].innerText = 'C';
		}
		i++;
	}
	if (i === 3) {
		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		let element = document.getElementById("demo");
		if (element !== null) {
			element.remove();
		}
		calc(i);
		element = document.getElementById("demo");
		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		if (element !== null) {
			element.remove();
		}
		calc(i);



		const demo = document.getElementById('demo');

		closeOpen.addEventListener("click", function (event) {
			event.preventDefault();
			demo.style.display = 'none';
			closeOpen.style.transform = 'none'
			closeOpen.addEventListener("click", function () {
				demo.style.display = 'block';
				closeOpen.style.transform = 'rotate(90deg)'
			});
		});
	}
}

document.addEventListener('mousedown', e => {
	var ball = document.getElementById(`${e.target.id}`);
	if (e.target.id !== 'canvas' && e.target.id !== 'open__close') {


		ball.onmousedown = function (e) {
			var coords = getCoords(ball);
			var shiftX = e.pageX - coords.left;
			var shiftY = e.pageY - coords.top;
			console.log(coords)
			moveAt(e);

			function moveAt(e) {
				ball.style.left = e.pageX - shiftX + 'px';
				ball.style.top = e.pageY - shiftY + 'px';
			}

			document.onmousemove = function (e) {
				moveAt(e);
				showCoords(e);
			};

			ball.onmouseup = function () {
				document.onmousemove = null;
				ball.onmouseup = null;

			};

		}

		ball.ondragstart = function () {
			return false;
		};

		function getCoords(elem) {
			var box = elem.getBoundingClientRect();
			return {
				top: box.top + window.pageYOffset,
				left: box.left + window.pageXOffset
			};
		}
	}
})


