const PrivatePage = () => {
    return (
        <div className="min-h-screen min-w-screen relative flex flex-col justify-center text-center mx-auto max-w-7xl gap-5">
            <h1 className="text-4xl font-bold">Private Page</h1>
            <p>This is a simple private page.</p>
            <p>Only authenticated users can access this page.</p>
        </div>
    );
}

export default PrivatePage;