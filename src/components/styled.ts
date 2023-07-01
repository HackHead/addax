import styled, { css } from 'styled-components';

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
        primaryRGB: '0, 158, 247',
        secondaryRGB: '225, 227, 234',
        successRGB: '80, 205, 137',
        infoRGB: '114, 57, 234',
        warningRGB: '255, 199, 0',
        dangerRGB: '241, 65, 108',
        darkRGB: '24, 28, 50',
        blackRGB: '23, 23, 36',
        grayRGB: '43, 43, 64',
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




export type ColorVariant = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'dark' | 'black' | 'gray' | 'transparent';
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
    fullwidth?: number; // use number to avoid "Not boolean error"
    w?: string;
    h?: string;
    bordercolor?: ColorVariant;
    borderwidth?: string;
    borderstyle?: string;
    borderalpha?: number;
    bg?: ColorVariant;
    alpha?: number;
}

export const Block = styled.div<BlockProps>` 
  overflow: hidden;
  box-sizing: border-box;
  margin: ${({ mx, my, mt, mb }) =>
        `${my || mt || '0'} ${mx || '0'} ${my || mb || '0'}`};
  padding: ${({ px, py, pt, pb }) =>
        `${py || pt || '0'} ${px || '0'} ${py || pb || '0'}`};
  width: ${({fullwidth, w}) => {
    return w ? w : fullwidth ? '100%' : 'auto';
  }};
  height: ${({h}) => {
    return h ? h : 'auto';
  }};
  border-color: ${({bordercolor, borderalpha}) => {
    return bordercolor === 'primary' ? `rgba(${theme.colors.primaryRGB}, ${borderalpha || 1})` :
                bordercolor === 'success' ? `rgba(${theme.colors.successRGB}, ${borderalpha || 1})` :
                    bordercolor === 'info' ? `rgba(${theme.colors.infoRGB}, ${borderalpha || 1})` :
                        bordercolor === 'warning' ? `rgba(${theme.colors.warningRGB}, ${borderalpha || 1})` :
                            bordercolor === 'danger' ? `rgba(${theme.colors.dangerRGB}, ${borderalpha || 1})` :
                                bordercolor === 'dark' ? `rgba(${theme.colors.darkRGB}, ${borderalpha || 1})` :
                                    bordercolor === 'black' ? `rgba(${theme.colors.blackRGB}, ${borderalpha || 1})` :
                                        bordercolor === 'gray' ? `rgba(${theme.colors.grayRGB}, ${borderalpha || 1})` : `rgba(${theme.colors.secondaryRGB}, .05 )`
  }};
  border-width: ${({borderwidth}) => {
    return borderwidth ? borderwidth : 'none';
  }};
  border-style: ${({borderstyle}) => {
    return borderstyle ? borderstyle : 'none';
  }};
  position: relative;
  background: ${({ bg, alpha }) => {
    return bg === 'primary' ? `rgba(${theme.colors.primaryRGB}, ${alpha || 1})` :
                bg === 'success' ? `rgba(${theme.colors.successRGB}, ${alpha || 1})` :
                    bg === 'info' ? `rgba(${theme.colors.infoRGB}, ${alpha || 1})` :
                        bg === 'warning' ? `rgba(${theme.colors.warningRGB}, ${alpha || 1})` :
                            bg === 'danger' ? `rgba(${theme.colors.dangerRGB}, ${alpha || 1})` :
                                bg === 'dark' ? `rgba(${theme.colors.darkRGB}, ${alpha || 1})` :
                                    bg === 'black' ? `rgba(${theme.colors.blackRGB}, ${alpha || 1})` :
                                        bg === 'gray' ? `rgba(${theme.colors.grayRGB}, ${alpha || 1})` :
                                            bg === 'transparent' ? `transparent` : `transparent`
    }};
  &:not(:last-child) {
    border-right: none;
  }
`;



// ===================== DELIMITER =====================
export interface DelimiterProps {
    fullwidth?: boolean,
}

export const Delimiter = styled(Block) <DelimiterProps>`
    height: 1px;
    background: ${theme.colors.secondary};
    margin: 0 auto;
    width: 100%;
    opacity: 0.1
`;



