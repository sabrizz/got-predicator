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
        sepalLength: 4,
        sepalWidth: 2,
        petalLength: 1,
        petalWidth: 0.5
      },
      result: ""
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  }

  handlePredictClick = (event) => {
    const formData = this.state.formData;
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
      });
  }

  handleCancelClick = (event) => {
    this.setState({ result: "" });
  }

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;

    var religions = []
    for (var i = 1; i <= 9; i = +(i + 1).toFixed(1)) {
      religions.push(<option key = {i} value = {i}>{i}</option>);
    }
    var occupations = []
    for (var i = 1; i <= 2; i = +(i + 1).toFixed(1)) {
      occupations.push(<option key = {i} value = {i}>{i}</option>);
    }
    var socialStatus = []
    for (var i = 1; i <= 2; i = +(i + 1).toFixed(1)) {
      socialStatus.push(<option key = {i} value = {i}>{i}</option>);
    }
    var genders = []
    for (var i = 1; i <= 2; i = +(i + 1).toFixed(1)) {
      genders.push(<option key = {i} value = {i}>{i}</option>);
    }
    var locations = []
    for (var i = 1; i <= 2; i = +(i + 1).toFixed(1)) {
      locations.push(<option key = {i} value = {i}>{i}</option>);
    }
    var allegiances = []
    for (var i = 1; i <= 9; i = +(i + 1).toFixed(1)) {
      allegiances.push(<option key = {i} value = {i}>{i}</option>);
    }
    var continents = []
    for (var i = 1; i <= 2; i = +(i + 1).toFixed(1)) {
      continents.push(<option key = {i} value = {i}>{i}</option>);
    }
    return (
      <Container>
        <div>
          <h1 className="title">Game of Thrones Predictor</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
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
                <Form.Label>Top Location</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.location}
                  name="location"
                  onChange={this.handleChange}>
                  {locations}
                </Form.Control>
              </Form.Group>
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