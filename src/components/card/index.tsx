export interface CardDetail {
  client: string;
  title: string;
}

export default function Card({ client, title }: CardDetail) {
  return (
    <div className="w-[270px] h-[330px] flex flex-col justify-between rounded-[20px] bg-[linear-gradient(151deg,var(--Fill-Gradient-1,#5731F0)_9.25%,var(--Fill-Gradient-100,#5CFFF1)_88.77%)] backdrop-blur-[25px]">
      <div className="m-6 py-2 px-4 bg-black text-white size-fit rounded-xl">
        {client}
      </div>
      <div className="mb-8 w-full text-center text-Headline">{title}</div>
    </div>
  );
}
