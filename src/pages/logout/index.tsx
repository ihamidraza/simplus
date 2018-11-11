import * as React from 'react'; 
import { connect } from 'react-redux';
import { setUser } from '../../actions/user';

class Logout extends React.Component<any, any> {
    constructor(){
        super()
    }
    componentWillMount(){
        const { dispatch, history } = this.props;
        dispatch(setUser({}));
        history.push('/login');
    }
    render() {
        return <div></div>
    }
}

export default connect(({ user }) => ({ user }))(Logout);