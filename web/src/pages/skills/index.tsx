import { Navigate } from "react-router-dom";
import { MenuLayout } from "_/components/Layouts";

const Skills = () => {
  return (
    <MenuLayout>
      <Navigate to="/skills/general" />
    </MenuLayout>
  );
};

export default Skills;
