function daysInMonth(month, year) {
	return new Date(year, month, 0).getDate();
}

function randomNumberInRange(min, max) {
	var range = 1 + max - min; 
	var number = min + Math.floor(Math.random() * (range));
	return number < 10 ? "0" + number : number.toString();
}

function randomMonth() {
	return randomNumberInRange(1, 12);
}

function randomDayInMonth(month, year) {
	return randomNumberInRange(1, daysInMonth(month, year));
}

function randomYear() {
	return randomNumberInRange(0, 99);
}

function checksum(fodselsnummer, factors){
	var sum = 0;
	for (var i = 0; i < factors.length; i++) {
		sum += parseInt(fodselsnummer.charAt(i), 10) * factors[i];
	}
	return sum;
};

function kontrollsiffer(fodselsnummer, factors) {
	var siffer = 11 - (checksum(fodselsnummer, factors) % 11);
	return siffer != 11 ? siffer : 0;
}

function generateFodselsnummer(day, month, year) {
	var individsifre = randomNumberInRange(100, 999);
	var fodselsnummer = day + month + year + individsifre;
	fodselsnummer += kontrollsiffer(fodselsnummer, [3, 7, 6, 1, 8, 9, 4, 5, 2]);
	fodselsnummer += kontrollsiffer(fodselsnummer, [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]);
	return fodselsnummer.length == 11 ? fodselsnummer : generateFodselsnummer(day, month, year);	
}

function generateFodselsnummerWithYear(year) {
	var month = randomMonth();
	var day = randomDayInMonth(month, year);
	return generateFodselsnummer(day, month, year);
}

document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.shiftKey && e.keyCode >= 48 && e.keyCode <= 57) {
		e.preventDefault();
		var number = e.keyCode - 48;
		var c = document.activeElement;
		var year = randomNumberInRange(number*10, (number*10)+9);
		var fodselsnummer = generateFodselsnummerWithYear(year);
		c.value = fodselsnummer;
    }
	if (e.ctrlKey && e.shiftKey && e.keyCode == 79) {
		e.preventDefault();
		var c = document.activeElement;
		var year = randomNumberInRange(0, 9);
		var fodselsnummer = generateFodselsnummerWithYear(year);
		c.value = fodselsnummer;
    }
	if (e.ctrlKey && e.shiftKey && e.keyCode == 70) {
		e.preventDefault();
		var c = document.activeElement;
		if (c.value.length == 6 && !isNaN(c.value)) {
			var fodselsnummer = generateFodselsnummer(c.value.substring(0, 2), c.value.substring(2, 4), c.value.substring(4, 6));
			c.value = fodselsnummer;			
		}
    }
});