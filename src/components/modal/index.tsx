export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-20 bg-black/15 flex justify-center items-center">
      <section className="w-[453px] h-[374px] relative pt-10 pb-5.5 bg-white flex flex-col justify-around items-center rounded-[20px]">
        {children}
      </section>
    </div>
  );
}
