import React from 'react'
import LanguageSelector from 'components/LanguageSelector'
import { useTranslation } from 'react-i18next'
import { Col, Container, Row } from 'react-bootstrap'

export default function Footer() {

  const { t } = useTranslation()

  return (
    <footer style={{
      borderTop: "1px solid #ddd",
      backgroundColor: "#f8f9fa",
      padding: "10px 0",
      textAlign: "center",
    }}>
      <Container>
        <Row className="py-3 align-items-center">
          <Col xs="auto">
            <span>{t("copyright", {time: new Date().getFullYear()})}</span>
          </Col>
          <Col>
          </Col>
          <Col xs="auto">
            <LanguageSelector />
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
