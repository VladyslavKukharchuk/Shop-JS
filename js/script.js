const PRODUCTS = [{
		id: 1,
		title: "Aircraft Carrier",
		img: "aircraft-carrier",
		price: 30000,
		sale: true,
		salePercent: 2,
		categories: ['Boat']
	},
	{
		id: 2,
		title: "Boat",
		img: "boat",
		price: 700,
		sale: false,
		categories: ['Boat']
	},
	{
		id: 3,
		title: "Bus",
		img: "bus",
		price: 300,
		sale: true,
		salePercent: 10,
		categories: ['Bus']
	},
	{
		id: 4,
		title: "Cabriolet",
		img: "cabriolet",
		price: 900,
		sale: true,
		salePercent: 25,
		categories: ['Car']
	},
	{
		id: 5,
		title: "Commercial Plane",
		img: "commercial-plane",
		price: 1000,
		sale: false,
		categories: ['Aircraft']
	},
	{
		id: 6,
		title: "Electric car",
		img: "electric-car",
		price: 3000,
		sale: false,
		categories: ['Car']
	},
	{
		id: 7,
		title: "Helicopter police",
		img: "helicopter-police",
		price: 1000,
		sale: true,
		salePercent: 15,
		categories: ['Aircraft', 'Helicopter']
	},
	{
		id: 8,
		title: "Helicopter",
		img: "helicopter",
		price: 900,
		sale: true,
		salePercent: 35,
		categories: ['Aircraft', 'Helicopter']
	},
	{
		id: 9,
		title: "Minibus",
		img: "minibus",
		price: 700,
		sale: true,
		salePercent: 5,
		categories: ['Car', 'Bus']
	},
	{
		id: 10,
		title: "Motorbike",
		img: "motorbike",
		price: 200,
		sale: true,
		salePercent: 25,
		categories: ['Bike']
	},
	{
		id: 11,
		title: "Off Road",
		img: "off-road",
		price: 600,
		sale: false,
		categories: ['Car']
	},
	{
		id: 12,
		title: "Police Car",
		img: "police-car",
		price: 100,
		sale: false,
		categories: ['Car']
	},
	{
		id: 13,
		title: "School Bus",
		img: "school-bus",
		price: 150,
		sale: true,
		salePercent: 8,
		categories: ['Bus']
	},
	{
		id: 14,
		title: "Scooter",
		img: "scooter",
		price: 80,
		sale: true,
		salePercent: 13,
		categories: ['Bike']
	},
	{
		id: 15,
		title: "Small Plane",
		img: "small-plane",
		price: 3000,
		sale: false,
		categories: ['Aircraft']
	},
	{
		id: 16,
		title: "Speed Boat",
		img: "speed-boat",
		price: 2000,
		sale: true,
		salePercent: 34,
		categories: ['Boat']
	},
	{
		id: 17,
		title: "Sport Car",
		img: "sport-car",
		price: 10000,
		sale: true,
		salePercent: 3,
		categories: ['Car']
	},
	{
		id: 18,
		title: "Suv",
		img: "suv",
		price: 300,
		sale: true,
		salePercent: 13,
		categories: ['Car', 'Bus']
	}
];

const USERS = [{
	name: 'Ivan',
	email: 'ivan@gmail.com',
	password: '123',
	favourites: [9, 18, 7],
	status: false
}];


//StorageUsers
const storageUsers = () => {
	let users = localStorage.getItem(`users`);
	if (!users) {
		localStorage.setItem(`users`, JSON.stringify(USERS))
	}
	return JSON.parse(localStorage.getItem(`users`));
}

const STORAGE_USERS = storageUsers();
//StorageUsers


//FormError
const formError = (form, errorText) => {
	let errorBlock = form.querySelector(`.error`);
	errorBlock.innerHTML = errorText;
	errorBlock.classList.add(`active`);
}
//FormError


