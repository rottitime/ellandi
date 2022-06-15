import { MenuLayout } from "_/components/Layouts";
import { Level, SkillsTable } from "_/partials/SkillsTable";

const FIXME_DATA: Array<{
  id: string;
  name: string;
  level: Level;
  isValidated: boolean;
}> = [
  {
    id: "auditing",
    name: "Auditing",
    level: "not-set",
    isValidated: false,
  },
  {
    id: "bookkeeping",
    name: "Bookkeeping",
    level: "not-set",
    isValidated: false,
  },
  {
    id: "communication",
    name: "Communication",
    level: "not-set",
    isValidated: false,
  },
  {
    id: "design",
    name: "Design",
    level: "s1",
    isValidated: true,
  },
  {
    id: "negotiation",
    name: "Negotiation",
    level: "s3",
    isValidated: false,
  },
  {
    id: "project-management",
    name: "Project management",
    level: "s5",
    isValidated: false,
  },
];

const GeneralSkills = () => {
  return (
    <MenuLayout>
      <h1 className="D-S">Your skills</h1>
      <SkillsTable data={FIXME_DATA} />
    </MenuLayout>
  );
};

export default GeneralSkills;
