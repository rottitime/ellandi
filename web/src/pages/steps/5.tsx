import { Button } from "baseui/button";
import { useNavigate } from "react-router-dom";
import { EmptyLayout } from "_/components/Layouts";

const Index = () => {
  const navigate = useNavigate();

  return (
    <EmptyLayout>
      <h1 className="D-S">In progress</h1>

      <p>More screens coming soon</p>

      <p>
        <Button
          onClick={() => {
            return navigate("/steps/6");
          }}
        >
          <span className="H-XS">Continue</span>
        </Button>
      </p>
    </EmptyLayout>
  );
};

export default Index;
