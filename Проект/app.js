'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function () {
	fitlerPopup.classList.toggle('hidden');
	fitlerLabel.classList.toggle('filterLabelPink');
	filterIcon.classList.toggle('filterIconPink');

	if (filterIcon.getAttribute('src') === 'images/filter.svg') {
		filterIcon.setAttribute('src', 'images/filterHover.svg')
	} else {
		filterIcon.setAttribute('src', 'images/filter.svg')
	}
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function (header) {
	header.addEventListener('click', function (event) {
		event.target.nextElementSibling.classList.toggle('hidden');
	})
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');

filterSizeWrap.addEventListener('click', function () {
	filterSizes.classList.toggle('hidden');
});

let counter = document.querySelector('.cartIconWrap');
let featureItem = document.querySelectorAll('.featuredImgWrap');
let listOfProducts = document.createElement('table');
let cartElem = document.querySelector('.cartIconWrap');
let sumEl = 0
const cartProduct = {}

document.querySelector('.rightHeader > span').appendChild(listOfProducts);
listOfProducts.classList.add('listOfProduct');
listOfProducts.classList.add('hideProduct');
listOfProducts.insertAdjacentHTML('afterbegin', `<tr>
			<td><b>Название товара</b></td>
			<td><b>Количество</b></td>
			<td><b>Цена за шт.</b></td>
			<td><b>Итого</b></td>
		</tr>
		<tr>
			<td colspan='4'><b>Товаров в корзине на сумму: $${sumEl}</b></td>
		</tr>`);

function clickHandlerCart(event) {
	addProductInCart(event.currentTarget)
	updateTable(event.currentTarget)
	let itemText = counter.querySelector('span');
	let number = +itemText.innerText;
	itemText.innerText = ++number;
}

function addProductInCart(product) {
	let infoProduct = product.parentNode.parentNode.nextElementSibling;
	let name = infoProduct.querySelector('.featuredName').innerText;

	if (Object.keys(cartProduct).indexOf(name) == -1) {
		cartProduct[name] = {
			numOfProduct: 1,
			price: parseInt(infoProduct.querySelector('.featuredPrice').innerText.slice(1)),
		}
	} else {
		cartProduct[name].numOfProduct++;
	}
}

function clearTable() {
	listOfProducts.innerHTML = `
	<tr>
		<td><b>Название товара</b></td>
		<td><b>Количество</b></td>
		<td><b>Цена за шт.</b></td>
		<td><b>Итого</b></td>
	</tr>
	<tr>
		<td colspan='4'><b>Товаров в корзине на сумму: $${sumEl}</b></td>
	</tr>`
}

function updateTable(row) {
	clearTable()
	for (let el in cartProduct) {
		listOfProducts.querySelector('tr:last-child').insertAdjacentHTML('beforebegin', `
		<tr>
			<td>${el}</td>
			<td>${cartProduct[el].numOfProduct} шт.</td>
			<td>$${cartProduct[el].price}</td>
			<td>$${cartProduct[el].price * cartProduct[el].numOfProduct}</td>
		</tr>`)
		sumEl += cartProduct[el].price * cartProduct[el].numOfProduct;
	}

}


featureItem.forEach(function (item) {
	item.querySelector('button').addEventListener('click', clickHandlerCart)
});

cartElem.addEventListener('click', function (event) {
	listOfProducts.classList.toggle('hideProduct');
});