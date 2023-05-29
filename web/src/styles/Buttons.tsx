import styled, { css } from "styled-components"
import { iProps } from "./@types/variants.types"

export const Button = styled.button<iProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: bold;
  padding: 16px 10px;
  font-size: ${({ theme }) => theme.typography.sizes.five};
  transition: .3s;

  ${(props) => {
    switch (props.variant) {
      case 'primaryDefault':
        return css`
          background: ${({ theme }) => theme.palette.main.primary};
          color: ${({ theme }) => theme.palette.grayScale.one};
          &:hover {
            background: ${({ theme }) => theme.palette.main.primaryLight};
          }
        `
      case 'grayDefault':
        return css`
          background: ${({ theme }) => theme.palette.grayScale.three};
          color: ${({ theme }) => theme.palette.grayScale.two};
          &:hover {
            background: ${({ theme }) => theme.palette.grayScale.two};
            color: ${({ theme }) => theme.palette.grayScale.three};
          }
        `
      case 'primaryMedium':
        return css`
          background: ${({ theme }) => theme.palette.main.primary};
          color: white;
          &:hover {
            background: ${({ theme }) => theme.palette.main.primaryLight};
          }
        `
      case 'grayMedium':
        return css`
          background: ${({ theme }) => theme.palette.grayScale.three};
          color: ${({ theme }) => theme.palette.grayScale.two};
          &:hover {
            background: ${({ theme }) => theme.palette.grayScale.two};
            color: ${({ theme }) => theme.palette.grayScale.three};
          }
        `
    }
  }}

`