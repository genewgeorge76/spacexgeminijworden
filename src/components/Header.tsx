import { Link } from '@tanstack/react-router'

export const Header = () => {
  return (
    <nav className="bg-[#1a1a1a] py-[15px] px-[5%] flex justify-between items-center sticky top-0 z-[100]">
      <div className="text-[#f0ad4e] font-bold text-[1.4rem] uppercase">
        <Link to="/">J. Worden & Sons</Link>
      </div>
      <a href="INSERT_KICKSERV_URL_HERE" className="bg-[#f0ad4e] text-[#1a1a1a] py-[10px] px-[20px] no-underline rounded-[4px] font-bold hover:opacity-90 transition-opacity">
        Free Estimate
      </a>
    </nav>
  )
}
