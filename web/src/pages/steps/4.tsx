import { Button } from "baseui/button";
import { useNavigate } from "react-router-dom";
import { EmptyLayout } from "_/components/Layouts";
import { useInput } from "_/hooks/useInput";
import { useRadio } from "_/hooks/useRadio";

const FIXME_CIVIL_SERVICE_GRADES: { id: string; label: string }[] = [
  {
    id: "AO",
    label: "Administrative Officer (AO) Equivalent",
  },
  {
    id: "AA",
    label: "Administrative Assistant (AA) Equivalent",
  },
  {
    id: "EO",
    label: "Executive Officer (EO) Equivalent",
  },
  {
    id: "HEO",
    label: "Higher Executive Officer (HEO) Equivalent",
  },
  {
    id: "SEO",
    label: "Senior Executive Officer (SEO) Equivalent",
  },
  {
    id: "G7",
    label: "Grade 7 Equivalent",
  },
  {
    id: "G6",
    label: "Grade 6 Equivalent",
  },
  {
    id: "PB1/1A",
    label: "Senior Civil Servant - Deputy Director (PB1/1A)",
  },
  {
    id: "PB2",
    label: "Senior Civil Servant - Director (PB2)",
  },
  {
    id: "PB3",
    label: "Senior Civil Servant - Director General (PB3)",
  },
  {
    id: "PermSec",
    label: "Senior Civil Servant - Permanent Secretary",
  },
  {
    id: "<other>",
    label: "Other equivalent grade",
  },
];

const Index = () => {
  const navigate = useNavigate();

  const { civilServiceGrade, civilServiceGradeEl, isCivilServiceGradeValid } = useRadio({
    label: "Civil Service Grade",
    options: FIXME_CIVIL_SERVICE_GRADES,
  });
  const { enterGradeEl, isEnterGradeValid } = useInput({
    label: "Enter Grade",
  });

  return (
    <EmptyLayout>
      <h1 className="D">Grade</h1>

      <p className="P-L">Select your grade. You may only choose one.</p>

      <p className="P-XS" style={{ color: "var(--mono700)" }}>
        We'll use this to suggest learning and career development opportunities that are
        relevant to you.
      </p>

      {civilServiceGradeEl}

      {civilServiceGrade === "<other>" ? enterGradeEl : null}

      <p>
        <Button
          onClick={() => {
            return navigate("/steps/5");
          }}
          disabled={
            !(civilServiceGrade === "<other>"
              ? isEnterGradeValid
              : isCivilServiceGradeValid)
          }
        >
          <span className="H-XS">Continue</span>
        </Button>
      </p>
    </EmptyLayout>
  );
};

export default Index;
