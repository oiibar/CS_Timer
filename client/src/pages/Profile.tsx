import { useProfile } from "@hooks/useProfile";
import ProfileForm from "@components/Profile/ProfileForm";

const ProfilePage = () => {
    const {
        formFields,
        showPassword,
        showConfirmPassword,
        passwordMismatch,
        setShowPassword,
        setShowConfirmPassword,
        handleChange,
        handleSubmit,
    } = useProfile();

    return (
        <div className="container space-y-4 w-full max-w-sm mx-auto m-6 bg-white rounded-lg p-8 text-black">
            <h2 className="text-5xl font-bold text-center">Profile</h2>
            <ProfileForm
                formFields={formFields}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                passwordMismatch={passwordMismatch}
                setShowPassword={setShowPassword}
                setShowConfirmPassword={setShowConfirmPassword}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default ProfilePage;
