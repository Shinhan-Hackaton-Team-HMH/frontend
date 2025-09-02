interface TextfieldProps {
  label?: string;
  placeholder: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  maxLength?: number;
}
export default function InputTextField({
  label,
  value,
  name,
  onChange,
  maxLength,
  placeholder,
}: TextfieldProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <div className="text-TitleSM text-text-normal mb-2">{label}</div>
      )}
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className="focus:input-focus w-full truncate rounded-xl border border-transparent bg-[#F9FAFB] px-6 py-[14px] focus:ring-0 focus:outline-none"
      />
      {/* <div className="text-text-assistive mt-1.5 text-Caption">{text}</div> */}
    </div>
  );
}
