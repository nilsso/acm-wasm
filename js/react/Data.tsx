import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import LaTeX from 'react-latex';

const factorizations_string = (factorizations) => {
    return '(' + factorizations.map(f => f.join(',')).join('),(') + ')';
};

type DataProps = { acmWasm, a, b, l }
function Data(props: DataProps): Element {
    const { acmWasm, a, b, l } = props;

    const [ rows, setRows ] = useState(<React.Fragment></React.Fragment>);

    useEffect(() => {
        const data = acmWasm.acm_data(a, b, l);
        const rows = data.map(({i, e, factorizations, atomic}) => {
            return (
                <tr key={i} className={atomic ? '' : 'reducible'}>
                    <td>{i}</td>
                    <td>{e}</td>
                    <td>{factorizations_string(factorizations)}</td>
                </tr>
            );
        });

        setRows(rows);
    }, [acmWasm, a, b, l]);

    return (
        <Table id="data" responsive striped borderless size="sm">
            <thead>
                <tr>
                    <th><LaTeX>$i$</LaTeX></th>
                    <th><LaTeX>{`$a_i\\in M_{${a},${b}}$`}</LaTeX></th>
                    <th>Factorizations</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    );
}

export default Data;
