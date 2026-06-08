import Link from "next/link";

const NavBar=()=>{
    return(
        <div className="navbar bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold">My App</h1>
            <div className="flex gap-5">
                <Link href={"/"} className="btn">Home</Link>
                <Link href={"/public"} className="btn">Public</Link>
                <Link href={"/private"} className="btn">Private</Link>
                <Link href={"/admin"} className="btn">Admin</Link>
            </div>
        </div>
    )
}

export default NavBar;