interface TextfieldProps {
  text: string;
  placeholder: string;
}
export default function InputTextField({ text, placeholder }: TextfieldProps) {
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-3 py-[14px] rounded-xl bg-[#F9FAFB]  focus:ring-0 focus:outline-none  border border-transparent   focus:input-focus"
      />
      {/* <div className="text-text-assistive mt-1.5 text-Caption">{text}</div> */}
    </>
  );
}
