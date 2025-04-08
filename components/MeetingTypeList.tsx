
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import Loader from './Loader';
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
import { useToast } from './ui/use-toast';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { Input } from './ui/input';

const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined);
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const { toast } = useToast();

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

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({ title: 'Please select a date and time' });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error('Failed to create meeting');
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: 'Meeting Created',
      });
    } catch (error) {
      console.error(error);
      toast({ title: 'Failed to create Meeting' });
    }
  };

  if (!client || !user) return <Loader />;

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

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

    

      <AnimatePresence>
        {/* Schedule Meeting Modal */}
        {!callDetail && meetingState === 'isScheduleMeeting' && (
          <MeetingModal
            isOpen={true}
            onClose={() => setMeetingState(undefined)}
            title="Create Meeting"
            handleClick={createMeeting}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="flex flex-col gap-2.5">
                <label className="text-base font-normal leading-[22.4px] text-sky-2">
                  Add a description
                </label>
                <Textarea
                  className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                  onChange={(e) => setValues({ ...values, description: e.target.value })}
                  placeholder="Enter meeting agenda"
                />
              </div>
              <div className="flex w-full flex-col gap-2.5">
                <label className="text-base font-normal leading-[22.4px] text-sky-2">
                  Select Date and Time
                </label>
                <ReactDatePicker
                  selected={values.dateTime}
                  onChange={(date) => setValues({ ...values, dateTime: date! })}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full rounded bg-dark-3 p-2 focus:outline-none"
                />
              </div>
            </motion.div>
          </MeetingModal>
        )}

        {/* Meeting Created Modal */}
        {callDetail && meetingState === 'isScheduleMeeting' && (
          <MeetingModal
            isOpen={true}
            onClose={() => setMeetingState(undefined)}
            title="Meeting Created"
            handleClick={() => {
              navigator.clipboard.writeText(meetingLink);
              toast({ title: 'Link Copied' });
            }}
            image={'/icons/checked.svg'}
            buttonIcon="/icons/copy.svg"
            className="text-center"
            buttonText="Copy Meeting Link"
          />
        )}

        {/* Join Meeting Modal */}
        {meetingState === 'isJoiningMeeting' && (
          <MeetingModal
            isOpen={true}
            onClose={() => setMeetingState(undefined)}
            title="Type the link here"
            className="text-center"
            buttonText="Join Meeting"
            handleClick={() => router.push(values.link)}
          >
            <Input
              placeholder="Meeting link"
              onChange={(e) => setValues({ ...values, link: e.target.value })}
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </MeetingModal>
        )}

        {/* Instant Meeting Modal */}
        {meetingState === 'isInstantMeeting' && (
          <MeetingModal
            isOpen={true}
            onClose={() => setMeetingState(undefined)}
            title="Start an Instant Meeting"
            className="text-center"
            buttonText="Start Meeting"
            handleClick={createMeeting}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default MeetingTypeList;
