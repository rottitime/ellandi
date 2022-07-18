import { Typography, Box } from '@mui/material'
import GenericPage from '@/components/Layout/GenericPage'
import router from 'next/router'
import { useState } from 'react'

const HelloPage = () => {
  const [output, setOutput] = useState('')

  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <p>NEXT_PUBLIC_ANALYTICS_ID: {process.env.NEXT_PUBLIC_ANALYTICS_ID}</p>
        <p>NODE_ENV: {process.env.NODE_ENV}</p>
        <p>NEXT_PUBLIC_API_URL: {process.env.NEXT_PUBLIC_API_URL}</p>

        <Typography variant="leader" gutterBottom>
          Leader Heading
        </Typography>

        <Typography variant="h1" gutterBottom>
          h1. Heading
        </Typography>
        <Typography variant="h2" gutterBottom>
          h2. Heading
        </Typography>
        <Typography variant="h3" gutterBottom>
          h3. Heading
        </Typography>
        {/* <Typography variant="h4" gutterBottom >
    h4. Heading
  </Typography>
  <Typography variant="h5" gutterBottom >
    h5. Heading
  </Typography>
  <Typography variant="h6" gutterBottom >
    h6. Heading
  </Typography> */}
        <Typography variant="subtitle1" gutterBottom>
          subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur
        </Typography>
        {/* <Typography variant="subtitle2" gutterBottom >
    subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
    blanditiis tenetur
  </Typography> */}
        <Typography variant="body1" gutterBottom>
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
          tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus,
          cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem
          quibusdam.
        </Typography>
        <Typography variant="body2" gutterBottom>
          body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
          tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus,
          cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem
          quibusdam.
        </Typography>
        <Typography variant="button" display="block" gutterBottom>
          button text
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          caption text
        </Typography>
        {/* <Typography variant="overline" display="block" gutterBottom>
    overline text
  </Typography> */}

        <button data-testid="button" onClick={() => setOutput('done')}>
          test button
        </button>

        <button
          data-testid="route-button"
          onClick={() => {
            router.push(`/register`)
          }}
        >
          test Route
        </button>
        <div data-testid="output">{output}</div>
      </Box>
    </>
  )
}

export default HelloPage

HelloPage.getLayout = (page) => (
  <GenericPage title="Your details" progress={20}>
    {page}
  </GenericPage>
)
