/* ---------------------------------------------------------
   CONFIGURATION + GLOBAL STATE
--------------------------------------------------------- */

const SEAT_PRICE = 12.50; // Price per seat
let selectedSeats = [];   // Tracks selected seats


/* ---------------------------------------------------------
   GENERATE SEAT DATA
   Creates a full seat map with random reserved seats.
--------------------------------------------------------- */

const seatMap = {
  sections: [
    { id: "s1", name: "Front Left", rows: 4, cols: 5 },
    { id: "s2", name: "Front Center", rows: 5, cols: 8 },
    { id: "s3", name: "Front Right", rows: 4, cols: 5 },

    { id: "s4", name: "Middle Left", rows: 6, cols: 6 },
    { id: "s5", name: "Middle Center", rows: 7, cols: 10 },
    { id: "s6", name: "Middle Right", rows: 6, cols: 6 },

    { id: "s7", name: "Back Left", rows: 5, cols: 5 },
    { id: "s8", name: "Back Center", rows: 6, cols: 8 },
    { id: "s9", name: "Back Right", rows: 5, cols: 5 }
  ]
};



function generateSeatData(map) {
  const fullMap = {};

  map.sections.forEach(section => {
    const seats = [];

    for (let r = 1; r <= section.rows; r++) {
      for (let c = 1; c <= section.cols; c++) {
        const id = `${section.id}-r${r}c${c}`;

        seats.push({
          id,
          row: r,
          col: c,
          state: Math.random() < 0.1 ? "reserved" : "available"
        });
      }
    }

    fullMap[section.id] = { ...section, seats };
  });

  return fullMap;
}

const generatedMap = generateSeatData(seatMap);


/* ---------------------------------------------------------
   UTILITY — CLEAR SEAT MAP
--------------------------------------------------------- */
function clearSeatMap() {
  document.querySelector(".seat-map").innerHTML = "";
}


/* ---------------------------------------------------------
   DESKTOP LAYOUT
--------------------------------------------------------- */
function renderDesktopLayout(map) {
  clearSeatMap();

  const container = document.querySelector(".seat-map");
  container.classList.add("desktop");

  Object.values(map).forEach(section => {

    // Wrapper for section title + grid
    const sectionWrapper = document.createElement("div");
    sectionWrapper.classList.add("section-wrapper");

    // Section title
    const title = document.createElement("h3");
    title.classList.add("section-title");
    title.textContent = section.name;
    sectionWrapper.appendChild(title);

    // Seat grid
    const sectionDiv = document.createElement("div");
    sectionDiv.classList.add("section");
    sectionDiv.style.gridTemplateColumns = `repeat(${section.cols}, 1fr)`;
    sectionWrapper.appendChild(sectionDiv);

    // Add seats
    section.seats.forEach(seat => {
      const seatDiv = document.createElement("div");
      seatDiv.classList.add("seat", seat.state);
      seatDiv.dataset.id = seat.id;
      sectionDiv.appendChild(seatDiv);
    });

    // Click entire wrapper to open detail view
    sectionWrapper.addEventListener("click", () => {
      renderSeatDetail(section.id, map);
    });

    // Append wrapper to container
    container.appendChild(sectionWrapper);
  });
}

/* ---------------------------------------------------------
   MOBILE LAYOUT
--------------------------------------------------------- */
function renderMobileLayout(map) {
  clearSeatMap();

  const container = document.querySelector(".seat-map");
  container.classList.add("mobile");

  const selector = document.createElement("select");
  selector.id = "mobileSectorSelect";

  Object.values(map).forEach(section => {
    const opt = document.createElement("option");
    opt.value = section.id;
    opt.textContent = section.name;
    selector.appendChild(opt);
  });

  container.appendChild(selector);

  selector.addEventListener("change", () => {
    renderSeatDetail(selector.value, map);
  });

  renderSeatDetail(selector.value, map);
}


