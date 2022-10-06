import { Button } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useStocks } from '../hooks/useStocks'
import { Stock } from '../models/stocks'
import { fieldSorter } from '../utils/stringFieldSort'

const width = 70

const columns: GridColDef[] = [
  { field: 'symbol', headerName: 'Symbol', width },
  { field: 'open', headerName: 'Open', width, type: 'number' },
  { field: 'close', headerName: 'Close', width, type: 'number' },
  {
    field: 'high',
    headerName: 'High',
    type: 'number',
    width,
  },
  {
    field: 'low',
    headerName: 'Low',
    type: 'number',
    width,
  },
  {
    field: 'last',
    headerName: 'Last',
    type: 'number',
    width,
  },
]

export const StockTable: React.FC<{ id: string; isVisible: boolean }> = ({
  id,
  isVisible,
}) => {
  const { stocks, pause, resume } = useStocks()

  console.log({
    id,
  })

  if (isVisible) {
    resume()
  } else {
    pause()
  }

  return (
    <Box
      sx={{ height: 600, widht: '100%', display: isVisible ? 'block' : 'none' }}
    >
      <Button onClick={() => pause()}>Pause</Button>
      <Button onClick={() => resume()}>Resume</Button>
      <DataGrid
        rows={Object.values(stocks)
          .map((stock) => ({ ...stock, id: stock.symbol }))
          .sort(fieldSorter<Stock>('symbol'))}
        columns={columns}
      />
    </Box>
  )
}
