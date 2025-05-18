import { useColorScheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import { Select, type SelectProps } from '@mui/material';
// import Select, { SelectProps } from '@mui/material/Select';

export default function ColorModeSelect(props: SelectProps) {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
    <Select
      size='small'
      value={mode}
      onChange={(event) =>
        setMode(event.target.value as 'system' | 'light' | 'dark')
      }
      {...props}
    >
      <MenuItem value="system">Sistema</MenuItem>
      <MenuItem value="light">Claro</MenuItem>
      <MenuItem value="dark">Oscuro</MenuItem>
    </Select>
  );
}