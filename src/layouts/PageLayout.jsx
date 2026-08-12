import Container from '../components/common/Container'
import Navbar from '../components/common/Navbar'

/**
 * PageLayout — Generic layout wrapper providing structure, Navbar, responsive background, and optional footer slot.
 *
 * SIH Problem Statement: SIH260011
 *
 * @param {React.ReactNode|null} [header] - Header content (defaults to Navbar; pass null to omit)
 * @param {React.ReactNode} children - Main page content
 * @param {React.ReactNode} [footer] - Optional footer content
 * @param {string} [className=''] - Additional CSS classes
 * @param {'sm'|'md'|'lg'|'xl'|'full'} [containerSize='xl'] - Container width for main content
 * @param {boolean} [withContainer=true] - Whether to automatically wrap main content in Container
 */
function PageLayout({
  header = <Navbar />,
  children,
  footer,
  className = '',
  containerSize = 'xl',
  withContainer = true,
  ...rest
}) {
  const classes = ['page-layout', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {header && <header className="page-layout__header">{header}</header>}

      <main className="page-layout__main">
        {withContainer ? (
          <Container size={containerSize}>{children}</Container>
        ) : (
          children
        )}
      </main>

      {footer && <footer className="page-layout__footer">{footer}</footer>}
    </div>
  )
}

export default PageLayout
