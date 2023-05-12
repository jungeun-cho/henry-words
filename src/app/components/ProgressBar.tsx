import Image from 'next/image';
import HenryProfileImage from '../../assets/henry.png';

export default function ProgressBar({ percent = 0 }) {
  return <div className="progress-bar__container">
    <div className='progress-bar'>
      <div className='progress-bar__bar' style={{ width: `${percent}%` }}></div>
    </div>
    <Image className="henry-profile-img" src={HenryProfileImage} alt="범건이 화이팅!" style={{ left: `calc(${percent}% - 50px)` }} width={50} />
  </div>
}