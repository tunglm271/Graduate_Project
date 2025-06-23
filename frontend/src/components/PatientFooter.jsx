import logo from '../assets/logo.png';
import { Typography, Stack, Divider } from '@mui/material';
import FacebookIcon from '@icon/FacebookIcon';
import GoogleIcon from '@icon/GoogleIcon';
import SkypeIcon from '@icon/SkypeIcon';
import LinkedIcon from '../assets/icon/LinkedIcon';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from 'react-i18next';

const PatientFooter = () => {
    const { t } = useTranslation();

    return (
        <div id="footer">
            <div id="footer-header">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="" />
                    <Typography variant='h6' color='white'>Docify</Typography>
                </div>
                <Stack direction='row' spacing={2} alignItems={'center'}>
                    <FacebookIcon />
                    <GoogleIcon />
                    <SkypeIcon />
                    <LinkedIcon />
                </Stack>
            </div>

            <div id='footer-body'>
                <div className='flex justify-between gap-4 mb-5 mx-3 max-md:flex-col'>
                    <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '10px'}}>
                        <Typography variant='body1' sx={{ marginBottom: '10px' }}>
                            {t('footer.slogan')}
                        </Typography>
                        <Typography variant='body1' color='#7a809b' fontSize={'14px'} sx={{
                            display: 'flex', alignItems: 'center', gap: '3px'
                        }}>
                            <LocationOnIcon /> {t('footer.address')}
                        </Typography>
                        <Typography variant='body1' color='#7a809b' fontSize={'14px'} sx={{
                            display: 'flex', alignItems: 'center', gap: '3px'
                        }}>
                            <LocalPhoneIcon /> {t('footer.phone')}
                        </Typography>
                        <Typography variant='body1' color='#7a809b' fontSize={'14px'} sx={{
                            display: 'flex', alignItems: 'center', gap: '3px'
                        }}>
                            <EmailIcon /> {t('footer.email')}
                        </Typography>
                    </div>

                    <div style={{flex: 1}}>
                        <Typography variant='h6' sx={{fontWeight: 600, marginBottom: '10px' }}>
                            {t('footer.rules.title')}
                        </Typography>
                        <ul style={{marginBottom: '20px'}}>
                            <li>{t('footer.rules.operating')}</li>
                            <li>{t('footer.rules.policy')}</li>
                            <li>{t('footer.rules.responsibility')}</li>
                        </ul>

                        <Typography variant='h6' sx={{fontWeight: 600, marginBottom: '10px' }}>
                            {t('footer.services.title')}
                        </Typography>
                        <ul>
                            <li>{t('footer.services.booking')}</li>
                            <li>{t('footer.services.registration')}</li>
                            <li>{t('footer.services.management')}</li>
                        </ul>
                    </div>

                    <div style={{flex: 1}}>
                        <Typography variant='h6' sx={{fontWeight: 600, lineHeight: 1}}>
                            {t('footer.subscribe.title')}
                        </Typography>
                        <div id='footer-subscribe'>
                            <input type="text" className='text-black text-sm' placeholder={t('footer.subscribe.placeholder')} />
                            <button>{t('footer.subscribe.button')}</button>
                        </div>
                        <p style={{marginTop: '20px', fontSize: '12px'}}>
                            {t('footer.subscribe.notice.part1')}
                            <span className='font-semibold'> {t('footer.subscribe.button')} </span>
                            {t('footer.subscribe.notice.part2')}
                            <span style={{ fontWeight: 600 }}> {t('footer.rules.policy')} </span>
                            {t('footer.subscribe.notice.part3')}
                        </p>
                    </div>
                </div>

                <Divider />
                <div id='footer-footer'>
                    <Typography variant='body1' textAlign={'center'} marginTop={'15px'}>
                        {t('footer.copyright')}
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default PatientFooter;
