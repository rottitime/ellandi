import { Button } from "_/components/Button";
import { useNavigate } from "react-router-dom";
import { EmptyLayout } from "_/components/Layouts";
import { Slider } from "baseui/slider";
import { FormControl } from "_/components/FormControl";
import { Grid } from "_/components/Grid";
import { useDeepState } from "_/hooks/useDeepState";
import { getUserLanguage } from "_/utilities/getUserLanguage";
import { useSelect } from "_/hooks/useSelect";
import { Option } from "baseui/select";
import { useChange } from "_/hooks/useChange";
import { X as DeleteIcon } from "lucide-react";

const USER_LANGUAGE = getUserLanguage() ?? "";

const FIXME_LANGUAGES: readonly Option[] = [
  { id: "lang:1", label: "English" },
  { id: "lang:2", label: "Welsh" },
  { id: "lang:3", label: "Polish" },
  { id: "lang:4", label: "Panjabi" },
  { id: "lang:5", label: "Urdu" },
  { id: "lang:6", label: "Bengali" },
];

type LanguagePartLevel = "basic" | "independent" | "proficient";

type LanguageLevel = {
  name: string;
  speaking: LanguagePartLevel;
  writing: LanguagePartLevel;
};

const Index = () => {
  const navigate = useNavigate();
  const [languageLevels, setLanguageLevels] = useDeepState<LanguageLevel[]>([
    { name: "English", speaking: "proficient", writing: "proficient" },
  ]);

  return (
    <EmptyLayout maxWidth={700}>
      <h1 className="D-S">Languages</h1>

      <p>You can change these later from your profile.</p>

      {languageLevels.map((languageLevel, i) => {
        return (
          <LanguageSliderPair
            key={languageLevel.name}
            languageLevel={languageLevel}
            setLanguageLevel={(level: LanguageLevel | undefined) => {
              if (level === undefined) {
                setLanguageLevels(
                  languageLevels.filter((_, j) => {
                    return i !== j;
                  })
                );
              } else {
                setLanguageLevels(
                  languageLevels.map((prev, j) => {
                    return i === j ? level : prev;
                  })
                );
              }
            }}
          />
        );
      })}

      <AddLanguageForm
        languageLevels={languageLevels}
        setLanguageLevels={setLanguageLevels}
      />

      <p className="mt32">
        <Button
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

const LanguageSliderPair = ({
  languageLevel,
  setLanguageLevel,
}: {
  languageLevel: LanguageLevel;
  setLanguageLevel: (level?: LanguageLevel) => void;
}): JSX.Element => {
  return (
    <div className="mv32">
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            flex: "1 1 1px",
          }}
        >
          {languageLevel.name}
        </h2>
        <div
          style={{
            flex: "0 0 auto",
          }}
        >
          {languageLevel.name === "English" && USER_LANGUAGE.startsWith("en") ? null : (
            <Button
              kind="tertiary"
              size="compact"
              shape="circle"
              onClick={() => {
                setLanguageLevel();
              }}
            >
              <DeleteIcon size="2em" />
            </Button>
          )}
        </div>
      </div>
      <Grid align="stretched" cellWidth={300} gap={48}>
        <LanguageSlider
          type="speaking"
          languageLevel={languageLevel.speaking}
          setLanguageLevel={(level) => {
            setLanguageLevel({
              ...languageLevel,
              speaking: level,
            });
          }}
        />
        <LanguageSlider
          type="writing"
          languageLevel={languageLevel.writing}
          setLanguageLevel={(level) => {
            setLanguageLevel({
              ...languageLevel,
              writing: level,
            });
          }}
        />
      </Grid>
    </div>
  );
};

const LANGUAGE_LEVEL_MAP: Record<LanguagePartLevel, [number]> = {
  basic: [0],
  independent: [1],
  proficient: [2],
};

const TRACK_BACKGROUND_MAP: Record<LanguagePartLevel, string> = {
  basic: "var(--accent200)",
  independent: "var(--accent300)",
  proficient: "var(--accent400)",
};

const LanguageSlider = ({
  type,
  languageLevel,
  setLanguageLevel,
}: {
  type: "speaking" | "writing";
  languageLevel: LanguagePartLevel;
  setLanguageLevel: (level: LanguagePartLevel) => void;
}): JSX.Element => {
  return (
    <div>
      <FormControl
        label={type === "speaking" ? "Speaking and listening" : "Writing and reading"}
      >
        <Slider
          value={LANGUAGE_LEVEL_MAP[languageLevel]}
          min={0}
          max={2}
          step={1}
          onChange={({ value }) => {
            if (value.length === 1) {
              if (value[0] === 0) setLanguageLevel("basic");
              else if (value[0] === 1) setLanguageLevel("independent");
              else setLanguageLevel("proficient");
            }
          }}
          overrides={{
            InnerThumb: () => {
              return null;
            },
            ThumbValue: () => {
              return null;
            },
            Track: {
              style: {
                marginLeft: "4px",
                marginRight: "20px",
              },
            },
            InnerTrack: {
              style: {
                background: TRACK_BACKGROUND_MAP[languageLevel],
              },
            },
            TickBar: () => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ width: 60 }}>Basic</div>
                  <div>Independent</div>
                  <div>Proficient</div>
                </div>
              );
            },
          }}
        />
      </FormControl>

      <LanguageLevelDescription type={type} languageLevel={languageLevel} />
    </div>
  );
};

const LANGUAGE_LEVEL_DESCRIPTION_MAP = {
  speaking: {
    basic:
      "You can understand and use basic phrases, introduce yourself and describe in the simplest terms your background and environment.",
    independent:
      "You can deal with most situations likely to arise when travelling in an area where the language is spoken and interact with a degree of fluency.",
    proficient:
      "You can express ideas fluently and spontaneously and can use the language flexibly for social, academic and professional purposes.",
  },
  writing: {
    basic:
      "You can read and write basic sentences and write and respond to basic questions about what is currently happening around you.",
    independent:
      "You can produce clear, detailed text on a wide range of subjects and explain the advantages and disadvantages of a topical issue.",
    proficient:
      "You can produce clear, well-structured, detailed text on complex subjects and can express yourself fluently and precisely.",
  },
};

const LanguageLevelDescription = ({
  type,
  languageLevel,
}: {
  type: "speaking" | "writing";
  languageLevel: LanguagePartLevel;
}): JSX.Element => {
  return <p>{LANGUAGE_LEVEL_DESCRIPTION_MAP[type][languageLevel]}</p>;
};

const AddLanguageForm = ({
  languageLevels,
  setLanguageLevels,
}: {
  languageLevels: LanguageLevel[];
  setLanguageLevels: (levels: LanguageLevel[]) => void;
}): JSX.Element => {
  const { addLanguageEl, addLanguage, setAddLanguage } = useSelect({
    label: "Add language",
    options: FIXME_LANGUAGES.filter(({ label }) => {
      return languageLevels.every(({ name }) => {
        return name !== label;
      });
    }),
  });

  const selectedLanguage: string = (addLanguage?.[0]?.label as string | undefined) ?? "";
  useChange(() => {
    if (selectedLanguage !== "") {
      setAddLanguage([]);
      setLanguageLevels([
        ...languageLevels,
        { name: selectedLanguage, speaking: "basic", writing: "basic" },
      ]);
    }
  }, [selectedLanguage]);

  return (
    <div className="mv32">
      <div style={{ maxWidth: 200 }}>{addLanguageEl}</div>
    </div>
  );
};

export default Index;
