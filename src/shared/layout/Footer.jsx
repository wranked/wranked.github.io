import React, { useEffect, useRef, useState } from 'react'
import LanguageSelector from 'shared/ui/LanguageSelector'
import { useTranslation } from 'react-i18next'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { FaArrowUp } from 'react-icons/fa6'

export default function Footer() {

  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(true)
  const [footerHeight, setFooterHeight] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const lastScrollYRef = useRef(0)
  const footerRef = useRef(null)

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY
      const isAtBottom = window.innerHeight + currentScrollY >= document.documentElement.scrollHeight - 2

      setShowScrollTop(currentScrollY > 200)

      if (isAtBottom) {
        setIsVisible(true)
        lastScrollYRef.current = currentScrollY
        return
      }

      if (currentScrollY > lastScrollYRef.current + 2) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollYRef.current - 2) {
        setIsVisible(true)
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    function updateFooterHeight() {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight)
      }
    }

    updateFooterHeight()
    window.addEventListener('resize', updateFooterHeight)

    return () => window.removeEventListener('resize', updateFooterHeight)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div aria-hidden="true" style={{ height: footerHeight }} />
      <Button
        variant="secondary"
        aria-label="Back to top"
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          right: '20px',
          bottom: isVisible ? `${footerHeight + 20}px` : '20px',
          zIndex: 1031,
          borderRadius: '999px',
          width: '48px',
          height: '48px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          transition: 'bottom 260ms ease, opacity 260ms ease, transform 260ms ease',
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? 'translateY(0)' : 'translateY(12px)',
          pointerEvents: showScrollTop ? 'auto' : 'none',
        }}
      >
        <FaArrowUp />
      </Button>
      <footer
        ref={footerRef}
        style={{
          borderTop: "1px solid #ddd",
          backgroundColor: "#f8f9fa",
          padding: "10px 0",
          textAlign: "center",
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1030,
          transition: 'transform 260ms ease, opacity 260ms ease',
          transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
      >
        <Container>
          <Row className="py-3 align-items-center">
            <Col xs="auto">
              <LanguageSelector />
            </Col>
            <Col>
            </Col>
            <Col xs="auto">
              <span>{t("copyright", {time: new Date().getFullYear()})}</span>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}
