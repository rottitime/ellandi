import { Button } from "baseui/button";
import { useNavigate } from "react-router-dom";
import { MenuLayout } from "_/components/Layouts";
import { useInput } from "_/hooks/useInput";

const Index = () => {
  const navigate = useNavigate();

  const { fullNameEl, isFullNameValid } = useInput({ label: "Full Name" });
  // const { el: b } = useInput({ label: "" });
  // const { el: c } = useInput({ label: "" });
  // const { el: d } = useInput({ label: "" });
  // const { el: e } = useInput({ label: "" });

  return (
    <MenuLayout>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          if (isFullNameValid) {
            navigate("/steps/4");
          }

          return false;
        }}
      >
        <h1 className="D">Your details</h1>

        <h3>Full Name</h3>
        {fullNameEl}

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
