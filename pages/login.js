import { mongooseConnect } from "@/lib/mongoose"
import styled from "styled-components"
import Link from "next/link"
import { useState } from "react"
import BannerAd from "@/components/BannerAd"
import Footer from "@/layout/Footer/Footer"
import Header from "@/layout/Header/Header"

const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  max-width: 600px;
`;

const LoginTitle = styled.h2`
    margin-bottom: 10px;
`

const LoginForm = styled.form`

`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const LoginRegisterChanger = styled.div`
    margin-top: 45px;
    border-top: 1px solid black;
    padding-top: 45px;
    text-align: center;
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
    cursor: pointer;
    margin: 10px 0;
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