import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const TimeBox = ({ time }: { time: number }) => {
  return (
    <span className="flex size-5 items-center justify-center rounded-lg bg-white text-primary xs:size-6 sm:size-7 2xl:size-8">
      {String(time).padStart(2, '0')}
    </span>
  );
};

const CountdownBar = ({ targetDate }: { targetDate: Date }) => {
  const calculateTimeLeft = () => {
    const diff = dayjs(targetDate).diff(dayjs());

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const diffInSeconds = diff / 1000;

    const days = Math.floor(diffInSeconds / (24 * 3600));
    const hours = Math.floor((diffInSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = Math.floor(diffInSeconds % 60);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="sticky top-20 z-[97] flex h-10 w-full items-center justify-center gap-1 bg-primary text-[8px] font-bold text-white shadow-lg xs:text-[10px] sm:h-12 sm:gap-2 sm:text-sm 2xl:h-14 2xl:text-base">
      <span className="mr-1 text-white sm:mr-2">Your booking expires in:</span>{' '}
      <TimeBox time={timeLeft.minutes} /> minutes{' '}
      <TimeBox time={timeLeft.seconds} /> seconds
    </div>
  );
};

export default CountdownBar;