//LoginForm
const LoginForm = document.querySelector(`#LoginForm`);
if (LoginForm) {
	LoginForm.addEventListener(`submit`, e => {
		e.preventDefault();

		let email = e.target.querySelector(`input[data-name="email"]`).value,
			password = e.target.querySelector(`input[data-name="password"]`).value;

		let userExist = STORAGE_USERS.find(user => user.email === email);

		if (!userExist) {
			formError(e.target, `User with <strong>${email}</strong> not exist!`);
		} else if (userExist.password !== password) {
			formError(e.target, `Invalid password!`);
		} else {
			userExist.status = true;
			localStorage.setItem(`user`, JSON.stringify(userExist));
			document.location.href = `index.html`;
		}
	});
};
//LoginForm


//RegistrationForm
const RegistrationForm = document.querySelector(`#RegistrationForm`);
if (RegistrationForm) {
	RegistrationForm.addEventListener(`submit`, e => {
		e.preventDefault();

		let name = e.target.querySelector(`input[data-name="name"]`).value,
			email = e.target.querySelector(`input[data-name="email"]`).value,
			password = e.target.querySelector(`input[data-name="password"]`).value,
			passwordVerify = e.target.querySelector(`input[data-name="passwordVerify"]`).value;

		let userExist = STORAGE_USERS.find(user => user.email === email);

		if (userExist) {
			formError(e.target, `User with <strong>${email}</strong> already exist!`);
		} else if (password !== passwordVerify) {
			formError(e.target, `Password not matches!`);
		} else {
			let user = {
				name: name,
				email: email,
				password: password,
				favourites: [],
				status: true
			}

			STORAGE_USERS.push(user);
			localStorage.setItem(`users`, JSON.stringify(STORAGE_USERS));

			localStorage.setItem(`user`, JSON.stringify(user));
			document.location.href = `index.html`;
		}
	});
};
//RegistrationForm


//User
let USER = localStorage.getItem(`user`) ? JSON.parse(localStorage.getItem(`user`)) : null;
//User


//Header
const headerUser = document.querySelector(`#headerUser`);
const headerFavourites = document.querySelector(`#headerFavourites`);
const headerFavouritesCount = document.querySelector(`#headerFavouritesCount`);
const headerLogout = document.querySelector(`#headerLogout`);

const header = () => {
	if (USER) {
		headerUser.href = `favourites.html`;
		headerUser.innerHTML = USER.name;

		headerFavourites.href = `favourites.html`;

		headerFavouritesCount.innerHTML = USER.favourites.length;

		headerLogout.classList.add(`active`);
		headerLogout.addEventListener(`click`, () => {
			USER.status = false;
			let index = STORAGE_USERS.findIndex(item => item.email === USER.email);
			STORAGE_USERS.splice(index, 1);
			localStorage.setItem(`user`, JSON.stringify(STORAGE_USERS));

			STORAGE_USERS.push(USER);
			localStorage.setItem(`users`, JSON.stringify(STORAGE_USERS));

			localStorage.removeItem(`user`);
			document.location.href = `index.html`;
		});
	}
}
header();
//Header

//favouriteTable
const favouriteTable = document.querySelector(`#favouriteTable`);

if (favouriteTable && USER) {
	USER.favourites.forEach(item => {
		let product = PRODUCTS.find(el => el.id === item);

		let productSale = product.sale ? `<span class="item__sale">- ${product.salePercent}%</span>` : `-`;

		let productPrice = product.price;
		if (product.sale) {
			productPrice -= (product.price * product.salePercent) / 100;
		}

		let tr = document.createElement(`tr`);
		tr.innerHTML = `
		<td>
		    <div class="item__info">
		        <img src="images/products/${product.img}.png" alt="${product.title}" height="100">
				<div>
        			<p class="item__info--title">${product.title}</p>
				</div>
    		</div>
		</td>
		<td>$${product.price}</td>
		<td>${productSale}</td>
		<td>$${productPrice}</td>`;

		let tdBtn = document.createElement(`td`);

		let btnFav = document.createElement(`button`);
		btnFav.classList = `item__favourite`;
		btnFav.innerHTML = `<img src="images/product__favourite--true.png" alt="favourite" height="20">`;
		btnFav.addEventListener(`click`, () => {
			let favProductIndex = USER.favourites.findIndex(el => el.id === item);
			USER.favourites.splice(favProductIndex, 1);
			localStorage.setItem(`user`, JSON.stringify(USER));
			tr.remove();
			headerFavouritesCount.innerHTML = USER.favourites.length;
		});

		tdBtn.append(btnFav);
		tr.append(tdBtn);

		favouriteTable.querySelector(`tbody`).append(tr);
	})
}
//favouriteTable


