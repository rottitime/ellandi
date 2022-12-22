import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Avatar, Box, Grid, IconButton, styled } from '@mui/material'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import { InvitedMembers, InviteMember, Query } from '@/service/api'
import Button from '@/components/UI/Button/Button'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Field } from '@/components/Form/Field/Field'
import { array, object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import SimpleTable from '@/components/UI/SimpleTable/SimpleTable'
import Icon from '@/components/Icon/Icon'
import useAuth from '@/hooks/useAuth'
import { useMutation, useQuery } from 'react-query'
import { fetchInvites, sendInvites } from '@/service/account'
import Alert from '@/components/UI/Alert/Alert'
import Typography from '@/components/UI/Typography/Typography'
import { Cancel } from '@mui/icons-material'
import TextField from '@/components/Form/TextField/TextField'

type Schema = { members: InviteMember[] }

const GridConatiner = styled(Grid)`
  td svg {
    font-size: 25px;
  }

  .status-declined {
    color: ${(p) => p.theme.palette.error.main};
  }

  .row {
    display: flex;
    gap: ${(p) => p.theme.spacing(3)};
    align-items: flex-start;
    margin-bottom: ${(p) => p.theme.spacing(2)};
  }
`

const membersSchema: SchemaOf<InviteMember> = object().shape({
  first_name: string().required('This is a required field'),
  email: string()
    .email('Enter an email address in the correct format, like name@example.com')
    .required('This is a required field')
})

const schema: SchemaOf<Schema> = object().shape({
  members: array().of(membersSchema).min(1, 'This is a required field')
})

const InvitePage = () => {
  const { authFetch } = useAuth()
  const { isLoading, data, refetch } = useQuery<InvitedMembers[]>(
    Query.InvitedMembers,
    () => authFetch(fetchInvites)
  )

  const {
    isLoading: isLoadingMutate,
    mutate,
    error
  } = useMutation<null, Error, InviteMember[]>(
    async (data) => authFetch(sendInvites, data),
    { onSuccess: async () => await refetch() }
  )

  const methods = useForm<Schema>({
    defaultValues: { members: [{ first_name: '', email: '' }] },
    resolver: yupResolver(schema)
  })
  const { control, handleSubmit } = methods

  const { fields, append, remove } = useFieldArray<Schema, 'members'>({
    control: control,
    name: 'members'
  })

  return (
    <GridConatiner container spacing={4}>
      <Grid item xs={12} md={7}>
        <FormProvider {...methods}>
          <form
            data-testid="invite-form"
            onSubmit={handleSubmit((data) => mutate(data.members))}
            noValidate
          >
            <AccountCard
              header={<Typography variant="h2">Invite new members</Typography>}
              action={
                <Button
                  data-testid="invite-submit"
                  color="primary"
                  type="submit"
                  loading={isLoadingMutate}
                >
                  Invite
                </Button>
              }
            >
              {error && (
                <Alert severity="error" sx={{ mb: 3 }} data-testid="error-message">
                  {error?.message}
                </Alert>
              )}

              {fields.map((item, index) => (
                <Box className="row" key={item.id}>
                  <Controller
                    name={`members.${index}.email`}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        size="small"
                        type="email"
                        label="Email address"
                        inputProps={{ 'data-testid': `textfield_members.${index}.email` }}
                        error={!!error}
                        helperText={!!error && error.message}
                        fullWidth
                        autoFocus
                      />
                    )}
                  />
                  <Controller
                    name={`members.${index}.first_name`}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        size="small"
                        label="First name"
                        inputProps={{
                          'data-testid': `textfield_members.${index}.first_name`
                        }}
                        error={!!error}
                        helperText={!!error && error.message}
                        fullWidth
                      />
                    )}
                  />

                  <IconButton
                    aria-label="Remove"
                    type="button"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    <Cancel />
                  </IconButton>
                </Box>
              ))}

              <Field>
                <Button
                  startIcon={<Icon icon="circle-plus" />}
                  onClick={() => append({ first_name: '', email: '' })}
                >
                  Add member
                </Button>
              </Field>
            </AccountCard>
          </form>
        </FormProvider>
      </Grid>
      {!!data?.length && (
        <Grid item xs={12} md={5} data-testid="list-invites">
          <AccountCard header={<Typography variant="h2">Your invites</Typography>}>
            <SimpleTable
              loading={isLoading}
              list={data.map(({ email, first_name, status }) => {
                return [
                  {
                    children: <Avatar>{first_name.charAt(0).toUpperCase()}</Avatar>,
                    width: 60
                  },
                  {
                    children: (
                      <Typography variant="body2" pending={status === 'Pending'}>
                        {first_name}
                        <br />
                        {email}
                      </Typography>
                    ),
                    title: status
                  },

                  {
                    children: (
                      <Icon
                        title={status}
                        className={`status-${status.toLowerCase()}`}
                        icon={
                          status.toLowerCase() === 'accepted'
                            ? 'tick'
                            : status.toLowerCase() === 'declined'
                            ? 'cross'
                            : 'hourglass'
                        }
                      />
                    ),
                    align: 'right'
                  }
                ]
              })}
            />
          </AccountCard>
        </Grid>
      )}
    </GridConatiner>
  )
}

export default InvitePage

InvitePage.getLayout = (page) => (
  <AccountLayout
    title="Invite new members"
    teaserContent="Send invitation links to team members"
  >
    {page}
  </AccountLayout>
)
