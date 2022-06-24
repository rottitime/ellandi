/* eslint-disable @next/next/no-img-element */
import { ReactNode } from 'react'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { NextPage } from 'next'

const ImageBg = styled(Box)`
  background-image: url(/images/test/landscape.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100%;
  width: 100%;
`

const Logo = styled(Box)`
  position: absolute;
  top: 40px;
  right: 0;
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Copyright(props: any) {
  return (
    <Typography
      color="text.secondary"
      align="center"
      sx={{ mt: 8, textAlign: 'right' }}
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="#">
        Lorem, ipsum dolor.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const SignInSide: NextPage<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid item xs={false} md={7} sx={{ position: 'relative' }}>
          <ImageBg />
        </Grid>

        <Grid item xs={12} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 12,
              mx: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left'
            }}
          >
            <Logo sx={{ mx: 6 }}>
              <img src="/images/crown.svg" alt="logo" />
            </Logo>
            {children}
            <Copyright />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default SignInSide
