import Link from 'next/link'
import Image from 'next/image'

import logoImage from '@/assets/logo.png'
import classes from './main-header.module.css'
import { MainHeaderBackground } from '@/components/main-header/main-header-background'
import { NavLink } from '@/components/main-header/nav-link'

export const MainHeader = () => {
  return (
    <>
      <MainHeaderBackground/>
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image src={logoImage.src} alt="A plate with foog on it" width={80} height={80} priority/>
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li><NavLink href="/meals">Browse Meals</NavLink></li>
            <li><NavLink href="/community">Foodies Community</NavLink></li>
          </ul>
        </nav>
      </header>
    </>
  )
}
