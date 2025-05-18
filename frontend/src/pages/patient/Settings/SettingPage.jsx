import { Divider, TextField, InputAdornment, Button } from "@mui/material";
import AvatarEditor from "../../../components/AvatarEditor";
import { useEffect, useState, useContext } from "react";
import { getUser } from "../../../utlis/auth";
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { getUserRequest, updateUserRequest } from "../../../service/authApi";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar";
import { PatientLayoutContext } from "../../../context/PateintLayoutProvider";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

const SettingPage = () => {
    const { t } = useTranslation();
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
    const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();
    const { setUser: setUserContext } = useContext(PatientLayoutContext);

    useEffect(() => {
        getUserRequest().then((res) => {
            setUser(res.user);
            setName(res.user.name);
        }
        ).catch((err) => {
            showErrorSnackbar(err.response.data.message);
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
        const { current_password, new_password, confirm_password } = changePasswordData;
        if (!current_password || !new_password || !confirm_password) {
            setError(t("setting.patient.errors.fillAllFields"));
            return false;
        }
        if (new_password !== confirm_password) {
            setError(t("setting.patient.errors.passwordMismatch"));
            return false;
        }
        if (new_password.length < 6) {
            setError(t("setting.patient.errors.passwordLength"));
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
            console.log(res);
            setUser(res.user);
            setChangePasswordData({
                current_password: "",
                new_password: "",
                confirm_password: ""
            });
            setLoading(false);
            setError(null);
            showSuccessSnackbar(t("setting.patient.messages.updateSuccess"));
            setImage(null);
            setUserContext(res.user);
            Cookies.set("name", res.user.name, { expires: 7 });
            Cookies.set("avatar", res.user.avatar, { expires: 7 });
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="p-5">
            <p className="font-semibold text-2xl mb-5">{t("setting.patient.title")}</p>
            <div className="flex gap-5 mb-5">
                <div className="w-1/4">
                    <p className="font-semibold">{t("setting.patient.account.title")}</p>
                    <p className="text-gray-400 text-sm">{t("setting.patient.account.description")}</p>
                </div>
                <div className="w-2/3 flex flex-col">
                    <p className="font-semibold">{t("setting.patient.account.avatar")}</p>
                    <AvatarEditor 
                        image={image} 
                        setImage={setImage}
                        defaultImg={user.avatar}
                        avatarSize={80}
                    />
                    <p className="text-xs font-semibold mt-4">{user.name}</p>
                    <div className="mt-4">
                        <p className="text-sm font-semibold my-2">{t("setting.patient.account.fullName")}</p>
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
                        <p className="text-sm font-semibold my-2">{t("setting.patient.account.email")}</p>
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
                        <p className="text-sm font-semibold my-2">{t("setting.patient.account.phone")}</p>
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
                    <p className="font-semibold">{t("setting.patient.password.title")}</p>
                    <p className="text-gray-400 text-sm">{t("setting.patient.password.description")}</p>
                </div>
                <div className="w-2/3 flex flex-col">
                    <p className="text-sm font-semibold my-2">{t("setting.patient.password.currentPassword")}</p>
                    <TextField
                        className="w-full"
                        id="current-password"
                        variant="outlined"
                        size="small"
                        type="password"
                        placeholder={t("setting.patient.password.currentPasswordPlaceholder")}
                        name="current_password"
                        value={changePasswordData.current_password}
                        onChange={handleChangePassword}
                    />
                    <p className="text-sm font-semibold my-2">{t("setting.patient.password.newPassword")}</p>
                    <TextField
                        className="w-full"
                        id="new-password"
                        variant="outlined"
                        size="small"
                        type="password"
                        placeholder={t("setting.patient.password.newPasswordPlaceholder")}
                        name="new_password"
                        value={changePasswordData.new_password}
                        onChange={handleChangePassword}
                    />
                    <p className="text-sm font-semibold my-2">{t("setting.patient.password.confirmPassword")}</p>
                    <TextField
                        className="w-full"
                        id="confirm-new-password"
                        variant="outlined"
                        size="small"
                        type="password"
                        placeholder={t("setting.patient.password.confirmPasswordPlaceholder")}
                        name="confirm_password"
                        value={changePasswordData.confirm_password}
                        onChange={handleChangePassword}
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
            </div>
            <Divider />
            <Button 
                variant="contained" 
                sx={{mt: 3, ml: "auto"}} 
                color="primary" 
                onClick={handleUpdateProfile} 
                loading={loading}
            >
                {t("setting.patient.button.saveChanges")}
            </Button>
        </div>
    );
}

export default SettingPage;