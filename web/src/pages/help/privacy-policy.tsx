import PlainLayout from '@/components/Layout/PlainLayout/PlainLayout'
import { Link, styled, Typography } from '@mui/material'

const Section = styled('section')`
  margin-bottom: ${(p) => p.theme.spacing(4)};
`

const PrivacyPage = () => (
  <>
    <Section>
      <Typography gutterBottom>
        For the Skills and Learning Service, we process the following personal data:
      </Typography>

      <Typography gutterBottom>
        Your personal contact details. For example, your name and email address.
      </Typography>

      <Typography gutterBottom>Your manager's email address.</Typography>

      <Typography>Your job details, including:</Typography>
      <ul>
        <li>business unit</li>
        <li>contract type</li>
        <li>function</li>
        <li>grade</li>
        <li>job title</li>
        <li>profession</li>
        <li>work location</li>
      </ul>

      <Typography gutterBottom>
        Details about your use of the Skills and Learning Service. For example, the
        learning you've taken and any skills you have or would like to develop.
      </Typography>

      <Typography gutterBottom>
        Your feedback. For example, evaluation feedback that you've given and survey
        responses.
      </Typography>

      <Typography gutterBottom>
        For internal communications, we process your name, email address, organisation and
        grade. This information may be used to create a departmental Organogram.
      </Typography>
    </Section>

    <Section>
      <Typography variant="h2" gutterBottom>
        Purpose
      </Typography>

      <Typography>
        We process your personal data to provide mandatory and optional learning and
        development services. This includes:
      </Typography>

      <ul>
        <li>suggesting learning and development opportunities based on your profile</li>
        <li>tracking your learning and development activity</li>
        <li>monitoring learning and development participation rates</li>
        <li>
          providing management information to employer departments and profession teams
        </li>
      </ul>

      <Typography gutterBottom>
        We also process your data to develop and improve our service. For example, through
        your feedback.
      </Typography>

      <Typography>
        The Cabinet Office will have limited sight of the data. They will only communicate
        on issues affecting the Civil Service in general using:
      </Typography>
      <ul>
        <li>name</li>
        <li>email address</li>
        <li>organisation</li>
        <li>grade data </li>
      </ul>
    </Section>

    <Section>
      <Typography variant="h2" gutterBottom>
        Legal basis of processing
      </Typography>

      <Typography gutterBottom>
        The legal basis for processing your data is that it is necessary for the
        performance of a task, which is carried out in the public interest or in the
        exercise of official authority vested in the controller. In this case that is our
        function to provide the Civil Service with access to learning and development
        opportunities, as well as a skills and learning record.
      </Typography>

      <Typography gutterBottom>
        We also process your data on the legal basis that it is necessary, as part of your
        contract of employment, for us to provide you with access to learning and
        development opportunities.
      </Typography>

      <Typography>We also process your data so that we can:</Typography>
      <ul>
        <li>monitor your personal development</li>
        <li>manage your performance as part of your employment contract</li>
      </ul>
    </Section>

    <Section>
      <Typography variant="h2" gutterBottom>
        Recipients
      </Typography>

      <Typography>Personal data may be shared by the Cabinet Office with:</Typography>
      <ul>
        <li>Your department</li>
        <li>Civil Service profession and function teams</li>
      </ul>

      <Typography gutterBottom>
        Email addresses, names, grades and organisations will be shared with the central
        communication team in government. This enables sending of messages to all Civil
        and Public Servants.
      </Typography>

      <Typography gutterBottom>
        Your personal data will be stored on our IT infrastructure. It will be shared with
        our technical suppliers and learning providers. This includes their approved
        staff.
      </Typography>
    </Section>

    <Section>
      <Typography variant="h2" gutterBottom>
        Retention
      </Typography>

      <Typography gutterBottom>
        Management information will be retained by the Cabinet Office for no more than 3
        financial years. Your department may keep data for reporting beyond this period.
      </Typography>

      <Typography gutterBottom>
        If you have not accessed the Skills and Learning Service for a minimum period of 2
        years and 60 days, your personal data and skills and learning record will be
        deleted.
      </Typography>
    </Section>

    <Section>
      <Typography variant="h2" gutterBottom>
        Your rights
      </Typography>

      <Typography>You have the right to request:</Typography>
      <ul>
        <li>information about how your personal data is processed. </li>
        <li>any inaccuracies in your personal data are rectified without delay</li>
        <li>
          completion of any incomplete personal data. Including by means of a
          supplementary statement
        </li>
        <li>
          erasure of your personal data if there is no longer a justification for it to be
          processed
        </li>
        <li>
          to object to the processing of your personal data. This is where it is processed
          for direct marketing purposes.
        </li>
        <li>
          a copy of any personal data you have provided. For this to be in a structured,
          common, and machine-readable format.
        </li>
        <li>
          to request that the processing of your personal data is restricted in certain
          circumstances. For example, where accuracy is contested.
        </li>
      </ul>
    </Section>

    <Section>
      <Typography variant="h2" gutterBottom>
        International transfers
      </Typography>

      <Typography gutterBottom>
        As your personal data is stored on our IT infrastructure, and shared with our data
        processors who provide email, and document management and storage services, it may
        be transferred and stored securely outside the European Economic Area. Where that
        is the case it will be subject to equivalent legal protection through the use of
        Model Contract Clauses.
      </Typography>
    </Section>
    <Section>
      <Typography variant="h2" gutterBottom>
        Complaints
      </Typography>

      <Typography gutterBottom>
        If you consider that your personal data has been misused or mishandled, you may
        make a complaint to the Information Commissioner. They are an independent
        regulator. You can contact The Information Commissioner at:
      </Typography>

      <Typography gutterBottom>
        Information Commissioner's Office
        <br />
        Wycliffe House
        <br />
        Water Lane
        <br />
        Wilmslow
        <br />
        Cheshire
        <br />
        SK9 5AF
      </Typography>

      <Typography gutterBottom>Tel: 0303 123 1113</Typography>

      <Typography gutterBottom>
        Email:{' '}
        <Link href="mailto:casework@ico.org.uk" target="_blank">
          casework@ico.org.uk
        </Link>
      </Typography>

      <Typography gutterBottom>
        Complaints to the Information Commissioner are without prejudice to your right to
        seek redress through the courts.
      </Typography>
    </Section>

    <Section>
      <Typography variant="h2" gutterBottom>
        Contact details
      </Typography>

      <Typography gutterBottom>
        The data controller for your data will vary depending on the data collected:
      </Typography>

      <Typography>The Cabinet Office is the data controller for your:</Typography>
      <ul>
        <li>profile</li>
        <li>email services</li>
        <li>evaluations</li>
        <li>feedback</li>
        <li>coaching and mentoring </li>
      </ul>

      <Typography gutterBottom>
        The Cabinet Office and the department who employs you are joint data controllers
        for:
      </Typography>

      <ul>
        <li>your learning record</li>
        <li>your learning and development plans</li>
        <li>bookings and management information</li>
      </ul>

      <Typography gutterBottom>
        Cabinet Office Skills and Learning
        <br />
        Cabinet Office
        <br />
        70 Whitehall
        <br />
        London
        <br />
        SW1A 2AS
      </Typography>

      <Typography gutterBottom>
        Email:{' '}
        <Link href="mailto:support-ellandi@cabinetoffice.gov.uk" target="_blank">
          support-ellandi@cabinetoffice.gov.uk
        </Link>
      </Typography>

      <Typography gutterBottom>
        Please contact us if you have any queries relating to your rights and how we use
        your personal data.
      </Typography>

      <Typography gutterBottom>
        The contact details for the lead data controller's Data Protection Officer are:
        Data Protection Officer
        <br />
        Cabinet Office
        <br />
        70 Whitehall
        <br />
        London
        <br />
        SW1A 2AS
      </Typography>

      <Typography gutterBottom>
        Email:{' '}
        <Link href="mailto:dpo@cabinetoffice.gov.uk" target="_blank">
          dpo@cabinetoffice.gov.uk
        </Link>
      </Typography>

      <Typography gutterBottom>
        The Data Protection Officer provides independent advice. They monitor the Cabinet
        Office's use of personal information.
      </Typography>
    </Section>
  </>
)

export default PrivacyPage
PrivacyPage.getLayout = (page) => <PlainLayout title="Privacy policy">{page}</PlainLayout>
