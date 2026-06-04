import Link from "next/link";
import LoginButton from "./LoginButton";

const AuthButton = () => {
    const session = false;
    return (
      <div className="flex gap-5">
        {session ? (
          <button className="btn">Logout</button>
        ) : (
            <>
            <LoginButton />
            <Link href={"/register"} className="btn">
            Register
            </Link>
            </>
        )}
      </div>
    );
}

export default AuthButton;