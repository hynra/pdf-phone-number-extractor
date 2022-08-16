import React from "react";
import {ALIGN, HeaderNavigation, StyledNavigationItem, StyledNavigationList} from "baseui/header-navigation";
import {StyledLink} from "baseui/link";
import {ArrowRight} from "baseui/icon";


const HeaderNav: React.FC = () => {
    return(
        <HeaderNavigation>
            <StyledNavigationList $align={ALIGN.left}>
                <StyledNavigationItem>
                    <StyledLink href="/">
                        PhoneNumber Extractor
                    </StyledLink>
                </StyledNavigationItem>
            </StyledNavigationList>
            <StyledNavigationList $align={ALIGN.center}/>
            <StyledNavigationList $align={ALIGN.right}>
                <StyledNavigationItem>

                    <StyledLink href="https://hyn.gg">
                        hyn.gg<ArrowRight size={24}/>
                    </StyledLink>
                </StyledNavigationItem>
            </StyledNavigationList>
        </HeaderNavigation>
    )
}

export default HeaderNav;
