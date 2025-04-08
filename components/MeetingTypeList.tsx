// /* eslint-disable camelcase */
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// import HomeCard from './HomeCard';
// import MeetingModal from './MeetingModal';
// import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
// import { useUser } from '@clerk/nextjs';
// import Loader from './Loader';
// import { Textarea } from './ui/textarea';
// import ReactDatePicker from 'react-datepicker';
// import { useToast } from './ui/use-toast';
// import { Input } from './ui/input';

// const initialValues = {
//   dateTime: new Date(),
//   description: '',
//   link: '',
// };

// const MeetingTypeList = () => {
//   const router = useRouter();
//   const [meetingState, setMeetingState] = useState<
//     'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
//   >(undefined);
//   const [values, setValues] = useState(initialValues);
//   const [callDetail, setCallDetail] = useState<Call>();
//   const client = useStreamVideoClient();
//   const { user } = useUser();
//   const { toast } = useToast();

//   const createMeeting = async () => {
//     if (!client || !user) return;
//     try {
//       if (!values.dateTime) {
//         toast({ title: 'Please select a date and time' });
//         return;
//       }
//       const id = crypto.randomUUID();
//       const call = client.call('default', id);
//       if (!call) throw new Error('Failed to create meeting');
//       const startsAt =
//         values.dateTime.toISOString() || new Date(Date.now()).toISOString();
//       const description = values.description || 'Instant Meeting';
//       await call.getOrCreate({
//         data: {
//           starts_at: startsAt,
//           custom: {
//             description,
//           },
//         },
//       });
//       setCallDetail(call);
//       if (!values.description) {
//         router.push(`/meeting/${call.id}`);
//       }
//       toast({
//         title: 'Meeting Created',
//       });
//     } catch (error) {
//       console.error(error);
//       toast({ title: 'Failed to create Meeting' });
//     }
//   };

//   if (!client || !user) return <Loader />;

//   const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

//   return (
//     <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
//       <HomeCard
//         img="/icons/add-meeting.svg"
//         title="New Meeting"
//         description="Start an instant meeting"
//         handleClick={() => setMeetingState('isInstantMeeting')}
//       />
//       <HomeCard
//         img="/icons/join-meeting.svg"
//         title="Join Meeting"
//         description="via invitation link"
//         className="bg-blue-1"
//         handleClick={() => setMeetingState('isJoiningMeeting')}
//       />
//       <HomeCard
//         img="/icons/schedule.svg"
//         title="Schedule Meeting"
//         description="Plan your meeting"
//         className="bg-purple-1"
//         handleClick={() => setMeetingState('isScheduleMeeting')}
//       />
//       <HomeCard
//         img="/icons/recordings.svg"
//         title="View Recordings"
//         description="Meeting Recordings"
//         className="bg-yellow-1"
//         handleClick={() => router.push('/recordings')}
//       />

//       {!callDetail ? (
//         <MeetingModal
//           isOpen={meetingState === 'isScheduleMeeting'}
//           onClose={() => setMeetingState(undefined)}
//           title="Create Meeting"
//           handleClick={createMeeting}
//         >
//           <div className="flex flex-col gap-2.5">
//             <label className="text-base font-normal leading-[22.4px] text-sky-2">
//               Add a description
//             </label>
//             <Textarea
//               className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
//               onChange={(e) =>
//                 setValues({ ...values, description: e.target.value })
//               }
//             />
//           </div>
//           <div className="flex w-full flex-col gap-2.5">
//             <label className="text-base font-normal leading-[22.4px] text-sky-2">
//               Select Date and Time
//             </label>
//             <ReactDatePicker
//               selected={values.dateTime}
//               onChange={(date) => setValues({ ...values, dateTime: date! })}
//               showTimeSelect
//               timeFormat="HH:mm"
//               timeIntervals={15}
//               timeCaption="time"
//               dateFormat="MMMM d, yyyy h:mm aa"
//               className="w-full rounded bg-dark-3 p-2 focus:outline-none"
//             />
//           </div>
//         </MeetingModal>
//       ) : (
//         <MeetingModal
//           isOpen={meetingState === 'isScheduleMeeting'}
//           onClose={() => setMeetingState(undefined)}
//           title="Meeting Created"
//           handleClick={() => {
//             navigator.clipboard.writeText(meetingLink);
//             toast({ title: 'Link Copied' });
//           }}
//           image={'/icons/checked.svg'}
//           buttonIcon="/icons/copy.svg"
//           className="text-center"
//           buttonText="Copy Meeting Link"
//         />
//       )}

