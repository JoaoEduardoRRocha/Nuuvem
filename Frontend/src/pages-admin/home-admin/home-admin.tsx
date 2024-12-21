import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import HeroSection from '../../components/hero-section/hero-section'
import NavbarAdmin from '../../components-admin/navbar-admin/navbar-admin'
import Section from '../../components/section/section'
import '../../app.css'
import { getUser } from '../../auth/auth-helper'
import { UserModel } from '../../auth/models'
import LoadingScreen from '../../components/loading-screen/loading-screen'

function HomeAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const user: UserModel | null = await getUser()
      if (user) {
        setIsAuthenticated(true)
        setIsAdmin(user.isAdmin)
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  if (loading) return <LoadingScreen />
  if (!isAuthenticated) return <Navigate to="/login" />
  if (!isAdmin) return <Navigate to="/not-authorized" />

  return (
    <div className="app">
      <NavbarAdmin />
      <img className="hero-img" src="https://wallpapers.com/images/hd/purple-gaming-sfiq72g5kksu8khe.jpg" />
      <HeroSection />
      <Section />
    </div>
  )
}

export default HomeAdmin
