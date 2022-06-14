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
      label: "Current contract type",
      options: FIXME_CONTRACT_TYPE,
    });
  const { contractTypeEl, isContractTypeValid } = useInput({
    label: "Contract type",
  });

  return (
    <EmptyLayout>
      <h1 className="D">Contract type</h1>

      {currentContractTypeEl}

      {currentContractType === "<other>" ? contractTypeEl : null}

      <p>
        <Button
          onClick={() => {
            return navigate("/steps/6");
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