//renderCategories
const categoriesContainer = document.querySelector(`#categoriesContainer`);

const renderCategories = () => {
	let categories = [];
	PRODUCTS.forEach(product => {
		product.categories.forEach(cat => categories.indexOf(cat) === -1 && categories.push(cat));
	});

	categories.forEach(cat => {
		let section = document.createElement(`section`);
		section.className = `caterory`;
		section.dataset.name = cat;
		section.innerHTML = `<h2>${cat}</h2>
		<div class="category__container"></div>`;

		categoriesContainer.append(section);
	})
}
//renderCategories


//renderProducts
const renderProducts = () => {
	PRODUCTS.forEach(product => {


		let isUserFavourit;
		if (USER && USER.favourites.includes(product.id)) {
			isUserFavourit = `product__favourite--true`;
		} else {
			isUserFavourit = `product__favourite`;
		}


		product.categories.forEach(cat => {
			let catSection = document.querySelector(`section[data-name="${cat}"] .category__container`);

			let productPrice = product.price;
			if (product.sale) {
				productPrice -= (product.price * product.salePercent) / 100;
			}


			let productPriceDiv;
			if (product.sale) {
				productPriceDiv = `<span class="product__price">$${productPrice}</span>`;
			} else {
				productPriceDiv = `<span class="product__price">$${product.price}</span>`;
			}



			let productSale = product.sale ? `
			<div class="product__sale">
				<span class="product__sale--old">$${product.price}</span>
				<span class="product__sale--percent">-${product.salePercent}%</span>
			</div>` : ``;


			let productBlock = document.createElement(`div`);
			productBlock.className = `product`;
			productBlock.innerHTML = `
			<img src="images/products/${product.img}.png" class="product__img" alt="${product.title}" height="80">
			<p class="product__title">${product.title}</p>
				${productSale}
			<div class="product__info">
				${productPriceDiv}
			</div>`

			let btnFav = document.createElement(`button`);
			btnFav.classList = `product__favourite`;
			btnFav.innerHTML = `<img src="images/${isUserFavourit}.png" alt="favourite" height="20">`;

			if (USER) {
				btnFav.addEventListener(`click`, () => {
					let favProductIndex = USER.favourites.findIndex(el => el === product.id);

					if (favProductIndex !== -1) {

						USER.favourites.splice(favProductIndex, 1);
						localStorage.setItem(`user`, JSON.stringify(USER));
						btnFav.innerHTML = `<img src="images/product__favourite.png" alt="favourite" height="20">`;
						headerFavouritesCount.innerHTML = USER.favourites.length;
					} else {
						USER.favourites.push(product.id);
						localStorage.setItem(`user`, JSON.stringify(USER));
						btnFav.innerHTML = `<img src="images/product__favourite--true.png" alt="favourite" height="20">`;
						headerFavouritesCount.innerHTML = USER.favourites.length;
					}
				});
			} else {
				btnFav.addEventListener(`click`, () => {
					document.location.href = `login.html`;
				});
			}

			productBlock.append(btnFav);

			catSection.append(productBlock);
		});
	});
}
//renderProducts


if (categoriesContainer) {
	renderCategories();
	renderProducts();
}
