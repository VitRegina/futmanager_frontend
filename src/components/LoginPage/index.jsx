import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Logo from './Logo';
import { Link, useNavigate } from 'react-router-dom';
import { Roboto } from '../../styles/Styles';
import { useState } from 'react';
import {post} from "../../services/http"
import { useEffect } from 'react';
import { setUser } from '../../services/storage';

export default function LoginPage(){
    const [username, setUserName] = useState([""]);
    const [password, setPassword] = useState([""]);
    const [erro, setErro] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');
    const navigate = useNavigate();

    const login =(event) => {
      event.preventDefault()    
      if (username && password) {
        var body = {
          grant_type: 'password',
          client_id: import.meta.env.VITE_CLIENT_ID, 
          client_secret: import.meta.env.VITE_CLIENT_SECRET,
          username: username, //futmanager@example.com
          password: password //12345
        }
      
        post('oauth/token', body).then((response) => {
          setUser(response.data)
          navigate('/home');
        }).catch ((error) => {
          console.log(error)
          setErro(true)
          setMensagemErro("Não foi possivel realizar o seu login")
        });
      } 
    }

    useEffect(() => {
      if (erro) {
          setErro(false)
          setMensagemErro('')
      }
    }, [username, password]);

    return(
       <>
       <div className='w-96 h-4/6 flex flex-col items-center m-10 bg-white rounded sm:h-4/6'>
            <Logo />
            <Roboto>
              <form onSubmit={login}>
                <div className='w-full'>
                    <TextField className='w-10/12 ml-6 mb-4 sm:w-10/12 sm:ml-8'
                      required
                      id="standard-required"
                      onChange={(e) => setUserName(e.target.value)}
                      error={erro}
                      label="E-mail" 
                      variant="outlined" 
                    />
                    <TextField className='w-10/12 ml-6 mb-4 sm:w-10/12 sm:ml-8'
                      required
                      id="standard-required"
                      type='password'
                      onChange={(e) => setPassword(e.target.value)}
                      error={erro}
                      label="Senha" 
                      variant="outlined" 
                      helperText={mensagemErro}
                    />
                </div>
                <div className='flex flex-row mb-12 ml-6 sm:ml-8'> 
                    <Link to="" style={{color:'rgb(0, 85, 150)'}}>Esqueci minha senha</Link>
                </div>    
                <Button className='bg-blue-fut-paz w-10/12 ml-6 mb-4 sm:w-10/12 sm:ml-8' type="submit" variant="contained">Entrar</Button>
              </form>
            </Roboto>
        </div>  
       </>    
    )
}