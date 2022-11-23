import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import SimpleTable from '@/components/UI/SimpleTable/SimpleTable'
import { Typography, TableCellProps, styled } from '@mui/material'
import { RegisterUserResponse } from '@/service/api'
import { useState } from 'react'
import { IconButton } from '@mui/material'
import Icon from '@/components/Icon/Icon'
import Dialog from '@/components/UI/Dialogs/Dialog/Dialog'
import ContractTypeForm from '@/components/Form/Register/ContractTypeForm'
import GradeForm from '@/components/Form/Register/GradeForm/GradeForm'
import ProfessionForm from '@/components/Form/Register/ProfessionForm/ProfessionForm'
import PrimaryProfessionForm from '@/components/Form/Register/PrimaryProfessionForm'
import IsLineManagerForm from '@/components/Form/Register/IsLineManagerForm'
import IsMentorForm from '@/components/Form/Register/IsMentorForm'
import FunctionTypeForm from '@/components/Form/Register/FunctionTypeForm'
import RegisterDetailsForm from '@/components/Form/Register/RegisterDetailsForm/RegisterDetailsForm'
import { UpdateAccountPasswordForm } from '@/components/Form/UpdateAccountPasswordForm/UpdateAccountPasswordForm'
import { useProfile } from '@/hooks/useProfile'
import { professionsDisplayText } from '@/lib/data-utils'

const Table = styled(SimpleTable)`
  th {
    width: 29%;
  }
`

type AccountProfileModalsType =
  | 'personalDetails'
  | 'contractType'
  | 'grade'
  | 'profession'
  | 'primaryProfession'
  | 'functionType'
  | 'password'
  | 'isLineManager'
  | 'isMentor'

const ProfilePage = () => {
  const [buttonLoading, setButtonLoading] = useState(false)

  const {
    mutate,
    userProfile: data,
    isLoading,
    refetch
  } = useProfile<Partial<RegisterUserResponse>>({
    callback: () => {
      closeModal()
    }
  })

  const [activeModal, setActiveModal] = useState<{
    form: AccountProfileModalsType
    name: string
  }>(null)

  const closeModal = async () => {
    setButtonLoading(true)
    await refetch()
    setButtonLoading(false)
    setActiveModal(null)
  }

  const professions = professionsDisplayText(
    data?.primary_profession,
    data?.professions,
    data?.profession_other
  )

  const formProps = {
    onFormSubmit: (data) => mutate(data),
    defaultValues: data,
    onCancel: closeModal,
    buttonLoading
  }

  const renderTable = (
    list: {
      name: string
      value: string
      form?: AccountProfileModalsType
    }[] = []
  ) => (
    <Table
      list={[
        ...list.map<TableCellProps[]>(({ name, value, form }) => [
          { children: name, component: 'th' },
          { children: <Typography variant="body2">{value}</Typography> },
          {
            children: !!form ? (
              <IconButton
                color="primary"
                aria-label="edit"
                component="label"
                data-testid={`edit-button-${name}`}
                sx={{ color: 'text.primary' }}
                onClick={() => {
                  setActiveModal({
                    form,
                    name
                  })
                }}
              >
                <Icon icon="pencil" />
              </IconButton>
            ) : null,
            align: 'right'
          }
        ])
      ]}
    />
  )

  if (isLoading)
    return (
      <>
        {[...Array(2).keys()].map((i) => (
          <AccountCard loading={true} sx={{ mb: 4 }} key={i} />
        ))}
      </>
    )

  return (
    <div
      style={{
        maxWidth: '960px'
      }}
    >
      <AccountCard
        headerLogo="mail"
        header={
          <Typography variant="h1" component="h2">
            Email and password
          </Typography>
        }
        sx={{ mb: 4 }}
      >
        {renderTable([
          { name: 'Email address', value: data.email },
          { form: 'password', name: 'Password', value: '********' }
        ])}
      </AccountCard>

      <AccountCard
        headerLogo="profile"
        header={
          <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="h1" component="h2">
              Personal details
            </Typography>
            <IconButton
              color="primary"
              aria-label="edit"
              component="label"
              data-testid={`edit-button-personal-details`}
              sx={{ color: 'text.primary' }}
              onClick={() => {
                setActiveModal({
                  form: 'personalDetails',
                  name: 'Personal details'
                })
              }}
            >
              <Icon icon="pencil" />
            </IconButton>
          </div>
        }
        sx={{ mb: 4 }}
      >
        {renderTable([
          {
            name: 'Name',
            value: `${data.first_name} ${data.last_name}`
          },
          { name: 'Job title', value: data.job_title },
          { name: 'Business unit', value: data.business_unit },
          { name: 'Work location', value: data.location },
          {
            name: 'Line manager email address',
            value: data.line_manager_email
          }
        ])}
      </AccountCard>

      <AccountCard
        headerLogo="case"
        header={
          <Typography variant="h1" component="h2">
            Job details
          </Typography>
        }
        sx={{ mb: 4 }}
      >
        {renderTable([
          {
            form: 'grade',
            name: 'Grade',
            value: data.grade_other || data.grade
          },
          {
            form: 'primaryProfession',
            name: 'Primary profession',
            value: professions.primary_profession
          },
          {
            form: 'profession',
            name: 'Profession(s)',
            value: professions.professions
          },

          {
            form: 'functionType',
            name: 'Function',
            value: data.function_other || data.function
          },
          {
            form: 'contractType',
            name: 'Contract type',
            value: data.contract_type_other || data.contract_type
          },
          {
            form: 'isLineManager',
            name: 'Are you a line manager?',
            value: data.is_line_manager
          },
          {
            form: 'isMentor',
            name: 'Are you a mentor?',
            value: data.is_mentor
          }
        ])}
      </AccountCard>

      <Dialog
        title={`Change ${activeModal?.name}`}
        open={!!activeModal}
        onClose={() => {
          setActiveModal(null)
        }}
        data-testid="datagrid-edit-modal"
      >
        <>
          {activeModal?.form === 'password' && (
            <UpdateAccountPasswordForm
              onCancel={closeModal}
              callback={() => {
                closeModal()
              }}
            />
          )}
          {activeModal?.form === 'contractType' && <ContractTypeForm {...formProps} />}
          {activeModal?.form === 'grade' && <GradeForm {...formProps} />}
          {activeModal?.form === 'functionType' && <FunctionTypeForm {...formProps} />}

          {activeModal?.form === 'profession' && <ProfessionForm {...formProps} />}
          {activeModal?.form === 'primaryProfession' && (
            <PrimaryProfessionForm {...formProps} />
          )}
          {activeModal?.form === 'personalDetails' && (
            <RegisterDetailsForm {...formProps} />
          )}
          {activeModal?.form === 'isLineManager' && <IsLineManagerForm {...formProps} />}
          {activeModal?.form === 'isMentor' && <IsMentorForm {...formProps} />}
        </>
      </Dialog>
    </div>
  )
}

export default ProfilePage
ProfilePage.getLayout = (page) => (
  <AccountLayout
    breadcrumbs={[{ title: 'Profile' }]}
    title="Profile"
    titleIcon="profile"
    teaserHeadline="Welcome to your profile"
    teaserContent="You can manage your details including email, password, job title, profession and more"
  >
    {page}
  </AccountLayout>
)
