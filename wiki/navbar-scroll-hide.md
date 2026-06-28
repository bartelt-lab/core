# Navbar: hide-on-scroll (parked technique)

The core `Navbar` (`src/components/common/Navbar.jsx`) is a fixed pill that only
shrinks slightly once scrolled. It used to **slide away entirely** on `/dynamo`
after the user scrolled past the hero, so the cinematic hero owned the top of the
screen. That behavior was removed (it complicated the bar and was wanted on one
page only), but it's worth keeping for a future immersive hero. Here's how to put
it back.

## What it did

Once `scrollY` passed ~68% of the viewport height on a chosen route, the bar
translated up and faded out (`pointer-events-none` so it couldn't be clicked
while invisible). Scrolling back up brought it down again. The `transition-all
duration-300` already on the header animated it.

## How to restore it

In `Navbar.jsx`:

1. Add the state back alongside `isScrolled`:

   ```jsx
   const [hideOnScroll, setHideOnScroll] = useState(false)
   ```

2. Set it in the scroll handler. Gate by route(s) where you want it, and add
   `location.pathname` back to the effect dependency array:

   ```jsx
   const HIDE_ON_ROUTES = ['/dynamo'] // routes with an immersive hero

   useEffect(() => {
     const handleScroll = () => {
       setIsScrolled(window.scrollY > 20)
       setHideOnScroll(
         HIDE_ON_ROUTES.includes(location.pathname) &&
           window.scrollY > window.innerHeight * 0.68, // threshold — tune
       )
     }
     handleScroll()
     window.addEventListener('scroll', handleScroll)
     return () => window.removeEventListener('scroll', handleScroll)
   }, [location.pathname])
   ```

3. Branch the header className (the hide branch wins over the scrolled branch):

   ```jsx
   className={`fixed inset-x-3 top-3 z-[60] mx-auto max-w-[94rem] transition-all duration-300 sm:inset-x-5 sm:top-4 ${
     hideOnScroll
       ? 'pointer-events-none -translate-y-24 opacity-0'
       : isScrolled
         ? 'scale-[0.985] opacity-100'
         : 'scale-100 opacity-100'
   }`}
   ```

## Notes / gotchas

- **Threshold** `window.innerHeight * 0.68` is viewport-relative — felt right for a
  full-bleed hero. Lower it to hide sooner.
- Always pair the hidden state with `pointer-events-none`, or invisible nav links
  still intercept clicks.
- Keep the route list small and explicit (`HIDE_ON_ROUTES`); a global hide-on-
  scroll makes the nav feel unreliable on ordinary content pages.
- `scroll` listeners fire often — the handler only calls `setState` with a
  primitive, so React bails out when the value is unchanged. Don't add heavy work
  there; throttle if you do.
