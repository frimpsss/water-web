export interface IProps {
  title: string;
  span: string;
  sortable?: boolean;
  onAscSelected?: () => void;
  onDescSelected?: () => void;
}
const TableHeader = ({ title, span }: IProps) => {
  return (
    <div
      className={`${span} text-mountain-mist-700 text-[0.9rem]  cursor-pointer font-semibold`}
    >
      <span className="">
        <p className="w-fit px-2 py-1 hover:bg-mountain-mist-100 active:bg-mountain-mist-100 rounded-md">
          {title}
        </p>
      </span>
    </div>
  );
};

export default TableHeader;
