import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import LaTeX from 'react-latex';
import '../scss/App.scss';

import ErrorBoundary from './ErrorBoundary';
import Controls from './Controls';
import Data from './Data';
import Study from './Study';

export const DEFAULT_A = 4;
export const DEFAULT_B = 6;
export const DEFAULT_L = 1000;

type ClassificationErrorProps = { errorIndex, errorElement };
function ClassificationError(props: ClassificationErrorProps) {
    const { errorIndex, errorElement } = props;

    const [hide, setHide] = useState(true);
    const [body, setBody] = useState(<React.Fragment />);

    useEffect(() => {
        if (errorIndex && errorElement) {
            setHide(false);
            setBody(
                <React.Fragment>
                    Element <a href="#">
                        <LaTeX>{`$a_{${errorIndex}}=${errorElement}$`}</LaTeX>
                    </a> has failed the classification test.
                </React.Fragment>
            );
        } else {
            setHide(true)
        }
    }, [errorIndex, errorElement]);

    return (
        <Card className="danger-card" hidden={hide}>
            <Card.Header>
                Classification Error
            </Card.Header>
            <Card.Body>{body}</Card.Body>
        </Card>
    );
}

type RootProps = { acmWasm };
function Root(props: RootProps): Element {
    const { acmWasm } = props;

    const [ a, setA ] = useState(DEFAULT_A);
    const [ b, setB ] = useState(DEFAULT_B);
    const [ l, setL ] = useState(DEFAULT_L);
    const [ errorIndex, setErrorIndex ] = useState<number | null>();
    const [ errorElement, setErrorElement ] = useState<Array<number> | null>();

    return (
        <ErrorBoundary>
            <Container id="main">
                <Row>
                    <Col>
                        <Controls acmWasm={acmWasm} disabled={true} a={a} setA={setA} b={b} setB={setB} setL={setL} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ClassificationError errorIndex={errorIndex} errorElement={errorElement}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Tabs
                            id="tabs"
                            defaultActiveKey="data"
                        >
                            <Tab eventKey="data" title="Data">
                                <Data
                                    acmWasm={acmWasm}
                                    a={a} b={b} l={l}
                                    setErrorIndex={setErrorIndex}
                                    setErrorElement={setErrorElement}
                                />
                            </Tab>
                            <Tab eventKey="study" title="Study" disabled={true}>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </ErrorBoundary>
    );
}

export default Root;
