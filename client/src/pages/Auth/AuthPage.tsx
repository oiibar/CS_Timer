import React, { useState } from "react";
import AuthForm from "@components/Auth/AuthForm.tsx";

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="container flex justify-center items-center h-screen">
            <AuthForm isLogin={isLogin} toggleMode={() => setIsLogin(!isLogin)} />
        </div>
    );
};

export default AuthPage;
