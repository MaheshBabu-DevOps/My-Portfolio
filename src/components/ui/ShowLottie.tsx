'use client';
import dynamic from 'next/dynamic';

// lottie-web touches `document` at import time, so it must never run on the server.
// Newer Node versions define a global `navigator`, which makes the library think it is
// in a browser and crashes the production build when pages are prerendered.
const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);

type Props = {
  path: any;
  className?: string;
};

const ShowLottie = ({ path, className = '' }: Props) => {
  return (
    <div className={`max-w-sm md:max-w-md ${className}`}>
      <Player autoplay loop src={path}></Player>
    </div>
  );
};

export default ShowLottie;
