import Header from "./Header"
import Footer from "./Footer"
import CustomHead from "./CustomHead"

interface LayoutProps {
  children: React.ReactNode
  customHead?: boolean
}

export default function Layout({ children, customHead = true }: LayoutProps) {
  return (
    <>
      {customHead ? <CustomHead/> : null}
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
