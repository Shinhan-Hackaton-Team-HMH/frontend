import { twMerge } from 'tailwind-merge';

export default function Modal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="fixed inset-0 top-0 left-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/15">
      <section
        className={twMerge(
          'relative flex h-[374px] w-[453px] flex-col items-center justify-around rounded-[20px] bg-white pt-10 pb-5.5',
          className,
        )}
      >
        {children}
      </section>
    </div>
  );
}
