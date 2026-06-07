import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { CategoryCard, SpecialsCard } from '../component/CafeComponents';
import giftImg from '../assets/gift.mp4';
import honey from'../assets/honeywaffels.jpg';
// Added all categories from the menu page to the home page
const categories = [
  { name: 'WAFFLES', desc: 'Crispy & fluffy.', icon: '🥞' },
  { name: 'PANCAKES', desc: 'Classic maple stacks.', icon: '🥞' },
  { name: 'FALOODA', desc: 'Royal & rich.', icon: '🍧' },
  { name: 'ICE CREAMS', desc: 'Cold & creamy.', icon: '🍨' },
  { name: 'JUICES', desc: 'Fresh & healthy.', icon: '🍹' },
  { name: 'DESSERTS', desc: 'Sweet treats.', icon: '🍰' },
];

const specials = [
{ name: 'HONEY WAFFLES', price: 180, desc: 'Crispy waffles...', img: honey },
  { name: 'ROYAL FALOODA', price: 160, desc: 'A royal blend of flavors.', img: 'https://images.unsplash.com/photo-1553177595-4de2bb0842b9?w=400' },
  { name: 'CHOCOLATE SHAKE', price: 140, desc: 'Rich, creamy chocolate.', img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400' },
];

const heroCarouselImages = [
  giftImg, 
  "https://images.unsplash.com/photo-1553177595-4de2bb0842b9?w=600",
  "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600",
  "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600"
];

export default function Home() {
  const location = useLocation();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prevIndex) => (prevIndex + 1) % heroCarouselImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen pb-24 overflow-x-hidden relative max-w-md mx-auto shadow-2xl bg-[#fcf8f2]">
      
      <motion.div 
        animate={{ y: [0, 20, 0] }} 
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 left-10 w-4 h-4 bg-honey/20 rounded-full blur-sm z-0"
      />

      <header className="flex justify-center items-center p-6 pt-10 sticky top-0 z-50 backdrop-blur-sm">
        <div className="w-16 h-16 bg-white rounded-full border-2 border-honey shadow-honey/20 shadow-xl flex items-center justify-center font-black text-[10px] text-center leading-none">
          BEE<br/>HONEY<br/>CAFE
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="px-6 relative flex items-center min-h-[340px]">
        <div className="z-20 w-3/5">
          <motion.h2 initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-2xl italic font-serif text-darkBrown">Made with</motion.h2>
          <motion.h1 initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-6xl font-black text-honey drop-shadow-md">HONEY</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-[10px] text-gray-600 my-4 pr-4">Purest nectar from blossoms, handcrafted for your soul.</motion.p>
          
          <Link to="/menu">
            <motion.button whileHover={{ scale: 1.05 }} className="honey-gradient text-white px-6 py-3 rounded-full text-xs font-bold shadow-lg">
              EXPLORE MENU
            </motion.button>
          </Link>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }}
          className="absolute -right-12 w-72 h-72 rounded-full overflow-hidden border-8 border-white shadow-2xl bg-cream flex items-center justify-center z-10"
        >
          <AnimatePresence mode="wait">
            {heroCarouselImages[currentImgIndex].includes('.mp4') ? (
              <motion.video 
                key={currentImgIndex}
                src={heroCarouselImages[currentImgIndex]} 
                autoPlay loop muted playsInline
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
                className="absolute w-full h-full object-cover"
              />
            ) : (
              <motion.img 
                key={currentImgIndex}
                src={heroCarouselImages[currentImgIndex]} 
                alt="Cafe Highlights" 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
                className="absolute w-full h-full object-cover object-center"
              />
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* CATEGORIES - Added snap-x and snap-mandatory for perfect carousel sliding */}
      <section className="mt-12 px-4 relative z-20">
        <div className="amber-glass rounded-[40px] p-4 flex gap-4 overflow-x-auto no-scrollbar shadow-lg snap-x snap-mandatory">
          {categories.map((cat, i) => (
            // The Link passes the category name in the 'state' so Menu.jsx knows which tab to open
            <Link key={i} to="/menu" state={{ category: cat.name }} className="snap-center shrink-0">
              <CategoryCard {...cat} index={i} />
            </Link>
          ))}
        </div>
      </section>

      {/* SPECIALS - Added snap-x for perfect sliding here too */}
      <section className="mt-10">
        <h2 className="text-center text-3xl font-serif text-honey italic mb-6">Our Specials</h2>
        <div className="flex gap-5 overflow-x-auto no-scrollbar px-6 pb-6 snap-x snap-mandatory">
          {specials.map((item, i) => (
            <SpecialsCard key={i} item={item} />
          ))}
        </div>
      </section>

      {/* PROMO */}
      <section className="px-6 mt-4">
        <motion.div 
          whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
          className="bg-darkBrown rounded-[40px] p-8 relative overflow-hidden shadow-2xl shadow-honey/20"
        >
          <div className="relative z-10">
            <span className="text-honey text-xs tracking-widest uppercase">Organic</span>
            <h2 className="text-white text-3xl font-black mt-1">PURE HONEY</h2>
            <p className="text-gray-400 text-[10px] mt-2 mb-6">Unfiltered, raw, and delicious.</p>
            <button className="bg-honey/20 backdrop-blur-md border border-honey/50 text-honey px-5 py-2 rounded-full text-[10px] font-bold">KNOW MORE</button>
          </div>
          <img src="https://images.unsplash.com/photo-1587049352847-81a56d773c1c?w=400" alt="Honey Jar" className="absolute right-[-20px] top-0 h-full w-1/2 object-cover object-left opacity-60 rounded-l-full" />
        </motion.div>
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
            <Link key={i} to={item.path} className={`flex flex-col items-center relative transition-colors ${isActive ? 'text-honey' : 'text-gray-400 hover:text-honey'}`}>
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