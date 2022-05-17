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
    marginTop: '40px'
};

const MainLayout: React.FC<MainLayoutProps> = (props) => {

    const [css, theme] = useStyletron();

    return(
        <FlexGrid
            flexGridColumnCount={1}
            flexGridColumnGap="scale800"
            flexGridRowGap="scale800"
        >
            <FlexGridItem {...itemProps} width={props.width}>
                <div
                    className={css({
                        width: props.width,
                        margin: 'auto',
                        alignItems: 'center',
                        justifyContent: 'center',
                    })}
                >
                    {props.children}
                </div>
            </FlexGridItem>
        </FlexGrid>
    )
}

export default MainLayout;
