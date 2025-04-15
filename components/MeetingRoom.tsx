// 'use client';
// import { useState } from 'react';
// import {
//   CallControls,
//   CallParticipantsList,
//   CallStatsButton,
//   CallingState,
//   PaginatedGridLayout,
//   SpeakerLayout,
//   useCallStateHooks,
// } from '@stream-io/video-react-sdk';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { Users, LayoutList } from 'lucide-react';
// import { MoreVertical } from 'lucide-react';

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from './ui/dropdown-menu';
// import Loader from './Loader';
// import EndCallButton from './EndCallButton';
// import { cn } from '@/lib/utils';

// type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

// const MeetingRoom = () => {
//   const searchParams = useSearchParams();
//   const isPersonalRoom = !!searchParams.get('personal');
//   const router = useRouter();
//   const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
//   const [showParticipants, setShowParticipants] = useState(false);
//   const { useCallCallingState } = useCallStateHooks();

//   // for more detail about types of CallingState see: https://getstream.io/video/docs/react/ui-cookbook/ringing-call/#incoming-call-panel
//   const callingState = useCallCallingState();

//   if (callingState !== CallingState.JOINED) return <Loader />;

//   const CallLayout = () => {
//     switch (layout) {
//       case 'grid':
//         return <PaginatedGridLayout />;
//       case 'speaker-right':
//         return <SpeakerLayout participantsBarPosition="left" />;
//       default:
//         return <SpeakerLayout participantsBarPosition="right" />;
//     }
//   };

//   return (
//     <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
//       <div className="relative flex size-full flex-col md:flex-row items-center justify-center">
//         <div className="flex size-full max-w-[1000px] items-center">
//           <CallLayout />
//         </div>
//         <div
//           className={cn('h-[calc(100vh-86px)] w-full md:w-auto hidden ml-0 md:ml-2', {
//             'block': showParticipants,
//           })}
//         >
//           <CallParticipantsList onClose={() => setShowParticipants(false)} />
//         </div>
//       </div>

//       {/* video layout and call controls */}
//       <div className="fixed bottom-0 flex w-full items-center justify-center gap-2 md:gap-5 p-2 md:p-0 bg-dark-1/50 backdrop-blur-sm md:bg-transparent">
//         <div className="scale-75 md:scale-100">
//           <CallControls onLeave={() => router.push(`/`)} />
//         </div>

//         {/* Mobile: Show in more menu, Desktop: Show directly */}
//         <div className="md:hidden">
//           <DropdownMenu>
//             <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-2 py-1 hover:bg-[#4c535b]">
//               <MoreVertical size={16} className="text-white" />
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
//               <DropdownMenuItem className="flex items-center gap-2" onClick={() => setShowParticipants((prev) => !prev)}>
//                 <Users size={16} />
//                 <span>Participants</span>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator className="border-dark-1" />
//               <DropdownMenuItem>
//                 <div className="scale-75">
//                   <CallStatsButton />
//                 </div>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator className="border-dark-1" />
//               <DropdownMenuItem className="flex items-center gap-2">
//                 <LayoutList size={16} />
//                 <span>Layout</span>
//                 <DropdownMenu>
//                   {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item) => (
//                     <DropdownMenuItem
//                       key={item}
//                       className="text-sm"
//                       onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
//                     >
//                       {item}
//                     </DropdownMenuItem>
//                   ))}
//                 </DropdownMenu>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>

//         {/* Desktop: Show controls directly */}
//         <div className="hidden md:flex items-center gap-5">
//           <DropdownMenu>
//             <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
//               <LayoutList size={20} className="text-white" />
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
//               {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item) => (
//                 <DropdownMenuItem
//                   key={item}
//                   onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
//                 >
//                   {item}
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <CallStatsButton />
          
//           <button 
//             onClick={() => setShowParticipants((prev) => !prev)}
//             className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]"
//           >
//             <Users size={20} className="text-white" />
//           </button>
//         </div>

//         {!isPersonalRoom && (
//           <div className="scale-75 md:scale-100">
//             <EndCallButton />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default MeetingRoom;