//       <MeetingModal
//         isOpen={meetingState === 'isJoiningMeeting'}
//         onClose={() => setMeetingState(undefined)}
//         title="Type the link here"
//         className="text-center"
//         buttonText="Join Meeting"
//         handleClick={() => router.push(values.link)}
//       >
//         <Input
//           placeholder="Meeting link"
//           onChange={(e) => setValues({ ...values, link: e.target.value })}
//           className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
//         />
//       </MeetingModal>

//       <MeetingModal
//         isOpen={meetingState === 'isInstantMeeting'}
//         onClose={() => setMeetingState(undefined)}
//         title="Start an Instant Meeting"
//         className="text-center"
//         buttonText="Start Meeting"
//         handleClick={createMeeting}
//       />
//     </section>
//   );
  
// };

// export default MeetingTypeList;




/* eslint-disable camelcase */
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// import HomeCard from './HomeCard';
// import MeetingModal from './MeetingModal';
// import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
// import { useUser } from '@clerk/nextjs';
// import Loader from './Loader';
// import { Textarea } from './ui/textarea';
// import ReactDatePicker from 'react-datepicker';
// import { useToast } from './ui/use-toast';
// import { Input } from './ui/input';

// const initialValues = {
//   dateTime: new Date(),
//   description: '',
//   link: '',
// };

// const MeetingTypeList = () => {
//   const router = useRouter();
//   const [meetingState, setMeetingState] = useState<
//     'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
//   >(undefined);
//   const [values, setValues] = useState(initialValues);
//   const [callDetail, setCallDetail] = useState<Call>();
//   const client = useStreamVideoClient();
//   const { user } = useUser();
//   const { toast } = useToast();

//   const createMeeting = async () => {
//     if (!client || !user) return;
//     try {
//       if (!values.dateTime) {
//         toast({ title: 'Please select a date and time' });
//         return;
//       }
//       const id = crypto.randomUUID();
//       const call = client.call('default', id);
//       if (!call) throw new Error('Failed to create meeting');
//       const startsAt =
//         values.dateTime.toISOString() || new Date(Date.now()).toISOString();
//       const description = values.description || 'Instant Meeting';
//       await call.getOrCreate({
//         data: {
//           starts_at: startsAt,
//           custom: {
//             description,
//           },
//         },
//       });
//       setCallDetail(call);
//       if (!values.description) {
//         router.push(`/meeting/${call.id}`);
//       }
//       toast({
//         title: 'Meeting Created',
//       });
//     } catch (error) {
//       console.error(error);
//       toast({ title: 'Failed to create Meeting' });
//     }
//   };

//   if (!client || !user) return <Loader />;

//   const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

//   return (
//     <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
//       <HomeCard
//         img="/icons/add-meeting.svg"
//         title="New Meeting"
//         description="Start an instant meeting"
//         className="bg-dark-2 hover:bg-dark-3" // Added dark background
//         handleClick={() => setMeetingState('isInstantMeeting')}
//       />
//       <HomeCard
//         img="/icons/join-meeting.svg"
//         title="Join Meeting"
//         description="via invitation link"
//         className="bg-blue-1 hover:bg-blue-600" // Blue accent
//         handleClick={() => setMeetingState('isJoiningMeeting')}
//       />
//       <HomeCard
//         img="/icons/schedule.svg"
//         title="Schedule Meeting"
//         description="Plan your meeting"
//         className="bg-dark-2 hover:bg-dark-3" // Dark background
//         handleClick={() => setMeetingState('isScheduleMeeting')}
//       />
//       <HomeCard
//         img="/icons/recordings.svg"
//         title="View Recordings"
//         description="Meeting Recordings"
//         className="bg-red-600 hover:bg-red-700" // Red accent
//         handleClick={() => router.push('/recordings')}
//       />

