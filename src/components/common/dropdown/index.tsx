import Link from 'next/link';

export interface DropDownDetail {
  text: string;
  link: string;
}

export interface DropDownItems {
  items: DropDownDetail[];
}

export default function DropDown({ items }: DropDownItems) {
  return (
    <div className="absolute border-1 border-[#ECEEF0] bg-white p-[6px] rounded-xl top-full z-10 w-[150px]">
      {items.map((value, index) => {
        return (
          <div
            key={index}
            className="w-full hover:bg-[#ECEEF0] rounded-lg text-text-Strong text-BodyMD py-3 pl-4"
          >
            <Link href={value.link}>{value.text}</Link>
          </div>
        );
      })}
    </div>
  );
}
