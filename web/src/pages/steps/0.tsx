import { Button } from "baseui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EmptyLayout } from "_/components/Layouts";

const Index = () => {
  const navigate = useNavigate();

  return (
    <EmptyLayout>
      <h1 className="D c">Ellandi</h1>

      <p className="PL-L">You can use this service to:</p>

      <ul className="P-L">
        <li>upload and maintain your skills profile</li>
        <li>specify any skills you'd like to develop in the future</li>
        <li>view job suggestions based on your skills</li>
        <li>find courses based on your interests</li>
        <li>help you plan the next steps in your career</li>
        <li>facilitate discussions about skills with your line manager</li>
      </ul>

      <p className="P-L">Registering takes around 5 - 10 minutes.</p>

      <p>
        <Button
          endEnhancer={<ArrowRight />}
          onClick={() => {
            navigate("/steps/1");
          }}
        >
          <span className="H-S">Start now</span>
        </Button>
      </p>

      <h4>Before you start</h4>

      <p className="P-L">
        You'll be asked to upload your CV. If you don't have a CV available you can add
        one later by going to your <strong>Profile</strong>.
      </p>
    </EmptyLayout>
  );
};

export default Index;
