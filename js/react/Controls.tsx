import React, { useState, useEffect } from 'react';
import LaTeX from 'react-latex';
import { Button, Col, Form } from 'react-bootstrap';

import { DEFAULT_A, DEFAULT_B, DEFAULT_L } from './Root';

type FieldProps = { label, placeholder, value, setValue, isValid, feedback, disabled };
function Field(props: FieldProps) {
    const { label, placeholder, value, setValue, isValid, feedback, disabled } = props;

    return (
        <Form.Group as={Col} xs={16} md={4}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                required
                placeholder={placeholder}
                value={value}
                isInvalid={!isValid(value)}
                onChange={e => setValue(e.target.value)}
                disabled={disabled}
            >
            </Form.Control>
            <Form.Control.Feedback type="invalid">
                {feedback}
            </Form.Control.Feedback>
        </Form.Group>
    );
}

type ControlsProps = { acmWasm, disabled, a, setA, b, setB, setL };
function Controls(props: ControlsProps): Element {
    const { acmWasm, disabled, a, setA, b, setB, setL } = props;

    const [ inputA, setInputA ] = useState("");
    const [ inputB, setInputB ] = useState("");
    const [ inputL, setInputL ] = useState("");

    const [ tempA, setTempA ] = useState(a);
    const [ tempB, setTempB ] = useState(b);
    const [ tempL, setTempL ] = useState(b);

    const [ validA, setValidA ] = useState(false);
    const [ validB, setValidB ] = useState(false);
    const [ validL, setValidL ] = useState(false);

    //const [ validBList, setValidBList ] = useState(acmWasm.valid_b(a));
    const [ validBList, setValidBList ] = useState("Something");

    useEffect(() => {
        const a = inputA ? Number(inputA) : DEFAULT_A;
        const b = inputB ? Number(inputB) : DEFAULT_B;

        if (a) {
            setTempA(a);
            //setValidBList(acmWasm.valid_b(a));
        } else {
            setValidA(false);
        }
        if (b) {
            setTempB(b);
        }

        setValidA(a && a >= 1);
        setValidB(!a || b && b >= a && (a * a) % b === a % b);
    }, [acmWasm, inputA, inputB, setTempA, setTempB, setValidA, setValidB]);

    useEffect(() => {
        const l = inputL ? Number(inputL) : DEFAULT_L;

        if (l && l >= 1) {
            setTempL(l);
            setValidL(true);
        } else {
            setValidL(false);
        }
    }, [inputL, setTempL, setValidL ]);


    const labels = [
        [<LaTeX>Component $a$</LaTeX>, DEFAULT_A, inputA, setInputA, () => validA, <LaTeX>$a\ge 1$</LaTeX>, disabled],
        [<LaTeX>Component $b$</LaTeX>, DEFAULT_B, inputB, setInputB, () => validB, <LaTeX>{validBList}</LaTeX>, disabled],
        ["Number of elements",         DEFAULT_L, inputL, setInputL, () => validL, "Must be a positive integer", false]
    ];

    return (
        <Form noValidate id="control-form">
            <Form.Row>
                {
                    labels.map(([label, placeholder, value, setValue, isValid, feedback, disabled], i) => {
                        return (
                            <Field key={i}
                                label={label}
                                placeholder={placeholder}
                                value={value}
                                setValue={setValue}
                                isValid={isValid}
                                feedback={feedback}
                                disabled={disabled}
                            />
                            );
                    })
                }
            </Form.Row>
            <Form.Row>
                <Col>
                    <Button
                        type="submit"
                        disabled={!(validA && validB && validL)}
                        onClick={(e) => {
                            e.preventDefault();
                            setA(tempA);
                            setB(tempB);
                            setL(tempL);
                        }}
                    >
                        Submit
                    </Button>
                </Col>
            </Form.Row>
        </Form>
    );
}


export default Controls;
