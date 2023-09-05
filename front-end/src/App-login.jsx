import { useState } from "react"
import userPng from "./assets/user.png"
import './App-login.css'
import FooterBar from './components/ui/FooterBar'

function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const API_ENDPOINT = import.meta.env.VITE_API_BASE + 'user'
  
  const [state, setState] = React.useState({
    publisher: {}
  })

  React.useEffect(() => {
    loadData()    // Carrega dos dados do back-end
  }, [])

  async function loadData() {
    try {
      const result = await fetch(API_ENDPOINT)

      // Requisição OK
      if(result.ok) setState({...state, publisher: await result.email.json()})
      
      // Requisição com erro
      else throw new Error(`[HTTP ${result.status}] ${result.statusText}`)

    }
    catch(error) {
      // Exibimos o erro no console
      console.error(error)
    }
  }

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">
            <span className="login-form-title"> Sing In </span>
            <span className="login-form-title">  
              <img src={userPng} alt="UserIcon" />

              <div className="wrap-input">
                <input 
                  className={email !== "" ? 'has-val input' : 'input'}
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}  
                />
                <span className="focus-input" data-placeholder="Email"></span>
              </div>
              
              <div className="wrap-input">
              <input 
                  className={password !== "" ? 'has-val input' : 'input'}
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}  
                />
                <span className="focus-input" data-placeholder="Password"></span>
              </div>

              <div className="container-login-form-btn">
                <button className="login-form-btn">Login</button>
              </div>

              <div className="text-center">
                <span className="txt1">Não possui conta?</span>
                <a href="#" className="txt2">Criar conta.</a>
              </div>
            </span>
          </form>
        </div>
      </div>
      <FooterBar/>
    </div>
  )
}

export default App
