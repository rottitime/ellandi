import { Button } from "baseui/button";
import { useNavigate } from "react-router-dom";
import { MenuLayout } from "_/components/Layouts";

const Index = () => {
  const navigate = useNavigate();

  return (
    <MenuLayout>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          navigate("/steps/4");
          return false;
        }}
      >
        <h1 className="D">Your details</h1>

        <p>
          <Button type="submit">
            <span className="H-XS">Continue</span>
          </Button>
        </p>
      </form>
    </MenuLayout>
  );
};

export default Index;
