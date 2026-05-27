// =========================
// FOOD DATABASE
// =========================
const dishes = [
	{
		name: "Pad Kra Pao",
		category: "stirfry",
		meat: "beef",
		vegetables: ["basil", "onion"],
		spicy: "medium",
		image: "images/pad-kra-pao.jpg",
	},

	{
		name: "Green Curry",
		category: "curry",
		meat: "chicken",
		vegetables: ["eggplant", "basil"],
		spicy: "medium",
		image: "images/green-curry.jpg",
	},

	{
		name: "Papaya Salad",
		category: "salad",
		meat: "shrimp",
		vegetables: ["basil", "onion", "mushroom", "papaya", "tomato"],
		spicy: "kiwihot",
		image: "images/papaya-salad.jpg",
	},

	{
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
	const totalChecked = countVegetables();

	if (totalChecked > 3) {
		event.target.checked = false;
		warning.innerText = "You can only select 3 vegetables.";
	} else {
		warning.innerText = "";
	}
}

function countVegetables() {
	return getSelectedVegetables().length;
}

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
			"Perfect match for your taste!",
			foundDish.image,
			true,
			foundDish,
		);
	} else {
		const recommendation = dishes[Math.floor(Math.random() * dishes.length)];
		showDish(
			"No Posible Match 😢",
			`Chef recommends: ${recommendation.name}`,
			recommendation.image,
		);
	}

	resetSelections();
}

// =========================
// SHOW THE DISH
// =========================

function showDish(title, message, image, showTags = false, dish = null) {
	result.style.display = "block";

	const tags = showTags ? generateVegTags(dish) : "";

	result.innerHTML = `
        <div class="modal">
            <h2>${title}</h2>
            ${tags}
            <p style="margin-top:15px; font-weight: 200px;">${message}</p>
            <img src="${image}">
            <div class="button-group">
                <button class="order-btn">Order</button>
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
