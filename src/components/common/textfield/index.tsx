interface TextfieldProps {
  label?: string;
  placeholder: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}
export default function InputTextField({
  label,
  value,
  name,
  onChange,
  placeholder,
}: TextfieldProps) {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <div className="text-TitleSM text-text-normal mb-2">{label}</div>
      )}
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-6 py-[14px] rounded-xl bg-[#F9FAFB]  focus:ring-0 focus:outline-none  border border-transparent   focus:input-focus truncate"
      />
      {/* <div className="text-text-assistive mt-1.5 text-Caption">{text}</div> */}
    </div>
  );
}
