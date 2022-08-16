import React from "react";
import {Grid} from '@adobe/react-spectrum';

export interface ContainerProps {
    children: React.ReactNode,
}



const Container: React.FC<ContainerProps> = (props) => {
    return (
        <Grid
            areas={{
                base: [
                    'header',
                    'nav',
                    'content',
                    'footer'
                ],
                M: [
                    'header   header',
                    'nav      content',
                    'nav      content',
                    'footer   footer'
                ],
                L: [
                    'header header  header',
                    'nav    content toc',
                    'nav    content toc',
                    'footer footer  footer'
                ]
            }}
            columns={{
                M: ['size-2000', '1fr'],
                L: ['size-2000', '1fr', 'size-2000']
            }}
            gap="size-100"
        >
            {props.children}
        </Grid>
    );
}

export default Container;
