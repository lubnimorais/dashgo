import { Box, Stack } from '@chakra-ui/react';

import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from 'react-icons/ri';
import { NavLink } from './NavLink';

import { NavSection } from './NavSection';

export function Sidebar() {
  return (
    <Box as="aside" width="64" marginRight="8">
      <Stack spacing="12" align="flex-start">
        <NavSection title="GERAL">
          <NavLink href="/" icon={RiDashboardLine}>
            Dashboard
          </NavLink>

          <NavLink href="/" icon={RiContactsLine}>
            Usuários
          </NavLink>
        </NavSection>

        <NavSection title="AUTOMAÇÃO">
          <NavLink href="/" icon={RiInputMethodLine}>
            Formulários
          </NavLink>
          <NavLink href="/" icon={RiGitMergeLine}>
            Automação
          </NavLink>
        </NavSection>
      </Stack>
    </Box>
  );
}
