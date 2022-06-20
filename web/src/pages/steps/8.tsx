import { Button } from "_/components/Button";
import { useNavigate } from "react-router-dom";
import { EmptyLayout } from "_/components/Layouts";
import { useDeepState } from "_/hooks/useDeepState";
import { Check as CheckIcon } from "lucide-react";

const FIXME_SKILLS = [
  "Auditing",
  "Bookkeeping",
  "Communication",
  "Coding",
  "Creative thinking",
  "Customer service",
  "Data entry",
  "Diary management",
  "Flexibility",
  "Microsoft Office",
  "Motivation",
  "Negotiation",
  "Planning",
  "Problem solving",
  "Project management",
  "Sales",
  "Social media",
  "Teamwork",
];

const Index = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useDeepState<string[]>([]);

  return (
    <EmptyLayout maxWidth={760}>
      <h1 className="D-S">Current skills</h1>

      <p>You can change these later from your profile.</p>

      <div
        className="mb32"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        {FIXME_SKILLS.map((skill) => {
          const isChecked = checked.includes(skill);
          return (
            <span key={skill} style={{ flex: "0 0 auto" }}>
              <Button
                shape="pill"
                size="compact"
                kind={isChecked ? "primary" : "secondary"}
                startEnhancer={isChecked ? <CheckIcon size="1em" /> : null}
                onClick={() => {
                  if (isChecked) {
                    setChecked(
                      checked.filter((s) => {
                        return s !== skill;
                      })
                    );
                  } else {
                    setChecked([...checked, skill]);
                  }
                }}
              >
                {skill}
              </Button>
            </span>
          );
        })}
      </div>

      <p>
        <Button
          onClick={() => {
            return navigate("/skills");
          }}
        >
          <span className="H-XS">Continue</span>
        </Button>
      </p>
    </EmptyLayout>
  );
};

export default Index;