// ===================== BUTTON =====================
export interface ButtonProps extends BlockProps {
    bg?: ColorVariant;
    color?: ColorVariant;
    radius?: Radius;
    group?: 'first' | 'last' | 'between'
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
    ${({ group }) =>
        group === 'first' ?
            css`
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
                ` 
            :
        group === 'last' ?
                css`
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            `
            :
        group === 'between' ?
            css`
                border-radius: 0;
            `
        : ''
    }
    &:hover {
        background: ${theme.colors.secondaryBg};
        transition: all .2s linear;
    }
    &:disabled {
        background: ${theme.colors.gray};
        cursor: default;
    }
`;


// ===================== TYPEGRAPHY =====================
export interface TypographyProps {
    color?: ColorVariant;
    alpha?: number;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    weight?: 'bold' | 'regular' | 'semibold' | 'black' | 'thin';
    spacing?: number;
    elipsis?: number;
}

export const Typography = styled.span<TypographyProps>`
    font-family: ${theme.font.sans};
    ${({elipsis}) => {
        return (
            elipsis && `overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`
        )
    }}
    font-weight: 500;
    letter-spacing: 0.04rem;
    display: inline-block;
    ${({ size, weight, spacing }) => {
        let fontSize;
        let fontWeight;
        let letterSpacing;

        // Set font size
        if (size === 'sm') {
            fontSize = '0.7rem';
        } else if (size === 'md') {
            fontSize = '0.8rem';
        } else if (size === 'lg') {
            fontSize = '1rem';
        } else if (size === 'xl') {
            fontSize = '1.5';
        } else if (size === 'xxl') {
            fontSize = '2rem';
        } else {
            fontSize = '0.95';
        }

        // Set font weight
        if (weight === 'bold') {
            fontWeight = 'bold';
        } else if (weight === 'regular') {
            fontWeight = 'normal';
        } else if (weight === 'semibold') {
            fontWeight = '500';
        } else if (weight === 'black') {
            fontWeight = '900';
        } else if (weight === 'thin') {
            fontWeight = '100';
        }

        // Set letter spacing
        if (spacing) {
            letterSpacing = `${spacing / 10}rem`;
        }

        return `
            font-size: ${fontSize};
            font-weight: ${fontWeight};
            letter-spacing: ${letterSpacing};
        `;
    }};
    color: ${({ color, alpha }) => {
        return (
            color === 'primary' ? `rgba(${theme.colors.primaryRGB}, ${alpha || 1})` :
                color === 'success' ? `rgba(${theme.colors.successRGB}, ${alpha || 1})` :
                    color === 'info' ? `rgba(${theme.colors.infoRGB}, ${alpha || 1})` :
                        color === 'warning' ? `rgba(${theme.colors.warningRGB}, ${alpha || 1})` :
                            color === 'danger' ? `rgba(${theme.colors.dangerRGB}, ${alpha || 1})` :
                                color === 'dark' ? `rgba(${theme.colors.darkRGB}, ${alpha || 1})` :
                                    color === 'black' ? `rgba(${theme.colors.blackRGB}, ${alpha || 1})` :
                                        color === 'gray' ? `rgba(${theme.colors.grayRGB}, ${alpha || 1})` : `rgba(${theme.colors.secondaryRGB}, ${alpha || 1} )`
           );
    }};`


    
// ===================== FLEXBOX =====================
export interface FlexBoxProps {
    alignitems?: 'center' | 'flex-start' | 'flex-end';
    justifycontent?: 'center' | 'space-between' | 'flex-start' | 'flex-end'
}

export const FlexBox = styled(Block) <FlexBoxProps>`
    display: flex;
    align-items: ${({ alignitems }) => alignitems || 'center'};
    justify-content: ${({ justifycontent }) => justifycontent || 'space-between'};
`;



// ===================== CARD =====================
export interface CardProps {
    bg?: ColorVariant;
    radius?: Radius;
}

export const Card = styled(Block) <CardProps>`
    width: 100%;
    height: auto;
    display: block;
    background-color: ${({ bg }) => {
        return (
            bg === 'primary' ? theme.colors.primary :
                bg === 'success' ? theme.colors.success :
                    bg === 'info' ? theme.colors.info :
                        bg === 'warning' ? theme.colors.warning :
                            bg === 'danger' ? theme.colors.danger :
                                bg === 'dark' ? theme.colors.dark : 
                                    bg === 'black' ? theme.colors.black :
                                        bg === 'gray' ? theme.colors.gray : theme.colors.bodyBg
        );
    }};
    border-radius: ${({ radius }) => {
        return (
            radius === 'XS' ? theme.radius.XS :
                radius === 'SM' ? theme.radius.SM :
                    radius === 'LG' ? theme.radius.LG :
                        radius === 'XL' ? theme.radius.XL :
                            radius === 'XXL' ? theme.radius.XXL : '0.2rem'
                               
        );
    }};
    box-shadow: ${theme.boxShadow.SM};
`;



// ===================== CONTAINER =====================
export interface ContainerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    autoX?: boolean;
    fullwidth?: number; // use number to avoid "Not boolean error"
}



export const Container = styled(Block) <ContainerProps>`
        width: ${({ size }) => {
                return (
                    size === 'sm' ? theme.breakpoints.SM :
                        size === 'md' ? theme.breakpoints.MD :
                            size === 'lg' ? theme.breakpoints.LG :
                                size === 'xl' ? theme.breakpoints.XL :
                                    size === 'xxl' ? theme.breakpoints.XXL : '100%'
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

export interface AbsoluteProps {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
}

export const Absolute = styled(Wrapper)<AbsoluteProps>`
    position: absolute;
    left: ${({left}) => left || 'auto'};
    right: ${({right}) => right || 'auto'};
    top: ${({top}) => top || 'auto'};
    bottom: ${({bottom}) => bottom || 'auto'};
`

