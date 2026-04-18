import {
  forwardRef,
  useCallback,
  useRef,
  type ButtonHTMLAttributes,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from 'react';

type Variant = 'gold' | 'steel';

export interface TactileButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 'gold' (default) — PVD gold face. 'steel' — charcoal face with gold rim. */
  variant?: Variant;
  /** Length of the vibration pulse emitted on click. Defaults to 18ms. */
  hapticMs?: number;
  /** Render-prop for leading glyph / icon. */
  leading?: ReactNode;
  /** Render-prop for trailing glyph / icon. */
  trailing?: ReactNode;
}

/**
 * Tactile UI button — a metallic, 3D-effect key that depresses on click and
 * emits a short haptic pulse (where the device supports `navigator.vibrate`)
 * plus a radial ripple wave. Styling lives in `index.css` under `.tactile-btn`.
 */
const TactileButton = forwardRef<HTMLButtonElement, TactileButtonProps>(
  function TactileButton(
    {
      variant = 'gold',
      hapticMs = 18,
      leading,
      trailing,
      className,
      onPointerDown,
      onClick,
      children,
      type = 'button',
      ...rest
    },
    ref,
  ) {
    const rippleHost = useRef<HTMLButtonElement | null>(null);

    const setRef = useCallback(
      (el: HTMLButtonElement | null) => {
        rippleHost.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = el;
      },
      [ref],
    );

    const handlePointerDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
      const host = rippleHost.current;
      if (host) {
        const rect = host.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple = document.createElement('span');
        ripple.className = 'tactile-wave';
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        host.appendChild(ripple);
        window.setTimeout(() => ripple.remove(), 560);
      }
      // Haptic pulse — short industrial "click" on supported devices.
      if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        try {
          navigator.vibrate(hapticMs);
        } catch {
          /* silently ignore — some browsers throw on secure-context mismatch */
        }
      }
      onPointerDown?.(e);
    };

    const variantClass = variant === 'steel' ? 'tactile-steel' : '';

    return (
      <button
        ref={setRef}
        type={type}
        className={['tactile-btn', variantClass, className].filter(Boolean).join(' ')}
        onPointerDown={handlePointerDown}
        onClick={onClick}
        {...rest}
      >
        {leading ? <span aria-hidden="true">{leading}</span> : null}
        <span>{children}</span>
        {trailing ? <span aria-hidden="true">{trailing}</span> : null}
      </button>
    );
  },
);

export default TactileButton;
