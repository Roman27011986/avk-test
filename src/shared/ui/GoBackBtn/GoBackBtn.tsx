import { useRouter } from 'next/navigation';
import { Fab } from "@mui/material";
import HolidayVillageSharpIcon from '@mui/icons-material/HolidayVillageSharp';

export const GoBackBtn = () => {
  const router = useRouter();
  
  const goBack = () => {
    router.back();
  };

  return (
    <Fab variant='extended' size='small' onClick={goBack}>
      <HolidayVillageSharpIcon color='info' />
    </Fab>
  );
};