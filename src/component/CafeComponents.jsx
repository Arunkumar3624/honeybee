import { motion } from 'framer-motion';

// --- HOME PAGE COMPONENTS ---
export const CategoryCard = ({ icon, name, desc, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileTap={{ scale: 0.95 }}
    className="flex flex-col items-center w-[100px] shrink-0 text-center p-3 rounded-2xl hover:bg-honey/5 transition-colors"
  >
    <div className="w-14 h-14 rounded-full bg-honey/10 text-honey flex items-center justify-center text-3xl mb-2 shadow-inner">
      {icon}
    </div>
    <h3 className="text-[11px] font-bold text-darkBrown tracking-wide">{name}</h3>
    <p className="text-[9px] text-gray-500 leading-tight mt-1">{desc}</p>
  </motion.div>
);

export const SpecialsCard = ({ item }) => (
  <motion.div 
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    className="w-[170px] shrink-0 snap-center glass-card rounded-3xl p-3 relative flex flex-col group"
  >
    <div className="h-36 w-full rounded-2xl overflow-hidden mb-3 bg-gray-100">
      {/* Added object-center to perfectly frame the images */}
      <img src={item.img} alt={item.name} className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500" />
    </div>
    <div className="text-center">
      <h3 className="text-[12px] font-bold text-darkBrown line-clamp-1">{item.name}</h3>
      <p className="text-[9px] text-gray-500 leading-tight mb-2 px-1 line-clamp-2">{item.desc}</p>
      <p className="text-honey font-black text-lg mb-1">₹{item.price}</p>
    </div>
  </motion.div>
);


// --- MENU PAGE COMPONENTS ---
export const MenuCategoryTab = ({ name, icon, isActive, onClick }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex flex-col items-center min-w-[75px] shrink-0 snap-center pb-2 border-b-2 transition-colors ${
      isActive ? 'border-honey text-honey' : 'border-transparent text-gray-400'
    }`}
  >
    <div className={`text-2xl mb-1 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
      {icon}
    </div>
    <span className={`text-[9px] font-bold tracking-wider uppercase ${isActive ? 'text-honey' : 'text-gray-500'}`}>
      {name}
    </span>
  </motion.button>
);

export const MenuItemCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true, margin: "-50px" }}
    className="flex items-center p-3 mb-4 bg-white rounded-3xl shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-gray-50 relative"
  >
    {item.tag && (
      <div className={`absolute -left-2 top-4 text-[8px] font-bold text-white px-2 py-1 rounded-r-md shadow-md z-10 ${
        item.tag === 'BEST SELLER' ? 'bg-honey' : 'bg-darkBrown'
      }`}>
        {item.tag}
      </div>
    )}
    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-inner bg-gray-100">
      {/* Added object-center here too */}
      <img src={item.img} alt={item.name} className="w-full h-full object-cover object-center" />
    </div>
    
    <div className="flex-1 pl-4 pr-2">
      <h3 className="text-[13px] font-bold text-darkBrown leading-tight mb-1">{item.name}</h3>
      <p className="text-[9px] text-gray-500 leading-snug mb-2 line-clamp-2">{item.desc}</p>
    </div>
    
    <div className="flex flex-col items-end justify-center h-full shrink-0 pr-2">
      <span className="text-honey font-black text-lg">₹{item.price}</span>
    </div>
  </motion.div>
);