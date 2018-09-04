import React, { Component } from "react";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import Footer from "../components/Footer";
// import CommentBox from "../components/Chat";
import Wrapper from "../components/Wrapper";
import { withUser } from '../services/withUser';
import Landing from '../components/Landing/landing';
import API from "../utils/API";
import { List, ListItem } from "../components/List";
import { Input,  FormBtn } from "../components/Form";
import "../components/Chat/chat.css";



  class SmackTalk extends Component {
    state = {
      smacks: [],
      authorName: "",
      authorComment: ""
    };
   
    componentDidMount() {
      this.loadSmacks();
    }
   
    loadSmacks = () => {
      console.log("function running")
      API.getSmacks()
        .then(res =>
          this.setState({ smacks: res.data, authorName: "", authorComment: "" })
        )
        .catch(err => console.log(err));
    };
   
   
   
    handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    };
   
    handleFormSubmit = event => {
      event.preventDefault();
      console.log("adding to db")
      ////if (this.state.authorName && this.state.authorComment) {
        console.log("here")
        console.log(this.state.authorName)
        API.saveSmacks({
          authorName: this.state.authorName,
          authorComment: this.state.authorComment
        })
          .then(res => this.loadSmacks())
          .catch(err => console.log(err));
      //}
    };
   
    render() {
     const { user } = this.props;
     const username = user ? user.username : null;
     const handleLogIn = () => {
     this.props.history.push('/login');
     };
      return (
  <div>
    {user ?
  <Wrapper>
    <Container style={{height: 1000}}>
      <Row className="smackTalkRow" >
        <Col size="md-2">
          <h1 className="smackTalk">SmackTalk</h1>
        </Col>        
        <Col size="md-10">
           {/* <CommentBox/> */}
           <Container fluid id="commentCont">
       <Row className="addComment">
         <Col size="md-12">
           <form>
             <Input
               value={this.state.authorName}
               onChange={this.handleInputChange}
               name="authorName"
               placeholder="Your name"
             />
             <Input
               value={this.state.authorComment}
               onChange={this.handleInputChange}
               name="authorComment"
               placeholder="Message"
             />
             <FormBtn id= "postComBtn"
               // disabled={!(this.state.authorName && this.state.authorComment)}
               onClick={this.handleFormSubmit}
             >
               Post
             </FormBtn>
           </form>
         </Col>

         <Col size="md-10 sm-12" style={{marginLeft: 0, paddingTop: 5, maxWidth: "100%"}}>
           {this.state.smacks.length ? (

         <List>
           {this.state.smacks.map(smack => (
             <ListItem key={smack._id}>
               <strong >
                <div className = "talktext"> {smack.authorName}
                   <br/><hr/>
                 {smack.authorComment}
                 </div>
               </strong>
             </ListItem>
           ))}
         </List>
           ) : (
             <h3>No Results to Display</h3>
           )}
         </Col>
       </Row>
     </Container>
        </Col>
      </Row>
    </Container>
    <Footer />  
    </Wrapper>
    : <Landing/>}
  </div>

);
    }
  }

export default withUser(SmackTalk);