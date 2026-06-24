import React, { useState } from 'react';
import { Button, Link } from '@carbon/react';
import { AboutModal } from '@carbon/ibm-products';

function AboutModalDemo() {
  const [open, setOpen] = useState(false);

  // Logo SVG
  const logo = (
    <svg width="157px" height="157px" viewBox="0 0 157 157" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient x1="-9.94443222%" y1="50%" x2="106.211488%" y2="50%" id="linearGradient-1">
          <stop stopColor="#BE95FF" offset="0%"></stop>
          <stop stopColor="#4589FF" offset="100%"></stop>
        </linearGradient>
        <circle id="path-2" cx="86" cy="86" r="71"></circle>
      </defs>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g>
          <g>
            <use fill="#D8D8D8" xlinkHref="#path-2"></use>
            <use fill="url(#linearGradient-1)" xlinkHref="#path-2"></use>
          </g>
          <circle fill="#FFFFFF" cx="39.5" cy="39.5" r="39.5"></circle>
        </g>
      </g>
    </svg>
  );

  // Title with styled text
  const title = (
    <>
      Carbon for IBM{' '}
      <span style={{ fontWeight: '600' }}>Products</span>
    </>
  );

  // Main content
  const content = (
    <>
      <p>
        Carbon for IBM Products is an open-source React component library built by IBM. 
        It extends the Carbon Design System with additional components specifically designed 
        for IBM product teams.
      </p>
      <p>
        This library provides enterprise-grade components that follow IBM Design Language 
        principles and accessibility standards (WCAG 2.1 AA).
      </p>
    </>
  );

  // Additional information with images
  const additionalInfo = (
    <>
      <p className="c4p--about-modal__footer-label">Built with</p>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
        <img 
          alt="React" 
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          style={{ height: '2rem' }}
        />
        <img 
          alt="Carbon Design System" 
          src="https://www.carbondesignsystem.com/android-chrome-512x512.png"
          style={{ height: '2rem' }}
        />
        <img 
          alt="TypeScript" 
          src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg"
          style={{ height: '2rem' }}
        />
      </div>
    </>
  );

  // Links as an array of Link components with keys
  const links = [
    <Link key="link1" href="https://github.com/carbon-design-system/ibm-products">
      GitHub Repository
    </Link>,
    <Link key="link2" href="https://ibm-products.carbondesignsystem.com/">
      Documentation
    </Link>,
    <Link key="link3" href="https://www.carbondesignsystem.com/">
      Carbon Design System
    </Link>
  ];

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        Open About Modal
      </Button>
      
      <AboutModal
        open={open}
        onClose={() => setOpen(false)}
        logo={<div style={{ maxWidth: '6rem' }}>{logo}</div>}
        title={title}
        content={content}
        additionalInfo={additionalInfo}
        links={links}
        modalAriaLabel="About Carbon for IBM Products"
        closeIconDescription="Close"
        copyrightText="Copyright © IBM Corp. 2020, 2024"
        version="Version 2.89.0"
      />
    </div>
  );
}

export default AboutModalDemo;

// Made with Bob