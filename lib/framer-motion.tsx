/**
 * Minimal framer-motion shim using plain React + CSS transitions.
 * Replaces framer-motion so components work without the package installed.
 */
"use client"

import React, { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

type MotionProps = React.HTMLAttributes<HTMLElement> & {
  initial?: Record<string, number | string>
  animate?: Record<string, number | string>
  exit?: Record<string, number | string>
  transition?: Record<string, unknown>
  variants?: Record<string, Record<string, number | string>>
  whileTap?: Record<string, number | string>
  whileHover?: Record<string, number | string>
  layoutId?: string
  layout?: boolean
  as?: keyof JSX.IntrinsicElements
  children?: ReactNode
  style?: CSSProperties
  className?: string
}

function toCSS(obj?: Record<string, number | string>): CSSProperties {
  if (!obj) return {}
  const style: CSSProperties = {}
  if ("opacity" in obj) (style as Record<string, unknown>).opacity = obj.opacity
  if ("y" in obj) (style as Record<string, unknown>).transform = `translateY(${obj.y}px)`
  if ("x" in obj) (style as Record<string, unknown>).transform = `translateX(${obj.x}px)`
  if ("scale" in obj) (style as Record<string, unknown>).transform = `scale(${obj.scale})`
  if ("height" in obj) (style as Record<string, unknown>).height = obj.height
  return style
}

function MotionDiv({ initial, animate, exit: _exit, transition, variants, whileTap, whileHover, layoutId: _lid, layout: _l, children, style, className, as, ...rest }: MotionProps) {
  const Tag = (as ?? "div") as "div"
  const resolved = animate && variants ? variants[animate as string] ?? animate : animate
  const initResolved = initial && variants ? variants[initial as string] ?? initial : initial

  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const dur = typeof transition?.duration === "number" ? transition.duration : 0.25

  const computedStyle: CSSProperties = {
    transition: `opacity ${dur}s ease, transform ${dur}s ease, height ${dur}s ease`,
    ...(mounted ? toCSS(resolved as Record<string, number | string>) : toCSS(initResolved as Record<string, number | string>)),
    ...style,
  }

  return (
    <Tag className={className} style={computedStyle} {...(rest as Record<string, unknown>)}>
      {children}
    </Tag>
  )
}

export const motion = new Proxy(
  {
    div: MotionDiv,
    button: (props: MotionProps) => <MotionDiv as="button" {...props} />,
    span: (props: MotionProps) => <MotionDiv as="span" {...props} />,
    img: (props: MotionProps) => <MotionDiv as="img" {...props} />,
    p: (props: MotionProps) => <MotionDiv as="p" {...props} />,
    ul: (props: MotionProps) => <MotionDiv as="ul" {...props} />,
    li: (props: MotionProps) => <MotionDiv as="li" {...props} />,
  },
  {
    get(target, key: string) {
      return (target as Record<string, unknown>)[key] ?? ((props: MotionProps) => <MotionDiv as={key as keyof JSX.IntrinsicElements} {...props} />)
    },
  }
)

export function AnimatePresence({ children }: { children: ReactNode; mode?: string }) {
  return <>{children}</>
}

export function useAnimation() {
  return { start: () => {}, stop: () => {} }
}

export function useMotionValue(init: number) {
  const ref = useRef(init)
  return { get: () => ref.current, set: (v: number) => { ref.current = v } }
}
