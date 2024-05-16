import * as Icons from "iconsax-react";
const DashboardIcon = ({
  title,
  active,
}: {
  title: keyof typeof Icons;
  active: boolean;
}) => {
  const IconComponet = Icons[title];
  return (
    <div>
      {<IconComponet size={20} color={active ? "#ffffff" : "#989898"} />}
    </div>
  );
};

export default DashboardIcon;