// 'use client';
// import { useState, useEffect } from 'react';
// import {
//   CallControls,
//   CallParticipantsList,
//   CallStatsButton,
//   CallingState,
//   PaginatedGridLayout,
//   SpeakerLayout,
//   useCallStateHooks,
//   useCall,
//   StreamCall,
// } from '@stream-io/video-react-sdk';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { Users, LayoutList } from 'lucide-react';
// import { MoreVertical } from 'lucide-react';

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from './ui/dropdown-menu';
// import Loader from './Loader';
// import EndCallButton from './EndCallButton';
// import { cn } from '@/lib/utils';

// type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

// const MeetingRoom = () => {
//   const searchParams = useSearchParams();
//   const userName = searchParams.get('name') || 'Guest';
//   const isPersonalRoom = !!searchParams.get('personal');
//   const router = useRouter();
//   const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
//   const [showParticipants, setShowParticipants] = useState(false);
//   const { useCallCallingState } = useCallStateHooks();
//   const call = useCall();

//   const callingState = useCallCallingState();

//   // Update user name when joining the call
//   useEffect(() => {
//     if (call && callingState === CallingState.JOINED) {
//       call.updateUserData({
//         name: userName,
//         custom: {
//           name: userName,
//         },
//       });
//     }
//   }, [call, callingState, userName]);

//   if (callingState !== CallingState.JOINED) return <Loader />;

//   const CallLayout = () => {
//     switch (layout) {
//       case 'grid':
//         return <PaginatedGridLayout />;
//       case 'speaker-right':
//         return <SpeakerLayout participantsBarPosition="left" />;
//       default:
//         return <SpeakerLayout participantsBarPosition="right" />;
//     }
//   };

//   return (
//     <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
//       <div className="relative flex size-full flex-col md:flex-row items-center justify-center">
//         <div className="flex size-full max-w-[1000px] items-center">
//           <CallLayout />
//         </div>
//         <div
//           className={cn('h-[calc(100vh-86px)] w-full md:w-auto hidden ml-0 md:ml-2', {
//             'block': showParticipants,
//           })}
//         >
//           <CallParticipantsList onClose={() => setShowParticipants(false)} />
//         </div>
//       </div>

//       {/* video layout and call controls */}
//       <div className="fixed bottom-0 flex w-full items-center justify-center gap-2 md:gap-5 p-2 md:p-0 bg-dark-1/50 backdrop-blur-sm md:bg-transparent">
//         <div className="scale-75 md:scale-100">
//           <CallControls onLeave={() => router.push(`/`)} />
//         </div>

//         {/* Mobile: Show in more menu, Desktop: Show directly */}
//         <div className="md:hidden">
//           <DropdownMenu>
//             <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-2 py-1 hover:bg-[#4c535b]">
//               <MoreVertical size={16} className="text-white" />
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
//               <DropdownMenuItem className="flex items-center gap-2" onClick={() => setShowParticipants((prev) => !prev)}>
//                 <Users size={16} />
//                 <span>Participants ({userName})</span>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator className="border-dark-1" />
//               <DropdownMenuItem>
//                 <div className="scale-75">
//                   <CallStatsButton />
//                 </div>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator className="border-dark-1" />
//               <DropdownMenuItem className="flex items-center gap-2">
//                 <LayoutList size={16} />
//                 <span>Layout</span>
//                 <DropdownMenu>
//                   {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item) => (
//                     <DropdownMenuItem
//                       key={item}
//                       className="text-sm"
//                       onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
//                     >
//                       {item}
//                     </DropdownMenuItem>
//                   ))}
//                 </DropdownMenu>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>

//         {/* Desktop: Show controls directly */}
//         <div className="hidden md:flex items-center gap-5">
//           <DropdownMenu>
//             <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
//               <LayoutList size={20} className="text-white" />
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
//               {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item) => (
//                 <DropdownMenuItem
//                   key={item}
//                   onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
//                 >
//                   {item}
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <CallStatsButton />
          
