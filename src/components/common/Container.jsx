/**
 * Container — Reusable content wrapper providing max-width constraint & responsive horizontal padding.
 *
 * SIH Problem Statement: SIH260011
 *
 * @param {React.ReactNode} children - Wrapped content
 * @param {'sm'|'md'|'lg'|'xl'|'full'} [size='xl'] - Container max-width variant
 * @param {string} [className=''] - Additional CSS classes
 * @param {React.ElementType} [as='div'] - Semantic HTML element tag
 */
function Container({
  children,
  size = 'xl',
  className = '',
  as: Component = 'div',
  ...rest
}) {
  const classes = [
    'container',
    `container--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  )
}

export default Container
