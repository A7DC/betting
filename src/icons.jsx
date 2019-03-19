import * as React from 'react';
import { color } from './styles/variables'

export const IconClose = ({bg, stroke, size}) => (
  <svg width={!size ? '16' : size} height={!size ? '16' : size} viewBox="0 0 32 32">
    <g fill="none">
      <circle cx="16" cy="16" r="16" fill={!bg ? color.nearWhite : bg} />
      <path stroke={!stroke ? color.lightSilver : null} strokeLinecap="square" d="M22.5 9.5L9.5 22.5M22.5 22.5L9.5 9.5" />
    </g>
  </svg>
)