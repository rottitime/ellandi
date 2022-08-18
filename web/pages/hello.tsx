import { Typography, Box } from '@mui/material'
import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import router from 'next/router'
import { useState } from 'react'
import Button from '@/components/UI/Button/Button'

const HelloPage = () => {
  const [output, setOutput] = useState('')

  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <p>NEXT_PUBLIC_ANALYTICS_ID: {process.env.NEXT_PUBLIC_ANALYTICS_ID}</p>
        <p>NODE_ENV: {process.env.NODE_ENV}</p>
        <p>NEXT_PUBLIC_API_URL: {process.env.NEXT_PUBLIC_API_URL}</p>

        <Button>Normallink</Button>
        <Button href="/">Normallink with href</Button>

        <Typography variant="display" gutterBottom>
          display Heading
        </Typography>

        <Typography variant="h1" gutterBottom>
          h1. Heading
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          subtitle1
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
        <Typography gutterBottom>
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
  <CardLayout title="Your details" progress={20}>
    {page}
  </CardLayout>
)
