import { Link } from "react-router-dom"

const BemVindo = () => {
  return (
    <div className="parent container d-flex justify-content-center align-items-center h-100">
      <div className="child">
        <h1>Bem vindo! :D</h1>
        <h2>Esse é um simples projeto de chat. <Link to='/login'>Entre</Link> ou <Link to='/register'>crie sua conta</Link></h2>
      </div>
    </div>
  )
}

export default BemVindo