//           <button 
//             onClick={() => setShowParticipants((prev) => !prev)}
//             className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]"
//           >
//             <Users size={20} className="text-white" />
//           </button>
//         </div>

//         {!isPersonalRoom && (
//           <div className="scale-75 md:scale-100">
//             <EndCallButton />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default MeetingRoom;



// 'use client';
// import { useState, useEffect } from 'react';
// import {
//   CallControls,
//   CallParticipantsList,
//   CallStatsButton,
//   CallingState,
//   PaginatedGridLayout,
//   SpeakerLayout,
//   useCallStateHooks,
//   useCall,
// } from '@stream-io/video-react-sdk';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { Users, LayoutList } from 'lucide-react';
// import { MoreVertical } from 'lucide-react';

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from './ui/dropdown-menu';
// import Loader from './Loader';
// import EndCallButton from './EndCallButton';
// import { cn } from '@/lib/utils';

// type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

// const MeetingRoom = () => {
//   const searchParams = useSearchParams();
//   const userName = searchParams.get('name') || 'Guest';
//   const isPersonalRoom = !!searchParams.get('personal');
//   const router = useRouter();
//   const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
//   const [showParticipants, setShowParticipants] = useState(false);
//   const { useCallCallingState } = useCallStateHooks();
//   const call = useCall();

//   const callingState = useCallCallingState();

//   // Updated user data effect with correct method
//   useEffect(() => {
//     if (call && callingState === CallingState.JOINED) {
//       call.localParticipant?.updateUser({
//         name: userName,
//         custom: {
//           name: userName,
//         },
//       });
//     }
//   }, [call, callingState, userName]);

//   if (callingState !== CallingState.JOINED) return <Loader />;

//   const CallLayout = () => {
//     switch (layout) {
//       case 'grid':
//         return <PaginatedGridLayout />;
//       case 'speaker-right':
//         return <SpeakerLayout participantsBarPosition="left" />;
//       default:
//         return <SpeakerLayout participantsBarPosition="right" />;
//     }
//   };

//   return (
//     <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
//       <div className="relative flex size-full flex-col md:flex-row items-center justify-center">
//         <div className="flex size-full max-w-[1000px] items-center">
//           <CallLayout />
//         </div>
//         <div
//           className={cn('h-[calc(100vh-86px)] w-full md:w-auto hidden ml-0 md:ml-2', {
//             'block': showParticipants,
//           })}
//         >
//           <CallParticipantsList onClose={() => setShowParticipants(false)} />
//         </div>
//       </div>

//       {/* Video controls section */}
//       <div className="fixed bottom-0 flex w-full items-center justify-center gap-2 md:gap-5 p-2 md:p-0 bg-dark-1/50 backdrop-blur-sm md:bg-transparent">
//         <div className="scale-75 md:scale-100">
//           <CallControls onLeave={() => router.push(`/`)} />
//         </div>

//         {/* Mobile controls menu */}
//         <div className="md:hidden">
//           <DropdownMenu>
//             <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-2 py-1 hover:bg-[#4c535b]">
//               <MoreVertical size={16} className="text-white" />
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
//               <DropdownMenuItem className="flex items-center gap-2" onClick={() => setShowParticipants((prev) => !prev)}>
//                 <Users size={16} />
//                 <span>Participants ({userName})</span>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator className="border-dark-1" />
//               <DropdownMenuItem>
//                 <div className="scale-75">
//                   <CallStatsButton />
//                 </div>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator className="border-dark-1" />
//               <DropdownMenuItem className="flex items-center gap-2">
//                 <LayoutList size={16} />
//                 <span>Layout</span>
//                 <DropdownMenu>
//                   {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item) => (
//                     <DropdownMenuItem
//                       key={item}
//                       className="text-sm"
//                       onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
//                     >
//                       {item}
//                     </DropdownMenuItem>
//                   ))}
//                 </DropdownMenu>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>

//         {/* Desktop controls */}
//         <div className="hidden md:flex items-center gap-5">
//           <DropdownMenu>
//             <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
//               <LayoutList size={20} className="text-white" />
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
//               {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item) => (
//                 <DropdownMenuItem
//                   key={item}
//                   onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
//                 >
//                   {item}
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <CallStatsButton />
          
