// 'use client';

// import Image from 'next/image';

// import { cn } from '@/lib/utils';

// // interface HomeCardProps {
// //   className?: string;
// //   img: string;
// //   title: string;
// //   description: string;
// //   handleClick?: () => void;
// // }

// interface HomeCardProps {
//   icon: React.ReactElement;
//   title: string;
//   description: string;
//   className?: string;
//   handleClick: () => void;
//   img : string;
// }

// const HomeCard = ({ className, img, title, description, handleClick }: HomeCardProps) => {
//   return (
//     <section
//       className={cn(
//         'bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer',
//         className
//       )}
//       onClick={handleClick}
//     >
//       <div className="flex-center glassmorphism size-12 rounded-[10px]">
//         <Image src={img} alt="meeting" width={27} height={27} />
//       </div>
      
//       <div className="flex flex-col gap-2">
//         <h1 className="text-2xl font-bold">{title}</h1>
//         <p className="text-lg font-normal">{description}</p>
//       </div>
//     </section>
//   );
// };

// export default HomeCard;



'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

// interface HomeCardProps {
//   icon: LucideIcon;
//   title: string;
//   description: string;
//   className?: string;
//   handleClick: () => void;
// }

interface HomeCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  className?: string;
  handleClick: () => void;
  img : string;
}

const HomeCard = ({ className, icon: Icon, title, description, handleClick }: HomeCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={cn(
        'group px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-2xl cursor-pointer',
        'bg-gradient-to-br from-dark-2 to-dark-3 border border-dark-4 hover:border-blue-500/30',
        'transition-all duration-300 ease-out hover:shadow-2xl',
        className
      )}
      onClick={handleClick}
    >
      <div className="flex-center size-12 rounded-xl bg-gradient-to-tr from-blue-600/20 to-blue-800/20 backdrop-blur-sm">
        {Icon}
      </div>
      
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-lg font-normal text-gray-300">{description}</p>
      </div>

      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
};

export default HomeCard;