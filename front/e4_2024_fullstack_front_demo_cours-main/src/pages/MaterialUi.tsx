import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';

const useIsDarkMode = () => {
    const theme = useTheme();
    return theme.palette.mode === 'dark';
  };

export function MaterialUi() {
    const isDarkMode = useIsDarkMode();
    
    return (
      <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Material+Icons+Two+Tone"
        // Import the two tones MD variant                           ^^^^^^^^
      />;
        <h1>MaterialUi:</h1>
        <Stack direction="row" spacing={3}>
            <Icon>add_circle</Icon>
            <Icon color="primary">add_circle</Icon>
            <Icon sx={{ color: green[500] }}>add_circle</Icon>
            <Icon fontSize="small">add_circle</Icon>
            <Icon sx={{ fontSize: 30 }}>add_circle</Icon>
        </Stack>

        <Icon
            sx={[isDarkMode && { filter: 'invert(1)' }]}
            baseClassName="material-icons-two-tone"
            >
            add_circle
            </Icon>
      </>
    );
  }