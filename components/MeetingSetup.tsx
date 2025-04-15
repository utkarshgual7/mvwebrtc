// 'use client';
// import { useEffect, useState } from 'react';
// import {
//   DeviceSettings,
//   VideoPreview,
//   useCall,
//   useCallStateHooks,
// } from '@stream-io/video-react-sdk';

// import Alert from './Alert';
// import { Button } from './ui/button';

// // const MeetingSetup = ({
// //   setIsSetupComplete,
// // }: {
// //   setIsSetupComplete: (value: boolean) => void;
// // }) => {
// //   // https://getstream.io/video/docs/react/guides/call-and-participant-state/#call-state
// //   const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
// //   const callStartsAt = useCallStartsAt();
// //   const callEndedAt = useCallEndedAt();
// //   const callTimeNotArrived =
// //     callStartsAt && new Date(callStartsAt) > new Date();
// //   const callHasEnded = !!callEndedAt;

// //   const call = useCall();

// const MeetingSetup = ({
//   setIsSetupComplete,
// }: {
//   setIsSetupComplete: (value: boolean) => void;
// }) => {
//   const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
//   const callStartsAt = useCallStartsAt();
//   const callEndedAt = useCallEndedAt();
//   const callTimeNotArrived = callStartsAt && new Date(callStartsAt) > new Date();
//   const callHasEnded = !!callEndedAt;
//   // const [userName, setUserName] = useState('');
//   const [isMicCamToggled, setIsMicCamToggled] = useState(false);
//   const call = useCall();

//   if (!call) {
//     throw new Error(
//       'useStreamCall must be used within a StreamCall component.',
//     );
//   }

//   // https://getstream.io/video/docs/react/ui-cookbook/replacing-call-controls/
//   useEffect(() => {
//     if (isMicCamToggled) {
//       call.camera.disable();
//       call.microphone.disable();
//     } else {
//       call.camera.enable();
//       call.microphone.enable();
//     }
//   }, [isMicCamToggled, call.camera, call.microphone]);

//   if (callTimeNotArrived)
//     return (
//       <Alert
//         title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
//       />
//     );

//   if (callHasEnded)
//     return (
//       <Alert
//         title="The call has been ended by the host"
//         iconUrl="/icons/call-ended.svg"
//       />
//     );

//   return (
//     <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
//       <h1 className="text-center text-2xl font-bold">Setup</h1>
//       <VideoPreview />
//       <div className="flex h-16 items-center justify-center gap-3">
//         <label className="flex items-center justify-center gap-2 font-medium">
//           <input
//             type="checkbox"
//             checked={isMicCamToggled}
//             onChange={(e) => setIsMicCamToggled(e.target.checked)}
//           />
//           Join with mic and camera off
//         </label>
//         <DeviceSettings />
//       </div>
//       <Button
//         className="rounded-md bg-green-500 px-4 py-2.5"
//         onClick={() => {
//           call.join();

//           setIsSetupComplete(true);
//         }}
//       >
//         Join meeting
//       </Button>
//     </div>
//   );

//   // return (
//   //   <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
//   //     <h1 className="text-center text-2xl font-bold">Setup</h1>
//   //     <VideoPreview />
//   //     <div className="flex w-full max-w-sm flex-col gap-4">
//   //       <input
//   //         type="text"
//   //         placeholder="Enter your name"
//   //         value={userName}
//   //         onChange={(e) => setUserName(e.target.value)}
//   //         className="w-full rounded-md bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
//   //         required
//   //       />
//   //       <div className="flex h-16 items-center justify-center gap-3">
//   //         <label className="flex items-center justify-center gap-2 font-medium">
//   //           <input
//   //             type="checkbox"
//   //             checked={isMicCamToggled}
//   //             onChange={(e) => setIsMicCamToggled(e.target.checked)}
//   //           />
//   //           Join with mic and camera off
//   //         </label>
//   //         <DeviceSettings />
//   //         </div>
//   //       <Button
//   //         className="rounded-md bg-green-500 px-4 py-2.5"
//   //         onClick={() => {
//   //           if (!userName.trim()) {
//   //             alert('Please enter your name');
//   //             return;
//   //           }
//   //             call.join({
//   //               data: {
//   //                 custom: {
//   //                   name: userName,
//   //                   user_id: `user-${Date.now()}` // Generate a unique user ID
//   //                 }
//   //               }
//   //             });
//   //             setIsSetupComplete(true);
//   //           }}
//   //       >
//   //         Join meeting
//   //       </Button>
//   //     </div>
//   //   </div>
//   // );

// };

// export default MeetingSetup;


// 'use client';
// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import {
//   DeviceSettings,
//   VideoPreview,
//   useCall,
//   useCallStateHooks,
// } from '@stream-io/video-react-sdk';

// import Alert from './Alert';
// import { Button } from './ui/button';

// const MeetingSetup = ({
//   setIsSetupComplete,
// }: {
//   setIsSetupComplete: (value: boolean) => void;
// }) => {
//   const searchParams = useSearchParams();
//   const userName = searchParams.get('name') || 'Guest';
//   const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
//   const callStartsAt = useCallStartsAt();
//   const callEndedAt = useCallEndedAt();
//   const callTimeNotArrived = callStartsAt && new Date(callStartsAt) > new Date();
//   const callHasEnded = !!callEndedAt;
//   const [isMicCamToggled, setIsMicCamToggled] = useState(false);
//   const call = useCall();

