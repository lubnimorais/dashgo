import { ElementType } from 'react';

import {
  Icon,
  Link as ChakraLink,
  Text,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';

import { ActiveLink } from '../ActiveLink';

interface INavLinkProps extends ChakraLinkProps {
  icon: ElementType; // ElementType é quando passamos um component, quando passa o nome do componente (a referencia do componente e não a declaração <Component />)
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: INavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink href="/" display="flex" alignItems="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text marginLeft="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
