import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import insta_image from '../images/9364675fb26a.svg';
import insta_logo from '../images/logoinsta.png';
import fb from '../images/fb.png'
import appstore from '../images/app.png'
import playstore from '../images/play.png'
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import styled from "styled-components";

const LoginPageStyled = styled.div`
  body {
    background-color: #FAFAFA;
  }

  .loginPage_main {
    display: flex;
    margin-top: 10px;
    margin-left: -65px;
  }

  .loginPage_logo {
    width: 175px;
    margin-top: 25px;
  }

  .loginpage_rightcomponent {
    width: 350px;
    padding-bottom: 25px;
    border: 1px solid #DBDBDB;
    margin-top: 25px;
    text-align: center;
    background-color: white;
  }

  .loginPage_text {
    width: 258px;
    height: 36px;
    margin: 5px;
    border: 1px solid #DBDBDB;
    background-color: #FAFAFA;
    padding-left: 10px;
    border-radius: 5px;
  }

  .login_button {
    width: 270px;
    height: 36px;
    border-radius: 5px;
    font-weight: bold;
    margin-top: 5px;
    border: 1px solid #0395F6;
    background-color: #0395F6;
    color: #FFFFFF;
    
    &:focus {
      border: 3px solid #5872FF;
    }
  }

  .login_ordiv {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .login_dividor {
    width: 110px;
    border: 1px solid black;
    height: 0px;
    margin-top: 10px;
    border: 1px solid #DBDBDB;
  }

  .login_or {
    margin: 0 25px;
    font-width: bold;
    color: #8E8E8E;
  }

  .login_fb {
    color: #395185;
    font-weight: bold;
    margin-top: 30px;
  }

  .login_forgot {
    color: rgba(var(--fe0,0,55,107),1);
    font-size: 12px;
    line-height: 14px;
    margin-top: 12px;
    text-align: center;
  }

  .loginPage_signup_option {
    margin-top: 25px;
    width: 350px;
    background-color: white;
    border: 1px solid #DBDBDB;
    text-align: center;
  }

  .loginPage_signin {
    margin: 25px 0;
  }

  .loginPage_signup {
    margin: 25px 0;
  }

  .loginPage_downloadSection {
    height: 105px;
    width: 350px;
    text-align: center;
    margin-top: 20px;
  }

  .loginPage_dwimg {
    margin: 5px;
  }
`

function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);

    const changeLogin = () => {
        if(isLogin) setIsLogin(false)
        else setIsLogin(true)
    }
  return (
    <LoginPageStyled>
        <Grid container>
            <Grid item xs={3}></Grid>
            <Grid item xs={6} style={{minWidth:"800px"}}>
                <div className={"loginPage_main"}>
                    <div>
                        <img src={insta_image} width={"454px"} alt="인스타그램사진" />
                    </div>
                    <div>
                        <div className={"loginpage_rightcomponent"}>
                            <img src={insta_logo} className={"loginPage_logo"} alt=""/>
                            <div className={"loginPage_signin"}>
                                {
                                    isLogin ? <SignIn />:<SignUp />
                                }
                                <div className={"login_ordiv"}>
                                    <div className={"login_dividor"}></div>
                                    <div className={"login_or"}>OR</div>
                                    <div className={"login_dividor"}></div>
                                </div>

                                <div className={"login_fb"}>
                                    <img src={fb} alt="" width={"15px"} style={{"marginRight:":"5px"}}/>Log in with Facebook
                                </div>
                                <div className={"login_forgot"}>
                                    Forgot Password?
                                </div>
                            </div>
                        </div>
                        <div className={"loginPage_signup_option"}>
                            {
                                isLogin ?
                                    <div className={"loginPage_signin"}>
                                        Don&apos;t have an account? <span onClick={changeLogin} style={{"fontWeight":"bold", "color":"#0395F6", "cursor":"pointer"}}>Sign up</span>
                                    </div>:
                                    <div className={"loginPage_signup"}>
                                        Have an account? <span onClick={changeLogin} style={{"fontWeight":"bold", "color":"#0395F6", "cursor":"pointer"}}>Sign in</span>
                                    </div>

                            }


                        </div>
                        <div className={"loginPage_downloadSection"}>
                            <div>
                                Get the app.
                            </div>
                            <div className={"loginPage__option"}>
                                <img src={appstore} width={"136px"} className={"loginPage_dwimg"} alt=""/>
                                <img src={playstore} width={"136px"} className={"loginPage_dwimg"} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid item xs={3}></Grid>
        </Grid>
    </LoginPageStyled>
  );
}

export default LoginPage;