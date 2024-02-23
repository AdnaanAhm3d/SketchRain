import {Await, NavLink} from '@remix-run/react';
import {Suspense, useContext, useEffect, useState} from 'react';
import {useRootLoaderData} from '~/root';

import {DefaultContext} from '../Contexts/DefaultContext';

import logo from 'public/images/logo-sr.png';

// const HelloKitty = () => {
//   console.log('hello Kitty');
// };

// HelloKitty();

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart}) {
  const {shop, menu} = header;
  // const [colA, setColA] = useState(true);
  const {colA, setColA, test, setTest} = useContext(DefaultContext);
  // const {setExm} = useContext(DefaultContext);
  // HelloKitty();

  // const tester = () => {
  //   if (test) {
  //     // console.log('test is true');
  //   } else {
  //     // console.log('test is false');
  //   }
  // };

  // tester();

  // useEffect(() => {
  //   // const localURL = windoow.location.href;
  //   // console.log(localURL);
  // }, []);

  // useEffect(() => {
  //   // const cURL = window.location.href;
  //   // if (cURL === 'http://localhost:3000/collections/all') {
  //   //   console.log(cURL);
  //   // }

  //   // if ((cURL = 'http://localhost:3000/collections/all')) {
  //   //   setTest(true);
  //   //   console.log(test);
  //   // } else {
  //   //   console.log('it aint working brother');
  //   // }

  //   const checkUrl = () => {
  //     const currentUrl = window.location.href;
  //     console.log(currentUrl);
  //     const containsCollectionsAll = currentUrl.includes('collections/all');

  //     // setColA(true);
  //   };

  //   checkUrl();

  //   window.addEventListener('popstate', checkUrl);

  //   return () => {
  //     window.removeEventListener('popstate', checkUrl);
  //   };
  // });

  return (
    <header className="header">
      <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
      />
      <NavLink prefetch="intent" to="/">
        {/* <h3 className="logo-text">Sketch & Rain</h3> */}
        <img
          src={logo}
          className={colA ? 'logo-text ' : 'logo-text switcher'}
        />
      </NavLink>
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
    </header>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 * }}
 */
export function HeaderMenu({menu, primaryDomainUrl, viewport}) {
  const {publicStoreDomain} = useRootLoaderData();
  const {colA, setColA, test, setTest} = useContext(DefaultContext);

  // const className = `header-menu-${viewport}`;

  function closeAside(event) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  return (
    <nav className="nav-links" role="navigation">
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className={colA ? 'header-menu-item' : 'header-menu-item switcher'}
            end
            key={item.id}
            onClick={closeAside}
            prefetch="intent"
            // style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({isLoggedIn, cart}) {
  const {colA, setColA} = useContext(DefaultContext);

  return (
    <nav
      className={colA ? 'header-ctas' : 'header-ctas switcher'}
      role="navigation"
    >
      {/* <HeaderMenuMobileToggle /> */}
      <NavLink
        prefetch="intent"
        to="/account"
        className={colA ? 'ctas-link' : 'ctas-link switcher'}
      >
        {isLoggedIn ? 'Account' : 'Sign in'}
      </NavLink>
      {/* <SearchToggle /> */}
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  return (
    <a className="header-menu-mobile-toggle" href="#mobile-menu-aside">
      <h3>☰</h3>
    </a>
  );
}

function SearchToggle() {
  return <a href="#search-aside">Search</a>;
}

/**
 * @param {{count: number}}
 */
function CartBadge({count}) {
  const {colA, setColA} = useContext(DefaultContext);

  return (
    <a href="#cart-aside" className={colA ? 'ctas-link' : 'ctas-link switcher'}>
      Cart {count}
    </a>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}

/** @typedef {Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>} HeaderProps */
/** @typedef {'desktop' | 'mobile'} Viewport */

/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('./Layout').LayoutProps} LayoutProps */
