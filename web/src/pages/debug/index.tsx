import { useState } from "react";
import { Button } from "_/components/Button";
import { MenuLayout } from "_/components/Layouts";
import { usePost, useDelete, useGet } from "_/hooks/useAPI";

const Debug = () => {
  const [testUserId, setTestUserId] = useState<string | void>();
  const userData = useGet("users");
  const createUserData = usePost<
    {
      email: string;
      first_name: string;
      last_name: string;
      organisation: string;
      job_title: string;
      line_manager_email: string;
      country: string;
      contract_type: "permanent" | "fixed_term" | "agency" | "other" | null;
    },
    {
      id: string;
    }
  >("users");
  const deleteTestUserData = useDelete(`users/${testUserId}`);

  return (
    <MenuLayout>
      <h1 className="D-S">
        <code>[debug-menu]</code>
      </h1>
      <h2>API Hooks</h2>
      <p className="PL-L">useFetch</p>
      <pre>
        <code>{JSON.stringify(userData, null, 2)}</code>
      </pre>
      <p className="PL-L">useMutate</p>
      <Button
        onClick={async () => {
          const { id } = await createUserData({
            email: "boaty@mcboatface.com",
            first_name: "Boaty",
            last_name: "McBoatface",
            organisation: "British Antarctic Survey",
            job_title: "Remotely Controlled Submersible",
            line_manager_email: "rrs.sir.david.attenborough@bas.ac.uk",
            country: "other",
            contract_type: "permanent",
          });
          setTestUserId(id);
        }}
      >
        Add test user
      </Button>
      {testUserId === undefined ? null : (
        <span className="ml12">
          <Button
            onClick={async () => {
              const { status } = await deleteTestUserData();
              if (status === "fetched") {
                setTestUserId();
              }
            }}
          >
            Delete test user
          </Button>
        </span>
      )}
    </MenuLayout>
  );
};

export default Debug;
