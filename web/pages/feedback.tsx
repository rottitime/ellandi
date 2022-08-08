import CardLayout from '@/components/Layout/CardLayout'
import FeedbackForm from '@/components/Form/FeedbackForm/FeedbackForm'
import { useState } from 'react'
import { Typography } from '@mui/material'
import { fetchFeedback } from '@/service/api'
import { useUiContext } from '@/context/UiContext'

const FeedbackPage = () => {
  const { setError } = useUiContext()
  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)

  return (
    <>
      {complete ? (
        <>
          <Typography variant="subtitle1" gutterBottom data-testid="success-message">
            Thank you, Lorem ipsum dolor sit amet.
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet ea qui tempora.
            Unde iure consequuntur eum aspernatur quo, eaque exercitationem!
          </Typography>
        </>
      ) : (
        <FeedbackForm
          loading={loading}
          onFormSubmit={async (data) => {
            // eslint-disable-next-line no-console
            setLoading(true)

            // eslint-disable-next-line no-console

            try {
              await fetchFeedback(data)
              setComplete(true)
            } catch (err) {
              setError(err.message)
            }

            setLoading(false)
          }}
        />
      )}
    </>
  )
}

export default FeedbackPage
FeedbackPage.getLayout = (page) => (
  <CardLayout title="Feedback and support">{page}</CardLayout>
)
