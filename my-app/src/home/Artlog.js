import React, {Component} from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody,Label, Input, Row, Col } from 'reactstrap';

export default class Artlog extends Component{
    constructor(props){
        super(props);
        this.state={
            artlogs:[]
        }
    }
componentWillMount(){
    this.createList();
}
  createList=()=>{
      
      if(localStorage.getItem('token'))
      {
        fetch('http://localhost:3001/api/artlog/', {
            method: 'GET',
            headers:new Headers({  
                'Content-Type':'application/json',
                'Authorization':localStorage.getItem('token')
            }),
            
        })
        .then(response => response.json())
        .then(data =>
        this.setState({artlogs:data}))
    }
  }

  populateList=()=>{
      return(
        this.state.artlogs.map(artlog =>{
            return(
                <Col key={artlog.id} lg="6">
                    <Card>
                    <CardImg width="100%" src={`${artlog.artpng}`} alt={`Artpng ${artlog.id}`} />
                    <CardBody>
                    <Label for={`${artlog.id}`}>Notes</Label>
                    <Input type="textarea" name="notes" id={`${artlog.id}`} />
                    <Button>Update Notes</Button>
                    <Button>Delete Art</Button>                    
                    </CardBody>
                    </Card>
                </Col>
    
            )
        })
      )
        
        
    }

  

render(){

    return(
    <div>
    <h1>Your Art Cloud!</h1> 
    <Row>
        <CardDeck>
            {this.populateList()}
        </CardDeck>
    </Row>
    </div>
    )
}
     
}