//       {/* Modal Updates */}
//       <MeetingModal
//         isOpen={meetingState === 'isScheduleMeeting'}
//         onClose={() => setMeetingState(undefined)} // Provide onClose handler
//         title="Schedule a Meeting" // Provide a title
//         className="bg-dark-1 border-dark-4" // Dark background
//         buttonClassName="bg-blue-600 hover:bg-blue-700" // Blue button
//       >
//         <label className="text-gray-200"> {/* Light gray text */}
//           <Textarea className="border-dark-4 bg-dark-3 text-gray-100" /> {/* Dark inputs */}
//         </label>
//       </MeetingModal>

//       <MeetingModal
//         isOpen={meetingState === 'isInstantMeeting'}
//         onClose={() => setMeetingState(undefined)} // Provide onClose handler
//         title="Start an Instant Meeting" // Provide a title
//         buttonClassName="bg-red-600 hover:bg-red-700" // Red button for critical action
//       />
//     </section>
//   );
  
// };

// export default MeetingTypeList;



// components/MeetingTypeList.tsx
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence, stagger } from 'framer-motion';
// import { useStreamVideoClient } from '@stream-io/video-react-sdk';
// import { useUser } from '@clerk/nextjs';
// import { 
//   Video, 
//   LogIn, 
//   Calendar, 
//   Play, 
//   Copy, 
//   CheckCircle2,
//   AlertCircle
// } from 'lucide-react';
// import { cn } from '@/lib/utils';

// // Import your existing components
// import HomeCard from './HomeCard';
// import MeetingModal from './MeetingModal';
// import Loader from './Loader';
// import { Textarea } from './ui/textarea';
// import ReactDatePicker from 'react-datepicker';
// import { useToast } from './ui/use-toast';
// import { Input } from './ui/input';

// const initialValues = { /* ... keep existing initial values ... */ };

// const MeetingTypeList = () => {
//   // ... keep existing state and logic ...

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     show: { y: 0, opacity: 1 }
//   };

//   const setMeetingState = (state: 'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined) => {
//     setMeetingState(state);
//   };

//   return (
//     <motion.section
//       variants={containerVariants}
//       initial="hidden"
//       animate="show"
//       className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4"
//     >
//       <motion.div variants={itemVariants}>
//         <HomeCard
//           img="/icons/add-meeting.svg"
//           icon={<Video className="w-6 h-6 text-blue-300" />}
//           title="New Meeting"
//           description="Start an instant meeting"
//           className="bg-dark-2 hover:bg-gradient-to-br from-dark-3 to-dark-2"
//           handleClick={() => setMeetingState('isInstantMeeting')}
//         />
//       </motion.div>

//         <HomeCard
//           img="/icons/join-meeting.svg"
//           icon={<LogIn className="w-6 h-6 text-blue-300" />}
//           title="Join Meeting"
//           description="via invitation link"
//           className="bg-gradient-to-br from-blue-600/80 to-blue-800/80 hover:from-blue-600 hover:to-blue-700"
//           handleClick={() => setMeetingState('isJoiningMeeting')}
//         />
//         />
//       </motion.div>
//         <HomeCard
//           img="/icons/schedule.svg"
//           icon={<Calendar className="w-6 h-6 text-blue-300" />}
//           title="Schedule Meeting"
//           description="Plan your meeting"
//           className="bg-dark-2 hover:bg-gradient-to-br from-dark-3 to-dark-2"
//           handleClick={() => setMeetingState('isScheduleMeeting')}
//         />
//           handleClick={() => setMeetingState('isScheduleMeeting')}
//         />
//         <HomeCard
//           img="/icons/recordings.svg"
//           icon={<Play className="w-6 h-6 text-red-300" />}
//           title="View Recordings"
//           description="Meeting Recordings"
//           className="bg-gradient-to-br from-red-600/80 to-red-800/80 hover:from-red-600 hover:to-red-700"
//           handleClick={() => router.push('/recordings')}
//         />
//           className="bg-gradient-to-br from-red-600/80 to-red-800/80 hover:from-red-600 hover:to-red-700"
//           handleClick={() => router.push('/recordings')}
//         />
//       </motion.div>

