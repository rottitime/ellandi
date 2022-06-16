import { Button } from "_/components/Button";
import { useNavigate } from "react-router-dom";
import { EmptyLayout } from "_/components/Layouts";
import { useCheckboxGroup } from "_/hooks/useCheckboxGroup";

const FIXME_CURRENT_PROFESSIONS: { id: string; label: string }[] = [
  {
    id: "corporate-finance-profession",
    label: "Corporate Finance Profession",
  },
  {
    id: "counter-fraud-standards-and-profession",
    label: "Counter-fraud Standards and Profession",
  },
  {
    id: "digital-data-and-technology-professions",
    label: "Digital, Data and Technology Professions",
  },
  {
    id: "government-communication-service",
    label: "Government Communication Service",
  },
  {
    id: "government-economic-service",
    label: "Government Economic Service",
  },
  {
    id: "government-finance-profession",
    label: "Government Finance Profession",
  },
  {
    id: "government-it-profession",
    label: "Government IT Profession",
  },
  {
    id: "government-knowledge-and-information-management-profession",
    label: "Government Knowledge and Information Management Profession",
  },
  {
    id: "government-legal-profession",
    label: "Government Legal Profession",
  },
  {
    id: "government-occupational-psychology-profession",
    label: "Government Occupational Psychology Profession",
  },
  {
    id: "government-operational-research-service",
    label: "Government Operational Research Service",
  },
  {
    id: "government-planning-inspectors",
    label: "Government Planning Inspectors",
  },
  {
    id: "government-planning-profession",
    label: "Government Planning Profession",
  },
  {
    id: "government-property-profession",
    label: "Government Property Profession",
  },
  {
    id: "government-security-profession",
    label: "Government Security Profession",
  },
  {
    id: "government-science-and-engineering-profession",
    label: "Government Science and Engineering Profession",
  },
  {
    id: "government-social-research-profession",
    label: "Government Social Research Profession",
  },
  {
    id: "government-statistical-service-profession",
    label: "Government Statistical Service Profession",
  },
  {
    id: "government-tax-profession",
    label: "Government Tax Profession",
  },
  {
    id: "government-veterinary-profession",
    label: "Government Veterinary Profession",
  },
  {
    id: "human-resources-profession",
    label: "Human Resources Profession",
  },
  {
    id: "intelligence-analysis",
    label: "Intelligence Analysis",
  },
  {
    id: "internal-audit-profession",
    label: "Internal Audit Profession",
  },
  {
    id: "operational-delivery-profession",
    label: "Operational Delivery Profession",
  },
  {
    id: "policy-profession",
    label: "Policy Profession",
  },
  {
    id: "procurement-profession",
    label: "Procurement Profession",
  },
  {
    id: "project-delivery-profession",
    label: "Project Delivery Profession",
  },
];

const Index = () => {
  const navigate = useNavigate();

  const { currentProfessionEl, isCurrentProfessionValid } = useCheckboxGroup({
    label: "Current profession",
    options: FIXME_CURRENT_PROFESSIONS,
  });

  return (
    <EmptyLayout>
      <h1 className="D">Current profession</h1>

      <p>Select the profession(s) that match your current profession.</p>
      <ul>
        <li>
          <strong>You must select at least one.</strong>
        </li>
        <li>
          Select <strong>your role</strong>, not your team's area.
          <ul className="P-XS">
            <li>
              e.g. Web developers working on Tax →{" "}
              <strong>Digital, Data and Technology</strong>
            </li>
          </ul>
        </li>
      </ul>
      <p className="C c">
        You will be able to select areas that interest you and skills at a later stage.
      </p>

      {/* TODO: Make this UI much more user-friendly (search, icons?, remove redundant text) */}

      {currentProfessionEl}

      <p>
        <Button
          disabled={!isCurrentProfessionValid}
          onClick={() => {
            navigate("/steps/5");
          }}
        >
          <span className="H-XS">Continue</span>
        </Button>
      </p>
    </EmptyLayout>
  );
};

export default Index;
