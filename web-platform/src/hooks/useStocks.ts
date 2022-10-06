import { useCallback, useEffect, useRef, useState } from 'react'
import { LiveRatesSOW } from '../models/events'
import { StockMap } from '../models/stocks'

export const useStocks = () => {
  const [stocks, setStocks] = useState<StockMap>({})
  const worker = useRef<Worker>()

  const pause = useCallback(() => {
    worker.current?.postMessage('pause')
  }, [worker])
  const resume = useCallback(() => {
    worker.current?.postMessage('resume')
  }, [worker])

  useEffect(() => {
    worker.current = new Worker('./stock-state-worker.js')

    worker.current.onmessage = (e) => {
      const { data } = JSON.parse(e.data) as LiveRatesSOW
      setStocks(data)
    }

    return () => {
      worker.current?.terminate()
    }
  }, [])

  return {
    stocks,
    pause,
    resume,
  }
}
