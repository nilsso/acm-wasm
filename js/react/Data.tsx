import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import LaTeX from 'react-latex';

//const factorizations_string = (factorizations) => {
    //return '(' + factorizations.map(f => f.join(',')).join('),(') + ')';
//};

type DataProps = { acmWasm, a, b, l, setErrorIndex, setErrorElement }
function Data(props: DataProps): Element {
    const { acmWasm, a, b, l, setErrorIndex, setErrorElement } = props;

    const [ rows, setRows ] = useState(<React.Fragment></React.Fragment>);

    useEffect(() => {
        const data = acmWasm.acm_data(BigInt(a), BigInt(b), BigInt(l));
        let found_error = false;
        //const rows = data.map(({i, e, factorizations, atomic}) => {
        //const rows = data.map(({i, e, atomic, factorizations, classification, error}) => {
        const rows = data.map(({i, e, atomic, classification, error}) => {
            let style;
            if (atomic) {
                style = '';
            } else if (!error) {
                style = 'reducible';
            } else {
                style = 'error';
                if (!found_error) {
                    setErrorIndex(i);
                    setErrorElement(e);
                    found_error = true;
                }
            }
            return (
                <tr key={i} className={style}>
                    <td>{i}</td>
                    <td>{e}</td>
                    <td><LaTeX>{classification || ""}</LaTeX></td>
                </tr>
            );
        });

        setRows(rows);
    }, [acmWasm, a, b, l]);

    return (
        <Table id="data" striped borderless size="sm">
            <thead>
                <tr>
                    <th><LaTeX>$i$</LaTeX></th>
                    <th><LaTeX>{`$a_i\\in M_{${a},${b}}$`}</LaTeX></th>
                    <th>Classification</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    );
}

export default Data;
