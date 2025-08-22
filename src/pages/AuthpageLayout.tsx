
const AuthpageLayout = ({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle: string }) => {
    return (
        <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
            <div className="relative flex flex-col justify-center w-full h-screen p-6 bg-white dark:bg-gray-900 lg:flex-row sm:p-0">
                <div className="flex flex-col justify-center w-full lg:w-1/2">
                    <div className="w-full max-w-md mx-auto">
                        <div className="mb-6 text-center lg:text-left">
                            <h1 className="mb-2 gasoek-one-regular text-title-sm dark:text-white/90 sm:text-title-md">
                                {title}
                            </h1>
                            <p className="helvetica-medium text-sm text-[#2D2D2D] dark:text-gray-400">
                                {subtitle}
                            </p>
                        </div>
                        {children}
                    </div>
                </div>

                <div className="items-center justify-center hidden w-full h-full bg-[#005AA3] lg:flex lg:w-1/2">
                    <div className="flex flex-col gap-4">
                        <img src="/logo1.png" alt="" className="w-40" />
                        <img src="/mogos.png" alt="" className="w-40" />
                    </div>
                </div>
            </div>

        </div>
    )
}


export default AuthpageLayout;

