"use client";
import React, { useEffect } from "react";
import LeftSide from "../../__molecules/leftside/LeftSide";
import Post from "../post/Post";
import Slider from "../../__molecules/Slider/Slider";
import AllPosts from "../../__molecules/allposts/AllPosts";
import RightSide from "../../__molecules/rightside/RightSide";
import { useRouter } from "next/navigation";

function HomePageClient() {
    const router = useRouter();

    useEffect(() => {
        const currentUser = localStorage.getItem("currentUser");
        if (!currentUser) {
            router.push('/signin');
        }
    }, [router]);

    return (
        <>
            <div className="w-full min-h-[100vh] bg-gray-100">
                <div className="flex items-center justify-center">
                    <div className="flex w-[1800px] justify-between">
                        <LeftSide />
                        <div className="flex flex-col">
                            <Post />
                            <Slider />
                            <AllPosts />
                        </div>
                        <RightSide />
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePageClient;