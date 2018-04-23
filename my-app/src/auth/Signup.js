import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
// we need to be able to write our user name, our pass word, and a submit button
 
class Signup extends Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            
        };
    }
    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value,
        });
        if(event.target.name===''){
          console.log('Empty')
        };
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        fetch('http://localhost:3001/api/user/createuser',{
            method:'POST',
            body:JSON.stringify({user:this.state}),
            headers: new Headers({
                'Content-Type':'application/json'
            })

        })
        .then(response=>response.json())
        .then( data => this.props.setToken(data.sessionToken) )
    }
    render(){
        return(
            <div>
                <h1>Sign Up</h1>
                <Form  onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for='username'>Username</Label>
                        <Input id='username' type='text' required name='username' placeholder='Enter Username' onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input id='su_password' type='password' required name='password' placeholder='Enter Password' onChange={this.handleChange}/>
                    </FormGroup>
                        <Button type='submit'>Submit</Button>
                </Form>
            </div>
        )
    }
}
export default Signup;