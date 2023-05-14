"use client"

import { useEffect, useRef, useState } from 'react';
import FlipCard from './FlipCard';

import { BRICKS_UNIT1, BRICKS_UNIT2, BRICKS_UNIT3, BRICKS_UNIT4, BRICKS_UNIT5, BRICKS_UNIT6 } from '@/data/bricks100_1/1-6';

import { LOOK_UNIT1, LOOK_UNIT2, LOOK_UNIT3, LOOK_UNIT4 } from '@/data/look_1a/1-4';

import ProgressBar from './ProgressBar';
import CircleArrowLeft from './icons/CircleArrowLeft';
import CircleArrowRight from './icons/CircleArrowRight';

type DirectionKey = 'ArrowLeft' | 'ArrowRight';

const words = [
  ...BRICKS_UNIT1,
  ...BRICKS_UNIT2,
  ...BRICKS_UNIT3,
  ...BRICKS_UNIT4,
  ...BRICKS_UNIT5,
  ...BRICKS_UNIT6,
  ...LOOK_UNIT1,
  ...LOOK_UNIT2,
  ...LOOK_UNIT3,
  ...LOOK_UNIT4
];

export default function FlipCardContainer() {
  const [currentNum, setCurrentNum] = useState(0);
  const [progressBarPercentValue, setProgressBarPercentValue] = useState(0);
  const [turn, setTurn] = useState(false);
  const wordsLength = useRef(words.length);

  const synth = globalThis.speechSynthesis;

  const pronounce = (en: string) => {
    const utter = new SpeechSynthesisUtterance(en);

    const voices = synth.getVoices();
    const voice = voices.find(({ voiceURI }) => voiceURI === 'Alex');

    if (voice) {
      utter.voice = voice;
    }

    synth.speak(utter);
  }

  const handlePronounce = (en: string) => {
    if (synth) {
      const voices = synth.getVoices();

      if (voices.length) {
        pronounce(en);
      } else {
        setTimeout(() => pronounce(en), 100);
      }
    }
  };

  const moveCard = (direction: DirectionKey) => {
    let cardIndex = currentNum;
    if (direction === "ArrowLeft") {
      cardIndex = currentNum - 1;

      if (cardIndex < 0) {
        // 10개의 데이터 (0 ~ 9)
        // -1 => 9
        // -2 => 8
        // -3 => 7
        cardIndex = wordsLength.current + cardIndex;
      }
    } else if (direction === "ArrowRight") {
      cardIndex = currentNum + 1;

      if (cardIndex >= wordsLength.current) {
        // 10개의 데이터 (0 ~ 9)
        // 10 => 0
        // 11 => 1
        // -3 => 7
        cardIndex = cardIndex - wordsLength.current;
      }
    }
    setCurrentNum(cardIndex);
  }

  const handleFlipCard = (e: KeyboardEvent) => {
    const { key } = e;

    if (!["ArrowLeft", "ArrowRight", "Enter", "ArrowUp", "ArrowDown"].includes(key)) {
      return null;
    }

    switch (key) {
      case "Enter":
        return handlePronounce(words[currentNum].en);
      case "ArrowUp":
        return setTurn(true);
      case "ArrowDown":
        return setTurn(false);
      case "ArrowLeft":
      case "ArrowRight":
        return moveCard(key);
    }

  };

  useEffect(() => {
    window.addEventListener('keyup', handleFlipCard)

    return function cleanUp() {
      window.removeEventListener('keyup', handleFlipCard)
    }
  }, [currentNum])

  useEffect(() => {
    setProgressBarPercentValue((currentNum + 1) / wordsLength.current * 100);
  }, [currentNum])

  return <>
    <ProgressBar percent={progressBarPercentValue} />
    <div className="flip-card-container">
      <button type="button" className="arrow-btn" onClick={() => moveCard('ArrowLeft')}><CircleArrowLeft size={72} /></button>
      <FlipCard
        word={words[currentNum]}
        num={currentNum}
        handlePronounce={handlePronounce}
        turn={turn}
        setTurn={setTurn}
      />
      <button type="button" className="arrow-btn" onClick={() => moveCard('ArrowRight')}><CircleArrowRight size={72} /></button>
    </div>
  </>
}

