import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';
import { useRouter } from 'next/router';

import classes from './main-navigation.module.css';

function MainNavigation() {
  const [session, loading] = useSession();
  const router = useRouter();

  async function handleLogout() {
    const data = await signOut({ redirect: false, callbackUrl: '/' });
    router.push(data.url);
  }
  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/basket'>Basket</Link>
          </li>
          {!session && !loading && (
            <li>
              <Link href='/login'>Giriş Yap</Link>
            </li>
          )}
          {!session && !loading && (
            <li>
              <Link href='/login'>Üye Ol</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href='/user'>Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
