import React, {Component} from 'react';
import {Button,Form, FormGroup, Label, Input} from 'reactstrap';

class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
        }
    }
    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value,
        });
    }
    handleSumbit=(event)=>{
        event.preventDefault();
        fetch('http://localhost:3001/api/user/login',{
            method:'Post',
            body:JSON.stringify({user:this.state}),
            headers: new Headers({
                'Content-Type':'application/json'
                
            })
        })
        .then(response =>response.json())
        .then( data => this.props.setToken(data.sessionToken))
        
    }
    render(){
        return(
            <div>
                <h1>Login</h1>
                <Form onSubmit={this.handleSumbit}>
                    <FormGroup>
                        <Label for='username'>Username </Label>
                        <Input id='li_username' type='text' name='username' placeholder='Enter Username' onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input id='li_password' type='password' name='password' placeholder='Enter Password' onChange={this.handleChange}/>
                    </FormGroup>
                        <Button type="submit">Submit</Button>
                </Form>
            </div>
        )
    }
}
export default Login;