// import { useNavigate } from "react-router-dom";
import { Button } from "_/components/Button";
import { Checkbox } from "baseui/checkbox";
import { ChangeEvent, useState } from "react";
import { FormControl } from "_/components/FormControl";
import { MenuLayout } from "_/components/Layouts";
import { useInput } from "_/hooks/useInput";
import { useSelect } from "_/hooks/useSelect";
import { emailValidator } from "_/utilities/form";
import { Option } from "baseui/select";
import { CVUploader } from "_/partials/CVUploader";
import { Grid } from "_/components/Grid";
// import { usePassword } from "_/hooks/usePassword";

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
const FIXME_LOCATIONS: readonly Option[] = [
  { id: "location:1", label: "Leeds" },
  { id: "location:2", label: "Leicester" },
  { id: "location:3", label: "Lichfield" },
  { id: "location:4", label: "Lincoln" },
  { id: "location:5", label: "Liverpool" },
  { id: "location:6", label: "London" },
];

const Details = () => {
  const { fullNameEl } = useInput({
    label: "Full name",
  });
  const { primaryEmailAddressEl } = useInput({
    label: "Primary email address",
  });
  const { secondaryEmailAddressEl } = useInput({
    label: "Secondary email address",
  });
  // const { passwordEl } = usePassword({
  //   label: "Password",
  // });
  const [successFile, setSuccessFile] = useState<File | undefined>(
    new File([], "cv.pdf")
  );
  const [canBeContacted, setCanBeContacted] = useState(true);

  const { organisationEl } = useSelect({
    label: "Organisation",
    options: FIXME_ORGS,
  });
  const { jobTitleEl } = useSelect({
    label: "Job title",
    options: FIXME_JOBS,
  });
  const { lineManagerEmailEl } = useInput({
    label: "Line manager email",
    validator: emailValidator,
    demoValue: "line.manager@cabinetoffice.gov.uk",
  });
  const { workLocationEl } = useSelect({
    label: "Work location",
    options: FIXME_LOCATIONS,
  });

  return (
    <MenuLayout>
      <h1 className="D-S">Your details</h1>
      <Grid gap={40} cellWidth={320} align="stretched">
        <div className="rm-margin">
          <h2 className="H-M">Personal details</h2>
          {fullNameEl}
          {primaryEmailAddressEl}
          {secondaryEmailAddressEl}
          <FormControl label="Password">
            <Button>Change password</Button>
          </FormControl>
          <FormControl label="CV">
            <CVUploader successFile={successFile} setSuccessFile={setSuccessFile} />
          </FormControl>
        </div>
        <div className="rm-margin">
          <h2 className="H-M">Job details</h2>
          {organisationEl}
          {jobTitleEl}
          {lineManagerEmailEl}
          {workLocationEl}
          <FormControl label="Contact preference">
            <Checkbox
              labelPlacement="left"
              checked={canBeContacted}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setCanBeContacted(event.target.checked);
              }}
              checkmarkType="toggle"
              overrides={{
                Toggle: {
                  style: {
                    background: "var(--mono100)",
                    border: "1px solid var(--mono400)",
                  },
                },
                Root: {
                  style: {
                    alignItems: "center",
                  },
                },
                Label: {
                  style: { flex: "1 1 1px" },
                },
              }}
            >
              <span className="P-XS">
                In the event of an identified skills shortage or emergency, recruitment
                and HR may contact me with an opportunity that matches my skills.
              </span>
            </Checkbox>
          </FormControl>
        </div>
      </Grid>
    </MenuLayout>
  );
};

export default Details;
