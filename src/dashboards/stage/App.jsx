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

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  function eventClicked(event) {
    setCuedSpeaker({ ...cuedSpeaker, title: event.title, speaker: event.speaker })
  }

  function renderEvent(event) {
    return (
      <p key={event.id} onClick={ () => eventClicked(event) }>
        {event.start_time}<br/>
        <strong>{event.title}</strong><br />
        {event.speaker}
      </p>
    )
  }
  
  return (
    <>
      <CssBaseline enableColorscheme />
      <Grid container spacing={2}>
        <Grid item xs={8}>
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
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={1} className="clock">
            <h1>{ time.toLocaleTimeString() }</h1>
          </Paper>

          <div>
            { schedule.map(event => renderEvent(event)) }
          </div>
        </Grid>
      </Grid>
    </>
  );
}