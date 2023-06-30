import styled, { css } from 'styled-components';

// Card, Button, Typography, Modal, TextField, Label, ButtonGroup, Delimiter, Checkbox, Toggle, Select, MenuItem


// THEME

const theme = {
    colors: {
        primary: '#009EF7',
        secondary: '#E1E3EA',
        success: '#50CD89',
        info: '#7239EA',
        warning: '#FFC700',
        danger: '#F1416C',
        dark: '#181C32',
        black: '#171724',
        gray: '#2b2b40',
        bodyColor: '#FFFFFF',
        bodyColorRGB: '255 255 255',
        bodyBg: '#1e1e2d',
        bodyBgRGB: '30, 30, 45',
        emphasisColor: '#F9F9F9',
        emphasisColorRGB: '249, 249, 249',
        secondaryColor: 'rgba(255, 255, 255, .075)',
        secondaryColorRGB: '255, 255, 255',
        secondaryBg: '#3F4254',
        secondaryBgRGB: '63, 66, 84',
        primaryText: '#6ea8fe',
        secondaryText: '#E1E3EA',
        successText: '#75B798',
        infoText: '#6edff6',
        warningText: '#ffda6a',
        dangerText: '#ea868f',
        lightText: '#F9F9F9',
        darkText: '#E1E3EA',
    },
    breakpoints: {
        XS: 0,
        SM: '576px',
        MD: '768px',
        LG: '992px',
        XL: '1200px',
        XXL: '1400px',
    },
    radius: {
        XS: '0.425rem',
        SM: '0.475rem',
        LG: '0.625rem',
        XL: '1rem',
        XXL: '2rem',
    },
    boxShadow: {
        XS: '0 0.5rem 1.5rem 0.5rem rgba(0, 0, 0, 0.075);',
        SM: '0 0.1rem 1rem 0.25rem rgba(0, 0, 0, 0.05);',
        LG: '0 1rem 2rem 1rem rgba(0, 0, 0, 0.1);',
    },
    font: {
        sans: 'Inter, Helvetica, "sans-serif"'
    }
}




export type ColorVariant = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'dark' | 'black' | 'gray';
export type Radius = keyof typeof theme.radius;
export type boxShadow = keyof typeof theme.boxShadow;



// ===================== BLOCK =====================
export interface BlockProps {
    mx?: string;
    my?: string;
    mt?: string;
    mb?: string;
    mr?: string;
    ml?: string;
    px?: string;
    py?: string;
    pt?: string;
    pb?: string;
    pr?: string;
    pl?: string;
}

export const Block = styled.div<BlockProps>`
  box-sizing: border-box;
  margin: ${({ mx, my, mt, mb }) =>
        `${my || mt || '0'} ${mx || '0'} ${my || mb || '0'}`};
  padding: ${({ px, py, pt, pb }) =>
        `${py || pt || '0'} ${px || '0'} ${py || pb || '0'}`};
`;



// ===================== DELIMITER =====================
export interface DelimiterProps {
    fullWidth?: boolean,
}

export const Delimiter = styled(Block) <DelimiterProps>`
    height: 1px;
    background: ${theme.colors.secondary};
    margin: 0 auto;
    width: 100%;
    opacity: 0.25
`;



// ===================== BUTTON =====================
export interface ButtonProps extends BlockProps {
    bg?: ColorVariant;
    color?: ColorVariant;
    radius?: Radius;
    first?: boolean;
    last?: boolean;
    between?: boolean;
}

// ===================== BUTTON GROUP =====================

export const Button = styled.button<ButtonProps>`
    padding: .85rem 1.2rem;
    color: ${theme.colors.lightText};
    background: ${({ bg }) => {
        return (
            bg === 'primary' ? theme.colors.primary :
                bg === 'success' ? theme.colors.success :
                    bg === 'info' ? theme.colors.info :
                        bg === 'warning' ? theme.colors.warning :
                            bg === 'danger' ? theme.colors.danger :
                                bg === 'dark' ? theme.colors.dark : 
                                    bg === 'black' ? theme.colors.black :
                                        bg === 'gray' ? theme.colors.gray : theme.colors.primary
        );
    }};
    outline: none;
    border: none;
    border-radius: ${theme.radius.XS};
    transition: all .2s linear;
    cursor: pointer;
    margin: ${({ mx, my, mt, mb }) =>
        `${my || mt || '0'} ${mx || '0'} ${my || mb || '0'}`};
    padding: ${({ px, py, pt, pb }) =>
        `${py || pt || '0.85rem'} ${px || '0.85rem'} ${py || pb || '0.85rem'}`};
    ${({ first }) =>
        first &&
        css`
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    `}

    ${({ last }) =>
        last &&
        css`
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    `}
    ${({ between }) =>
    between &&
        css`
      border-radius: 0;
    `}
    &:hover {
        background: ${theme.colors.secondaryBg};
        transition: all .2s linear;
    }
`;


// ===================== TYPEGRAPHY =====================
export interface TypographyProps {

}

export const Typography = styled.span<TypographyProps>`
    font-family: ${theme.font.sans};
    font-weight: 500;
    letter-spacing: 0.04rem;
    display: inline-block;
    color: ${theme.colors.lightText}
`;



// ===================== FLEXBOX =====================
export interface FlexBoxProps {
    alignItems?: 'center' | 'flex-start' | 'flex-end';
    justifyContent?: 'center' | 'space-between' | 'flex-start' | 'flex-end'
}

export const FlexBox = styled(Block) <FlexBoxProps>`
    display: flex;
    align-items: ${({ alignItems }) => alignItems || 'center'};
    justify-content: ${({ justifyContent }) => justifyContent || 'space-between'};
`;



// ===================== CARD =====================
export interface CardProps {

}
export const Card = styled(Block) <CardProps>`
    width: 100%;
    height: auto;
    display: block;
    background-color: ${theme.colors.bodyBg};
    border-radius: ${theme.radius.SM};
    box-shadow: ${theme.boxShadow.SM};
`;



// ===================== CONTAINER =====================
export interface ContainerProps {
    sm?: boolean;
    md?: boolean;
    lg?: boolean;
    xl?: boolean;
    xxl?: boolean;
    autoX?: boolean;
    fullWidth?: boolean;
}



export const Container = styled(Block) <ContainerProps>`
        width: ${({ sm, md, lg, xl, xxl }) => {
        return (
            sm ? theme.breakpoints.SM :
                md ? theme.breakpoints.MD :
                    lg ? theme.breakpoints.LG :
                        xl ? theme.breakpoints.XL :
                            xxl ? theme.breakpoints.XXL : '100%'
        );
    }
    };
        margin: ${({ autoX }) => {
        return (
            autoX ? '0 auto' : ''
        );
    }}
    `;



// ===================== WRAPPER =====================
export const Wrapper = styled(Block)``



