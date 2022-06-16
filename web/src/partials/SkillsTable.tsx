import { Table } from "baseui/table";
import { useDeepState } from "_/hooks/useDeepState";
import { Select, Value } from "baseui/select";
import { Link } from "_/components/Link";
import { NotVerified } from "_/components/LucideExtensions";
import { Verified } from "lucide-react";
import { StarRating } from "baseui/rating";

const SORT_OPTIONS = [
  {
    id: "Most recent",
    label: "Most recent",
  },
];

export type Level =
  | "not-added"
  | "not-set"
  | "l0"
  | "l1"
  | "l2"
  | "l3"
  | "s0"
  | "s1"
  | "s2"
  | "s3"
  | "s4"
  | "s5";

export const SkillsTable = <T extends Level>({
  data,
}: {
  data: Array<{
    id: string;
    name: string;
    level: T;
    isValidated: boolean;
  }>;
}) => {
  const [sort, setSort] = useDeepState<Value>([SORT_OPTIONS[0]]);

  return (
    <div>
      <div
        className="mb24"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="mr8 PL-XS">Sort by:</div>
        <div style={{ width: 200 }}>
          <Select
            value={sort}
            size="compact"
            onChange={({ value }) => {
              if (value.length > 0) {
                setSort(value);
              }
            }}
            options={SORT_OPTIONS}
            searchable={false}
            escapeClearsValue={false}
            clearable={false}
          />
        </div>
      </div>
      <Table
        columns={["Skill", "Skill level", "Validated"]}
        data={data
          .filter(({ level }) => {
            return level !== "not-added";
          })
          .map(({ id, name, level: level_, isValidated }) => {
            const level = level_ as Exclude<typeof level_, "not-added">;
            return [
              <Link key="skill" to={`?view=${id}`}>
                {name}
              </Link>,
              <div key="level" style={{ textAlign: "center" }}>
                <LevelBadge level={level} />
              </div>,
              <div key="verified">
                {isValidated ? <Verified size="28" /> : <NotVerified size="28" />}
              </div>,
            ];
          })}
      />
    </div>
  );
};

const LEVEL_LABEL_MAP: Record<
  "not-added" | "not-set" | "l0" | "l1" | "l2" | "l3" | "s0",
  string
> = {
  "not-added": "NOT ADDED",
  "not-set": "NOT SET",
  l0: "NONE",
  l1: "BASIC",
  l2: "INDEPENDENT",
  l3: "PROFICIENT",
  s0: "NONE",
};

const LevelBadge = ({ level }: { level: Level }) => {
  let style: React.CSSProperties = {
    background: "var(--mono300)",
    color: "var(--mono800)",
  };

  switch (level) {
    case "l0":
      style = {
        background: "var(--mono300)",
        color: "var(--mono800)",
      };
      break;
    case "l1":
      style = {
        background: "var(--primary500)",
        color: "var(--mono100)",
      };
      break;
    case "l2":
      style = {
        background: "var(--primary600)",
        color: "var(--mono100)",
      };
      break;
    case "l3":
      style = {
        background: "var(--primary700)",
        color: "var(--mono100)",
      };
      break;
    case "s0":
    case "s1":
    case "s2":
    case "s3":
    case "s4":
    case "s5":
      style = {
        background: "var(--mono900)",
        color: "var(--mono100)",
      };
      break;
  }

  if (
    level === "s1" ||
    level === "s2" ||
    level === "s3" ||
    level === "s4" ||
    level === "s5"
  ) {
    const value = Number.parseInt(level.slice(1));
    return (
      <div
        style={{
          textAlign: "center",
          fontSize: 16,
          height: 22,
          width: 120,
        }}
      >
        <StarRating
          numItems={5}
          size={20}
          value={value}
          readOnly
          overrides={{
            Root: {
              style: {
                margin: 0,
              },
            },
            Item: {
              style: {
                marginRight: "2px",
              },
            },
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "inline-block",
        textAlign: "center",
        fontSize: 14,
        padding: "1px 4px",
        fontWeight: "bold",
        height: 22,
        width: 120,
        ...style,
      }}
    >
      {LEVEL_LABEL_MAP[level]}
    </div>
  );
};
