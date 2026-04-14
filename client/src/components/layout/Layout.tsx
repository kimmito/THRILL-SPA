import { Outlet } from "react-router"
import Header from "../header/Header"
import Footer from "../footer/Footer"

export const Layout = () => {
  return(
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}