import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import SimpleTable from '@/components/UI/SimpleTable/SimpleTable'
import { Typography, TableCellProps, styled } from '@mui/material'
import { useQuery } from 'react-query'
import { fetchMe } from '@/service/me'
import { Query, RegisterUserResponse } from '@/service/api'
import useAuth from '@/hooks/useAuth'
import { useMemo, useState } from 'react'
import { IconButton } from '@mui/material'
import Icon from '@/components/Icon/Icon'
import Dialog from '@/components/UI/Dialogs/Dialog/Dialog'
import ContractTypeForm from '@/components/Form/Register/ContractTypeForm'
import GradeForm from '@/components/Form/Register/GradeForm/GradeForm'
import ProfessionForm from '@/components/Form/Register/ProfessionForm'
import PrimaryProfessionForm from '@/components/Form/Register/PrimaryProfessionForm'
import FunctionTypeForm from '@/components/Form/Register/FunctionTypeForm'
import RegisterDetailsForm from '@/components/Form/Register/RegisterDetailsForm/RegisterDetailsForm'
import { UpdateAccountPasswordForm } from '@/components/Form/UpdateAccountPasswordForm/UpdateAccountPasswordForm'
import { useProfile } from '@/hooks/useProfile'

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

const ProfilePage = () => {
  const { authFetch } = useAuth()
  const { isLoading, data, refetch } = useQuery<RegisterUserResponse>(Query.Me, () =>
    authFetch(fetchMe)
  )
  const [activeModal, setActiveModal] = useState<{
    form: AccountProfileModalsType
    name: string
  }>(null)

  const closeModal = () => {
    setActiveModal(null)
    refetch()
  }

  const professions = useMemo(
    () =>
      data?.professions.map((profession) => {
        if (profession.toLowerCase() === 'other') return data.profession_other
        return profession
      }) || [],
    [data]
  )

  const { mutate, userProfile } = useProfile<Partial<RegisterUserResponse>>({
    callback: () => {
      closeModal()
    }
  })

  const formProps = {
    onFormSubmit: (data) => mutate(data),
    defaultValues: userProfile,
    onCancel: closeModal
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
        ...list
          .filter(({ name, value }) => !(name == 'Primary profession' && !value))
          .map<TableCellProps[]>(({ name, value, form }) => [
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
            name: 'Line manager email',
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
            form: 'profession',
            name: 'Profession(s)',
            value: professions.join(', ')
          },
          {
            form: 'primaryProfession',
            name: 'Primary profession',
            value: professions.length > 1 && data.primary_profession
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
