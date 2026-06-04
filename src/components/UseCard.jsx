"use client";
import { useSession } from "next-auth/react";

const UseCard = () => {
    const session = useSession();
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-[400px] h-[200px] bg-gray-100 rounded-lg shadow-md flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">Use Card</h2>
                {session ? (
                    <p className="text-gray-600">Welcome back, {session.user.name}!</p>
                ) : (
                    <p className="text-gray-600">Please log in to access your card.</p>
                )}
            </div>
        </div>
    );
};

export default UseCard;