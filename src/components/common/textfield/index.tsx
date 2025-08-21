interface TextfieldProps {
  text: string;
  placeholder: string;
}
export default function InputTextField({ text, placeholder }: TextfieldProps) {
  return (
    <div className="">
      <input
        type="text"
        placeholder={placeholder}
        className="w-[360px] px-3 py-[14px] rounded-xl bg-[#F9FAFB]  focus:ring-0 focus:outline-none  border border-transparent   focus:input-focus"
      />
      <div className="text-assistive mt-1.5 text-Caption">{text}</div>
    </div>
  );
}
