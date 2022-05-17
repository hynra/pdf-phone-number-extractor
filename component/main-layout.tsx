import React from "react";
import {Block, BlockProps} from "baseui/block";

export interface MainLayoutProps {
    children: React.ReactNode
}


const blockProps: BlockProps = {
    color: 'contentPrimary',
    backgroundColor: 'backgroundPrimary',
    maxWidth: '100vw',
    minHeight: '100vh',
    overflow: 'hidden',
};

const MainLayout: React.FC<MainLayoutProps> = (props) => {
    return(
        <div>
            <Block {...blockProps}>
                <Block
                    backgroundColor="backgroundPrimary"
                    color="contentPrimary"
                    marginTop="scale300"
                    display="flex"
                    paddingTop="scale400"
                    justifyContent="center"
                >
                    {props.children}
                </Block>
            </Block>
        </div>
    )
}

export default MainLayout;
