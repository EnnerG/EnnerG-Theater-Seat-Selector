# 🎬 EnnerG Theater Seat Selector — Version 1.0

A modern, responsive, and interactive cinema seat selection interface built with **HTML, CSS, and JavaScript**.  
Designed with a clean, minimalist aesthetic and a mobile‑native UX inspired by real ticketing platforms.

This project demonstrates dynamic rendering, state management, responsive layouts, and polished UI interactions — making it an excellent portfolio piece for front‑end engineering.

---

## 🚀 Live Demo
https://ennerg.github.io/EnerG-Theater-Seat-Selector/ (GitHub Pages link)

---

## 📸 Screenshots

### Desktop Layout
![Desktop Layout](assets/screenshots/theater-seat-diagram.png)

### Section Detail View
![Section Detail](assets/screenshots/select-section.png)

### Cart Panel
![Cart Panel](assets/screenshots/cart-popup.png)


---

# ✨ Features (Version 1.0)

### 🎯 Core Functionality
- Dynamic seat map generation  
- Multi‑seat selection  
- Real‑time pricing and running total  
- Reservation confirmation with seat summary  
- Section detail view with “Back” and “View All Seats” options
- Section titles displayed above each seat cluster for improved readability  

### 🛒 Modern Cart System
- Floating cart button with minimalist dark badge  
- Slide‑up bottom‑sheet cart panel (optimized width for better UX)  
- Remove individual seats  
- Empty cart button  
- Automatic total calculation  

### 📱 Responsive Layouts
- Desktop: 3‑column seat cluster grid  
- Mobile: Section dropdown + detail view  
- Floating cart button adapts to all screen sizes  

### 🎨 UI & UX Polish
- Section titles displayed above each seat cluster  
- Optimized cart panel width for better viewing  
- Clean, minimalist styling  
- Hybrid comments throughout the codebase  
- Smooth layout transitions  

---

🔮 Future Enhancements (Roadmap)
These are planned for Version 1.1, 1.2, and 2.0.

v1.1 — Visual & Pricing Enhancements
-	Seat type pricing (VIP, Standard, Accessible)
-	Color coded seat types
-	Seat selection animations (pop, highlight)
-	Slide in / fade in transitions

v1.2 — Persistence & User Experience
-	LocalStorage persistence
	- Selected seats survive refresh
  - Reserved seats persist
-	Improved mobile transitions
-	Optional dark mode

v2.0 — Advanced Features
Admin mode

-	Admin mode
  -	Block/unblock seats
  -	Mark sections unavailable
  -	Developer tools panel
-	Checkout modal
  -	Order summary
  -	Confirmation step
-	Reset All Seats (developer tool)
-	Analytics hooks (optional)


🤝 Contributing
Pull requests are welcome.
For major changes, please open an issue first to discuss what you’d like to modify.

📄 License
MIT License.
Feel free to use this project for learning, portfolios, or extensions.

⭐ Author
Created by Vanessa — entrepreneur, project manager, technical trainer, and systems designer.
Focused on building premium, intentional digital experiences.

# 🧩 Tech Stack

- **HTML5** — semantic structure  
- **CSS3** — responsive layout, modern UI styling  
- **JavaScript (ES6+)** — dynamic rendering, state management, interactions  

No frameworks. No libraries.  
Just clean, intentional, portfolio-grade code.

---

## Recent Updates
- Optimized cart panel width for improved viewing experience
- Added section titles above seat clusters for clearer layout structure

## Design Decisions
- Floating cart button chosen for a modern, mobile‑native UX
- Narrow bottom sheet cart panel improves readability and reduces visual weight
- Section titles added to enhance spatial orientation and accessibility


# 🗂 Project Structure
/
|---index.html
|---styles.css
|---script.js
|---assets


---

# 🧭 How It Works

### 1. Seat Map Generation  
The app dynamically generates all seats based on a configuration object, including random reserved seats.

### 2. Seat Selection  
Users can select or deselect any available seat. Selected seats appear in the cart.

### 3. Cart System  
A floating cart button shows the number of selected seats.  
Clicking it opens a slide‑up bottom sheet with:

- Selected seats  
- Remove buttons  
- Empty cart  
- Total price  

### 4. Reservation  
Clicking **Reserve Seat(s)** marks selected seats as permanently reserved.

---

# 🛠 Installation & Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cinema-seat-selector.git