//   if (!call) {
//     throw new Error('useStreamCall must be used within a StreamCall component.');
//   }

//   useEffect(() => {
//     if (isMicCamToggled) {
//       call.camera.disable();
//       call.microphone.disable();
//     } else {
//       call.camera.enable();
//       call.microphone.enable();
//     }
//   }, [isMicCamToggled, call.camera, call.microphone]);

//   if (callTimeNotArrived)
//     return (
//       <Alert
//         title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
//       />
//     );

//   if (callHasEnded)
//     return (
//       <Alert
//         title="The call has been ended by the host"
//         iconUrl="/icons/call-ended.svg"
//       />
//     );

//   return (
//     <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
//       <h1 className="text-center text-2xl font-bold">Setup</h1>
//       <p className="text-lg">Joining as: {userName}</p>
//       <VideoPreview />
//       <div className="flex h-16 items-center justify-center gap-3">
//         <label className="flex items-center justify-center gap-2 font-medium">
//           <input
//             type="checkbox"
//             checked={isMicCamToggled}
//             onChange={(e) => setIsMicCamToggled(e.target.checked)}
//           />
//           Join with mic and camera off
//         </label>
//         <DeviceSettings />
//       </div>
//       <Button
//         className="rounded-md bg-green-500 px-4 py-2.5"
//         onClick={() => {
//           call.join({
//             data: {
//               custom: {
//                 name: userName,
//                 user_id: `user-${Date.now()}`,
//               }
//             },
//           });
//           setIsSetupComplete(true);
//         }}
//       >
//         Join meeting
//       </Button>
//     </div>
//   );
// };

// export default MeetingSetup;


// 'use client';
// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import {
//   DeviceSettings,
//   VideoPreview,
//   useCall,
//   useCallStateHooks,
// } from '@stream-io/video-react-sdk';

// import Alert from './Alert';
// import { Button } from './ui/button';

// // const MeetingSetup = ({
// //   setIsSetupComplete,
// // }: {
// //   setIsSetupComplete: (value: boolean) => void;
// // }) => 

// const MeetingSetup = ({
//   setIsSetupComplete,
// }: {
//   setIsSetupComplete: (value: boolean) => void;
// }) =>
  
//   {
//   const searchParams = useSearchParams();
//   const userName = searchParams.get('name') || 'Guest';
//   const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
//   const callStartsAt = useCallStartsAt();
//   const callEndedAt = useCallEndedAt();
//   const callTimeNotArrived = callStartsAt && new Date(callStartsAt) > new Date();
//   const callHasEnded = !!callEndedAt;
//   const [isMicCamToggled, setIsMicCamToggled] = useState(false);
//   const call = useCall();

//   if (!call) {
//     throw new Error('useStreamCall must be used within a StreamCall component.');
//   }

//   useEffect(() => {
//     if (isMicCamToggled) {
//       call.camera.disable();
//       call.microphone.disable();
//     } else {
//       call.camera.enable();
//       call.microphone.enable();
//     }
//   }, [isMicCamToggled, call.camera, call.microphone]);

//   if (callTimeNotArrived)
//     return (
//       <Alert
//         title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
//       />
//     );

//   if (callHasEnded)
//     return (
//       <Alert
//         title="The call has been ended by the host"
//         iconUrl="/icons/call-ended.svg"
//       />
//     );

//   return (
//     <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
//       <h1 className="text-center text-2xl font-bold">Setup</h1>
//       <p className="text-lg">Joining as: {userName}</p>
//       <VideoPreview />
//       <div className="flex h-16 items-center justify-center gap-3">
//         <label className="flex items-center justify-center gap-2 font-medium">
//           <input
//             type="checkbox"
//             checked={isMicCamToggled}
//             onChange={(e) => setIsMicCamToggled(e.target.checked)}
//           />
//           Join with mic and camera off
//         </label>
//         <DeviceSettings />
//       </div>
//       <Button
//         className="rounded-md bg-green-500 px-4 py-2.5"
//         onClick={() => {
//           call.join({
//             data: {
//               members: [{
//                 role: 'participant',
//                 user_id: `user-${Date.now()}`,
//                 custom: {
//                   name: userName,
//                 }
//               }]
//             }
//           });
//           setIsSetupComplete(true);
//         }}
//       >
//         Join meeting
//       </Button>
//     </div>
//   );
// };

// export default MeetingSetup;




'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import Alert from './Alert';
import { Button } from './ui/button';

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get('name') || 'Guest';
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived = callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);
  const call = useCall();

  if (!call) {
    throw new Error('useStreamCall must be used within a StreamCall component.');
  }

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  if (callTimeNotArrived)
    return (
      <Alert
        title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
      />
    );

  if (callHasEnded)
    return (
      <Alert
        title="The call has been ended by the host"
        iconUrl="/icons/call-ended.svg"
      />
    );

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold">Setup</h1>
      <p className="text-lg">Joining as: {userName}</p>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          const userId = `user-${Date.now()}`;
          call.join({
            data: {
              custom: {
                name: userName,
                user_id: userId
              }
            }
          });
          setIsSetupComplete(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;