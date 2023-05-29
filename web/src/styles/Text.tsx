import styled, { css } from "styled-components";
import { iProps } from "./@types/variants.types";

export const Text = styled.p<iProps>`
    font-size: 1.6rem;
    font-weight: 400;
    color: ${(props) => props.theme.palette.grayScale.four};

    ${(props) => {
        switch (props.variant) {
            case 'title1':
                return css`
                    font-size: 2.75rem;
                    line-heigt: 3.8rem;
                    font-weight: 700;
                `
            case 'title2':
                return css`
                    font-size: 1.75rem;
                    line-heigt: 2.75rem;
                    font-weight: 700;
                `
            
            case 'title3':
                return css`
                    font-size: 1.50rem;
                    line-heigt: 2.5rem;
                    font-weight: 700;
                `
            
            case 'title4':
                return css`
                    font-size: 1.25rem;
                    line-heigt: 1.25rem;
                    font-weight: 700;
                `

            case 'text1':
                return css`
                    font-size: 1rem;
                    line-heigt: 1.75rem;
                `

            case 'text2':
                return css`
                    font-size: 0.75rem;
                    line-heigt: 1.75rem;
                `
            }
        }
    }
`