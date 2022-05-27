import { Button } from "baseui/button";
import { useNavigate } from "react-router-dom";
import { FileUploader } from "baseui/file-uploader";
import { StatefulPanel } from "baseui/accordion";
import { EmptyLayout } from "_/components/Layouts";
import { useRef, useState } from "react";
import { RefreshCw as ReloadIcon } from "lucide-react";
import { Link } from "_/components/Link";

const MIN_SIZE_BYTES = 200;
const MAX_SIZE_BYTES = 3_000_000;

const Index = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [successFile, setSuccessFile] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();

  const startProgress = (file: File) => {
    setIsUploading(true);
    timeoutId.current = setTimeout(() => {
      setSuccessFile(file);
      setIsUploading(false);
    }, 1000);
  };

  const uploader = (
    <FileUploader
      onCancel={() => {
        clearTimeout(timeoutId.current);
        setIsUploading(false);
      }}
      minSize={MIN_SIZE_BYTES}
      maxSize={MAX_SIZE_BYTES}
      accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.oasis.opendocument.text"
      multiple={false}
      onRetry={() => {
        setErrorMessage("");
      }}
      onDrop={(acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length === 0) {
          if (acceptedFiles.length === 1) {
            startProgress(acceptedFiles[0]);
          } else if (acceptedFiles.length > 1) {
            setErrorMessage(`Upload one file at a time`);
          }
        } else {
          const firstRejectedFile = rejectedFiles[0];
          if (
            firstRejectedFile.size < MIN_SIZE_BYTES ||
            firstRejectedFile.size > MAX_SIZE_BYTES
          ) {
            setErrorMessage(`CV must be no larger than 2MB`);
          } else {
            setErrorMessage(`CV must be in a supported format: PDF, Word, ODT`);
          }
        }
      }}
      errorMessage={errorMessage}
      progressMessage={isUploading ? "Uploading..." : ""}
    />
  );

  return (
    <EmptyLayout>
      <h1 className="D-S">Upload your CV</h1>

      {successFile === undefined ? (
        uploader
      ) : (
        <div>
          <p className="" style={{ color: "var(--positive)" }}>
            Successfully uploaded <strong>{successFile.name}</strong>
          </p>
          <StatefulPanel
            title="Replace uploaded file"
            overrides={{
              PanelContainer: {
                style: {
                  border: "none",
                },
              },
              Header: {
                style: {
                  padding: "0 0 8px",
                },
              },
              Content: {
                style: {
                  padding: "0 0 8px",
                },
              },
              ToggleIcon: {
                component: () => {
                  return <ReloadIcon size="1em" />;
                },
              },
            }}
          >
            {uploader}
          </StatefulPanel>
        </div>
      )}

      <p className="P">
        We'll use the information in your CV to help you be the first to learn about
        opportunities and skills suited to your experience.
      </p>

      <p className="P-XS">
        You are also able to update your CV in the Profile section.{" "}
        <Link to="/steps/8">Skip for now</Link>
      </p>

      <p>
        <Button
          disabled={successFile === undefined}
          onClick={() => {
            return navigate("/steps/8");
          }}
        >
          <span className="H-XS">Continue</span>
        </Button>
      </p>
    </EmptyLayout>
  );
};

export default Index;
