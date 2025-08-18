export interface CardDetail {
  client: string;
  title: string;
}

export default function Card({ client, title }: CardDetail) {
  return (
    <div className="w-[270px] h-[330px] flex flex-col p-6 justify-between">
      <div>{client}</div>
      <div>{title}</div>
    </div>
  );
}
