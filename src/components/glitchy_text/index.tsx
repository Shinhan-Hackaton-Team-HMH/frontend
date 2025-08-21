'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const glitchChars = '0123456789';

function getRandomChar() {
  return glitchChars[Math.floor(Math.random() * glitchChars.length)];
}

interface GlitchyRevealProps {
  target: string | number;
  duration?: number;
  className?: string;
}

export default function GlitchyReveal({
  target,
  duration = 2000,
  className,
}: GlitchyRevealProps) {
  const [display, setDisplay] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const targetStr =
    typeof target === 'number' ? target.toLocaleString() : String(target);

  useEffect(() => {
    // 처음부터 target 길이만큼 채워둠 → UX 깜빡임 방지
    setDisplay(targetStr.split(''));

    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;

      if (elapsed >= duration) {
        setDisplay(targetStr.split(''));
        setDone(true);
        clearInterval(interval);
        return;
      }

      const progress = elapsed / duration;
      const revealableChars = targetStr.replace(/[^0-9]/g, '').length;
      const revealedCount = Math.floor(progress * revealableChars);

      let revealedSoFar = 0;

      const next = targetStr.split('').map((ch) => {
        if (!/[0-9]/.test(ch)) {
          return ch; // 기호나 콤마는 고정
        }
        if (revealedSoFar < revealedCount) {
          revealedSoFar++;
          return ch; // 이미 확정된 자리
        }
        return getRandomChar(); // 덮어쓰기 (길이는 그대로 유지)
      });

      setDisplay(next);
    }, 50);

    return () => clearInterval(interval);
  }, [targetStr, duration]);

  return (
    <span className={className}>
      {display.map((c, i) => (
        <motion.span
          key={i}
          animate={{ opacity: 1 }}
          transition={{ repeat: done ? 0 : Infinity, duration: 0.25 }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}
