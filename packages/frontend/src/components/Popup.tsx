// create Popup COmponent here
import React from 'react'
import ReactJsPopup from 'reactjs-popup'

interface Props {
  children: React.ReactNode
  onClose: () => void
}

export const Popup: React.FC<Props> = ({ children, onClose }) => {
  return (
    <ReactJsPopup
      open
      onClose={onClose}
      contentStyle={{
        minWidth: 'min(80vw, 500px)',
        maxHeight: '100vh',
        overflow: 'auto'
      }}
    >
      {children}
    </ReactJsPopup>
  )
}
