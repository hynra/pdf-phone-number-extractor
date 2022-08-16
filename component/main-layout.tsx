import React from "react";
import {Block, BlockProps} from "baseui/block";
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";
import {useStyletron} from "baseui";

export interface MainLayoutProps {
    children: React.ReactNode,
    width?: string
}


const itemProps: BlockProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40px',
    maxWidth: '1250px'
};

const MainLayout: React.FC<MainLayoutProps> = (props) => {

    const [css, theme] = useStyletron();

    return(
        <FlexGrid
            flexGridColumnCount={1}
            flexGridColumnGap="scale800"
            flexGridRowGap="scale800"
            alignItems='center'
            justifyContent='center'
        >
            <FlexGridItem
                {...itemProps}

                overrides={{
                    Block: {
                        style: ({$theme}) => ({
                            width: $theme.sizing.scale1600,
                        }),
                    },
                }}
            >

                    {props.children}

            </FlexGridItem>
        </FlexGrid>
    )
}

export default MainLayout;
