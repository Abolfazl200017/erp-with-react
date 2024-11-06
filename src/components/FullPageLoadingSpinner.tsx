import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function FullPageLoadingSpinner() {
    
    return <Box sx={{ position: 'fixed', top: 0, right: 0, width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'darkBG.main' }} >
        <img className='grayscale w-20 h-20 rounded mb-5' src="/images/logo.webp" />
        <div>
            <svg width={0} height={0}>
            <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e01cd5" />
                <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
            </defs>
            </svg>
            <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
        </div>
    </Box>
}

export default FullPageLoadingSpinner