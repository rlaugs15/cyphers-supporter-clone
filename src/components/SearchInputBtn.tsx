import { UseFormRegisterReturn } from "react-hook-form";

interface SearchInputBtnProps {
  register: UseFormRegisterReturn;
  text: string;
  [key: string]: any;
}

function SearchInputBtn({ register, text, ...rest }: SearchInputBtnProps) {
  return (
    <>
      <input
        {...register}
        type="text"
        placeholder={`${text}`}
        required
        className="w-full h-full p-2"
        {...rest}
      />
      <button className="w-20 h-full text-white bg-black">검색</button>
    </>
  );
}

export default SearchInputBtn;
