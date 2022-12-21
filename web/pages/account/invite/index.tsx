import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Typography, Grid, styled } from '@mui/material'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import { InvitedMembers, InviteMember, Query } from '@/service/api'
import Button from '@/components/UI/Button/Button'
import { FormProvider, useForm } from 'react-hook-form'
import { Field } from '@/components/Form/Field/Field'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import SimpleTable from '@/components/UI/SimpleTable/SimpleTable'
import Icon from '@/components/Icon/Icon'
import useAuth from '@/hooks/useAuth'
import { useMutation, useQuery } from 'react-query'
import { fetchInvitedMembers, invitedMembers } from '@/service/account'
import Alert from '@/components/UI/Alert/Alert'

const GridConatiner = styled(Grid)`
  td svg {
    font-size: 20px;
  }
  .status-pending {
    color: ${(p) => p.theme.palette.warning.main};
  }

  .status-declined {
    color: ${(p) => p.theme.palette.error.main};
  }
`

const schema: SchemaOf<InviteMember> = object().shape({
  first_name: string().required('This is a required field'),
  email: string()
    .email('Enter an email address in the correct format, like name@example.com')
    .required('This is a required field')
})

const InvitePage = () => {
  const { authFetch } = useAuth()

  const { isLoading, data, refetch } = useQuery<InvitedMembers[]>(
    Query.InvitedMembers,
    () => authFetch(fetchInvitedMembers)
  )

  const {
    isLoading: isLoadingMutate,
    mutate,
    error
  } = useMutation<null, Error, InviteMember>(
    async (data) => authFetch(invitedMembers, data),
    {
      onSuccess: async (data) => {
        refetch()
        // queryClient.setQueryData(Query.Me, data)
        // setError(null)
        // router.push(nextUrl)
      }
    }
  )

  const methods = useForm<InviteMember>({
    defaultValues: { email: '', first_name: '' },
    resolver: yupResolver(schema)
  })

  return (
    <>
      <GridConatiner container spacing={2}>
        <Grid item xs={12} md={4}>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit((d) => {
                console.log({ d })
              })}
              noValidate
            >
              <AccountCard
                header={<Typography variant="h2">Invite a member</Typography>}
                action={
                  <Button color="primary" type="submit">
                    Invite
                  </Button>
                }
              >
                {error && (
                  <Alert severity="error" sx={{ mb: 3 }} data-testid="error-message">
                    {error?.message}
                  </Alert>
                )}
                <Field>
                  <TextFieldControlled name="email" type="email" label="Email address" />
                </Field>
                <Field>
                  <TextFieldControlled name="first_name" label="First name" />
                </Field>
              </AccountCard>
            </form>
          </FormProvider>
        </Grid>
        {true && (
          <Grid item xs={12} md={8}>
            <AccountCard header={<Typography variant="h2">Your invites</Typography>}>
              <SimpleTable
                list={mockResponse}
                // list={data.map(({ email, status }) => {
                //   return [
                //     { children: email },
                //     {
                //       children: (
                //         <Icon
                //           className={`status-${status}`}
                //           icon={
                //             status === 'accepted'
                //               ? 'tick'
                //               : status === 'declined'
                //               ? 'cross'
                //               : 'hourglass'
                //           }
                //         />
                //       ),
                //       align: 'right'
                //     }
                //   ]
                // })}
              />
            </AccountCard>
          </Grid>
        )}
      </GridConatiner>
    </>
  )
}

export default InvitePage

InvitePage.getLayout = (page) => (
  <AccountLayout
    title="Invite members"
    teaserContent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, quisquam?"
  >
    {page}
  </AccountLayout>
)

const mockResponse = [
  [
    { children: 'dedesomething@test.com' },
    { children: <Icon icon="hourglass" className={`status-pending`} />, align: 'right' }
  ],
  [
    { children: 'dedesomething@test.com' },
    { children: <Icon icon="tick" className={`status-accepted`} />, align: 'right' }
  ],
  [
    { children: 'dedesomething@test.com' },
    { children: <Icon icon="cross" className={`status-declined`} />, align: 'right' }
  ]
]
