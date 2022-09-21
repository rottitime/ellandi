import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const LocalizationProvider = (props) => (
  <MuiLocalizationProvider dateAdapter={AdapterDayjs} {...props} />
)

export default LocalizationProvider
