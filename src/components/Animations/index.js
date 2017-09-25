import { keyframes } from 'styled-components'

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const slideInFromLeft = keyframes`
  from {
    transform: translateX(-900px);
  }
  to {
    transform: translateX(0);
    visibility: visible;
  }
`