/* ---------------------------------------------------------
   SEAT DETAIL VIEW
--------------------------------------------------------- */
function renderSeatDetail(sectionId, map) {
  clearSeatMap();

  const container = document.querySelector(".seat-map");
  const section = map[sectionId];

  // Back button
  const backBtn = document.createElement("button");
  backBtn.textContent = "← Back to Areas";
  backBtn.classList.add("back-button");
  backBtn.addEventListener("click", () => renderLayout(map));
  container.appendChild(backBtn);

  // View All Seats
  const viewAllBtn = document.createElement("button");
  viewAllBtn.textContent = "View All Seats";
  viewAllBtn.classList.add("back-button");
  viewAllBtn.addEventListener("click", () => renderDesktopLayout(map));
  container.appendChild(viewAllBtn);

  // Title
  const title = document.createElement("h2");
  title.textContent = section.name;
  container.appendChild(title);

  // Seat grid
  const grid = document.createElement("div");
  grid.classList.add("section-detail");
  grid.style.gridTemplateColumns = `repeat(${section.cols}, 1fr)`;

  section.seats.forEach(seat => {
    const seatDiv = document.createElement("div");
    seatDiv.classList.add("seat", seat.state);
    seatDiv.dataset.id = seat.id;

    seatDiv.addEventListener("click", () => {
      handleSeatSelection(seat, seatDiv);
    });

    grid.appendChild(seatDiv);
  });

  container.appendChild(grid);

  // Reserve button
  const reserveBtn = document.createElement("button");
  reserveBtn.id = "reserveBtn";
  reserveBtn.textContent = "Reserve Seat(s)";
  reserveBtn.classList.add("reserve-button");
  reserveBtn.disabled = selectedSeats.length === 0;

  reserveBtn.addEventListener("click", () => {
    reserveSelectedSeat(sectionId, map);
  });

  container.appendChild(reserveBtn);
}


/* ---------------------------------------------------------
   MULTI-SEAT SELECTION
--------------------------------------------------------- */
function handleSeatSelection(seat, seatDiv) {
  if (seat.state === "reserved") return;

  if (selectedSeats.includes(seat)) {
    selectedSeats = selectedSeats.filter(s => s !== seat);
    seatDiv.classList.remove("selected");
  } else {
    selectedSeats.push(seat);
    seatDiv.classList.add("selected");
  }

  const reserveBtn = document.getElementById("reserveBtn");
  if (reserveBtn) reserveBtn.disabled = selectedSeats.length === 0;

  updateCart();
}


/* ---------------------------------------------------------
   CART SYSTEM (Floating Button + Slide-Up Panel)
--------------------------------------------------------- */

const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");
const cartBadge = document.getElementById("cartBadge");

// Open cart
cartButton.addEventListener("click", () => {
  cartPanel.classList.add("open");
});

// Close cart
closeCart.addEventListener("click", () => {
  cartPanel.classList.remove("open");
});

// Update cart contents + badge
function updateCart() {
  const cartList = document.getElementById("cartList");
  const cartTotal = document.getElementById("cartTotal");

  cartList.innerHTML = "";

  selectedSeats.forEach(seat => {
    const li = document.createElement("li");
    li.textContent = `${seat.id} — $${SEAT_PRICE.toFixed(2)}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("cart-remove-btn");

    removeBtn.addEventListener("click", () => {
      removeSeatFromCart(seat);
    });

    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });

  const total = selectedSeats.length * SEAT_PRICE;
  cartTotal.textContent = total.toFixed(2);

  // Update badge
  cartBadge.textContent = selectedSeats.length;
}


/* ---------------------------------------------------------
   REMOVE SEAT + EMPTY CART
--------------------------------------------------------- */

function removeSeatFromCart(seat) {
  selectedSeats = selectedSeats.filter(s => s !== seat);

  const seatDiv = document.querySelector(`[data-id="${seat.id}"]`);
  if (seatDiv) seatDiv.classList.remove("selected");

  updateCart();

  const reserveBtn = document.getElementById("reserveBtn");
  if (reserveBtn) reserveBtn.disabled = selectedSeats.length === 0;
}

document.getElementById("emptyCartBtn").addEventListener("click", () => {
  selectedSeats.forEach(seat => {
    const seatDiv = document.querySelector(`[data-id="${seat.id}"]`);
    if (seatDiv) seatDiv.classList.remove("selected");
  });

  selectedSeats = [];
  updateCart();

  const reserveBtn = document.getElementById("reserveBtn");
  if (reserveBtn) reserveBtn.disabled = true;
});


/* ---------------------------------------------------------
   RESERVATION LOGIC
--------------------------------------------------------- */
function reserveSelectedSeat(sectionId, map) {
  if (selectedSeats.length === 0) return;

  selectedSeats.forEach(seat => {
    seat.state = "reserved";
  });

  const output = document.createElement("div");
  output.classList.add("reservation-output");

  const seatList = selectedSeats.map(s => s.id).join(", ");

  output.innerHTML = `
    <p><strong>Seats Reserved!</strong></p>
    <p>Section: ${map[sectionId].name}</p>
    <p>Seats: ${seatList}</p>
  `;

  selectedSeats = [];

  renderSeatDetail(sectionId, map);

  const container = document.querySelector(".seat-map");
  container.appendChild(output);

  updateCart();
}


/* ---------------------------------------------------------
   LAYOUT CONTROLLER
--------------------------------------------------------- */
function renderLayout(map) {
  if (window.innerWidth <= 700) {
    renderMobileLayout(map);
  } else {
    renderDesktopLayout(map);
  }
}

renderLayout(generatedMap);

window.addEventListener("resize", () => {
  renderLayout(generatedMap);
});
