import { Box, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import { StockTable } from './components/StockTable'

function App() {
  const [currentTab, setCurrenTab] = useState(0)
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={currentTab}
        onChange={(e, value) => {
          e.stopPropagation()
          setCurrenTab(value)
        }}
      >
        <Tab label="Table One" value={0} />
        <Tab label="Table Two" value={1} />
        <Tab label="Table Three" value={2} />
      </Tabs>
      <div>
        {['table-1', 'table-2', 'table-3'].map((id, index) => (
          <StockTable id={id} key={id} isVisible={currentTab === index} />
        ))}
      </div>
    </Box>
  )
}

export default App
