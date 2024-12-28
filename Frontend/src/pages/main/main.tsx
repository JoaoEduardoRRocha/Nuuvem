import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import HeroSection from "../../components/hero-section/hero-section"
import Navbar from "../../components/navbar/navbar"
import Section from "../../components/section/section"
import "../../app.css"
import { getUser } from "../../auth/auth-helper"
import LoadingScreen from "../../components/loading-screen/loading-screen"

function Main() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [contentLoading, setContentLoading] = useState(true) 
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUser()
      if (user) {
        setIsAuthenticated(true)
        setIsAdmin(user.isAdmin || false)
      } else {
        navigate("/")
      }
      setLoading(false)
    }
    checkAuth()
  }, [navigate])

  useEffect(() => {
    if (!loading) {
      if (isAdmin) {
        navigate("/home-admin")
      }
    }
  }, [isAdmin, loading, navigate])

  useEffect(() => {
    const timer = setTimeout(() => {
      setContentLoading(false)
    }, 1000) 

    return () => clearTimeout(timer)
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <div className="app">
      <Navbar />
      {contentLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <img
            className="hero-img"
            src="https://wallpapers.com/images/hd/purple-gaming-sfiq72g5kksu8khe.jpg"
            alt="Hero Background"
          />
          <HeroSection />
          <Section />
        </>
      )}
    </div>
  )
}

export default Main
