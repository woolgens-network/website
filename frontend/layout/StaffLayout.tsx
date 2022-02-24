import React from "react";
import {observer} from "mobx-react-lite";
import { useRouter } from 'next/router'

import Sidebar from "../components/staff/layout/Sidebar";
import Header from "../components/staff/layout/Header";
import staffStore from "../stores/StaffStore";
import authStore from "../stores/AuthStore";
import BreadCrumbs from "../components/common/BreadCrumbs";
import ErrorPage from "../components/ErrorPage";
import {AiOutlineLoading3Quarters} from "react-icons/ai"

declare interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    permission?: string
    withBreadCrumbs?: boolean,
    children?: React.ReactNode
}

const SidebarLayout: React.FC<SidebarProps> = observer(({permission, withBreadCrumbs, children, ...HTMLElements}) => {
    const router = useRouter()

    if (authStore.loading) {
        return (
            <div className="flex flex-col justify-center items-center mx-auto w-full h-screen">
                <AiOutlineLoading3Quarters size="4rem" className="animate-spin" />
                <div className="mt-8 text-center">
                    <h1 className="w-full text-4xl font-bold">
                        Logging you in
                    </h1>
                    <h2 className="text-gray-300">
                        This should not take too long!
                    </h2>
                </div>
            </div>
        )
    }

    return (
        <main className="flex overflow-hidden h-screen text-gray-200 font-poppins">
            <Sidebar extended={staffStore.sidebarExtended} pathName={router ? router.pathname : ""} toggleSidebar={() => staffStore.toggleSidebar()} />
            <div onClick={() => staffStore.toggleSidebar()} className={`${!staffStore.sidebarExtended && "hidden"} lg:hidden absolute z-30 w-full h-screen bg-black opacity-80`} />
            <main className="flex overflow-auto flex-col w-full min-h-screen bg-dark-dark">
                <Header toggleSidebar={() => staffStore.toggleSidebar()} />
                <div className="flex-grow my-5 mx-10">
                    {withBreadCrumbs && (
                        <div>
                            <h1 className="text-4xl font-bold">Title</h1>
                            <BreadCrumbs pathName={router ? router.pathname: ""} />
                        </div>
                    )}
                    <div {...HTMLElements} className={`h-full flex-grow ${HTMLElements.className || ""}`}>
                        {authStore.hasPermission(permission) ? children : (
                            <ErrorPage title="403" subtitle="You do not have access to this page!" />
                        )}
                    </div>
                </div>
            </main>
        </main>
    )
});

export default SidebarLayout
