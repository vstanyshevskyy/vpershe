import React from 'react';
import Link from 'gatsby-link';
import { Container, Row, Col } from 'reactstrap';
import SocialIcons from '../social-icons';
import './index.less';

const BOOTSTRAP_COLUMNS_COUNT = 12;

export default props => (
  <footer className="container-fluid footer">
    <Container>
      <Row>
        {
          props.blocks.map((block, index) => (
            <Col key={index} xs={12} lg={BOOTSTRAP_COLUMNS_COUNT / props.blocks.length}>
              <h5 className="block-title">{ block.title }</h5>
              <div dangerouslySetInnerHTML={{ __html: block.content }} />
            </Col>
          ))
        }
      </Row>
    </Container>
    <Row className="separator" />
    <Container className="footer-bottom">
      <Row>
        <Col sm="8" xs="12" >
          {props.copyrightText}
        </Col>
        <Col xs="12" sm="4" className="text-sm-right">
          {props.bottomLinks.map(link => (
            <Link key={link.url} to={link.url}>{link.text}</Link>
          ))}
          <SocialIcons
            icons={props.socialIcons}
            listClassName="social-icons-container"
            listItemClassName="social-icons-item"
            linkClassName="social-icons-link"
          />
        </Col>
      </Row>
    </Container>
  </footer>
);

