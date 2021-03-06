import React from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Card, CardBody, CardTitle, Col, Container, Navbar, NavbarBrand, Row } from 'reactstrap';
import { Helmet } from "react-helmet";
import './App.css';
import LanguageSwitcher from './LanguageSwitcher';
import MessageLog from './MessageLog';
import MapNavigator from './MapNavigator';
import MapArea from './MapArea';
import CatCount from './CatCount';
import CatCountControls from './CatCountControls';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      center: [61.45, 23.85],
      catCount: 1,
      selectedPronoun: 'other'
    };
  }

  addLogMessage(messageId, parameters = {}) {
    this.setState((state, props) => {
      return Object.assign({}, state, {
        messageList: state.messageList.concat([{
          time: new Date(),
          messageId,
          parameters
        }])
      });
    });
  }

  setCatCount(newCount) {
    this.setState((state, props) => {
      return Object.assign({}, state, {
        catCount: newCount
      })
    });
  }

  setPronoun(newPronoun) {
    this.setState((state, props) => {
      return Object.assign({}, state, {
        selectedPronoun: newPronoun
      })
    });
  }

  flyTo(coordinates) {
    this.setState((state, props) => {
      return Object.assign({}, state, {
        center: coordinates
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Helmet>
          <title>{this.props.t('applicationName')}</title>
        </Helmet>
        <Navbar color="light">
          <NavbarBrand>{this.props.t('applicationName')}</NavbarBrand>
          <LanguageSwitcher />
        </Navbar>
        <Container fluid={true}>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>
                    <CatCount catCount={this.state.catCount} pronoun={this.state.selectedPronoun}/>
                  </CardTitle>
                  <CatCountControls
                    catCount={this.state.catCount}
                    pronoun={this.state.selectedPronoun}
                    onCatCountChange={this.setCatCount.bind(this)}
                    onPronounChange={this.setPronoun.bind(this)}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col>
              <MapNavigator onChange={this.flyTo.bind(this)}/>
              <Button onClick={() => alert(this.props.t('alertTestMessage'))}>
                {this.props.t('testAlertButton')}
              </Button>
            </Col>
            <Col>
              <MessageLog messageList={this.state.messageList} />
            </Col>
          </Row>
          <Row>
            <Col>
              <MapArea addLogMessage={this.addLogMessage.bind(this)} center={this.state.center}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withTranslation()(App);
