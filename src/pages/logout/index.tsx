import * as React from 'react'; 
import { remove } from 'js-cookie';



class Logout extends React.Component<any, any> {

    componentWillMount(){
        remove('name')
        remove('simplus_access_token')
        window.location.replace('http://localhost:3002');
    }
    
    render() {
        return <div></div>
    }
}

export default Logout;