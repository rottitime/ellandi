import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Typography, Grid } from '@mui/material'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import { InviteMember } from '@/service/api'
import Button from '@/components/UI/Button/Button'
import { FormProvider, useForm } from 'react-hook-form'
import { Field } from '@/components/Form/Field/Field'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { object, SchemaOf, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import SimpleTable from '@/components/UI/SimpleTable/SimpleTable'
import Icon from '@/components/Icon/Icon'

const schema: SchemaOf<InviteMember> = object().shape({
  first_name: string().required('This is a required field'),
  email: string()
    .email('Enter an email address in the correct format, like name@example.com')
    .required('This is a required field')
})

const InvitePage = () => {
  const methods = useForm<InviteMember>({
    defaultValues: { email: '', first_name: '' },
    resolver: yupResolver(schema)
  })

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit((d) => {
                console.log({ d })
              })}
              noValidate
            >
              <AccountCard
                header={
                  <Typography variant="h2" gutterBottom>
                    Invite a member
                  </Typography>
                }
                action={
                  <Button color="primary" type="submit">
                    Invite
                  </Button>
                }
              >
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
        <Grid item xs={12} md={8}>
          <AccountCard
            header={
              <Typography variant="h2" gutterBottom>
                Your invites
              </Typography>
            }
          >
            <SimpleTable
              headers={[{ children: 'Users' }, { children: null }]}
              list={[
                [
                  { children: 'dedesomething@test.com' },
                  { children: <Icon icon="hourglass" />, align: 'right' }
                ],
                [
                  { children: 'dedesomething@test.com' },
                  { children: <Icon icon="tick" />, align: 'right' }
                ]
                // [
                //   { children: 'dedesomething@test.com' },
                //   { children: <Icon icon="" />, align: 'right' }
                // ]
              ]}
            />
          </AccountCard>
        </Grid>
      </Grid>
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
