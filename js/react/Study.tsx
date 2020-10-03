import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import LaTeX from 'react-latex';

type StudyProps = { acmWasm, a, b }
function Study(props: StudyProps): Element {
    const { acmWasm, a, b } = props;

    const data = acmWasm.acm_study(a, b);

    return (
        <React.Fragment>
            <LaTeX displayMode={true}>
                {
                    String.raw`
$$
\begin{aligned}
M_{${a},${b}}
&= \{ n\in\N \mid n\equiv a\bmod b \} \cup \{ 1 \} \\
&= \{ (${a}+0\cdot ${b}), (${a}+1\cdot ${b}), (${a}+2\cdot ${b}), \ldots \} \\
&= \{ ${data.elements.join()}, \ldots \}, \\

P
&= \{ p\in\N \mid p \text{ is prime, and } \gcd(p,${b})=1 \} \\
&= \{ ${data.primes.join()} \}
\end{aligned} \\
\mathscr{F}(P)
$$`
                }
            </LaTeX>
        </React.Fragment>
    );
}

export default Study;
