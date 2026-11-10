import type { ReactNode } from 'react'

export type Part =
  | { p: 'e'; g: string; x: number; y: number; s: number }
  | { p: 'path'; d: string; stroke: string; w: number; fill: string }
  | { p: 'rect'; x: number; y: number; w: number; h: number; fill: string; r: number; stroke: string }
  | { p: 'ell'; x: number; y: number; rx: number; ry: number; fill: string; o: number }
  | { p: 'poly'; pts: string; fill: string }
  | { p: 'outlet'; x: number; y: number; burnt: boolean }

/**
 * Un objeto de la escena. (x, y) es el centro de la zona clicable y (w, h) su tamaño,
 * en coordenadas del lienzo de 800 x 480.
 *
 * Hay tres formas de dibujarlo:
 * - `art`: ilustración SVG en coordenadas absolutas del lienzo (recomendado).
 * - `parts`: piezas simples relativas al centro (formato anterior).
 * - ninguna: zona invisible, para escenas que usan una imagen de fondo (`bgImage`).
 */
export interface SceneItem {
  id: string
  x: number
  y: number
  w: number
  h: number
  art?: ReactNode
  parts?: Part[]
  hazard?: [string, string]
  safe?: string
}

export interface SceneDef {
  id: string
  title: string
  intro: string
  /** Fondo ilustrado en SVG (coordenadas absolutas de 800 x 480). */
  backdrop?: ReactNode
  /** Imagen de fondo (PNG/JPG/SVG en /public). Se ajusta a 800 x 480. */
  bgImage?: string
  /** Fondo con piezas simples (formato anterior). */
  bg?: Part[]
  items: SceneItem[]
}
