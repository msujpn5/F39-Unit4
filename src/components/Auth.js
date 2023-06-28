import {useState, useContext} from 'react';
import axios from 'axios';
import AuthContext from '../store/authContext';
 
const Auth = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)

   const authCtx = useContext(AuthContext)
 
   const submitHandler = e => {
       e.preventDefault()

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
            console.log(err.response.data)
            setPassword("")
            setUsername("")
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
           <button className='form-btn'>Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
   )
}
 
export default Auth