//       <AnimatePresence>
//         {meetingState === 'isScheduleMeeting' && (
//           <MeetingModal
//             icon={<Calendar className="w-8 h-8 text-blue-300" />}
//             // ... rest of modal props ...
//           >
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="space-y-4"
//             >
//               <div className="flex flex-col gap-2">
//                 <label className="text-sm font-medium text-gray-300">
//                   Add description
//                 </label>
//                 <Textarea
//                   className="bg-dark-3 border-dark-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
//                   // ... rest of textarea props ...
//                 />
//               </div>
//               <div className="flex flex-col gap-2">
//                 <label className="text-sm font-medium text-gray-300">
//                   Select Date & Time
//                 </label>
//                 <ReactDatePicker
//                   className="w-full bg-dark-3 border-dark-4 rounded-lg px-3 py-2 text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
//                   // ... rest of datepicker props ...
//                 />
//               </div>
//             </motion.div>
//           </MeetingModal>
//         )}

//         {/* Add similar motion enhancements for other modals */}

//       </AnimatePresence>
  
//     </motion.section>
//   );
// };

// export default MeetingTypeList;



'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import {
  Video,
  LogIn,
  Calendar,
  Play,
} from 'lucide-react';

import HomeCard from './HomeCard';
import MeetingModal from './MeetingModal';
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4"
    >
      <motion.div variants={itemVariants}>
        <HomeCard
          img="/icons/add-meeting.svg"
          icon={<Video className="w-6 h-6 text-blue-300" />}
          title="New Meeting"
          description="Start an instant meeting"
          className="bg-dark-2 hover:bg-gradient-to-br from-dark-3 to-dark-2"
          handleClick={() => setMeetingState('isInstantMeeting')}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <HomeCard
          img="/icons/join-meeting.svg"
          icon={<LogIn className="w-6 h-6 text-blue-300" />}
          title="Join Meeting"
          description="via invitation link"
          className="bg-gradient-to-br from-blue-600/80 to-blue-800/80 hover:from-blue-600 hover:to-blue-700"
          handleClick={() => setMeetingState('isJoiningMeeting')}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <HomeCard
          img="/icons/schedule.svg"
          icon={<Calendar className="w-6 h-6 text-blue-300" />}
          title="Schedule Meeting"
          description="Plan your meeting"
          className="bg-dark-2 hover:bg-gradient-to-br from-dark-3 to-dark-2"
          handleClick={() => setMeetingState('isScheduleMeeting')}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <HomeCard
          img="/icons/recordings.svg"
          icon={<Play className="w-6 h-6 text-red-300" />}
          title="View Recordings"
          description="Meeting Recordings"
          className="bg-gradient-to-br from-red-600/80 to-red-800/80 hover:from-red-600 hover:to-red-700"
          handleClick={() => router.push('/recordings')}
        />
      </motion.div>

      <AnimatePresence>
        {meetingState === 'isScheduleMeeting' && (
          <MeetingModal
            icon={<Calendar className="w-8 h-8 text-blue-300" />}
            onClose={() => setMeetingState(undefined)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-300">
                  Add description
                </label>
                <Textarea
                  className="bg-dark-3 border-dark-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="Enter meeting agenda"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-300">
                  Select Date & Time
                </label>
                <ReactDatePicker
                  className="w-full bg-dark-3 border-dark-4 rounded-lg px-3 py-2 text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  showTimeSelect
                  dateFormat="Pp"
                  placeholderText="Pick a date & time"
                />
              </div>
            </motion.div>
          </MeetingModal>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default MeetingTypeList;
