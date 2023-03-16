import { motion } from 'framer-motion';

import styles from '../styles/index';
import { navVariants } from '../utils/motion';

const Navbar = () => (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    <div
      className={`${styles.innerWidth} mx-auto flex justify-between gap-8 px-12`}
    >
      <div className="absolute w-[50%] inset-0 gradient-01" />
      <div className="logo">
        <img
          src="/Logo.svg"
          alt="Logo"
          className="w-[36px] h-[36px] object-contain"
        />
      </div>
      <h2 className="logo font-extrabold text-[30px] leading-[30.24px] text-white">
        Frush
      </h2>
      <img
        src="/menu.svg"
        alt="menu"
        className="w-[24px] h-[24px] object-contain"
      />
    </div>
  </motion.nav>
);

export default Navbar;