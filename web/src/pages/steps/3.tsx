import { Button } from "baseui/button";
import { useNavigate } from "react-router-dom";
import { MenuLayout } from "_/components/Layouts";
import { useInput } from "_/hooks/useInput";
import { useSelect } from "_/hooks/useSelect";
import { Option } from "baseui/select";
import { emailValidator } from "_/utilities/form";

const FIXME_ORGS: readonly Option[] = [
  { id: "org:1", label: "Cabinet Office (CO)" },
  { id: "org:2", label: "Cafcass" },
  { id: "org:3", label: "Care Quality Commission" },
  { id: "org:4", label: "Careers Wales" },
  { id: "org:5", label: "Central Advisory Committee" },
];
const FIXME_JOBS: readonly Option[] = [
  { id: "job:1", label: "Security Consultant" },
  { id: "job:2", label: "Security Engineer" },
  { id: "job:3", label: "Service Designer" },
  { id: "job:4", label: "Service Manager" },
  { id: "job:5", label: "Service Observer" },
  { id: "job:6", label: "Service Supervisor" },
];
const FIXME_COUNTRIES: readonly Option[] = [
  { id: "country:1", label: "Uganda" },
  { id: "country:2", label: "Ukraine" },
  { id: "country:3", label: "United Arab Emirates" },
  { id: "country:4", label: "United Kingdom" },
  { id: "country:5", label: "United States" },
];
const FIXME_LOCATIONS: readonly Option[] = [
  { id: "location:1", label: "Leeds" },
  { id: "location:2", label: "Leicester" },
  { id: "location:3", label: "Lichfield" },
  { id: "location:4", label: "Lincoln" },
  { id: "location:5", label: "Liverpool" },
  { id: "location:6", label: "London" },
];

const Index = () => {
  const navigate = useNavigate();

  const { fullNameEl, isFullNameValid } = useInput({
    label: "Full Name",
    initialValue: "Joe Bloggs",
  });
  const { organisationEl, isOrganisationValid } = useSelect({
    label: "Organisation",
    options: FIXME_ORGS,
  });
  const { jobTitleEl, isJobTitleValid } = useSelect({
    label: "Job Title",
    options: FIXME_JOBS,
  });
  const { lineManagerEmailEl, isLineManagerEmailValid } = useInput({
    label: "Line Manager Email",
    validator: emailValidator,
    demoValue: "line.manager@cabinetoffice.gov.uk",
  });
  const { countryEl, isCountryValid } = useSelect({
    label: "Country",
    options: FIXME_COUNTRIES,
  });
  const { workLocationEl, isWorkLocationValid } = useSelect({
    label: "Work Location",
    options: FIXME_LOCATIONS,
  });

  return (
    <MenuLayout>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          if (
            isFullNameValid &&
            isOrganisationValid &&
            isJobTitleValid &&
            isLineManagerEmailValid &&
            isCountryValid &&
            isWorkLocationValid
          ) {
            navigate("/steps/4");
          }

          return false;
        }}
      >
        <h1 className="D">Your Details</h1>
        {fullNameEl}
        {organisationEl}
        {jobTitleEl}
        {lineManagerEmailEl}
        {countryEl}
        {workLocationEl}
        <p>
          <Button
            type="submit"
            disabled={
              !(
                isFullNameValid &&
                isOrganisationValid &&
                isJobTitleValid &&
                isLineManagerEmailValid &&
                isCountryValid &&
                isWorkLocationValid
              )
            }
          >
            <span className="H-XS">Continue</span>
          </Button>
        </p>
      </form>
    </MenuLayout>
  );
};

export default Index;
