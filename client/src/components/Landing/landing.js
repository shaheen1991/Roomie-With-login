import React, { Component, Fragment } from 'react';
import "./landing.css";
import { css } from 'react-emotion';
import { BarLoader } from 'react-spinners';
import { withUser } from '../../services/withUser';
import { Link } from "react-router-dom";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Landing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }



    }
    componentWillMount() {

        console.log("WILL MOUNT: ", this.state.loading)
    }
       componentDidMount() {
        setTimeout(()=> this.setState({loading:false}),3000)
      
       console.log("DID MOUNT: ", this.state.loading)

       if (!this.props.user) {
        return;
      }
    }


    render() {
        const loading = this.state.loading;
        const { user } = this.props;

        if(loading){
            return(

                <div className='sweet-loading'>
                    <BarLoader
                    className={override}
                    sizeUnit={"px"}
                    size={80}
                    color={'#426E86  '}
                    loading={this.state.loading}
                    />
                </div> 

            )

        } else {
            return (
                <Fragment>
                 {user &&
                <div>
                    <div id="landing">
                        {/* <h1 id="welcomeText">Welcome To Roomie</h1> */}
                        <h1 id="loginText">Welcome {user.username}!</h1>
                        <div id="landingLeft">
                            <img id="side2" alt="side2" src="/img/side2.png" />
                        </div>
                        <div id="landingRight">
                            <img alt="" id="rightPic" />
                        </div>
                        <div id="icon">
                            <img id="roomieIcon" alt="" src="/img/roomieIconTrans.png" />
                            <img id="side" alt="" src="/img/side.png" />
                        </div>
                        <img id="roomieIcon" alt="roomie icon" src="/img/roomieIconTrans.png" />
                        <img id="side" alt="side" src="/img/side.png" />
                    </div>
                </div>
                 }
                  {!user &&
                   <div>
                   <div id="landing">
                       {/* <h1 id="welcomeText">Welcome to Roomie</h1> */}
                       <h1 id="loginText">Welcome to Roomie! <a ><Link to="/login" id="landingLogLink" style={{ textDecoration: 'none' }}>
                       Login/Register</Link></a></h1>
                       <div id="landingLeft">
                           <img id="side2" alt="side2" src="/img/side2.png" />
                       </div>
                       <div id="landingRight">
                           <img alt="" id="rightPic" />
                       </div>
                       <div id="icon">
                           <img id="roomieIcon" alt="" src="/img/roomieIconTrans.png" />
                           <img id="side" alt="" src="/img/side.png" />
                       </div>
                       <img id="roomieIcon" alt="roomie icon" src="/img/roomieIconTrans.png" />
                       <img id="side" alt="side" src="/img/side.png" />
                   </div>
                   </div>
                   }
                </Fragment> 
             
            )

        }


    }

}
;

export default withUser(Landing);