import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import axios from 'axios'

axios.get('api/mensagens').then(response => {
    const mensagens = response.data
    ReactDOM.createRoot(document.getElementById('root')).render(<App mensagens={mensagens}/>)
})
