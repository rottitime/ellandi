import { Button, Heading, Link, Table, Tabs } from "govuk-react";
import { Layout } from "_/components/Layouts";
import styled from "styled-components";
import { useState } from "react";

const IconSkills = styled.img`
  display: inline-block;
  vertical-align: middle;
  margin-right: 12px;
`;

const Cell = styled(Table.Cell)`
  vertical-align: middle;
`;

const BlueButton = styled(Button)`
  background-color: #1d70b8;
  margin: 0;
`;

const Page = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Layout backLink={true}>
      <Tabs>
        <Tabs.Title>Contents</Tabs.Title>
        <Tabs.List>
          <Tabs.Tab
            href="#0"
            selected={tabIndex === 0}
            onClick={() => {
              return setTabIndex(0);
            }}
          >
            Your skills
          </Tabs.Tab>
          <Tabs.Tab
            href="#1"
            selected={tabIndex === 1}
            onClick={() => {
              return setTabIndex(1);
            }}
          >
            Language skills
          </Tabs.Tab>
          <Tabs.Tab
            href="#2"
            selected={tabIndex === 2}
            onClick={() => {
              return setTabIndex(2);
            }}
          >
            Skills you'd like to develop
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel id="0" selected={tabIndex === 0}>
          <Heading size="LARGE">
            <IconSkills src="/images/skills.svg" />
            Skills
          </Heading>
          <Table
            head={
              <Table.Row>
                <Table.CellHeader>Skill</Table.CellHeader>
                <Table.CellHeader>Skill level</Table.CellHeader>
                <Table.CellHeader>Validated</Table.CellHeader>
              </Table.Row>
            }
          >
            <Table.Row>
              <Cell>Auditing</Cell>
              <Cell>Not set</Cell>
              <Cell>
                <IconSkills src="/images/status_closed.svg" alt="closed" />
                <Link href="#">Set skill level</Link>
              </Cell>
            </Table.Row>
            <Table.Row>
              <Cell>Bookkeeping</Cell>
              <Cell>Not set</Cell>
              <Cell>
                <IconSkills src="/images/status_closed.svg" alt="closed" />
                <Link href="#">Set skill level</Link>
              </Cell>
            </Table.Row>
            <Table.Row>
              <Cell>Communication</Cell>
              <Cell>Not set</Cell>
              <Cell>
                <IconSkills src="/images/status_closed.svg" alt="closed" />
                <Link href="#">Set skill level</Link>
              </Cell>
            </Table.Row>
            <Table.Row>
              <Cell>Design</Cell>
              <Cell>Not set</Cell>
              <Cell>
                <IconSkills src="/images/status_closed.svg" alt="closed" />
                <Link href="#">Set skill level</Link>
              </Cell>
            </Table.Row>
            <Table.Row>
              <Cell>Enthusiasm</Cell>
              <Cell>Not set</Cell>
              <Cell>
                <IconSkills src="/images/status_closed.svg" alt="closed" />
                <Link href="#">Set skill level</Link>
              </Cell>
            </Table.Row>
            <Table.Row>
              <Cell>Microsoft Office</Cell>
              <Cell>Not set</Cell>
              <Cell>
                <IconSkills src="/images/status_closed.svg" alt="closed" />
                <Link href="#">Set skill level</Link>
              </Cell>
            </Table.Row>
            <Table.Row>
              <Cell>Negotiation</Cell>
              <Cell>Not set</Cell>
              <Cell>
                <IconSkills src="/images/status_closed.svg" alt="closed" />
                <Link href="#">Set skill level</Link>
              </Cell>
            </Table.Row>
            <Table.Row>
              <Cell>Project management</Cell>
              <Cell>Not set</Cell>
              <Cell>
                <IconSkills src="/images/status_closed.svg" alt="closed" />
                <Link href="#">Set skill level</Link>
              </Cell>
            </Table.Row>
          </Table>
        </Tabs.Panel>

        <Tabs.Panel id="1" selected={tabIndex === 1}>
          <Heading size="LARGE">
            <IconSkills src="/images/skills.svg" />
            Language skills
          </Heading>

          <Table
            head={
              <Table.Row>
                <Table.CellHeader>Skill</Table.CellHeader>
                <Table.CellHeader>Speaking</Table.CellHeader>
                <Table.CellHeader>Writing</Table.CellHeader>
                <Table.CellHeader>&nbsp;</Table.CellHeader>
              </Table.Row>
            }
          >
            <Table.Row>
              <Cell>English</Cell>
              <Cell>
                <BlueButton>PROFICIENT</BlueButton>
              </Cell>
              <Cell>
                <BlueButton>PROFICIENT</BlueButton>
              </Cell>
              <Cell>
                <Link href="#">Change</Link>
              </Cell>
            </Table.Row>
            <Table.Row>
              <Cell>French</Cell>
              <Cell>
                <BlueButton>BASIC</BlueButton>
              </Cell>
              <Cell>
                <BlueButton>INDEPENDENT</BlueButton>
              </Cell>
              <Cell>
                <Link href="#">Change</Link>
              </Cell>
            </Table.Row>
          </Table>
        </Tabs.Panel>

        <Tabs.Panel id="2" selected={tabIndex === 2}>
          <Heading size="LARGE">2</Heading>
        </Tabs.Panel>
      </Tabs>
    </Layout>
  );
};

export default Page;
