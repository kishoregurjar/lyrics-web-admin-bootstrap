import React from 'react'
import MainNavigation from '../components/MainNavigation/MainNavigation'
import MainFooter from '../components/MainFooter/MainFooter'

const CommonLayout = ({ children }) => {
    return (
        <>
            <MainNavigation />
            {children}
            <MainFooter />
        </>
    )
}

export default CommonLayout
