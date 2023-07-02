import React, {useState, useContext} from 'react';
import axios from 'axios';
import AuthContext from '../store/authContext';
 
const Auth = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)
   const [message, setMessage] = useState('')
   const [display, setDisplay] = useState('none')

   const authCtx = useContext(AuthContext)
 
   const submitHandler = e => {
       e.preventDefault()

       setDisplay('none')

       const url = 'https://socialmtn.devmountain.com'

       const body = {
        username,
        password
       }

    axios
        .post(register ? `${url}/register` : `${url}/login`, body)
        .then((res) => {
            console.log('After authentication', res.data)
            authCtx.login(res.data.token, res.data.exp, res.data.userId)
        })
        .catch(err => {
            setPassword('')
            setUsername('')
            setMessage(err.response.data)
            setDisplay('block')
        })
 
       console.log('submitHandler called')
   }
 
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                   className='form-input' type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)}/>
               <input
                   className='form-input' type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <p style={{display: display}} className='auth-msg'>{message}</p>
           <button className='form-btn' onClick={() => setRegister(!register)}>Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
   )
}
 
export default Auth