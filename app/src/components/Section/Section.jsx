import React from 'react';
import {string} from 'prop-types';
import './Section.scss';
import { Container } from 'react-bootstrap';

const Section = ({ className, children, fullWidth, containerClass, title, ...rest}) => {
     return (
         <section className={`Section ${className || ''}`} {...rest}>
             <Container className={`${containerClass || ''}`} fluid={fullWidth || false}>
                {title && <h2>{title}</h2>}
                {children}
            </Container>
        </section>
    );
}

export default Section;

Section.propTypes = {
    className: string,
    title: string,
}

Section.defaultProps = {
    className: '',
    title: '',
}