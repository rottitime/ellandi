import { Button } from "baseui/button";
import { useNavigate } from "react-router-dom";
import { EmptyLayout } from "_/components/Layouts";
import { useInput } from "_/hooks/useInput";
import { useRadioGroup } from "_/hooks/useRadioGroup";

const FIXME_CONTRACT_TYPE: { id: string; label: string }[] = [
  {
    id: "permanent",
    label: "Permanent",
  },
  {
    id: "fixed-term",
    label: "Fixed term",
  },
  {
    id: "agency",
    label: "Agency",
  },
  {
    id: "<other>",
    label: "Other",
  },
];

const Index = () => {
  const navigate = useNavigate();

  const { currentContractTypeEl, currentContractType, isCurrentContractTypeValid } =
    useRadioGroup({
      label: "Current Contract Type",
      options: FIXME_CONTRACT_TYPE,
    });
  const { contractTypeEl, isContractTypeValid } = useInput({
    label: "Contract Type",
  });

  return (
    <EmptyLayout>
      <h1 className="D">Grade</h1>

      <p className="P-L">Select your grade. You may only choose one.</p>

      <p className="P-XS" style={{ color: "var(--mono700)" }}>
        We'll use this to suggest learning and career development opportunities that are
        relevant to you.
      </p>

      {currentContractTypeEl}

      {currentContractType === "<other>" ? contractTypeEl : null}

      <p>
        <Button
          onClick={() => {
            return navigate("/steps/7");
          }}
          disabled={
            !(currentContractType === "<other>"
              ? isContractTypeValid
              : isCurrentContractTypeValid)
          }
        >
          <span className="H-XS">Continue</span>
        </Button>
      </p>
    </EmptyLayout>
  );
};

export default Index;
