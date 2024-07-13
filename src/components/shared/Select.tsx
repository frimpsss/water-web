export interface CustomSelectTypes {
  options: string[];
  handleChange: any;
  handleBlur: any;
  id: string;
  errors: any;
  values: any;
  touched: any;
  label: string;
  boldText?: boolean;
}
export default function CustomSelect({
  options,
  handleBlur,
  handleChange,
  id,
  errors,
  values,
  touched,
  label,
  boldText = false,
}: CustomSelectTypes) {
  return (
    <div className="flex flex-col gap-y-2">
      <label
        htmlFor={id}
        className={`text-mantis-950 text-[1rem] ${
          boldText ? "font-semibold" : "font-normal"
        }`}
      >
        {label}
      </label>
      <div className="relative">
        <div className=" rounded-none shadow-sm w-full relative  flex flex-row items-center">
          <select
            name={id}
            value={values[id]}
            onChange={handleChange}
            onBlur={handleBlur}
            className="rounded-md border py-2 before:mr-3 select flex px-4 text-black font-light border-gray-300 ring-mantis-950 focus:ring-mantis-950 focus:border-mantis-950 appearance-none w-full  sm:text-sm sm:leading-5"
          >
            <option value="" className="text-gray-400">
              -- Select {id}
            </option>
            {options.map((opt, inx) => (
              <option value={opt} key={inx}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        {errors[id] && touched[id] ? (
          <p className="mt-1 text-sm text-red-600" id={`${id}-error`}>
            {errors[id]}.
          </p>
        ) : null}
      </div>
    </div>
  );
}
