import React, { useState } from 'react';
import { Card, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import '../scss/App.scss';

import ErrorBoundary from './ErrorBoundary';
import Controls from './Controls';
import Data from './Data';
import Study from './Study';

export const DEFAULT_A = 1;
export const DEFAULT_B = 4;
export const DEFAULT_L = 10;

type Props = { acmWasm };
function Root(props: Props): Element {
    const { acmWasm } = props;

    const [ a, setA ] = useState(DEFAULT_A);
    const [ b, setB ] = useState(DEFAULT_B);
    const [ l, setL ] = useState(DEFAULT_L);

    return (
        <ErrorBoundary>
            <Container id="main">
                <Row>
                    <Col>
                        <Controls acmWasm={acmWasm} a={a} setA={setA} b={b} setB={setB} setL={setL} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Tabs
                        id="tabs"
                        defaultActiveKey="study"
                    >
                        <Tab eventKey="data" title="Data">
                            <Data acmWasm={acmWasm} a={a} b={b} l={l} />
                        </Tab>
                        <Tab eventKey="study" title="Study">
                            <Study acmWasm={acmWasm} a={a} b={b} />
                        </Tab>
                    </Tabs>
                    </Col>
                </Row>
            </Container>
        </ErrorBoundary>
    );
}

export default Root;
