import { createRoot } from 'react-dom/client'
import 'reactjs-popup/dist/index.css'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import './index.css'
import App from 'App'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(<App />)
