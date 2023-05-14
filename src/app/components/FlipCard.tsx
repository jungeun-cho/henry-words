import { Word } from '@/types';
import Image from 'next/image';
import SpeakerIcon from './icons/SpeakerIcon';
import { Dispatch, SetStateAction } from 'react';

type FlipCardProps = {
  word: Word;
  num: number;
  handlePronounce: (en: string) => void;
  turn: boolean;
  setTurn: Dispatch<SetStateAction<boolean>>;
};

export default function FlipCard({ word, num, handlePronounce, turn = false, setTurn }: FlipCardProps) {
  const { en, ko, img: imgSrc } = word;

  return (
    <div>
      <div className="title-container">
        <h1 className="card-count">{num}. {en}</h1>
        <button type="button" className="speaker-icon" onClick={() => handlePronounce(en)}><SpeakerIcon size={48} /></button>
      </div>
      <div className={`flip-card ${turn ? 'turn' : ''}`} onClick={() => setTurn(!turn)}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <h1>{en}</h1>
          </div>
          <div className="flip-card-back">
            <h1>{ko}</h1>
            {imgSrc && <Image
              src={imgSrc}
              alt={`${en}-${ko}`}
              // width={1000}
              // height={500}
              style={{ objectFit: "contain" }}
              fill={true}
            // sizes="(max-width: 100px) 100vw"
            />}
          </div>
        </div>
      </div>
    </div>
  );
}
