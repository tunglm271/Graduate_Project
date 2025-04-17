import { Divider, TextField, InputAdornment, Button } from "@mui/material";
import AvatarEditor from "../../../components/AvatarEditor";
import { useEffect, useState } from "react";
import { getUser } from "../../../utlis/auth";
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { getUserRequest, updateUserRequest } from "../../../service/authApi";

const SettingPage = () => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [user, setUser] = useState(getUser());
    const [ changePasswordData, setChangePasswordData ] = useState({
        current_password: "",
        new_password: "",
        confirm_password: ""
    });
    const [error, setError] = useState(null);


    useEffect(() => {
        getUserRequest().then((res) => {
            setUser(res.user);
            setName(res.user.name);
        }
        ).catch((err) => {
            console.log(err);
        });
    }
    , []);

    const handleChangePassword = (e) => {
        setChangePasswordData({
            ...changePasswordData,
            [e.target.name]: e.target.value
        });
    }

    const validatePassword = () => {
        console.log("test");
        const { current_password, new_password, confirm_password } = changePasswordData;
        if (!current_password || !new_password || !confirm_password) {
            setError("Please fill in all fields");
            return false;
        }
        if (new_password !== confirm_password) {
            setError("New password and confirm password do not match");
            return false;
        }
        if (new_password.length < 6) {
            setError("New password must be at least 6 characters long");
            return false;
        }
        return true;
    }

    const handleUpdateProfile = () => {
        const { current_password, new_password, confirm_password } = changePasswordData;
        if (current_password != "" || new_password != "" || confirm_password != "") {
            if (!validatePassword()) {
                return;
            }
        }

        setLoading(true);
        updateUserRequest(image, name, changePasswordData.current_password, changePasswordData.new_password).then((res) => {
            setUser(res.user);
            setChangePasswordData({
                current_password: "",
                new_password: "",
                confirm_password: ""
            });
            setLoading(false);
            setError(null);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="p-5">
            <p className="font-semibold text-2xl mb-5">My Settings</p>
            <div className="flex gap-5 mb-5">
                <div className="w-1/4">
                    <p className="font-semibold">Profile</p>
                    <p className="text-gray-400 text-sm">Your account information</p>
                </div>
                <div className="w-2/3 flex flex-col">
                    <p className="font-semibold">Avatar</p>
                    <AvatarEditor 
                        image={image} 
                        setImage={setImage}
                        defaultImg={user.avatar}
                        avatarSize={80}
                    />
                    <p className="text-xs font-semibold mt-4">{user.name}</p>
                    <div className="mt-4">
                        <p className="text-sm font-semibold my-2">Full name</p>
                        <TextField
                            className="w-full"
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            value={name || ""}
                            onChange={(e) => setName(e.target.value)}
                            slotProps={{
                                input: {
                                  startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                  ),
                                }
                            }}
                        />
                        <p className="text-sm font-semibold my-2">Email</p>
                        <TextField
                            className="w-full"
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            value={user.email || ""}
                            disabled
                            slotProps={{
                                input: {
                                  startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                  ),
                                }
                            }}
                        />
                        <p className="text-sm font-semibold my-2">Phone</p>
                        <TextField
                            className="w-full"
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            value={user.phone}
                            disabled
                            slotProps={{
                                input: {
                                  startAdornment: (
                                    <InputAdornment position="start">
                                        <LocalPhoneIcon />
                                    </InputAdornment>
                                  ),
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            <Divider />
            <div className="flex gap-5 my-5">
                <div className="w-1/4">
                    <p className="font-semibold">Reset password</p>
                    <p className="text-gray-400 text-sm">Change your account password</p>
                </div>
                <div className="w-2/3 flex flex-col">
                    <p className="text-sm font-semibold my-2">Enter Password</p>
                    <TextField
                        className="w-full"
                        id="current-password"
                        variant="outlined"
                        size="small"
                        type="password"
                        placeholder="Enter your current password"
                        name="current_password"
                        value={changePasswordData.current_password}
                        onChange={handleChangePassword}
                    />
                    <p className="text-sm font-semibold my-2">New Password</p>
                    <TextField
                        className="w-full"
                        id="new-password"
                        variant="outlined"
                        size="small"
                        type="password"
                        placeholder="Enter your new password"
                        name="new_password"
                        value={changePasswordData.new_password}
                        onChange={handleChangePassword}
                    />
                    <p className="text-sm font-semibold my-2">Confirm New Password</p>
                    <TextField
                        className="w-full"
                        id="confirm-new-password"
                        variant="outlined"
                        size="small"
                        type="password"
                        placeholder="Confirm your new password"
                        name="confirm_password"
                        value={changePasswordData.confirm_password}
                        onChange={handleChangePassword}
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
            </div>
            <Divider />
            <Button variant="contained" sx={{mt: 3, ml: "auto"}} color="primary" onClick={handleUpdateProfile} loading={loading}>
                Save Changes
            </Button>
        </div>
    );
}

export default SettingPage;
