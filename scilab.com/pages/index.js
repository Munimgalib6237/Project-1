
import Link from "next/link"
import { Read } from "../components/read"
import { Navbar } from "../components/navabr"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { Publish } from "../components/publish"
import { Discover } from "../components/discover"
import { PrimaryButton } from "../components/button"
import { SearchForm } from "../components/form/search"

export default function Home() {
  return (
    <div>
      <Navbar user={""} />
      <Header />

      {/* Search */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1">
          <div className="w-full md:w-[550px] lg:w-[650px] mx-auto rounded-full overflow-hidden drop-shadow-xl bg-white border border-gray-100">
            <SearchForm />
          </div>
        </div>
      </div>

      <Read />
      <Discover />
      <Publish />

      <div className="container mx-auto">
        <div className="grid grid-cols-1 text-center pb-[60px] lg:pb-[100px]">
          <Link href="/create-account">
            <a>
              <PrimaryButton>Create account</PrimaryButton>
            </a>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
