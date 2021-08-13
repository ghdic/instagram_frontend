import React, {useState} from 'react';
import './LoginPage.css'
import Grid from '@material-ui/core/Grid';
import insta_image from '../../images/9364675fb26a.svg';
import insta_logo from '../../images/logoinsta.png';
import fb from '../../images/fb.png'
import appstore from '../../images/app.png'
import playstore from '../../images/play.png'
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";

function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);

    const changeLogin = () => {
        if(isLogin) setIsLogin(false)
        else setIsLogin(true)
    }
  return (
    <div>
        <Grid container>
            <Grid item xs={3}>aaa</Grid>
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
                                        Don't have an account? <span onClick={changeLogin} style={{"fontWeight":"bold", "color":"#0395F6", "cursor":"pointer"}}>Sign up</span>
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
            <Grid item xs={3}>ccc</Grid>
        </Grid>
        Hello World!
    </div>
  );
};

export default LoginPage;