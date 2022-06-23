import { MenuLayout } from "_/components/Layouts";
import { Level, SkillsTable } from "_/partials/SkillsTable";

const FIXME_DATA: Array<{
  id: string;
  name: string;
  level: Level;
  isValidated: boolean;
}> = [
  {
    id: "english",
    name: "English",
    level: "l3",
    isValidated: false,
  },
  {
    id: "urdu",
    name: "Urdu",
    level: "l2",
    isValidated: false,
  },
  {
    id: "french",
    name: "French",
    level: "l1",
    isValidated: false,
  },
];

const LanguageSkills = () => {
  return (
    <MenuLayout>
      <h1 className="D-S">Language skills</h1>
      <SkillsTable data={FIXME_DATA} />
    </MenuLayout>
  );
};

export default LanguageSkills;
