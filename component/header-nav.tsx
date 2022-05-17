import React from "react";
import {ALIGN, HeaderNavigation, StyledNavigationItem, StyledNavigationList} from "baseui/header-navigation";
import {StyledLink} from "baseui/link";


const HeaderNav: React.FC = () => {
    return(
        <HeaderNavigation>
            <StyledNavigationList $align={ALIGN.left}>
                <StyledNavigationItem>Uber</StyledNavigationItem>
            </StyledNavigationList>
            <StyledNavigationList $align={ALIGN.center}/>
            <StyledNavigationList $align={ALIGN.right}>
                <StyledNavigationItem>
                    <StyledLink href="#basic-link1">
                        Tab Link One
                    </StyledLink>
                </StyledNavigationItem>
                <StyledNavigationItem>
                    <StyledLink href="#basic-link2">
                        Tab Link Two
                    </StyledLink>
                </StyledNavigationItem>
            </StyledNavigationList>
        </HeaderNavigation>
    )
}

export default HeaderNav;
