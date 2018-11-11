import * as React from "react"
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';

import { setUser } from '../../actions/user';

class Login extends React.Component<any, any>{
    constructor(){
        super();
        this.responseGoogle = this.responseGoogle.bind(this);
    }
    responseGoogle(response: {}){
        const { dispatch, history } = this.props;
        const { profileObj } = response;
        dispatch(setUser(response));
        const validation = /@simplusinnovation\.com$/;
        console.log(validation.test(profileObj.email));
        if(validation.test(profileObj.email)){
            history.push('/');
        } else {
            history.push('/content')
        }
    }
	render(){	

		return (
        <div style={{margin: 300}}>
        <GoogleLogin
        clientId="469183679364-3q5ql71la5uhp5itkvtg4rja3e3u76go.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
      />
      </div>)
	}

}

export default connect(({ user }) => ({ user }))(Login);