//           <button 
//             onClick={() => setShowParticipants((prev) => !prev)}
//             className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]"
//           >
//             <Users size={20} className="text-white" />
//           </button>
//         </div>

//         {!isPersonalRoom && (
//           <div className="scale-75 md:scale-100">
//             <EndCallButton />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default MeetingRoom;



// 'use client';
// import { useState, useEffect } from 'react';
// import {
//   CallControls,
//   CallParticipantsList,
//   CallStatsButton,
//   CallingState,
//   PaginatedGridLayout,
//   SpeakerLayout,
//   useCallStateHooks,
//   useCall,
// } from '@stream-io/video-react-sdk';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { Users, LayoutList } from 'lucide-react';
// import { MoreVertical } from 'lucide-react';

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from './ui/dropdown-menu';
// import Loader from './Loader';
// import EndCallButton from './EndCallButton';
// import { cn } from '@/lib/utils';

// type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

// const MeetingRoom = () => {
//   const searchParams = useSearchParams();
//   const userName = searchParams.get('name') || 'Guest';
//   const isPersonalRoom = !!searchParams.get('personal');
//   const router = useRouter();
//   const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
//   const [showParticipants, setShowParticipants] = useState(false);
//   const { useCallCallingState } = useCallStateHooks();
//   const call = useCall();

//   const callingState = useCallCallingState();

//   // Update user data when joining the call
//   // useEffect(() => {
//   //   if (call && callingState === CallingState.JOINED) {
//   //     call.setUserData({
//   //       name: userName,
//   //       custom: {
//   //         name: userName,
//   //       },
//   //     });
//   //   }
//   // }, [call, callingState, userName]);

//   // useEffect(() => {
//   //   if (call && callingState === CallingState.JOINED) {
//   //     call.updateCallMembers({
//   //       [String(call.state.session)]: {
//   //         name: userName,
//   //         custom: {
//   //           name: userName,
//   //         },
//   //       },
//   //     });
//   //   }
//   // }, [call, callingState, userName]);

//   useEffect(() => {
//     if (call && callingState === CallingState.JOINED) {
//       // Update participant data using the correct method
//       call.updateCallMembers({
//         [call.id]: {
//           name: userName,
//           role: 'participant',
//           custom: {
//             name: userName,
//           }
//         }
//       });
//     }
//   }, [call, callingState, userName]);

//   if (callingState !== CallingState.JOINED) return <Loader />;

//   const CallLayout = () => {
//     switch (layout) {
//       case 'grid':
//         return <PaginatedGridLayout />;
//       case 'speaker-right':
//         return <SpeakerLayout participantsBarPosition="left" />;
//       default:
//         return <SpeakerLayout participantsBarPosition="right" />;
//     }
//   };

//   return (
//     <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
//       <div className="relative flex size-full flex-col md:flex-row items-center justify-center">
//         <div className="flex size-full max-w-[1000px] items-center">
//           <CallLayout />
//         </div>
//         <div
//           className={cn('h-[calc(100vh-86px)] w-full md:w-auto hidden ml-0 md:ml-2', {
//             'block': showParticipants,
//           })}
//         >
//           <CallParticipantsList onClose={() => setShowParticipants(false)} />
//         </div>
//       </div>

//       {/* Video controls section */}
//       <div className="fixed bottom-0 flex w-full items-center justify-center gap-2 md:gap-5 p-2 md:p-0 bg-dark-1/50 backdrop-blur-sm md:bg-transparent">
//         <div className="scale-75 md:scale-100">
//           <CallControls onLeave={() => router.push(`/`)} />
//         </div>

