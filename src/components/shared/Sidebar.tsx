import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  toggleSidebar: () => void;
  children: ReactNode;
}

const Sidebar = ({ isOpen, toggleSidebar, children }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-[2px] z-40"
            onClick={toggleSidebar}
          />

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: isOpen ? 0 : "-100%" }}
            // exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full min-w-[400px] bg-gray-800 bg-white-50 shadow-lg z-50"
          >
            <div className="p-[10rem] h-full">
              <button
                onClick={toggleSidebar}
                className="mb-4 p-2 bg-red-500 rounded"
              >
                Close
              </button>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
