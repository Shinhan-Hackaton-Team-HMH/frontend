import Link from 'next/link';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  href: string;
}

export default function Button({ text, href, className }: ButtonProps) {
  return (
    <button
      className={twMerge(
        'bg-primary hover:bg-gradient-to-r from-[#5731F0] to-[#5CFFF1] px-6 py-2 rounded-[1.25rem] flex flex-row justify-between items-center text-text-inverse w-[145px] h-10',
        className,
      )}
    >
      <Link href={href}>{text}</Link>
      <Image src={'/Sparkle.svg'} alt={'sparkle'} width={20} height={20} />
    </button>
  );
}
