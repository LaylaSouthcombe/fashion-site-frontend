import { mongooseConnect } from "@/lib/mongoose"
import styled from "styled-components"
import Link from "next/link"
import { useState } from "react"
import BannerAd from "@/components/BannerAd"
import Footer from "@/layout/Footer/Footer"
import Header from "@/layout/Header/Header"

const LoginPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginTitle = styled.h2`

`

const LoginForm = styled.form`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
`;

const LoginRegisterChanger = styled.div`

`

const HaveDontHaveText = styled.h3`

`

const LoginRegisterButton = styled.button`
    background-color: ${props => props.buttonColor};
    color: ${props => props.fontColor};
    width: 100%;
    border: 1px solid black;
    outline: none;
    padding: 5px;
    border-radius: 2.5px;
    font-size: 16px;
`

export default function LoginPage({}){

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log(formData);
      };

      const [loginRegisterText, setLoginRegisterText] = useState('Don\'t have an account?')

      const [formType, setFormType] = useState('login')

      const changeLoginRegisterForm = () => {
        setFormType(formType === 'login' ? 'register' : 'login')

      }

    return (
        <>
            <Header/>
            <LoginPageWrapper>
                <LoginTitle>Sign in</LoginTitle>
                <LoginForm onSubmit={handleSubmit}>
                    <FormGroup>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    </FormGroup>
                    <FormGroup>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    </FormGroup>
                    <LoginRegisterButton type="submit" buttonColor={'black'} fontColor={'white'}>Login</LoginRegisterButton>
                </LoginForm>
                <LoginRegisterChanger>
                    <HaveDontHaveText>
                        {formType === 'login' ? 'Don\'t have an account?' : 'Already have an account'}
                    </HaveDontHaveText>
                    <LoginRegisterButton buttonColor={'white'} fontColor={'black'} onClick={() => changeLoginRegisterForm()}>
                        {formType === 'login' ? 'Create Account' : 'Sign In'}
                    </LoginRegisterButton>
                </LoginRegisterChanger>
                </LoginPageWrapper>
            <BannerAd/>
            <Footer/>
        </>
    )
}

export async function getServerSideProps(){
    await mongooseConnect()

    return {
        props:{
            
    }}
}