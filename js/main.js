// =========================
// FOOD DATABASE
// =========================
const dishes = [
	{
		id: 1,
		name: "Pad Kra Pao",
		category: "stirfry",
		meat: "beef",
		vegetables: ["basil", "onion"],
		spicy: "medium",
		image: "images/pad-kra-pao.jpg",
	},

	{
		id: 2,
		name: "Green Curry",
		category: "curry",
		meat: "chicken",
		vegetables: ["eggplant", "basil"],
		spicy: "medium",
		image: "images/green-curry.jpg",
	},

	{
		id: 3,
		name: "Papaya Salad",
		category: "salad",
		meat: "shrimp",
		vegetables: [
			"basil",
			"onion",
			"mushroom",
			"papaya",
			"tomato",
			"eggplant",
		],
		spicy: "kiwihot",
		image: "images/papaya-salad.jpg",
	},

	{
		id: 5,
		name: "Mushroom Stir Fry",
		category: "stirfry",
		meat: "tofu",
		vegetables: ["mushroom", "onion"],
		spicy: "mild",
		image: "images/mushroom-stir-fly.jpg",
	},
];

// =========================
// ELEMENTS
// =========================

const vegetableCheckboxes = document.querySelectorAll(".veg");
const result = document.getElementById("result");
const warning = document.getElementById("warning");
const findBtn = document.getElementById("findBtn");

// =========================
// EVENTS
// =========================

vegetableCheckboxes.forEach((checkbox) => {
	checkbox.addEventListener("change", checkLimit);
});

findBtn.addEventListener("click", findFood);

// =========================
// VEGETABLE LIMIT
// =========================

function checkLimit(event) {
	const totalChecked = getSelectedVegetables().length;

	if (totalChecked > 3) {
		//CHECKBOX HAS THE PROPERTY OF CHECK [https://www.w3schools.com/jsreF/prop_checkbox_checked.asp]
		event.target.checked = false;
		warning.innerText = "You can only select 3 vegetables.";
	} else {
		warning.innerText = "";
	}
}

//?? TOO MUCH SEPERATION THAT THERE IS ON LINE OF CODE HERE ??
// function countVegetables() {
// 	return getSelectedVegetables().length;
// }

// =========================
// GET SELECTED VEGETABLES
// =========================

function getSelectedVegetables() {
	const selectedVegetables = [];

	for (let i = 0; i < vegetableCheckboxes.length; i++) {
		if (vegetableCheckboxes[i].checked) {
			selectedVegetables.push(vegetableCheckboxes[i].value);
		}
	}
	return selectedVegetables;
}

// =========================
// FIND FOOD
// =========================

function findFood() {
	document.getElementById("options").style.display = "none";

	const meat = document.getElementById("meat").value;
	const spicy = document.getElementById("spicy").value;
	const category = document.getElementById("category").value;
	const selectedVegetables = getSelectedVegetables();

	let foundDish = null;

	for (let i = 0; i < dishes.length; i++) {
		let dish = dishes[i];
		let vegetableMatch = true;

		// CHECK VEGETABLES
		for (let v = 0; v < selectedVegetables.length; v++) {
			let vegetable = selectedVegetables[v];

			if (dish.vegetables.includes(vegetable) === false) {
				vegetableMatch = false;
			}
		}

		// CHECK EVERYTHING [IF MULTIPLE MACH, THIS WILL RETURN THE LAST DISH THAT MATCH] /
		// FUTURE ASSIGN DISH FOUND TO ARRAY THEN DISPLAY SO CUSTOMER CAN CHOOSE
		if (
			dish.meat === meat &&
			dish.spicy === spicy &&
			dish.category === category &&
			vegetableMatch === true
		) {
			foundDish = dish;
		}
	}

	//PASS A LOT OF IMPORTANT INFORMATION TO DISPLAY IN ORDER TO USE THE SAME HTML TEMPLATE
	if (foundDish) {
		showDish(
			foundDish.name,
			" 😉 Perfect match for your taste!",
			foundDish.image,
			foundDish,
		);
	} else {
		const recommendation =
			dishes[Math.floor(Math.random() * dishes.length)];
		showDish(
			"No Posible Match 😢",
			`Chef recommends: ${recommendation.name}`,
			recommendation.image,
			recommendation,
		);
	}

	resetSelections();
}

// =========================
// SHOW THE DISH
// =========================

function showDish(title, message, image, dish = null) {
	result.style.display = "block";

	const tags = generateVegTags(dish);

	console.log(dish);

	result.innerHTML = `
        <div class="modal">
            <h2>${title}</h2>
			<p style="margin-top:15px; font-weight: 200px;">${message}</p>
            ${tags}           
            <img src="${image}">
            <div class="button-group">
                <button class="order-btn" onclick='openOrderForm(${dish.id})'>Order</button>
                <button class="again-btn" onclick="startOver()">
                    Find My Food Again
                </button>
            </div>
        </div>
    `;
}

function generateVegTags(dish) {
	let vegetableTags = "";

	for (let i = 0; i < dish.vegetables.length; i++) {
		vegetableTags += `
            <div class="tag">
                ${dish.vegetables[i]}
            </div>
        `;
	}

	return `
        <div class="tag">
            ${dish.category}
        </div>
        <div class="tag">
            ${dish.spicy} spicy
        </div>
        ${vegetableTags}
    `;
}
// =========================
// RESET
// =========================

function resetSelections() {
	// INFORMATION FROM 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement'
	document.getElementById("meat").selectedIndex = 0;
	document.getElementById("spicy").selectedIndex = 0;
	document.getElementById("category").selectedIndex = 0;
	vegetableCheckboxes.forEach((checkbox) => {
		checkbox.checked = false;
	});
	warning.innerText = "";
}

// =========================
// START OVER
// =========================

function startOver() {
	result.style.display = "none";
	document.getElementById("options").style.display = "block";
}


// =========================
// ORDER PAGE
// =========================

let quantity = 1;

//ONLY ONE PRICE AS THERE IS NO PRICE VALUE FOR THE DISHES YET
const price = 45.5;

function openOrderForm(id) {
	result.innerHTML = "";

	const dish = dishes.find((dish) => dish.id === id);

	result.innerHTML = `
			<div class="order-modal">
   				 <h2>${dish.name}</h2>
   				 <div class="quantity-box">
					<button onclick="changeQuantity(-1)">-</button>
					<p class='title'>Qty</p>
					<span id="quantity">1</span>
      				  <button onclick="changeQuantity(1)">+</button>
   				 </div>
				 <div class="price-box">
				 	<p class='title'>Price:</p>
					<p>$45.50</p>
				 </div>
				 <div class="total-box">
				 	<p class='title'>Total:</>
   					<p id='total'> $45.50</p>
				</div>
    			<button class="confirm-btn" onclick="checkoutOrOrder()">Confirm</button>
			</div>
		`;
}

function changeQuantity(amount) {
	quantity += amount;

	// STOP BELOW 1
	quantity = quantity < 1 ? 1 : quantity;
	// UPDATE SCREEN
	document.getElementById("quantity").innerText = quantity;

	const total = quantity * price;

	document.getElementById("total").innerText = total.toFixed(2);
}

function checkoutOrOrder() {
	result.innerHTML = "";

	result.innerHTML = `
			<div class="order-modal">  				 
    			<button class="checkout-btn" onclick="checkout()">Checkout</button>
				<button class="again-btn" onclick="startOver()">Find My Food Again</button>
			</div>
		`;
}

// =========================
// CHECKOUT PAGE
// =========================

function checkout() {
	alert("Feature coming soon — the developer is still in training 🍳😆");
}
