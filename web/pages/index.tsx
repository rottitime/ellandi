import Page from '@/components/Page'
import {
  Link,
  Alert,
  AlertTitle,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Skeleton
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { ExpandMore } from '@mui/icons-material'

import { useEffect, useState } from 'react'

const boxData = [
  {
    title: 'Skills',
    content:
      'Update your skills profile to find learning and development opportunities tailored to you',
    image:
      'https://media.istockphoto.com/photos/skills-learning-personal-development-finance-competency-business-picture-id1319404394?b=1&k=20&m=1319404394&s=170667a&w=0&h=e7hL3jnIwoiQpDRS7TLq0VqR1l_fhUQxfg-B67UvEUI=',
    link: 'Review your skills'
  },
  {
    title: 'Learning',
    content: 'Explore the wide variety of learning and training courses available to you',
    image:
      'https://media.istockphoto.com/photos/elearning-online-education-or-internet-encyclopedia-concept-open-and-picture-id1263424631?k=20&m=1263424631&s=612x612&w=0&h=c5wajCCDdnUiyJ-QoixZbyVUSB40bP2Z8xFYUbuoyTA=',
    link: 'Find learning'
  },
  {
    title: 'Careers',
    content:
      'View current job vacancies and career pathways to discover what they involve',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Careers_blackboard.jpg',
    link: 'Plan your career'
  },
  {
    title: 'Communities',
    content:
      'Discuss ideas and share best practice with specific professions and functions',
    image:
      'https://www.kantar.com/-/media/project/kantar/global/campaigns/profiles/community-research-crop.jpg?h=1000&w=1500&hash=6E7AACC66AF3DD22A33BB23D60313237',
    link: 'Access communities'
  }
]

const IndexPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => {
      enqueueSnackbar('Lorem, ipsum dolor.', { variant: 'success' })
    }, 1000)
    const timer2 = setTimeout(() => {
      enqueueSnackbar('Amet consectetur adipisicing', { variant: 'info' })
      setLoaded(true)
    }, 2000)
    const timer3 = setTimeout(() => {
      enqueueSnackbar('Elit. Repellat?', { variant: 'default' })
    }, 3000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [enqueueSnackbar])

  return (
    <Page>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Account
        </Link>
        <Typography color="text.primary">Breadcrumbs</Typography>
      </Breadcrumbs>
      {/* <Box style={{ display: 'flex', columnGap: '10px' }}>
        <Box sx={{ mb: 5 }}>
          <TextField
            id="standard-basic"
            label="Standard"
            variant="standard"
            placeholder="Your search term"
          />

          <Button variant="contained" size="small">
            Contained
          </Button>
        </Box>
      </Box>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="All" control={<Radio />} label="All" />
        <FormControlLabel value="Skills" control={<Radio />} label="Skills" />
        <FormControlLabel value="Learning" control={<Radio />} label="Learning" />
        <FormControlLabel value="Careers" control={<Radio />} label="Careers" />
        <FormControlLabel
          value="Communities"
          disabled
          control={<Radio />}
          label="Communities"
        />
      </RadioGroup> */}

      <Box sx={{ mb: 6 }}>
        <Typography variant="h1" sx={{ mb: 4 }}>
          Welcome, Joe
        </Typography>
        <Typography gutterBottom>
          Use this service to add and review skills, view learning opportunities, plan
          your career pathway and keep up to date with communities.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Card sx={{ padding: '20px', height: '100%' }}>
            <Alert severity="info">
              <AlertTitle>Latest updates</AlertTitle>
              <ul>
                <li>
                  You currently have no skills on your profile. Try adding a new skill
                </li>
                <li>You need to complete your DDAT assessment</li>
                <li>
                  Government as a platform has been added as a new course Clear latest
                  updates
                </li>
              </ul>
            </Alert>
            <Box sx={{ padding: '30px' }}>
              <Divider variant="middle" />
            </Box>

            <Typography variant="h3" sx={{ mb: 3 }}>
              Browse learning strands
            </Typography>

            {[
              'Foundations of public admin',
              'Working in government',
              'Leading and managing',
              'Specialist skills',
              'Domain knowledge'
            ].map((item, i) => (
              <Accordion key={item}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls={`panel${i}a-content`}
                  id={`panel${i}a-header`}
                >
                  <Typography>{item}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card sx={{ padding: '20px', height: '100%' }}>
            <Grid container spacing={4}>
              {boxData.map((data) => (
                <Grid item xs={4} key={data.title}>
                  {loaded ? (
                    <Card style={{ height: '100%' }} elevation={1}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={data.image}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h3" component="div">
                          {data.title}
                        </Typography>
                        <Typography color="text.secondary">{data.content}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">{data.link}</Button>
                      </CardActions>
                    </Card>
                  ) : (
                    <>
                      <Skeleton variant="rectangular" width="100%" height={140} />
                      <Skeleton />
                      <Skeleton />
                      <Skeleton width="60%" />
                    </>
                  )}
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Page>
  )
}

export default IndexPage
