
(async function () {

	const URL1 = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'; // НБУ курс на текущую дату
	const URL2 = 'https://restcountries.eu/rest/v2/all'; // Страны API

	/*
	let getURL1 = await fetch(URL1);
	getURL1 = await getURL1.json();
	let getURL2 = await fetch(URL2);
	getURL2 = await getURL2.json();
	*/

	let nacBank = fetch(URL1);
	let stranu_api = fetch(URL2);
	nacBank = await nacBank;
	stranu_api = await stranu_api;
	nacBank = await nacBank.json();
	stranu_api = await stranu_api.json();

	console.log(stranu_api[0].currencies[0].code)
	console.log(nacBank[0].cc)

	let newArr = [];
	for (let i = 0; i < nacBank.length; i++) {
		for (let j = 0; j < stranu_api.length; j++) {
			if (stranu_api[j].currencies[0].code === nacBank[i].cc) {
				let property = `<div style="display:flex; flex-direction: row;"><div><img src="${stranu_api[j].flag}" alt=""></div><div><p>${stranu_api[j].name}</p></div><div><p>Валюта - ${stranu_api[j].currencies[0].code}</p></div> <div><p>Курс НБУ - ${nacBank[i].rate}</p></div><div><p>Дата: ${nacBank[i].exchangedate}</p></div></div>`;
				newArr.push(property);
			}
		}
	}

	let lineBox;
	for (let i = 0; i < newArr.length; i++) {
		lineBox = document.createElement('li');
		lineBox.innerHTML = newArr[i];
		document.getElementById('box_API').appendChild(lineBox);
	}

})();



