import React from "react";
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";
import {BlockProps} from "baseui/block";

export interface ContainerProps {
    children: React.ReactNode,
}

const itemProps: BlockProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40px'
};


const Container: React.FC<ContainerProps> = (props) => {
    return (
        <FlexGrid
            flexGridColumnCount={1}
            flexGridColumnGap="scale800"
            flexGridRowGap="scale800"
        >
            <FlexGridItem
                display='flex'
                alignItems='center'
                justifyContent='center'
            >
                {props.children}
            </FlexGridItem>
        </FlexGrid>
    );
}

export default Container;
