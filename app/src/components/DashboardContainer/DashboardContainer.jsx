import React from 'react';
import { string } from 'prop-types';
import './DashboardContainer.scss';
import Section from '../Section';

const DashboardContainer = ({ children, title, className, ...rest}) => {
     return (
        <Section title={title} className={`DashboardContainer py-0 ${className || ''} animate__animated animate__fadeInUpBig`} {...rest}>
            {children}
        </Section>
    );
}

export default DashboardContainer;

DashboardContainer.propTypes = {
     title: string,
}

DashboardContainer.defaultProps = {
     title: '',
}