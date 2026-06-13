import { useMemo, useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import gift from "./assets/gift.mp4";
import HoneycombBeeBg from "./components/HoneycombBeeBg";


const categories = [
  {
    id: "waffles",
    icon: "🧇",
    title: "Waffles",
    desc: "Crispy, fluffy and honey loaded.",
  },
  {
    id: "falooda",
    icon: "🥤",
    title: "Falooda",
    desc: "Royal blend of flavors and texture.",
  },
  {
    id: "milkshakes",
    icon: "🍫",
    title: "Milkshakes",
    desc: "Thick, creamy and chilled.",
  },
  {
    id: "coffee",
    icon: "☕",
    title: "Hot Beverages",
    desc: "Warm drinks for every mood.",
  },
  {
    id: "desserts",
    icon: "🍰",
    title: "Desserts",
    desc: "Sweet treats with honey touch.",
  },
];

const menuData = {
  waffles: [
    {
      name: "Honey Butter Waffle",
      price: 180,
      tag: "Best Seller",
      rating: 4.8,
      reviews: 120,
      image:
        "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80",
      desc: "Golden waffle topped with creamy vanilla scoop, honey drizzle, berries and crunchy nuts.",
    },
    {
      name: "Chocolate Waffle",
      price: 190,
      tag: "Chocolate Love",
      rating: 4.7,
      reviews: 96,
      image:
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80",
      desc: "Rich chocolate waffle layered with cocoa sauce, cream and roasted choco crumbs.",
    },
    {
      name: "Red Velvet Waffle",
      price: 210,
      tag: "Creamy",
      rating: 4.6,
      reviews: 88,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
      desc: "Soft red velvet waffle served with cream cheese, honey glaze and berry crush.",
    },
    {
      name: "Oreo Waffle",
      price: 200,
      tag: "Crunchy",
      rating: 4.5,
      reviews: 74,
      image:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80",
      desc: "Loaded with Oreo crumbs, chocolate syrup and smooth vanilla cream.",
    },
  ],
  falooda: [
    {
      name: "Royal Falooda",
      price: 180,
      tag: "Royal",
      rating: 4.9,
      reviews: 140,
      image:
        "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=900&q=80",
      desc: "A royal mix of rose milk, jelly, basil seeds, ice cream and dry fruits.",
    },
    {
      name: "Honey Rose Falooda",
      price: 170,
      tag: "Floral",
      rating: 4.6,
      reviews: 63,
      image:
        "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80",
      desc: "Rose falooda balanced with pure honey sweetness and chilled creamy texture.",
    },
  ],
  milkshakes: [
    {
      name: "Chocolate Shake",
      price: 140,
      tag: "Thick",
      rating: 4.7,
      reviews: 110,
      image:
        "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80",
      desc: "Thick chocolate shake with cream, choco chips and honey caramel drizzle.",
    },
    {
      name: "Honey Banana Shake",
      price: 130,
      tag: "Natural",
      rating: 4.5,
      reviews: 72,
      image:
        "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=80",
      desc: "Smooth banana shake blended with milk, honey and light vanilla flavor.",
    },
  ],
  coffee: [
    {
      name: "Café Latte",
      price: 120,
      tag: "Classic",
      rating: 4.8,
      reviews: 102,
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
      desc: "Smooth espresso with steamed milk, light foam and a sweet honey note.",
    },
    {
      name: "Honey Cappuccino",
      price: 130,
      tag: "Warm",
      rating: 4.6,
      reviews: 69,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
      desc: "Creamy cappuccino finished with honey aroma and soft coffee foam.",
    },
  ],
  desserts: [
    {
      name: "Honey Pancake Stack",
      price: 160,
      tag: "Soft",
      rating: 4.7,
      reviews: 93,
      image:
        "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80",
      desc: "Soft pancake stack served with butter, honey, nuts and seasonal fruits.",
    },
    {
      name: "Honey Cream Cake",
      price: 150,
      tag: "Sweet",
      rating: 4.6,
      reviews: 81,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
      desc: "Light sponge cake layered with cream, honey syrup and crunchy toppings.",
    },
  ],
};

function App() {
  const [activeCategory, setActiveCategory] = useState("waffles");
  const [selectedDish, setSelectedDish] = useState(null);

  const allDishes = useMemo(() => Object.values(menuData).flat(), []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app-shell">
      <main className="phone-frame">
        <HoneycombBeeBg />


        <header className="top-nav">
          <div className="brand-logo">
            <img src={logo} alt="Bee Honey Cafe Logo" />
          </div>

          <div className="nav-spacer"></div>
        </header>

        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="script-text reveal-text">Made with</p>
            <h1 className="hero-title">
              <span>Honey</span>
              <small>Made for you</small>
            </h1>
            <div className="title-line">
              <span></span>
              <b>🐝</b>
              <span></span>
            </div>
            <p className="hero-desc">
              Indulge in pure honey crafted dishes, creamy desserts and
              handcrafted delights made with love for every mood.
            </p>

            <button className="explore-btn" onClick={() => scrollToSection("menu")}>
              Explore Menu
              <em>›</em>
            </button>
          </div>

          <div className="hero-plate">
            <div className="honey-drip"></div>
            <video
              src={gift}
              autoPlay
              loop
              muted
              playsInline
            />
            {/* <div className="honey-stick"></div> */}
            <span className="bee bee-one">🐝</span>
            <span className="bee bee-two">🐝</span>
            <span className="spark spark-one"></span>
            <span className="spark spark-two"></span>
          </div>
        </section>

        <section className="category-panel">
          {categories.slice(0, 4).map((cat, index) => (
            <button
              key={cat.id}
              className={`category-card ${
                activeCategory === cat.id ? "active" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => {
                setActiveCategory(cat.id);
                scrollToSection("menu");
              }}
            >
              <span>{cat.icon}</span>
              <strong>{cat.title}</strong>
              <small>{cat.desc}</small>
            </button>
          ))}
        </section>

        <section className="specials-section">
          <div className="section-heading">
            <p>Our Specials</p>
            <span></span>
          </div>

          <div className="special-grid">
            {allDishes.slice(0, 4).map((dish, index) => (
              <article
                className="special-card"
                key={dish.name}
                style={{ animationDelay: `${index * 0.12}s` }}
                onClick={() => setSelectedDish(dish)}
              >
                <div className="special-img">
                  <img src={dish.image} alt={dish.name} />
                  <i>♡</i>
                </div>
                <div className="special-info">
                  <strong>{dish.name}</strong>
                  <b>₹{dish.price}</b>
                  <p>{dish.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="marquee-section">
          <div className="marquee-track">
            {[...allDishes.slice(0, 5), ...allDishes.slice(0, 5)].map(
              (dish, index) => (
                <div className="mini-card" key={`${dish.name}-${index}`}>
                  <img src={dish.image} alt={dish.name} />
                  <span>{dish.name}</span>
                </div>
              )
            )}
          </div>
        </section>

        <section className="honey-banner">
          <div>
            <p>100% Pure & Natural</p>
            <h2>Pure Honey</h2>
            <span>Straight from nature to your cup.</span>
          </div>
          <div className="jar">
            🍯
            <i></i>
          </div>
        </section>

        <section className="menu-section" id="menu">
          <div className="menu-header">
            <div>
              <p className="script-text">Our</p>
              <h2>Menu</h2>
            </div>
            <span className="menu-bee">🐝</span>
          </div>

          <div className="tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={activeCategory === cat.id ? "tab active" : "tab"}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.icon}</span>
                {cat.title}
              </button>
            ))}
          </div>

          <div className="menu-list">
            {menuData[activeCategory].map((dish, index) => (
              <article
                className="menu-item"
                key={dish.name}
                style={{ animationDelay: `${index * 0.12}s` }}
                onClick={() => setSelectedDish(dish)}
              >
                <div className="menu-img">
                  <img src={dish.image} alt={dish.name} />
                  <small>{dish.tag}</small>
                </div>

                <div className="menu-content">
                  <div>
                    <h3>{dish.name}</h3>
                    <strong>₹{dish.price}</strong>
                  </div>
                  <p>{dish.desc}</p>

                  <div className="meta-row">
                    <span>⭐ {dish.rating}</span>
                    <span>{dish.reviews} Reviews</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="section-heading">
            <p>About Us</p>
            <span></span>
          </div>
          <div className="about-card">
            <h3>Bee Honey Café</h3>
            <p>
              A cozy dessert café inspired by pure honey, warm textures and
              handmade sweets. Every dish is designed with rich flavor,
              beautiful presentation and a premium café experience.
            </p>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-heading">
            <p>Contact</p>
            <span></span>
          </div>
          <div className="contact-card">
            <p>📍 Chennai, India</p>
            <p>☎ +91 98765 43210</p>
            <p>✉ hello@beehoneycafe.com</p>
          </div>
        </section>

       <nav className="bottom-nav">
          <button onClick={() => scrollToSection("home")}>
            <em>⌂</em>
            <span>Home</span>
          </button>

          <button onClick={() => scrollToSection("menu")}>
            <em>🍽️</em>
            <span>Menu</span>
          </button>

          <button onClick={() => scrollToSection("about")}>
            <em>🐝</em>
            <span>About</span>
          </button>

          <button onClick={() => scrollToSection("contact")}>
            <em>✆</em>
            <span>Contact</span>
          </button>
        </nav>
      </main>

      {selectedDish && (
        <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}
    </div>
  );
}



function DishModal({ dish, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <article className="dish-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>
          ×
        </button>

        <button className="heart-modal" aria-label="Favourite">
          ♡
        </button>

        <div className="modal-image">
          <img src={dish.image} alt={dish.name} />
          <span>{dish.tag}</span>
        </div>

        <div className="modal-content">
          <h2>{dish.name}</h2>

          <div className="rating-row">
            <span>⭐ {dish.rating}</span>
            <i></i>
            <span>{dish.reviews} Reviews</span>
            <span>🐝</span>
          </div>

          <h3>₹{dish.price}</h3>

          <p>{dish.desc}</p>

          <div className="detail-box">
            <strong>Dish Details</strong>
            <p>
              Freshly prepared with soft cream, honey drizzle, premium toppings
              and a café-style dessert finish.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

export default App;