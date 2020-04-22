import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        gender: 1,
        religion: 1,
        occupation: 1,
        socialStatus: 1,    
        allegiance: 1,    
        continent: 1,
        location: 1
      },
      result: ""
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = parseInt(value);
    this.setState({
      formData
    });
    console.log("formData : " + JSON.stringify(formData));
  }

  handlePredictClick = (event) => {
    const formData = this.state.formData;
    console.log("formData : " + JSON.stringify(formData));
    this.setState({ isLoading: true });
    fetch('http://127.0.0.1:5000/prediction/', 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          result: response.result,
          isLoading: false
        });
        console.log("response : " + JSON.stringify(response))
      })
  }

  handleCancelClick = (event) => {
    this.setState({ result: "" });
  }

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;
    
    const gender_values = ['Male',	'Female'];
    const religions_values = ['Great Stallion',	'Lord of Light',	'Faith of the Seven',	'Old Gods',	'Drowned God',	'Many Faced God',	'Other', 'Unknown/Unclear'];
    const occupations_values = ['Soldier', 'Noncombatant','Unknown/Unclear'];
    const socialStatus_values = ['Highborn', 'Lowborn','Unknown/Unclear'];
    const allegiance_values = ['Stark',	'Targaryen'	,'Night\'s Watch', 'Lannister',	'Greyjoy',	'Bolton',	'Frey',	'Other',	'Unknown/Unclear'];
    const continents_values = ['Westeros', 'Essos', 'Unknown/Unclear'];
    const locations_values = ['Indoors',	'Outdoors', 'Unknown/Unclear'];

    var genders = []
    for (var i = 1; i <= 2; i = +(i + 1).toFixed(1)) {
      genders.push(<option key = {i} value = {i}>{gender_values[i-1]}</option>);
    }

    var religions = []
    for (var i = 1; i <= 7; i = +(i + 1).toFixed(1)) {
      religions.push(<option key = {i} value = {i}>{religions_values[i-1]}</option>);
    }
    religions.push(<option key = {8} value = {9}>{religions_values[7]}</option>);

    var occupations = []
    for (var i = 1; i <= 2; i = +(i + 1).toFixed(1)) {
      occupations.push(<option key = {i} value = {i}>{occupations_values[i-1]}</option>);
    }
    occupations.push(<option key = {8} value = {9}>{occupations_values[2]}</option>);

    var socialStatus = []
    for (var i = 1; i <= 2; i = +(i + 1).toFixed(1)) {
      socialStatus.push(<option key = {i} value = {i}>{socialStatus_values[i-1]}</option>);
    }
    socialStatus.push(<option key = {8} value = {9}>{socialStatus_values[2]}</option>);

    var allegiances = []
    for (var i = 1; i <= 9; i = +(i + 1).toFixed(1)) {
      allegiances.push(<option key = {i} value = {i}>{allegiance_values[i-1]}</option>);
    }
    
    var continents = []
    for (var i = 1; i <= 2; i = +(i + 1).toFixed(1)) {
      continents.push(<option key = {i} value = {i}>{continents_values[i-1]}</option>);
    }
    continents.push(<option key = {8} value = {9}>{continents_values[2]}</option>);

    var locations = []
    for (var i = 1; i <= 2; i = +(i + 1).toFixed(1)) {
      locations.push(<option key = {i} value = {i}>{locations_values[i-1]}</option>);
    }
    locations.push(<option key = {8} value = {9}>{locations_values[2]}</option>);

    return (
      <Container>
        <div>
          <h1 className="title">Game of Thrones Predictor</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Sex</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.gender}
                  name="gender"
                  onChange={this.handleChange}>
                  {genders}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Religion</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.religion}
                  name="religion"
                  onChange={this.handleChange}>
                  {religions}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Occupation</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.occupation}
                  name="occupation"
                  onChange={this.handleChange}>
                  {occupations}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Social status</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.socialStatus}
                  name="socialStatus"
                  onChange={this.handleChange}>
                  {socialStatus}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Allegiance</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.allegiance}
                  name="allegiance"
                  onChange={this.handleChange}>
                  {allegiances}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Continent</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.continent}
                  name="continent"
                  onChange={this.handleChange}>
                  {continents}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Preferred Location</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.location}
                  name="location"
                  onChange={this.handleChange}>
                  {locations}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handlePredictClick : null}>
                  { isLoading ? 'Making prediction' : 'Predict' }
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}>
                  Reset prediction
                </Button>
              </Col>
            </Row>
          </Form>
          {result === "" ? null :
            (<Row>
              <Col className="result-container">
                <h5 id="result">{result}</h5>
              </Col>
            </Row>)
          }
        </div>
      </Container>
    );
  }
}

export default App;