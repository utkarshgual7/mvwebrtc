
// "use client";
// import MeetingTypeList from '@/components/MeetingTypeList';

// const Home = () => {
//   const now = new Date();

//   const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
//   const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);

//   return (
//     <section className="flex size-full flex-col gap-5 text-white">
//       <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
//         <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
//           <h2 className=" max-w-[273px] rounded py-2 text-center text-base font-normal">
//            "It's time to shine! The clock is ticking, and the moment is yours!" 
//           </h2>
//           <div className="flex flex-col gap-2">
//             <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
//             <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
//           </div>
//         </div>
//       </div>

//       <MeetingTypeList />
//     </section>
//   );
// };

// export default Home;



// "use client";
// import { motion } from 'framer-motion';
// import MeetingTypeList from '@/components/MeetingTypeList';
// import { Quote } from 'lucide-react';

// const Home = () => {
//   const now = new Date();
//   const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
//   const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(now);

//   return (
//     <motion.section 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="flex size-full flex-col gap-5 text-gray-100"
//     >
//       <div 
//       className="h-[303px] w-full rounded-[20px] bg-gradient-to-r from-dark-1 via-dark-2 to-dark-1 relative overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-hero bg-cover mix-blend-soft-light" />
        
//         <motion.div 
//           className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11 relative"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           <motion.div 
//             // className="max-w-[273px] rounded-lg bg-dark-3/80 backdrop-blur-sm py-2 px-4 flex items-center gap-2"
//             whileHover={{ scale: 1.02 }}
//           >
//             <Quote className="w-5 h-5 text-blue-300" />
//             <p className="text-sm font-medium">
//               "It's time to shine! The moment is yours!"
//             </p>
//           </motion.div>

//           <div className="flex flex-col gap-2">
//             <motion.h1 
//               className="text-4xl font-extrabold lg:text-7xl bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4 }}
//             >
//               {time}
//             </motion.h1>
//             <motion.p 
//               className="text-lg font-medium text-blue-200 lg:text-2xl"
//               initial={{ x: -20 }}
//               animate={{ x: 0 }}
//               transition={{ type: 'spring', stiffness: 100 }}
//             >
//               {date}
//             </motion.p>
//           </div>
//         </motion.div>
//       </div>

//       <MeetingTypeList />
//     </motion.section>
//   );
// };

// export default Home;



