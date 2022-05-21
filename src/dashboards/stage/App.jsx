import { useScopedReplicant, useReplicatedTime } from '~/src/nodecg-hooks'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Paper from '@mui/material/Paper'

import { LiveView } from './views/Live'
import { InterstitialView } from './views/Interstitial'
import { schedule } from '../../extension/schedule'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export function App () {
  const [selectedTab, setSelectedTab] = useScopedReplicant("selectedConfigTab", 0);
  const [schedule] = useScopedReplicant("schedule", [])
  const [cuedSpeaker, setCuedSpeaker] = useScopedReplicant('cuedSpeakerDetails', { visible: false, title: '', speaker: '' })
  const time = useReplicatedTime()

  const filteredSchedule = schedule === null ? [] : schedule.filter(content => {
    // Safari doesn't like spaces in dates
    const start_time = new Date(content.start_date.replace(' ', 'T'))
    const horizon = new Date(time.getTime() - (60*60*1000))
    
    return start_time >= horizon
  })

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  function eventClicked(event) {
    setCuedSpeaker({ title: event.title, speaker: event.speaker, visible: false, doNotRecord: !event.may_record })
  }

  function renderEvent(event) {
    const inPast = new Date(event.start_date) <= time
    const doNotRecord = !event.may_record && <span className="dnr">Do Not Record</span>

    return (
      <p key={event.id} onClick={ () => eventClicked(event) } className={ inPast ? 'in-past' : '' }>
        {event.start_time} { doNotRecord }<br/>
        <strong>{event.title}</strong><br />
        {event.speaker}
      </p>
    )
  }
 
  function tabSet() {
    if (selectedTab === null) { return false }

    return (
      <>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={handleChange}>
            <Tab label="Live" />
            <Tab label="Interstitial" />
          </Tabs>
        </Box>
        <TabPanel value={selectedTab} index={0}>
          <LiveView />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <InterstitialView />
        </TabPanel>
      </>
    )
  }

  return (
    <>
      <CssBaseline enableColorscheme />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          { tabSet() }
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={1} className="clock">
            <h1>{ time.toLocaleTimeString() }</h1>
          </Paper>

          <div id="schedule">
            { filteredSchedule.map(event => renderEvent(event)) }
          </div>
        </Grid>
      </Grid>
    </>
  );
}