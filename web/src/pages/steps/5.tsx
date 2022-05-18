import { Button } from "baseui/button";
import { useNavigate } from "react-router-dom";
import { MenuLayout } from "_/components/Layouts";

const Index = () => {
  const navigate = useNavigate();

  return (
    <MenuLayout>
      <h1 className="D-S">(5)</h1>

      <p>Noot</p>

      <p>
        <Button
          onClick={() => {
            return navigate("/steps/6");
          }}
        >
          <span className="H-XS">Continue</span>
        </Button>
      </p>
    </MenuLayout>
  );
};

export default Index;