"use client";
import { motion } from 'framer-motion';
import MeetingTypeList from '@/components/MeetingTypeList';
import { Quote } from 'lucide-react';

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(now);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex size-full flex-col gap-5 text-gray-100"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.005 }}
        transition={{ 
          duration: 0.8,
          type: 'spring',
          bounce: 0.4
        }}
        className="h-[303px] w-full rounded-[20px] relative overflow-hidden group"
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-dark-1 via-dark-3/80 to-dark-2 opacity-95"
          animate={{
            background: [
              'conic-gradient(at_top_left,#1a1a1a,#0f172a,#121212)',
              'conic-gradient(at_top_right,#121212,#1a1a1a,#0f172a)',
              'conic-gradient(at_bottom_right,#0f172a,#121212,#1a1a1a)',
              'conic-gradient(at_bottom_left,#1a1a1a,#0f172a,#121212)'
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
        
        {/* Parallax hero image effect */}
        <motion.div
          className="absolute inset-0 bg-hero bg-cover mix-blend-soft-light"
          whileHover={{
            scale: 1.05,
            translateX: [-2, 2, -2],
            translateY: [1, -1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-1/80 via-transparent to-dark-2/80" />

        {/* Animated shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <motion.div 
          className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11 relative"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
           
          //  className="max-w-[273px] rounded-lg bg-dark-3/80 backdrop-blur-sm py-2 px-4 flex items-center gap-2 hover:bg-dark-2/90 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Quote className="w-5 h-5 text-blue-300" />
            <p className="text-sm font-medium">
              "It's time to shine! The moment is yours!"
            </p>
          </motion.div>

          <div className="flex flex-col gap-2">
            <motion.h1 
              className="text-4xl font-extrabold lg:text-7xl bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {time}
            </motion.h1>
            <motion.p 
              className="text-lg font-medium text-blue-200 lg:text-2xl"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 100,
                damping: 10
              }}
            >
              {date}
            </motion.p>
          </div>
        </motion.div>

        {/* Border animation */}
        <motion.div
          className="absolute inset-0 rounded-[20px] pointer-events-none"
          style={{
            background: 'conic-gradient(from 180deg at 50% 50%, #1a1a1a, #2a75f3, #1a1a1a)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'mirror'
          }}
        />
      </motion.div>

      <MeetingTypeList />
    </motion.section>
  );
};

export default Home;



// "use client";
// import { motion } from 'framer-motion';
// import MeetingTypeList from '@/components/MeetingTypeList';
// import { Quote } from 'lucide-react';

// const Home = () => {
//   const now = new Date();
//   const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
//   const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(now);

//   return (
//     <motion.section 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="flex size-full flex-col gap-5 text-gray-100"
//     >
//       <motion.div 
//         className="h-[303px] w-full rounded-[20px] relative overflow-hidden bg-[#0F172A]"
//         initial={{ scale: 0.95 }}
//         animate={{ scale: 1 }}
//         transition={{ type: "spring", stiffness: 100, damping: 20 }}
//       >
//         <motion.div 
//           className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20"
//           animate={{
//             x: ["0%", "100%", "0%"],
//             scale: [1, 1.2, 1],
//             rotate: [0, 3, 0]
//           }}
//           transition={{
//             duration: 15,
//             ease: "linear",
//             repeat: Infinity,
//           }}
//         />
//         <motion.div 
//           className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-purple-600/10"
//           animate={{
//             opacity: [0.5, 0.8, 0.5],
//             scale: [1, 1.1, 1],
//           }}
//           transition={{
//             duration: 8,
//             ease: "easeInOut",
//             repeat: Infinity,
//           }}
//         />
        
//         <motion.div 
//           className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11 relative z-10"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           <motion.div 
//             className="flex items-center gap-2"
//             whileHover={{ scale: 1.02 }}
//           >
//             <Quote className="w-5 h-5 text-blue-300" />
//             <p className="text-sm font-medium text-blue-100">
//               "It's time to shine! The moment is yours!"
//             </p>
//           </motion.div>

//           <div className="flex flex-col gap-2">
//             <motion.h1 
//               className="text-4xl font-extrabold lg:text-7xl bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4 }}
//             >
//               {time}
//             </motion.h1>
//             <motion.p 
//               className="text-lg font-medium text-blue-200 lg:text-2xl"
//               initial={{ x: -20 }}
//               animate={{ x: 0 }}
//               transition={{ type: 'spring', stiffness: 100 }}
//             >
//               {date}
//             </motion.p>
//           </div>
//         </motion.div>
//       </motion.div>

//       <MeetingTypeList />
//     </motion.section>
//   );
// };

// export default Home;


// "use client";
// import { motion } from 'framer-motion';
// import MeetingTypeList from '@/components/MeetingTypeList';
// import { Quote } from 'lucide-react';

// const WaveComponent = () => {
//   return (
//     <>
//       {[1, 2, 3].map((index) => (
//         <motion.div
//           key={index}
//           className="absolute inset-0"
//           style={{
//             background: `linear-gradient(180deg, 
//               rgba(37, 99, 235, 0.${index * 2}) 0%,
//               rgba(59, 130, 246, 0.${index * 2}) 50%,
//               rgba(37, 99, 235, 0.${index * 2}) 100%
//             )`,
//             filter: `blur(${4 + index * 2}px)`,
//             borderRadius: '50%',
//             transform: 'scaleX(2) scaleY(0.2)',
//           }}
//           initial={{ y: "100%" }}
//           animate={{
//             y: [
//               `${110 + index * 5}%`,
//               `${90 + index * 5}%`,
//               `${110 + index * 5}%`
//             ],
//             scaleY: [0.2, 0.3, 0.2],
//             opacity: [0.4, 0.6, 0.4]
//           }}
//           transition={{
//             duration: 7 + index,
//             ease: "easeInOut",
//             repeat: Infinity,
//             delay: index * 0.5,
//           }}
//         />
//       ))}
//       <motion.div
//         className="absolute inset-0"
//         style={{
//           background: 'linear-gradient(180deg, rgba(37, 99, 235, 0.1) 0%, rgba(59, 130, 246, 0.2) 100%)',
//           backdropFilter: 'blur(8px)',
//         }}
//         animate={{
//           opacity: [0.3, 0.5, 0.3],
//         }}
//         transition={{
//           duration: 5,
//           ease: "easeInOut",
//           repeat: Infinity,
//         }}
//       />
//     </>
//   );
// };

// const Home = () => {
//   const now = new Date();
//   const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
//   const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(now);

//   return (
//     <motion.section 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="flex size-full flex-col gap-5 text-gray-100"
//     >
//       <motion.div 
//         className="h-[303px] w-full rounded-[20px] relative overflow-hidden bg-[#0F172A]"
//         initial={{ scale: 0.95 }}
//         animate={{ scale: 1 }}
//         transition={{ type: "spring", stiffness: 100, damping: 20 }}
//       >
//         {/* Ocean depth effect */}
//         <motion.div 
//           className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-blue-800/30 to-blue-600/40"
//           animate={{
//             opacity: [0.4, 0.6, 0.4],
//           }}
//           transition={{
//             duration: 6,
//             ease: "easeInOut",
//             repeat: Infinity,
//           }}
//         />
        
//         {/* Wave animations */}
//         <WaveComponent />
        
//         {/* Content */}
//         <motion.div 
//           className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11 relative z-10 backdrop-blur-[2px]"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           <motion.div 
//             className="flex items-center gap-2 bg-blue-900/10 px-4 py-2 rounded-lg backdrop-blur-md border border-blue-500/20"
//             whileHover={{ scale: 1.02 }}
//           >
//             <Quote className="w-5 h-5 text-blue-300" />
//             <p className="text-sm font-medium text-blue-100">
//               "It's time to shine! The moment is yours!"
//             </p>
//           </motion.div>

//           <div className="flex flex-col gap-2">
//             <motion.h1 
//               className="text-4xl font-extrabold lg:text-7xl bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 bg-clip-text text-transparent drop-shadow-lg"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4 }}
//             >
//               {time}
//             </motion.h1>
//             <motion.p 
//               className="text-lg font-medium text-blue-200/90 lg:text-2xl drop-shadow-md"
//               initial={{ x: -20 }}
//               animate={{ x: 0 }}
//               transition={{ type: 'spring', stiffness: 100 }}
//             >
//               {date}
//             </motion.p>
//           </div>
//         </motion.div>
//       </motion.div>

//       <MeetingTypeList />
//     </motion.section>
//   );
// };

// export default Home;