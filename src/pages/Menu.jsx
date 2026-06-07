import { useState, useEffect } from 'react'; // Added useEffect
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { MenuCategoryTab, MenuItemCard } from '../component/CafeComponents';
import belgium from '../assets/belgiun-chocolately.avif';
import redvelvet from '../assets/Red-Velvet.jpg';

const menuCategories = [
  { name: 'WAFFLES', icon: '🧇' },
  { name: 'PANCAKES', icon: '🥞' },
  { name: 'FALOODA', icon: '🍧' },
  { name: 'ICE CREAMS', icon: '🍨' },
  { name: 'JUICES', icon: '🍹' },
  { name: 'DESSERTS', icon: '🍰' },
];

const menuData = {
  WAFFLES: [
    { name: 'Honey Butter Waffles', price: 180, tag: 'BEST SELLER', desc: 'Crispy waffles topped with honey, butter, ice cream & nuts.', img: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=200' },
    { name: 'Chocolate Waffles', price: 190, tag: 'MUST TRY', desc: 'Delicious chocolate waffles with choco chips, ice cream & chocolate sauce.', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200' },
    { name: 'Red Velvet Waffles', price: 200, tag: null, desc: 'Red velvet waffles with cream cheese, ice cream & berry compote.', img: redvelvet },
  ],
  PANCAKES: [
    { name: 'Classic Maple Pancakes', price: 150, tag: 'CLASSIC', desc: 'Fluffy stacks served with pure maple syrup and whipped butter.', img: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=200' },
    { name: 'Blueberry Delight', price: 170, tag: 'BEST SELLER', desc: 'Loaded with fresh blueberries and topped with vanilla cream.', img: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=200' },
    { name: 'Nutella Banana', price: 180, tag: 'MUST TRY', desc: 'Warm pancakes smothered in rich Nutella and fresh banana slices.', img: 'https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?w=200' },
  ],
  FALOODA: [
    { name: 'Royal Rose Falooda', price: 160, tag: 'SIGNATURE', desc: 'A royal blend of falooda sev, basil seeds, ice cream, nuts & rose syrup.', img: 'https://images.unsplash.com/photo-1553177595-4de2bb0842b9?w=200' },
    { name: 'Kesar Pista Falooda', price: 180, tag: null, desc: 'Rich saffron milk infused with pistachios and rich malai ice cream.', img: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=200' },
    { name: 'Mango Rabdi Falooda', price: 190, tag: 'SEASONAL', desc: 'Fresh mango puree topped with thick rabdi and dry fruits.', img: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=200' },
  ],
  'ICE CREAMS': [
    { name: 'Vanilla Bean Sundae', price: 120, tag: null, desc: 'Classic vanilla bean ice cream with hot fudge and a cherry on top.', img: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=200' },
    { name: 'Belgian Dark Chocolate', price: 140, tag: 'MUST TRY', desc: 'Intensely rich dark chocolate scoops with chocolate shavings.', img: belgium },
    { name: 'Strawberry Cheesecake Scoop', price: 150, tag: 'NEW', desc: 'Creamy strawberry ice cream folded with real cheesecake bits.', img: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=200' },
  ],
  JUICES: [
    { name: 'Fresh Orange Juice', price: 100, tag: 'HEALTHY', desc: '100% freshly squeezed oranges. No added sugar.', img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=200' },
    { name: 'Watermelon Slush', price: 90, tag: 'REFRESHING', desc: 'Icy blended watermelon with a hint of mint.', img: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=200' },
    { name: 'Pineapple Mint Blast', price: 110, tag: null, desc: 'Tropical sweet pineapple blended with fresh cooling mint leaves.', img: 'https://images.unsplash.com/photo-1550828520-4cb496926fc9?w=200' },
  ],
  DESSERTS: [
    { name: 'Sizzling Brownie', price: 180, tag: 'BEST SELLER', desc: 'Warm walnut brownie served on a hot sizzler plate with melted chocolate.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200' },
    { name: 'Tiramisu Cup', price: 160, tag: null, desc: 'Coffee-soaked ladyfingers layered with creamy mascarpone cheese.', img: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=200' },
    { name: 'Choco Lava Cake', price: 130, tag: 'MUST TRY', desc: 'Soft sponge cake with a gooey, melting chocolate center.', img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=200' },
  ],
};


export default function Menu() {
  const location = useLocation();
  
  // Checks if we clicked a category from the home page. Defaults to WAFFLES if we didn't.
  const passedCategory = location.state?.category || 'WAFFLES';
  const [activeCategory, setActiveCategory] = useState(passedCategory);

  // If the location state changes while we are on the page, update the category
  useEffect(() => {
    if (location.state?.category) {
      setActiveCategory(location.state.category);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen pb-24 overflow-x-hidden bg-[#fcf8f2] relative max-w-md mx-auto shadow-2xl">
      <div className="absolute top-0 left-0 w-full h-64 bg-honey/10 rounded-b-[40%] blur-xl z-0 pointer-events-none"></div>

      {/* HEADER */}
      <header className="flex justify-between items-center p-6 pt-10 sticky top-0 z-50 backdrop-blur-md bg-[#fcf8f2]/80">
        <Link to="/" className="w-10 h-10 bg-white/40 backdrop-blur-md border border-white/20 shadow-sm rounded-full flex items-center justify-center text-darkBrown font-bold hover:bg-honey/10 transition-colors">
          ←
        </Link>
        <div className="w-16 h-16 bg-white rounded-full border-2 border-honey shadow-honey/20 shadow-xl flex items-center justify-center font-black text-[10px] text-center leading-none">
          BEE<br/>HONEY<br/>CAFE
        </div>
        <button className="w-10 h-10 bg-white/40 backdrop-blur-md border border-white/20 shadow-sm rounded-full flex items-center justify-center text-xl relative hover:bg-honey/10 transition-colors">
          🔔<span className="absolute top-2 right-2 w-2 h-2 bg-honey rounded-full"></span>
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="px-6 relative mt-2 flex items-center justify-between z-10">
        <div className="w-1/2">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl italic font-serif text-honey mb-1">Our</motion.h2>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl font-black text-darkBrown tracking-tight leading-none mb-4">Menu</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-[10px] text-gray-600 leading-relaxed">
            Made with pure honey and lots of love.<br/>Something sweet for every mood.
          </motion.p>
        </div>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="w-40 h-40 relative right-[-20px]">
          <img src="https://images.unsplash.com/photo-1587049352851-8d4e8e133ceb?w=400&q=80" alt="Honeycomb" className="w-full h-full object-contain drop-shadow-2xl" />
        </motion.div>
      </section>

      {/* HORIZONTAL CATEGORY SCROLL - Added snap-x */}
      <section className="mt-6 sticky top-[104px] z-40 bg-[#fcf8f2]/95 backdrop-blur-md py-2 border-b border-gray-200/50">
        <div className="flex overflow-x-auto no-scrollbar px-6 gap-6 snap-x snap-mandatory">
          {menuCategories.map((cat, i) => (
            <MenuCategoryTab 
              key={i} name={cat.name} icon={cat.icon} 
              isActive={activeCategory === cat.name} 
              onClick={() => setActiveCategory(cat.name)}
            />
          ))}
        </div>
      </section>

      {/* MENU ITEMS LIST */}
      <section className="px-6 mt-8 z-10 relative">
        <div className="mb-6">
          <motion.h2 key={activeCategory} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-black text-darkBrown tracking-tight flex items-center gap-2">
            {activeCategory}
          </motion.h2>
          <p className="text-xs text-gray-500 mt-1">
            Browse our delicious selection of {activeCategory.toLowerCase()}.
          </p>
        </div>

        <div className="flex flex-col">
          {menuData[activeCategory] ? (
            menuData[activeCategory].map((item, index) => <MenuItemCard key={item.name} item={item} index={index} />)
          ) : (
            <p className="text-center text-gray-400 py-10 text-sm">More items coming soon!</p>
          )}
        </div>
      </section>

      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md h-16 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.08)] rounded-[30px] flex justify-around items-center px-4 z-50 border border-gray-100">
        {[
          { path: '/', icon: '🏠', label: 'Home' },
          { path: '/menu', icon: '📋', label: 'Menu' },
          { path: '/favorites', icon: '🐝', label: 'About' },
          { path: '/contact', icon: '📞', label: 'Contact' }
        ].map((item, i) => {
          const isActive = location.pathname === item.path;

          return (
            <Link 
              key={i} 
              to={item.path} 
              className={`flex flex-col items-center relative transition-colors ${
                isActive ? 'text-honey' : 'text-gray-400 hover:text-honey'
              }`}
            >
              {isActive ? (
                <>
                  <div className="absolute -top-3 w-10 h-10 bg-honey text-white rounded-xl flex items-center justify-center shadow-lg shadow-honey/40">
                     <span className="text-xl">{item.icon}</span>
                  </div>
                  <span className="text-[9px] font-bold mt-8">{item.label}</span>
                </>
              ) : (
                <>
                  <span className="text-xl mb-1">{item.icon}</span>
                  <span className="text-[9px] font-medium">{item.label}</span>
                </>
              )}
            </Link>
          );
        })}
      </nav>

    </div>
  );
}