//         {/* Mobile controls menu */}
//         <div className="md:hidden">
//           <DropdownMenu>
//             <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-2 py-1 hover:bg-[#4c535b]">
//               <MoreVertical size={16} className="text-white" />
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
//               <DropdownMenuItem className="flex items-center gap-2" onClick={() => setShowParticipants((prev) => !prev)}>
//                 <Users size={16} />
//                 <span>Participants ({userName})</span>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator className="border-dark-1" />
//               <DropdownMenuItem>
//                 <div className="scale-75">
//                   <CallStatsButton />
//                 </div>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator className="border-dark-1" />
//               <DropdownMenuItem className="flex items-center gap-2">
//                 <LayoutList size={16} />
//                 <span>Layout</span>
//                 <DropdownMenu>
//                   {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item) => (
//                     <DropdownMenuItem
//                       key={item}
//                       className="text-sm"
//                       onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
//                     >
//                       {item}
//                     </DropdownMenuItem>
//                   ))}
//                 </DropdownMenu>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>

//         {/* Desktop controls */}
//         <div className="hidden md:flex items-center gap-5">
//           <DropdownMenu>
//             <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
//               <LayoutList size={20} className="text-white" />
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
//               {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item) => (
//                 <DropdownMenuItem
//                   key={item}
//                   onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
//                 >
//                   {item}
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <CallStatsButton />
          
//           <button 
//             onClick={() => setShowParticipants((prev) => !prev)}
//             className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]"
//           >
//             <Users size={20} className="text-white" />
//           </button>
//         </div>

//         {!isPersonalRoom && (
//           <div className="scale-75 md:scale-100">
//             <EndCallButton />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default MeetingRoom;


'use client';
import { useState, useEffect } from 'react';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
  useCall,
} from '@stream-io/video-react-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, LayoutList } from 'lucide-react';
import { MoreVertical } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Loader from './Loader';
import EndCallButton from './EndCallButton';
import { cn } from '@/lib/utils';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const userName = searchParams.get('name') || 'Guest';
  const isPersonalRoom = !!searchParams.get('personal');
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const call = useCall();

  const callingState = useCallCallingState();

  // useEffect(() => {
  //   if (call && callingState === CallingState.JOINED) {
  //     call.updateCallMembers({
  //       [call.id]: {
  //         user_id: `user-${Date.now()}`,
  //         role: 'participant',
  //         name: userName,
  //         custom: {
  //           name: userName,
  //         }
  //       }
  //     });
  //   }
  // }, [call, callingState, userName]);

  useEffect(() => {
    if (call && callingState === CallingState.JOINED) {
      call.updateCallMembers({
        update_members: [{
          user_id: `user-${Date.now()}`,
          role: 'participant',
          custom: {
            name: userName,
          }
        }]
      });
    }
  }, [call, callingState, userName]);

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full flex-col md:flex-row items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn('h-[calc(100vh-86px)] w-full md:w-auto hidden ml-0 md:ml-2', {
            'block': showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      {/* Video controls section */}
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-2 md:gap-5 p-2 md:p-0 bg-dark-1/50 backdrop-blur-sm md:bg-transparent">
        <div className="scale-75 md:scale-100">
          <CallControls onLeave={() => router.push(`/`)} />
        </div>

        {/* Mobile controls menu */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-2 py-1 hover:bg-[#4c535b]">
              <MoreVertical size={16} className="text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => setShowParticipants((prev) => !prev)}>
                <Users size={16} />
                <span>Participants ({userName})</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="border-dark-1" />
              <DropdownMenuItem>
                <div className="scale-75">
                  <CallStatsButton />
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="border-dark-1" />
              <DropdownMenuItem className="flex items-center gap-2">
                <LayoutList size={16} />
                <span>Layout</span>
                <DropdownMenu>
                  {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item) => (
                    <DropdownMenuItem
                      key={item}
                      className="text-sm"
                      onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
                    >
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenu>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop controls */}
        <div className="hidden md:flex items-center gap-5">
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
              {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <CallStatsButton />
          
          <button 
            onClick={() => setShowParticipants((prev) => !prev)}
            className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]"
          >
            <Users size={20} className="text-white" />
          </button>
        </div>

        {!isPersonalRoom && (
          <div className="scale-75 md:scale-100">
            <EndCallButton />
          </div>
        )}
      </div>
    </section>
  );
};

export default MeetingRoom;