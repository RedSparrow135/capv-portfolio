import { useEffect, useRef, useState } from 'react'
import './ScrollIndicator.css'

export default function ScrollIndicator({ progress, max }) {
  const lastProgress = useRef(progress)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (progress > lastProgress.current) {
      // bajando
      setVisible(false)
    } else {
      // subiendo
      setVisible(true)
    }
    lastProgress.current = progress
  }, [progress])

  const percent = Math.min(1, progress / max)

  return (
    <div className={`scroll-indicator ${visible ? 'show' : 'hide'}`}>
      <div
        className="scroll-indicator-bar"
        style={{ height: `${percent * 100}%` }}
      />
    </div>
  )
}
