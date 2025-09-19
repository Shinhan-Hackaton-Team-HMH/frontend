import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import Image from 'next/image';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'HMH',
  description: 'HMH KT 바로광고',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <div className="fixed inset-x-4 bottom-3 z-50 sm:hidden">
          <div className="ring-line-assistive shadow-section bg-alpha/50 mx-auto flex h-[60px] w-full flex-row justify-around gap-1 rounded-[120px] p-1 ring">
            <Link
              href="/"
              className="bg-primary-lighten flex h-full flex-1 items-center justify-center rounded-[120px] p-3 ring ring-[#DCE6FF]"
            >
              <Image
                height={24}
                width={24}
                src={'/icon/icon_home.svg'}
                alt=""
              ></Image>
            </Link>
            <Link
              href="/"
              className="bg-primary-lighten flex h-full flex-1 items-center justify-center rounded-[120px] p-3 ring ring-[#DCE6FF]"
            >
              <Image
                height={24}
                width={24}
                src={'/icon/icon_location.svg'}
                alt=""
              ></Image>
            </Link>
            <Link
              href="/"
              className="bg-primary-lighten flex h-full flex-1 items-center justify-center rounded-[120px] p-3 ring ring-[#DCE6FF]"
            >
              <Image
                height={24}
                width={24}
                src={'/icon/icon_calendar.svg'}
                alt=""
              ></Image>
            </Link>
            <Link
              href="/"
              className="bg-primary-lighten flex h-full flex-1 items-center justify-center rounded-[120px] p-3 ring ring-[#DCE6FF]"
            >
              <Image
                height={24}
                width={24}
                src={'/icon/icon_chat.svg'}
                alt=""
              ></Image>
            </Link>
            <Link
              href="/"
              className="bg-primary-lighten flex h-full flex-1 items-center justify-center rounded-[120px] p-3 ring ring-[#DCE6FF]"
            >
              <Image
                height={24}
                width={24}
                src={'/icon/icon_avatar.svg'}
                alt=""
              ></Image>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
