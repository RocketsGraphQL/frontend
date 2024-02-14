import Link from 'next/link'
import Logo from './logo'

export default function Header() {
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 top-0 sticky">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="shrink-0 mr-4 flex">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="flex grow">

            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              {/* <li>                      <iframe src="https://ghbtns.com/github-btn.html?user=RocketsGraphQL&repo=rgraph&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="170" height="30" title="GitHub"></iframe>                                            
</li> */}
              <a
                href="https://github.com/RocketsGraphQL/rgraph"
                target="_blank"
                rel="noreferrer"
                className="mr-12 relative cursor-pointer inline-flex items-center space-x-2 text-center font-regular transition ease-out duration-200 rounded outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1   text-scale-1200 hover:bg-scale-300 shadow-none focus-visible:outline-scale-700  text-xs px-2.5 py-1 group hidden lg:flex"
              >
                <div className="text-brand-800 flex h-4 w-4 items-center justify-center">
                  <div className="text-scale-900 flex h-3 w-3 items-center justify-center transition-all group-hover:h-4 group-hover:w-4 group-hover:text-forest-green group-focus:h-4 group-focus:w-4 group-focus:text-yellow-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="sbui-icon "
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                </div>
                <span className="truncate">Star us on GitHub</span>
              </a>
              <li>
                <Link className="font-medium text-sm text-slate-300 hover:text-white transition duration-150 ease-in-out" href="/signin">Sign in</Link>
              </li>
              <li className="ml-6">
                <Link className="btn-sm text-slate-300 hover:text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none" href="/signup">
                  <span className="relative inline-flex items-center">
                    Sign up <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                  </span>
                </Link>
              </li>
            </ul>

          </nav>

        </div>
      </div>
    </header>
  )
}
