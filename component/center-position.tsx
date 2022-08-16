import React from 'react';
import {ContainerProps} from "./container";
import {Flex} from "@adobe/react-spectrum";

export interface CenterPositionProps {
    children: React.ReactNode,
}

const CenterPosition: React.FC<CenterPositionProps> = (props) => {
    return (
        <Flex direction="column" gap="size-100" alignItems="center">
            <div
                style={{
                    maxWidth: '30em'
                }}
            >
                <div style={{
                    position: 'relative',
                    width: '100%',
                    marginBottom: "14px"
                }}>
                    {props.children}
                </div>
            </div>
        </Flex>
    );
}

export default CenterPosition;
