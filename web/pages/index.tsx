import Page from '@/components/Page'
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Paper
} from '@mui/material'

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

const IndexPage = () => (
  <Page>
    <Box style={{ display: 'flex', columnGap: '10px' }}>
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
    </RadioGroup>

    <Typography variant="h4">Welcome, Joe</Typography>
    <Typography>
      Use this service to add and review skills, view learning opportunities, plan your
      career pathway and keep up to date with communities.
    </Typography>

    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Alert severity="info">
          <AlertTitle>Latest updates</AlertTitle>
          <ul>
            <li>You currently have no skills on your profile. Try adding a new skill</li>
            <li>You need to complete your DDAT assessment</li>
            <li>
              Government as a platform has been added as a new course Clear latest updates
            </li>
          </ul>
        </Alert>

        <Divider />
      </Grid>
      <Grid item xs={8}>
        <Grid container spacing={4}>
          {boxData.map((data) => (
            <Grid item xs={4} key={data.title}>
              <Card style={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={data.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {data.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">{data.link}</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  </Page>
)

export default IndexPage
